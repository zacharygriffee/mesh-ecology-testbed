export async function closeSwarm(swarm) {
  if (!swarm) return;
  if (swarm.connections && typeof swarm.connections.values === "function") {
    for (const conn of swarm.connections.values()) {
      conn?.destroy?.();
      conn?.socket?.destroy?.();
    }
  }
  await swarm.close?.().catch(() => {});
  swarm.destroy?.();
}

export async function safeFlush(swarm, ms = 50) {
  if (!swarm?.flush) return;
  await Promise.race([swarm.flush(), new Promise((resolve) => setTimeout(resolve, ms))]);
}

export async function flushAll(...swarms) {
  for (const swarm of swarms) {
    await safeFlush(swarm);
  }
}

