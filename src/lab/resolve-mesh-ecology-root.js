import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const defaultRoot = path.resolve(repoRoot, "../mesh-ecology");

export function resolveMeshEcologyRoot(input = process.env.MESH_ECOLOGY_ROOT) {
  const meshRoot = path.resolve(input || defaultRoot);
  if (!fs.existsSync(meshRoot)) {
    throw new Error(`mesh-ecology root not found at ${meshRoot}`);
  }
  return meshRoot;
}

