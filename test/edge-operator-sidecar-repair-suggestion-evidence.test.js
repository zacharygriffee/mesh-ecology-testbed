import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeOperatorSidecarRepairSuggestionEvidence,
  listTestbedEdgeOperatorSidecarRepairSuggestionStatuses,
  TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES
} from "../src/testbed/edge-operator-sidecar-repair-suggestion-evidence.js";

const CREATED_AT = "2026-05-19T15:30:00.000Z";

function validCausalEvidence() {
  return {
    artifactKind: "causal-edge-operator-sidecar-repair-suggestion-evidence",
    schema: "causal-substrate/edge-operator-sidecar-repair-suggestion-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-operator-sidecar-repair-suggestion-evidence:fixture",
    emittedAt: "2026-05-19T15:29:00.000Z",
    sourceSuggestionRef: "edge-operator-sidecar-repair-suggestion:fixture",
    sourceFailureRef: "edge-self-work-patch-executor-receipt:fixture:failed",
    sourceWorkPacketRef: "edge-cross-project-work-packet:fixture",
    sourceOperatorDecisionRef: "edge-operator-decision:fixture",
    sourceAgentRunRef: "agent-run:codex:fixture",
    failureKind: "patch_context_mismatch",
    sameScope: true,
    scopeChanged: false,
    requiresOperatorApproval: true,
    targetRefs: ["repo:mesh-ecology-edge"],
    proposedRepairRefs: ["edge-self-work-patch-proposal:fixture:repair"],
    preservedEvidenceRefs: ["edge-self-work-patch-executor-receipt:fixture:failed"],
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      callsEdge: false,
      executesWork: false,
      writesContinuityRecords: false,
      acceptsContinuity: false,
      grantsAuthority: false,
      grantsApproval: false,
      claimsCausalTruth: false,
      claimsReadiness: false,
      startsBackend: false
    },
    validation: {
      status: "edge-operator-sidecar-repair-suggestion-complete",
      parseableObject: true,
      requiredRefsPresent: true,
      repairRefsPresent: true,
      preservedFailureEvidencePresent: true,
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true,
      issues: []
    },
    reviewStatus: "edge-operator-sidecar-repair-suggestion-evidence-emitted",
    warnings: ["sidecar-suggestion-preserved-as-review-evidence-only"],
    rejections: []
  };
}

function build(evidenceArtifact = validCausalEvidence()) {
  return buildTestbedEdgeOperatorSidecarRepairSuggestionEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

test("sidecar repair suggestion evidence remains review-only Testbed pressure", () => {
  const review = build();

  assert.equal(review.artifactKind, "testbed_edge_operator_sidecar_repair_suggestion_evidence");
  assert.equal(review.schemaVersion, TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_EVIDENCE_SCHEMA_VERSION);
  assert.equal(review.reviewStatus, TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.VISIBLE);
  assert.deepEqual(review.reasonCodes, ["sidecar_repair_suggestion_visible"]);
  assert.equal(review.sourceArtifactKind, "causal-edge-operator-sidecar-repair-suggestion-evidence");
  assert.equal(review.sourceReviewStatus, "edge-operator-sidecar-repair-suggestion-evidence-emitted");
  assert.equal(review.sourceSuggestionRef, "edge-operator-sidecar-repair-suggestion:fixture");
  assert.equal(review.requiresOperatorApproval, true);
  assert.equal(review.proposedRepairRefCount, 1);
  assert.equal(review.preservedEvidenceRefCount, 1);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
  assert.equal(review.testbedExecutedEdge, false);
  assert.equal(review.testbedCalledEdge, false);
  assert.equal(review.testbedMutatedEdge, false);
  assert.equal(review.causalReviewIsTruth, false);
  assert.equal(review.testbedReviewIsReadiness, false);
  assert.equal(review.sidecarSuggestionIsApproval, false);
  assert.equal(review.sidecarSuggestionIsExecution, false);
  assert.equal(review.sidecarSuggestionIsAuthority, false);
  assert.equal(review.sidecarSuggestionIsAcceptedContinuity, false);
});

test("sidecar repair suggestion evidence blocks causal truth and authority overclaims", () => {
  const evidence = validCausalEvidence();
  evidence.boundary.grantsAuthority = true;
  evidence.validation.unsafeClaimsBlocked = false;
  evidence.validation.issues = ["approval-execution-authority-truth-or-continuity-claim"];

  const review = build(evidence);

  assert.equal(review.reviewStatus, TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("sidecar_repair_suggestion_boundary_overclaim"), true);
  assert.equal(review.reasonCodes.includes("sidecar_repair_suggestion_causal_validation_blocked"), true);
});

test("sidecar repair suggestion evidence blocks unsafe refs and incomplete repair posture", () => {
  const evidence = validCausalEvidence();
  evidence.proposedRepairRefs = ["http://127.0.0.1/repair.json"];
  evidence.requiresOperatorApproval = false;

  const review = build(evidence);

  assert.equal(review.reviewStatus, TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("sidecar_repair_suggestion_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("sidecar_repair_suggestion_operator_approval_posture_missing"), true);
});

test("sidecar repair suggestion evidence reports malformed inputs and bounded statuses", () => {
  const malformed = build(null);

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["sidecar_repair_suggestion_missing_or_malformed"]);
  assert.deepEqual(listTestbedEdgeOperatorSidecarRepairSuggestionStatuses(), [
    "sidecar_repair_suggestion_visible",
    "sidecar_repair_suggestion_blocked",
    "sidecar_repair_suggestion_incomplete",
    "sidecar_repair_suggestion_malformed"
  ]);
});
