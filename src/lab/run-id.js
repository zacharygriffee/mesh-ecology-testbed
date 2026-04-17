import crypto from "node:crypto";

export function createRunId(prefix = "mesh-lab") {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const suffix = crypto.randomBytes(4).toString("hex");
  return `${prefix}-${stamp}-${suffix}`;
}

