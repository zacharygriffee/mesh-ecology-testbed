import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRunId } from "./run-id.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

export function getLabRoot() {
  return path.join(repoRoot, ".lab");
}

export function createRunLayout({ scenarioId, runId = createRunId(scenarioId) } = {}) {
  const labRoot = getLabRoot();
  const runsRoot = path.join(labRoot, "runs");
  const runRoot = path.join(runsRoot, runId);

  const layout = {
    labRoot,
    runsRoot,
    runId,
    runRoot,
    topologyPath: path.join(runRoot, "topology.json"),
    artifactsDir: path.join(runRoot, "artifacts"),
    logsDir: path.join(runRoot, "logs"),
    storesDir: path.join(runRoot, "stores"),
    stores: {
      discovery: path.join(runRoot, "stores", "discovery"),
      concernHost: path.join(runRoot, "stores", "concern-host"),
      observer: path.join(runRoot, "stores", "observer")
    }
  };

  fs.mkdirSync(layout.artifactsDir, { recursive: true });
  fs.mkdirSync(layout.logsDir, { recursive: true });
  fs.mkdirSync(layout.stores.discovery, { recursive: true });
  fs.mkdirSync(layout.stores.concernHost, { recursive: true });
  fs.mkdirSync(layout.stores.observer, { recursive: true });

  return layout;
}

export function removeRunRoot(runRoot) {
  fs.rmSync(runRoot, { recursive: true, force: true });
}

export function getActorStoreRoot(layout, actorId) {
  return path.join(layout.storesDir, actorId);
}
