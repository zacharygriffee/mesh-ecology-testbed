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

export async function runConcernObserveBasicScenario({
  scenario,
  meshRoot,
  keepArtifacts = true
} = {}) {
  if (!scenario) {
    throw new Error("scenario is required");
  }

  const layout = createRunLayout({ scenarioId: scenario.id });
  const capture = createObservationCapture(layout);
  const mesh = await loadMeshEcology(meshRoot);
  const topicMap = new Map();
  const hostSwarm = createFakeSwarm({ topics: topicMap });
  const observerSwarm = createFakeSwarm({ topics: topicMap });
  const bootstrapTopic = crypto.randomBytes(32);

  const resources = {
    layout,
    hostSwarm,
    observerSwarm,
    discovery: null,
    concern: null,
    observer: null,
    hostStore: null,
    discoveryStore: null
  };

  try {
    capture.record("run.start", { scenarioId: scenario.id });
    hostSwarm.join(bootstrapTopic);
    observerSwarm.join(bootstrapTopic);

    resources.hostStore = mesh.ensureCorestore(layout.stores.concernHost);
    capture.record("store.ready", { participant: "concern-host", storeRoot: layout.stores.concernHost });

    resources.discoveryStore = mesh.ensureCorestore(layout.stores.discovery);
    capture.record("store.ready", { participant: "discovery-host", storeRoot: layout.stores.discovery });

    resources.discovery = await mesh.ensureDiscoverySurface(
      resources.discoveryStore.namespace("lab-discovery"),
      {},
      hostSwarm
    );
    capture.record("surface.ready", { participant: "discovery-host", type: "discovery" });
    await mesh.addDiscoveryWriter(resources.discovery, resources.discovery.local.key);
    await resources.discovery.update({ wait: true });
    capture.record("discovery.writer-added", { writerKey: idEncoding.encode(resources.discovery.local.key) });

    resources.concern = await mesh.ensureConcernSurface(
      resources.hostStore.namespace("lab-concern-host"),
      hostSwarm
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
      swarm: observerSwarm,
      noDoctor: true
    });
    capture.record("observer.created", { participant: "sdk-observer-1", storeRoot: layout.stores.observer });

    const topology = {
      schema: "mesh-ecology-testbed/mesh-lab-topology/v1",
      scenarioId: scenario.id,
      meshRoot: mesh.meshRoot,
      transport: "fakeswarm",
      bootstrapTopic: idEncoding.encode(bootstrapTopic),
      discoveryKey: idEncoding.encode(resources.discovery.key),
      concernKey: idEncoding.encode(resources.concern.key),
      participants: [
        { id: "discovery-host", storeRoot: layout.stores.discovery },
        { id: "concern-host", storeRoot: layout.stores.concernHost },
        { id: "sdk-observer-1", storeRoot: layout.stores.observer }
      ]
    };

    fs.writeFileSync(layout.topologyPath, `${JSON.stringify(topology, null, 2)}\n`);
    capture.record("topology.ready", topology);

    capture.record("state.initial.wait-start");
    const initialState = await waitFor(async () => {
      await flushAll(hostSwarm, observerSwarm);
      const state = await resources.observer.state();
      const concernRow = state.concerns.find((item) => item.key === topology.concernKey);
      if (!concernRow) return null;
      return state;
    });

    if (!initialState) {
      throw new Error("observer client did not discover the concern through discovery");
    }

    capture.record("state.initial", initialState);

    capture.record("publication.seed-start");
    const jobKey = await mesh.createJob(
      resources.concern,
      scenario.seedPublications[0].cap,
      scenario.seedPublications[0].jobMeta
    );
    await mesh.publishJobWork(
      resources.concern,
      jobKey,
      scenario.seedPublications[0].cap,
      {
        t: "result",
        k: jobKey,
        a: crypto.randomBytes(32)
      },
      scenario.seedPublications[0].pubMeta
    );
    await resources.concern.update({ wait: true });
    capture.record("publication.seeded", { jobKey: idEncoding.encode(jobKey) });

    capture.record("trace.final.wait-start", { jobKey: idEncoding.encode(jobKey) });
    const trace = await waitFor(async () => {
      await flushAll(hostSwarm, observerSwarm);
      const currentTrace = await resources.observer.trace({
        jobKey: idEncoding.encode(jobKey),
        concernKeys: [topology.concernKey]
      });
      if (currentTrace.concerns?.[0]?.stage === "pub_present_rat_missing") {
        return currentTrace;
      }
      return null;
    }, { tries: 160, delayMs: 25 });

    if (!trace) {
      throw new Error("observer client did not materialize the seeded publication trace");
    }

    const finalState = await resources.observer.state();
    capture.record("state.final", finalState);
    capture.record("trace.final", trace);

    const concernRow = finalState.concerns.find((item) => item.key === topology.concernKey);
    const result = {
      ok: true,
      scenarioId: scenario.id,
      topology,
      assertions: {
        discoveryScan: finalState.topology.discoveryScan === true,
        minimumConcerns: finalState.concerns.length >= 1,
        minimumJobs: (concernRow?.counts?.jobs ?? 0) >= 1,
        minimumPubs: (concernRow?.counts?.pubs ?? 0) >= 1,
        traceStage: trace.concerns?.[0]?.stage === "pub_present_rat_missing"
      },
      jobKey: idEncoding.encode(jobKey)
    };

    const artifacts = capture.flushArtifacts({
      "state.initial": initialState,
      "state.final": finalState,
      "trace.final": trace,
      result
    });
    capture.record("run.success", { artifacts });

    return {
      ...result,
      layout,
      artifacts
    };
  } catch (error) {
    capture.record("error", { message: error.message || String(error) });
    capture.flushArtifacts({
      error: {
        ok: false,
        message: error.message || String(error)
      }
    });
    throw error;
  } finally {
    await closeMaybe(resources.observer);
    await closeMaybe(resources.concern);
    await closeMaybe(resources.discovery);
    await closeMaybe(resources.hostStore);
    await closeMaybe(resources.discoveryStore);
    await closeSwarm(resources.hostSwarm);
    await closeSwarm(resources.observerSwarm);

    if (!keepArtifacts) {
      removeRunRoot(layout.runRoot);
    }
  }
}

