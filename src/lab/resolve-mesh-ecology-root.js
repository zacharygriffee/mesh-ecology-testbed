import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const defaultCandidates = [
  path.resolve(repoRoot, "../mesh-v0-2"),
  path.resolve(repoRoot, "../mesh-ecology")
];

export function resolveMeshEcologyRoot(input = process.env.MESH_ECOLOGY_ROOT) {
  if (input) {
    const explicitRoot = path.resolve(input);
    if (!fs.existsSync(explicitRoot)) {
      throw new Error(`mesh-ecology root not found at ${explicitRoot}`);
    }
    return explicitRoot;
  }

  for (const candidate of defaultCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error(
    `mesh-ecology root not found. Tried: ${defaultCandidates.join(", ")}`
  );
}
