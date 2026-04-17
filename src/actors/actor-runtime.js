export function createActorRuntime({
  actorId,
  descriptor,
  runner,
  store,
  storeRoot,
  projectorLabel
}) {
  let tickCount = 0;
  let stopLoop = null;

  async function tick() {
    tickCount += 1;
    return runner.tick();
  }

  function start(intervalMs = 50) {
    if (stopLoop) return stopLoop;
    const timer = setInterval(() => {
      void tick();
    }, intervalMs);
    stopLoop = () => {
      clearInterval(timer);
      stopLoop = null;
    };
    return stopLoop;
  }

  async function close() {
    stopLoop?.();
    await runner.close();
    await store.close?.().catch(() => {});
  }

  function snapshot() {
    return {
      actorId,
      role: descriptor.role,
      classification: descriptor.classification,
      behavior: descriptor.behavior,
      storeRoot,
      projectorLabel,
      tickCount,
      status: runner.getStatus()
    };
  }

  return {
    actorId,
    descriptor,
    tick,
    start,
    close,
    snapshot
  };
}

