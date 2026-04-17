import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(here, "../../fixtures/scenarios");

export function loadScenarioFixtures(dir = fixturesDir) {
  return fs
    .readdirSync(dir)
    .filter((entry) => entry.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b))
    .map((entry) => {
      const raw = fs.readFileSync(path.join(dir, entry), "utf8");
      return JSON.parse(raw);
    });
}

export const scenarios = loadScenarioFixtures();
export const scenariosById = new Map(scenarios.map((item) => [item.id, item]));

