import { concerns, concernsById } from "./concerns.js";
import { scenarios } from "./scenarios.js";
import { tutorialActors, tutorialActorsById } from "./tutorial-actors.js";

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function nowIso(now) {
  return new Date(now()).toISOString();
}

function buildCatalog() {
  return {
    about: {
      name: "mesh-ecology-testbed",
      identity: "local participation testbed",
      posture: "probe/test",
      doctrineBoundary: "Local observations only. No claim of canonical mesh proof or runtime equivalence.",
      nonGoals: [
        "production runtime",
        "discovery proof",
        "replication proof",
        "distributed correctness proof",
        "workflow orchestration"
      ]
    },
    concerns,
    actors: tutorialActors.map(({ plan, ...actor }) => actor),
    scenarios
  };
}

export function createTestbed({
  timer = setTimeout,
  clearTimer = clearTimeout,
  now = Date.now
} = {}) {
  const state = {
    nextPublication: 1,
    nextObservation: 1,
    nextResponse: 1,
    publications: new Map(),
    observations: [],
    timers: new Set(),
    listeners: new Set()
  };

  function emitObservation(input) {
    const observation = {
      id: `obs-${state.nextObservation++}`,
      sequence: state.observations.length + 1,
      observedAt: nowIso(now),
      ...input,
      payload: deepClone(input.payload)
    };

    state.observations.push(observation);

    for (const listener of state.listeners) {
      listener(observation);
    }

    return observation;
  }

  function scheduleEmission(publication, scenario, actor, entry) {
    const handle = timer(() => {
      state.timers.delete(handle);
      emitObservation({
        publicationId: publication.id,
        concern: publication.concern,
        scenarioId: scenario.id,
        actorId: actor.id,
        kind: entry.kind,
        responseId: entry.responseId,
        domainStatus: entry.domainStatus,
        note: entry.note,
        payload: entry.payload
      });
    }, entry.delayMs);

    state.timers.add(handle);
  }

  function createResponseId() {
    return `rsp-${state.nextResponse++}`;
  }

  function resolveScenario(input) {
    if (input?.scenarioId) {
      const scenario = scenarios.find((item) => item.id === input.scenarioId);
      if (!scenario) {
        throw new Error(`Unknown scenario '${input.scenarioId}'.`);
      }
      return scenario;
    }

    const scenario = scenarios.find((item) => item.concern === input.concern);
    if (!scenario) {
      throw new Error(`No default scenario registered for concern '${input.concern}'.`);
    }
    return scenario;
  }

  function publish({ concern, payload, scenarioId, source = "local-ui" }) {
    if (!concernsById.has(concern)) {
      throw new Error(`Unknown concern '${concern}'.`);
    }

    const scenario = resolveScenario({ concern, scenarioId });
    if (scenario.concern !== concern) {
      throw new Error(`Scenario '${scenario.id}' belongs to '${scenario.concern}', not '${concern}'.`);
    }

    const publication = {
      id: `pub-${state.nextPublication++}`,
      concern,
      scenarioId: scenario.id,
      acceptedAt: nowIso(now),
      source,
      payload: deepClone(payload)
    };

    state.publications.set(publication.id, publication);

    emitObservation({
      publicationId: publication.id,
      concern,
      scenarioId: scenario.id,
      actorId: "testbed/local-acceptance",
      kind: "publication.accepted",
      responseId: null,
      domainStatus: "n/a",
      note: "Local acceptance only. This is not shared truth.",
      payload: {
        accepted: true,
        source,
        scenarioId: scenario.id
      }
    });

    for (const actorId of scenario.actorIds) {
      const actor = tutorialActorsById.get(actorId);
      if (!actor) {
        throw new Error(`Scenario '${scenario.id}' references unknown actor '${actorId}'.`);
      }

      const plan = actor.plan({
        publication,
        scenario,
        createResponseId
      });

      for (const entry of plan) {
        scheduleEmission(publication, scenario, actor, entry);
      }
    }

    return publication;
  }

  function getObservations({ since = 0, publicationId = null } = {}) {
    return state.observations.filter((item) => {
      if (item.sequence <= since) return false;
      if (publicationId && item.publicationId !== publicationId) return false;
      return true;
    });
  }

  function listPublications() {
    return [...state.publications.values()].map((item) => deepClone(item));
  }

  function reset() {
    for (const handle of state.timers) {
      clearTimer(handle);
    }

    state.timers.clear();
    state.publications.clear();
    state.observations = [];
    state.nextPublication = 1;
    state.nextObservation = 1;
    state.nextResponse = 1;
  }

  function subscribe(listener) {
    state.listeners.add(listener);
    return () => state.listeners.delete(listener);
  }

  function dispose() {
    reset();
    state.listeners.clear();
  }

  return {
    buildCatalog,
    publish,
    getObservations,
    listPublications,
    reset,
    subscribe,
    dispose
  };
}

