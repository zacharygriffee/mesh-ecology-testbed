import { loadScenarioById } from "../src/lab/load-scenario.js";
import {
  runConcernObserveBasicScenario,
  runOrganismRatifierBasicScenario
} from "../src/lab/topology-controller.js";

async function main() {
  const scenarioId = process.argv[2] || "concern-observe-basic";
  const scenario = loadScenarioById(scenarioId);

  let result;
  if (scenario.id === "concern-observe-basic") {
    result = await runConcernObserveBasicScenario({
      scenario,
      meshRoot: process.env.MESH_ECOLOGY_ROOT
    });
  } else if (scenario.id === "organism-ratifier-basic") {
    result = await runOrganismRatifierBasicScenario({
      scenario,
      meshRoot: process.env.MESH_ECOLOGY_ROOT
    });
  } else {
    throw new Error(`No lab runner is implemented yet for scenario '${scenario.id}'.`);
  }

  console.log(JSON.stringify({
    ok: result.ok,
    scenarioId: result.scenarioId,
    runRoot: result.layout.runRoot,
    topologyPath: result.layout.topologyPath,
    artifacts: result.artifacts,
    assertions: result.assertions
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
