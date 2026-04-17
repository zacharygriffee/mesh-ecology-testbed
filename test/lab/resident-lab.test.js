import test from "node:test";
import assert from "node:assert/strict";
import { loadScenarioById } from "../../src/lab/load-scenario.js";
import { createResidentLab } from "../../src/lab/create-resident-lab.js";
import { waitFor } from "../../src/lab/wait-for.js";

test("resident lab reaches mature readiness and supports mature-mesh job flow", async () => {
  const lab = createResidentLab({
    scenario: loadScenarioById("organism-ratifier-basic"),
    meshRoot: process.env.MESH_ECOLOGY_ROOT,
    keepArtifacts: true
  });

  try {
    const status = await lab.start();
    assert.equal(status.readiness.mesh.ready, true);
    assert.equal(status.readiness.actors.ready, true);
    assert.equal(status.readiness.mature.ready, true);
    assert.ok(typeof status.timings.coldMeshBringupMs === "number");
    assert.ok(typeof status.timings.coldMatureReadyMs === "number");

    const publication = await lab.publishJob({
      cap: "cap/testbed/resident-job",
      jobMeta: {
        scenario: "resident-lab-test"
      }
    });

    const trace = await waitFor(async () => {
      const currentTrace = await lab.getTrace({
        jobKey: publication.jobKey
      });
      if (currentTrace.concerns?.[0]?.stage === "rat_present") {
        return currentTrace;
      }
      return null;
    }, { tries: 240, delayMs: 250 });

    assert.ok(trace, "resident lab should materialize ratified trace for published job");
    assert.equal(trace.concerns?.[0]?.stage, "rat_present");
  } finally {
    await lab.close();
  }
});
