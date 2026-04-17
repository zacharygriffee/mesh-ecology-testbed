import crypto from "node:crypto";
import fs from "node:fs";
import createFakeSwarm from "fakeswarm";
import idEncoding from "hypercore-id-encoding";
import { createRunLayout, getActorStoreRoot, removeRunRoot } from "./run-layout.js";
import { createObservationCapture } from "./observation-capture.js";
import { loadMeshEcology } from "./load-mesh-ecology.js";
import { closeSwarm, flushAll } from "./swarm.js";
import { waitFor } from "./wait-for.js";
import { launchActor } from "../actors/launch-actor.js";

async function closeMaybe(resource) {
  await resource?.close?.().catch(() => {});
}

function isActorWarmed(snapshot) {
  return snapshot?.status?.warm?.some((entry) => entry.status === "warmed") === true;
}

export function createResidentLab({
  scenario,
  meshRoot,
  actorTickIntervalMs = 250,
  keepArtifacts = true
} = {}) {
  if (!scenario) {
    throw new Error("scenario is required");
  }

  const layout = createRunLayout({ scenarioId: `${scenario.id}-service` });
  const capture = createObservationCapture(layout);

  const state = {
    posture: "local-resident-lab-service",
    scenarioId: scenario.id,
    scenarioTitle: scenario.title || scenario.id,
    meshRoot: null,
    phase: "idle",
    readiness: {
      mesh: { ready: false, readyAt: null },
      actors: { ready: false, readyAt: null },
      mature: { ready: false, readyAt: null }
    },
    timings: {
      coldMeshBringupMs: null,
      coldActorsReadyMs: null,
      coldMatureReadyMs: null
    },
    startedAt: null,
    topology: null,
    lastPublishedJobKey: null
  };

  const resources = {
    hostSwarm: null,
    orgSwarm: null,
    ratSwarm: null,
    observerSwarm: null,
    discovery: null,
    concern: null,
    observer: null,
    hostStore: null,
    discoveryStore: null,
    actors: []
  };

  let mesh = null;
  let bootstrapTopic = null;
  let pumpTimer = null;
  let pumpRunning = false;

  function markReady(name) {
    if (state.readiness[name].ready) return;
    const now = new Date().toISOString();
    state.readiness[name] = {
      ready: true,
      readyAt: now
    };
    const startedAtMs = state.startedAt ? Date.parse(state.startedAt) : null;
    if (startedAtMs != null) {
      const elapsedMs = Date.parse(now) - startedAtMs;
      if (name === "mesh") state.timings.coldMeshBringupMs = elapsedMs;
      if (name === "actors") state.timings.coldActorsReadyMs = elapsedMs;
      if (name === "mature") state.timings.coldMatureReadyMs = elapsedMs;
    }
    capture.record(`readiness.${name}`, {
      readyAt: now,
      elapsedMs: startedAtMs == null ? null : Date.parse(now) - startedAtMs
    });
  }

  async function pumpOnce() {
    if (pumpRunning) return;
    pumpRunning = true;

    try {
      await flushAll(resources.hostSwarm, resources.orgSwarm, resources.ratSwarm, resources.observerSwarm);
      for (const runtime of resources.actors) {
        await runtime.tick();
      }
      await resources.concern?.update?.({ wait: true }).catch(() => {});
    } finally {
      pumpRunning = false;
    }
  }

  function startPump() {
    if (pumpTimer) return;
    pumpTimer = setInterval(() => {
      void pumpOnce();
    }, actorTickIntervalMs);
  }

  function stopPump() {
    if (!pumpTimer) return;
    clearInterval(pumpTimer);
    pumpTimer = null;
  }

  function writeTopology() {
    const topology = {
      schema: "mesh-ecology-testbed/mesh-lab-topology/v1",
      scenarioId: scenario.id,
      mode: "resident-service",
      meshRoot: mesh.meshRoot,
      transport: "fakeswarm",
      bootstrapTopic: idEncoding.encode(bootstrapTopic),
      discoveryKey: idEncoding.encode(resources.discovery.key),
      concernKey: idEncoding.encode(resources.concern.key),
      participants: [
        { id: "discovery-host", storeRoot: layout.stores.discovery },
        { id: "concern-host", storeRoot: layout.stores.concernHost },
        { id: "sdk-observer-1", storeRoot: layout.stores.observer },
        ...(scenario.actors || []).map((actor) => ({
          id: actor.id,
          storeRoot: getActorStoreRoot(layout, actor.id)
        }))
      ]
    };

    fs.writeFileSync(layout.topologyPath, `${JSON.stringify(topology, null, 2)}\n`);
    state.topology = topology;
    capture.record("topology.ready", topology);
  }

  async function start() {
    if (state.phase !== "idle") {
      return getStatus();
    }

    state.phase = "starting";
    state.startedAt = new Date().toISOString();
    capture.record("service.start", {
      scenarioId: scenario.id,
      posture: state.posture
    });

    mesh = await loadMeshEcology(meshRoot);
    state.meshRoot = mesh.meshRoot;

    const topicMap = new Map();
    bootstrapTopic = crypto.randomBytes(32);
    resources.hostSwarm = createFakeSwarm({ topics: topicMap });
    resources.orgSwarm = createFakeSwarm({ topics: topicMap });
    resources.ratSwarm = createFakeSwarm({ topics: topicMap });
    resources.observerSwarm = createFakeSwarm({ topics: topicMap });

    resources.hostSwarm.join(bootstrapTopic);
    resources.orgSwarm.join(bootstrapTopic);
    resources.ratSwarm.join(bootstrapTopic);
    resources.observerSwarm.join(bootstrapTopic);

    resources.hostStore = mesh.ensureCorestore(layout.stores.concernHost);
    capture.record("store.ready", { participant: "concern-host", storeRoot: layout.stores.concernHost });
    resources.discoveryStore = mesh.ensureCorestore(layout.stores.discovery);
    capture.record("store.ready", { participant: "discovery-host", storeRoot: layout.stores.discovery });

    resources.discovery = await mesh.ensureDiscoverySurface(
      resources.discoveryStore.namespace("lab-discovery"),
      {},
      resources.hostSwarm
    );
    capture.record("surface.ready", { participant: "discovery-host", type: "discovery" });
    await mesh.addDiscoveryWriter(resources.discovery, resources.discovery.local.key);
    await resources.discovery.update({ wait: true });

    resources.concern = await mesh.ensureConcernSurface(
      resources.hostStore.namespace("lab-concern-host"),
      resources.hostSwarm
    );
    await resources.concern.update({ wait: true });
    capture.record("surface.ready", { participant: "concern-host", type: "concern" });

    await mesh.addConcern(resources.discovery, idEncoding.encode(resources.concern.key), scenario.concerns[0].label);
    await resources.discovery.update({ wait: true });
    capture.record("discovery.concern-advertised", {
      concernKey: idEncoding.encode(resources.concern.key),
      label: scenario.concerns[0].label
    });

    await resources.concern.append(
      {
        op: mesh.OP.STATE,
        v: 1,
        econ: {
          mode: 0,
          attemptBurn: 0,
          ratBurn: 0
        }
      },
      { optimistic: false }
    );
    await resources.concern.update({ wait: true });
    capture.record("concern.state-bootstrapped", {
      concernKey: idEncoding.encode(resources.concern.key),
      version: 1
    });

    resources.observer = mesh.createMeshClient({
      storeRoot: layout.stores.observer,
      discoveryKey: idEncoding.encode(resources.discovery.key),
      swarm: resources.observerSwarm,
      noDoctor: true
    });
    capture.record("observer.created", {
      participant: "sdk-observer-1",
      storeRoot: layout.stores.observer
    });

    writeTopology();
    startPump();

    const initialState = await waitFor(async () => {
      await pumpOnce();
      const currentState = await resources.observer.state();
      const concernRow = currentState.concerns.find((item) => item.key === state.topology.concernKey);
      return concernRow ? currentState : null;
    }, { tries: 240, delayMs: 250 });

    if (!initialState) {
      throw new Error("resident lab observer did not discover the concern");
    }

    capture.record("state.initial", initialState);
    markReady("mesh");

    for (const actor of scenario.actors || []) {
      const actorSwarm = actor.id.startsWith("organism") ? resources.orgSwarm : resources.ratSwarm;
      const runtime = await launchActor({
        actor,
        mesh,
        layout,
        capture,
        swarm: actorSwarm,
        discoveryKey: idEncoding.encode(resources.discovery.key),
        getActorStoreRoot
      });
      resources.actors.push(runtime);
    }

    if (resources.actors.length === 0) {
      markReady("actors");
      markReady("mature");
      state.phase = "ready";
      capture.record("service.ready", {
        readyMode: "mesh-only"
      });
      return getStatus();
    }

    const warmed = await waitFor(async () => {
      await pumpOnce();
      const snapshots = resources.actors.map((runtime) => runtime.snapshot());
      return snapshots.every(isActorWarmed) ? snapshots : null;
    }, { tries: 480, delayMs: 250 });

    if (!warmed) {
      throw new Error("resident lab actors did not warm in time");
    }

    capture.record("actors.ready", warmed);
    markReady("actors");
    markReady("mature");
    state.phase = "ready";
    capture.record("service.ready", {
      readyMode: "mature"
    });

    return getStatus();
  }

  async function publishJob({
    cap = "cap/testbed/job-basic",
    jobMeta = {},
    source = "resident-lab-service"
  } = {}) {
    if (!resources.concern) {
      throw new Error("resident lab service is not started");
    }

    const jobKey = await mesh.createJob(resources.concern, cap, {
      ...jobMeta,
      source
    });
    await resources.concern.update({ wait: true });
    const encodedJobKey = idEncoding.encode(jobKey);
    state.lastPublishedJobKey = encodedJobKey;
    capture.record("job.seeded", {
      jobKey: encodedJobKey,
      cap,
      jobMeta,
      source
    });
    return {
      jobKey: encodedJobKey,
      concernKey: state.topology.concernKey
    };
  }

  async function publishWork({
    jobKey,
    cap = "cap/testbed/manual-pub",
    meta = {},
    refType = "result",
    attemptToken
  } = {}) {
    if (!resources.concern) {
      throw new Error("resident lab service is not started");
    }
    if (!jobKey) {
      throw new Error("jobKey is required");
    }

    const jobKeyBuf = idEncoding.decode(jobKey);
    const attemptTokenBuf = attemptToken ? idEncoding.decode(attemptToken) : crypto.randomBytes(32);

    await mesh.publishJobWork(
      resources.concern,
      jobKeyBuf,
      cap,
      {
        t: refType,
        k: jobKeyBuf,
        a: attemptTokenBuf
      },
      meta
    );
    await resources.concern.update({ wait: true });

    const encodedAttemptToken = idEncoding.encode(attemptTokenBuf);
    capture.record("manual.publish.pub", {
      jobKey,
      cap,
      attemptToken: encodedAttemptToken
    });

    return {
      jobKey,
      attemptToken: encodedAttemptToken
    };
  }

  async function getState() {
    if (!resources.observer) {
      throw new Error("resident lab service is not started");
    }
    await pumpOnce();
    return resources.observer.state();
  }

  async function getTrace({ jobKey, concernKeys } = {}) {
    if (!resources.observer) {
      throw new Error("resident lab service is not started");
    }
    if (!jobKey) {
      throw new Error("jobKey is required");
    }
    await pumpOnce();
    return resources.observer.trace({
      jobKey,
      concernKeys: concernKeys?.length ? concernKeys : [state.topology.concernKey]
    });
  }

  function getStatus() {
    return {
      posture: state.posture,
      mode: "resident-service",
      scenarioId: state.scenarioId,
      scenarioTitle: state.scenarioTitle,
      phase: state.phase,
      startedAt: state.startedAt,
      meshRoot: state.meshRoot,
      readiness: state.readiness,
      timings: state.timings,
      layout: {
        runRoot: layout.runRoot,
        topologyPath: layout.topologyPath
      },
      topology: state.topology,
      lastPublishedJobKey: state.lastPublishedJobKey,
      actorStatuses: resources.actors.map((runtime) => runtime.snapshot()),
      recentEvents: capture.events.slice(-20)
    };
  }

  async function close() {
    if (state.phase === "stopped") {
      return;
    }
    state.phase = "stopping";
    stopPump();

    const finalStatus = getStatus();
    capture.record("service.stop", {
      phase: state.phase
    });
    capture.flushArtifacts({
      "service.status": finalStatus
    });

    for (const runtime of resources.actors.splice(0)) {
      await closeMaybe(runtime);
    }
    await closeMaybe(resources.observer);
    resources.observer = null;
    await closeMaybe(resources.concern);
    resources.concern = null;
    await closeMaybe(resources.discovery);
    resources.discovery = null;
    await closeMaybe(resources.hostStore);
    resources.hostStore = null;
    await closeMaybe(resources.discoveryStore);
    resources.discoveryStore = null;
    await closeSwarm(resources.hostSwarm);
    resources.hostSwarm = null;
    await closeSwarm(resources.orgSwarm);
    resources.orgSwarm = null;
    await closeSwarm(resources.ratSwarm);
    resources.ratSwarm = null;
    await closeSwarm(resources.observerSwarm);
    resources.observerSwarm = null;

    if (!keepArtifacts) {
      removeRunRoot(layout.runRoot);
    }

    state.phase = "stopped";
  }

  return {
    layout,
    scenario,
    start,
    close,
    getStatus,
    getState,
    getTrace,
    publishJob,
    publishWork,
    get events() {
      return capture.events;
    }
  };
}
