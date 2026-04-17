export async function waitFor(predicate, { tries = 120, delayMs = 25 } = {}) {
  for (let i = 0; i < tries; i += 1) {
    const result = await predicate();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return null;
}

