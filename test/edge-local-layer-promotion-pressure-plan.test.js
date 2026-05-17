import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const planPath = join(process.cwd(), "docs", "edge-local-layer-promotion-pressure-plan.md");
const plan = readFileSync(planPath, "utf8");
const normalizedPlan = plan.replace(/\s+/g, " ");

test("Edge local-layer promotion pressure plan covers required failure cases", () => {
  for (const phrase of [
    "missing source refs",
    "missing causal refs",
    "missing writer refs",
    "missing reader policy",
    "reader without key/proof",
    "append success mistaken for acceptance",
    "replica visibility mistaken for continuity",
    "review status mistaken for authority",
    "HTTP/SSH/local path ref used as seam",
    "wall-clock order used as causal order",
    "imported JSON treated as substrate",
    "causal review treated as truth",
    "Testbed review treated as readiness",
    "Platform append-log join treated as deployment authority"
  ]) {
    assert.match(normalizedPlan, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Edge local-layer promotion pressure plan keeps Testbed review-only", () => {
  for (const phrase of [
    "projection event selected",
    "storage/backend promotion still blocked",
    "does not run Edge",
    "open Edge storage",
    "open Autobase",
    "open Corestore",
    "no production Autobase backend",
    "no treating Causal review as truth",
    "no treating Testbed review as readiness",
    "no treating replica visibility as continuity",
    "no treating append success as acceptance"
  ]) {
    assert.match(normalizedPlan, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