export async function runOrganismRatifierBasicScenario({
  scenario,
  meshRoot,
  keepArtifacts = true
} = {}) {
  if (!scenario) {
    throw new Error("scenario is required");
  }

  const layout = createRunLayout({ scenarioId: scenario.id });
  const capture = createObservationCapture(layout);
  const mesh = await loadMeshEcology(meshRoot);
  const topicMap = new Map();
  const hostSwarm = createFakeSwarm({ topics: topicMap });
  const orgSwarm = createFakeSwarm({ topics: topicMap });
  const ratSwarm = createFakeSwarm({ topics: topicMap });
  const observerSwarm = createFakeSwarm({ topics: topicMap });
  const bootstrapTopic = crypto.randomBytes(32);

  const resources = {
    layout,
    hostSwarm,
    orgSwarm,
    ratSwarm,
    observerSwarm,
    discovery: null,
    concern: null,
    observer: null,
    hostStore: null,
    discoveryStore: null,
    actors: []
  };

  try {
    capture.record("run.start", { scenarioId: scenario.id });
    hostSwarm.join(bootstrapTopic);
    orgSwarm.join(bootstrapTopic);
    ratSwarm.join(bootstrapTopic);
    observerSwarm.join(bootstrapTopic);

    resources.hostStore = mesh.ensureCorestore(layout.stores.concernHost);
    capture.record("store.ready", { participant: "concern-host", storeRoot: layout.stores.concernHost });

    resources.discoveryStore = mesh.ensureCorestore(layout.stores.discovery);
    capture.record("store.ready", { participant: "discovery-host", storeRoot: layout.stores.discovery });

    resources.discovery = await mesh.ensureDiscoverySurface(
      resources.discoveryStore.namespace("lab-discovery"),
      {},
      hostSwarm
    );
    capture.record("surface.ready", { participant: "discovery-host", type: "discovery" });
    await mesh.addDiscoveryWriter(resources.discovery, resources.discovery.local.key);
    await resources.discovery.update({ wait: true });

    resources.concern = await mesh.ensureConcernSurface(
      resources.hostStore.namespace("lab-concern-host"),
      hostSwarm
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
      swarm: observerSwarm,
      noDoctor: true
    });

    const topology = {
      schema: "mesh-ecology-testbed/mesh-lab-topology/v1",
      scenarioId: scenario.id,
      meshRoot: mesh.meshRoot,
      transport: "fakeswarm",
      bootstrapTopic: idEncoding.encode(bootstrapTopic),
      discoveryKey: idEncoding.encode(resources.discovery.key),
      concernKey: idEncoding.encode(resources.concern.key),
      participants: [
        { id: "discovery-host", storeRoot: layout.stores.discovery },
        { id: "concern-host", storeRoot: layout.stores.concernHost },
        { id: "sdk-observer-1", storeRoot: layout.stores.observer },
        ...scenario.actors.map((actor) => ({
          id: actor.id,
          storeRoot: getActorStoreRoot(layout, actor.id)
        }))
      ]
    };
    fs.writeFileSync(layout.topologyPath, `${JSON.stringify(topology, null, 2)}\n`);
    capture.record("topology.ready", topology);

    capture.record("state.initial.wait-start");
    const initialState = await waitFor(async () => {
      await flushAll(hostSwarm, orgSwarm, ratSwarm, observerSwarm);
      const state = await resources.observer.state();
      const concernRow = state.concerns.find((item) => item.key === topology.concernKey);
      if (!concernRow) return null;
      return state;
    }, { tries: 200, delayMs: 25 });
    if (!initialState) {
      throw new Error("observer client did not discover the concern through discovery");
    }
    capture.record("state.initial", initialState);

    const jobKey = await mesh.createJob(
      resources.concern,
      scenario.seedPublications[0].cap,
      scenario.seedPublications[0].jobMeta
    );
    await resources.concern.update({ wait: true });
    capture.record("job.seeded", { jobKey: idEncoding.encode(jobKey) });

    for (const actor of scenario.actors) {
      const actorSwarm = actor.id.startsWith("organism") ? orgSwarm : ratSwarm;
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

    const trace = await waitFor(async () => {
      await flushAll(hostSwarm, orgSwarm, ratSwarm, observerSwarm);
      for (const runtime of resources.actors) {
        await runtime.tick();
      }
      await resources.concern.update({ wait: true }).catch(() => {});
      const currentTrace = await resources.observer.trace({
        jobKey: idEncoding.encode(jobKey),
        concernKeys: [topology.concernKey]
      });
      if (currentTrace.concerns?.[0]?.stage === "rat_present") {
        return currentTrace;
      }
      return null;
    }, { tries: 260, delayMs: 30 });

    if (!trace) {
      throw new Error("actor-backed scenario did not materialize a ratified trace");
    }

    const finalState = await resources.observer.state();
    const actorSnapshots = resources.actors.map((runtime) => runtime.snapshot());
    capture.record("state.final", finalState);
    capture.record("trace.final", trace);
    capture.record("actors.final", actorSnapshots);

    const concernRow = finalState.concerns.find((item) => item.key === topology.concernKey);
    const result = {
      ok: true,
      scenarioId: scenario.id,
      topology,
      assertions: {
        minimumConcerns: finalState.concerns.length >= 1,
        minimumJobs: (concernRow?.counts?.jobs ?? 0) >= 1,
        minimumPubs: (concernRow?.counts?.pubs ?? 0) >= 1,
        minimumRats: (concernRow?.counts?.rats ?? 0) >= 1,
        traceStage: trace.concerns?.[0]?.stage === "rat_present",
        warmedActors: actorSnapshots.every((snapshot) =>
          snapshot.status.warm.some((row) => row.status === "warmed")
        )
      },
      jobKey: idEncoding.encode(jobKey)
    };

    const artifacts = capture.flushArtifacts({
      "state.initial": initialState,
      "state.final": finalState,
      "trace.final": trace,
      "actors.final": actorSnapshots,
      result
    });
    capture.record("run.success", { artifacts });

    return {
      ...result,
      layout,
      artifacts
    };
  } catch (error) {
    capture.record("error", { message: error.message || String(error) });
    capture.flushArtifacts({
      error: {
        ok: false,
        message: error.message || String(error)
      }
    });
    throw error;
  } finally {
    for (const runtime of resources.actors) {
      await runtime.close().catch(() => {});
    }
    await closeMaybe(resources.observer);
    await closeMaybe(resources.concern);
    await closeMaybe(resources.discovery);
    await closeMaybe(resources.hostStore);
    await closeMaybe(resources.discoveryStore);
    await closeSwarm(resources.hostSwarm);
    await closeSwarm(resources.orgSwarm);
    await closeSwarm(resources.ratSwarm);
    await closeSwarm(resources.observerSwarm);

    if (!keepArtifacts) {
      removeRunRoot(layout.runRoot);
    }
  }
}
