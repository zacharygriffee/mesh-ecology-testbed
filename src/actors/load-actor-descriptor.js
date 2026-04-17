import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateActorDescriptor } from "./descriptor-schema.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const actorsRoot = path.join(repoRoot, "fixtures", "actors");

export function loadActorDescriptor(id) {
  const filePath = path.join(actorsRoot, `${id}.json`);
  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return validateActorDescriptor(raw);
}

