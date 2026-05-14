import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { loadScenarioById } from "../../src/lab/load-scenario.js";
import { runOrganismRatifierBasicScenario } from "../../src/lab/topology-controller.js";

test("mesh-surface local lab organism and ratifier scenario materializes pub and rat flows", async () => {
  const scenario = loadScenarioById("organism-ratifier-basic");
  const result = await runOrganismRatifierBasicScenario({
    scenario,
    meshRoot: process.env.MESH_ECOLOGY_ROOT
  });

  assert.equal(result.ok, true);
  assert.equal(result.assertions.minimumConcerns, true);
  assert.equal(result.assertions.minimumJobs, true);
  assert.equal(result.assertions.minimumPubs, true);
  assert.equal(result.assertions.minimumRats, true);
  assert.equal(result.assertions.traceStage, true);
  assert.equal(result.assertions.warmedActors, true);
  assert.deepEqual(result.proofScope, result.topology.proofScope);
  assert.equal(result.topology.proofScope.proofKind, "mesh_surface_local_lab");
  assert.equal(result.topology.proofScope.transport, "fakeswarm");
  assert.equal(result.topology.proofScope.contactSeam, "deterministic_local_fakeswarm");
  assert.equal(result.topology.proofScope.decentralizedSeam, "deferred");
  assert.equal(result.topology.proofScope.distributedReadinessClaimed, false);

  assert.ok(fs.existsSync(result.layout.topologyPath));
  assert.ok(fs.existsSync(result.artifacts["actors.finalPath"]));
  assert.ok(fs.existsSync(result.artifacts["trace.finalPath"]));
});
