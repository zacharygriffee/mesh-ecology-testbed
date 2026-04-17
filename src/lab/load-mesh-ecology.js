import path from "node:path";
import { pathToFileURL } from "node:url";
import { resolveMeshEcologyRoot } from "./resolve-mesh-ecology-root.js";

async function importModule(filePath) {
  return import(pathToFileURL(filePath).href);
}

export async function loadMeshEcology(meshRootInput) {
  const meshRoot = resolveMeshEcologyRoot(meshRootInput);

  const [
    corestoreMod,
    discoveryMod,
    concernMod,
    sdkCoreMod,
    sdkPlatformMod
  ] = await Promise.all([
    importModule(path.join(meshRoot, "src/ensureCorestore.js")),
    importModule(path.join(meshRoot, "src/discovery.js")),
    importModule(path.join(meshRoot, "src/concern.js")),
    importModule(path.join(meshRoot, "packages/mesh-sdk/src/core/createMeshClientCore.js")),
    importModule(path.join(meshRoot, "packages/mesh-sdk/src/platform/node/index.js"))
  ]);

  function createMeshClient(config = {}) {
    const platform = sdkPlatformMod.createNodePlatform();
    const originalLoadMeshRuntime = platform.loadMeshRuntime;

    return sdkCoreMod.createMeshClientCore(
      {
        ...platform,
        async loadMeshRuntime() {
          const runtime = await originalLoadMeshRuntime();
          return {
            ...runtime,
            ensureCorestore(storeRoot) {
              const store = runtime.ensureCorestore(storeRoot);
              store.ready = async () => {};
              return store;
            }
          };
        }
      },
      config
    );
  }

  return {
    meshRoot,
    ensureCorestore: corestoreMod.ensureCorestore,
    ensureDiscoverySurface: discoveryMod.ensureDiscoverySurface,
    addConcern: discoveryMod.addConcern,
    addDiscoveryWriter: discoveryMod.addWriter,
    ensureConcernSurface: concernMod.ensureConcernSurface,
    createJob: concernMod.createJob,
    publishJobWork: concernMod.publishJobWork,
    createMeshClient
  };
}
