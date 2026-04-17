import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { loadScenarioById } from "../../src/lab/load-scenario.js";
import { runConcernObserveBasicScenario } from "../../src/lab/topology-controller.js";

test("real mesh lab concern observation scenario materializes discovery, state, and trace", async () => {
  const scenario = loadScenarioById("concern-observe-basic");
  const result = await runConcernObserveBasicScenario({
    scenario,
    meshRoot: process.env.MESH_ECOLOGY_ROOT
  });

  assert.equal(result.ok, true);
  assert.equal(result.assertions.discoveryScan, true);
  assert.equal(result.assertions.minimumConcerns, true);
  assert.equal(result.assertions.minimumJobs, true);
  assert.equal(result.assertions.minimumPubs, true);
  assert.equal(result.assertions.traceStage, true);

  assert.ok(fs.existsSync(result.layout.topologyPath));
  assert.ok(fs.existsSync(result.artifacts.eventsPath));
  assert.ok(fs.existsSync(result.artifacts["state.initialPath"]));
  assert.ok(fs.existsSync(result.artifacts["state.finalPath"]));
  assert.ok(fs.existsSync(result.artifacts["trace.finalPath"]));
});
