import b4a from "b4a";
import idEncoding from "hypercore-id-encoding";
import { loadActorDescriptor } from "./load-actor-descriptor.js";
import { createActorRuntime } from "./actor-runtime.js";

function createSingleJobPublisherProjector(config = {}, capture = null) {
  const publishCap = typeof config.publishCap === "string" && config.publishCap
    ? config.publishCap
    : "cap/testbed/organism-basic";
  const attemptToken = config.attemptToken ? idEncoding.decode(config.attemptToken) : null;
  let published = false;

  return async (ctx) => {
    if (published) return;

    for await (const job of ctx.jobs()) {
      const token = attemptToken || b4a.alloc(32, 11);
      published = true;
      const result = await ctx.publish.publishPub({
        cap: publishCap,
        ref: {
          t: "result",
          k: job.key,
          a: token
        }
      });
      capture?.record("actor.publish.pub", {
        role: "org",
        publishCap,
        jobKey: idEncoding.encode(job.key),
        attemptToken: idEncoding.encode(token),
        result
      });
      return;
    }
  };
}

function resolveProjector(descriptor, config, capture) {
  if (descriptor.behavior === "single-job-publisher") {
    return {
      projector: createSingleJobPublisherProjector(config, capture),
      projectorLabel: "single-job-publisher"
    };
  }

  return {
    projector: undefined,
    projectorLabel: descriptor.behavior
  };
}

export async function launchActor({
  actor,
  mesh,
  layout,
  capture,
  swarm,
  discoveryKey,
  getActorStoreRoot
}) {
  const descriptor = loadActorDescriptor(actor.descriptor);
  const storeRoot = getActorStoreRoot(layout, actor.id);
  const store = mesh.ensureCorestore(storeRoot);
  const { projector, projectorLabel } = resolveProjector(descriptor, actor.config || {}, capture);

  const runner = await mesh.createRunner({
    role: descriptor.role,
    corestore: store,
    swarm,
    discoveryKeys: [discoveryKey],
    warmN: actor.config?.warmN ?? 1,
    warmupBudget: actor.config?.warmupBudget ?? { maxTicks: 0, maxMs: 0, minViewReadable: false },
    projector
  });

  capture.record("actor.ready", {
    actorId: actor.id,
    descriptorId: descriptor.id,
    role: descriptor.role,
    behavior: descriptor.behavior,
    storeRoot
  });

  return createActorRuntime({
    actorId: actor.id,
    descriptor,
    runner,
    store,
    storeRoot,
    projectorLabel
  });
}
