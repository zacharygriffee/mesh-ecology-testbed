import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const scenariosRoot = path.join(repoRoot, "fixtures", "scenarios");

export function loadScenarioByPath(inputPath) {
  const resolved = path.resolve(inputPath);
  return JSON.parse(fs.readFileSync(resolved, "utf8"));
}

export function resolveScenarioPath(id) {
  const candidates = [
    path.join(scenariosRoot, `${id}.json`),
    path.join(scenariosRoot, "mesh", `${id}.json`)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error(`Scenario '${id}' was not found in fixtures/scenarios.`);
}

export function loadScenarioById(id) {
  return loadScenarioByPath(resolveScenarioPath(id));
}

