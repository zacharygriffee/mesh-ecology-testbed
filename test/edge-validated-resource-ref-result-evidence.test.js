import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeValidatedResourceRefResultEvidence,
  listTestbedEdgeValidatedResourceRefResultEvidenceStatuses,
  TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES
} from "../src/testbed/edge-validated-resource-ref-result-evidence.js";

const CREATED_AT = "2026-05-19T21:00:00.000Z";

function validCausalEvidence() {
  return {
    artifactKind: "causal-edge-validated-resource-ref-result-evidence",
    schema: "causal-substrate/edge-validated-resource-ref-result-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-validated-resource-ref-result-evidence:fixture",
    emittedAt: "2026-05-19T20:00:00.000Z",
    sourceValidationRef: "edge-resource-evidence-validation:fixture",
    sourceResourceRef: "bytes-resource:handoff-result:fixture",
    sourcePointerRef: "bytes_external_resource_pointer:fixture",
    sourceResolutionReceiptRef: "bytes-resource-resolution-receipt:fixture",
    sourceResultEvidenceRef: "edge-operator-mediated-result-evidence:fixture",
    sourceHandoffRef: "edge-operator-mediated-handoff:fixture",
    sourceWorkPacketRef: "edge-cross-project-work-packet:fixture",
    targetRef: "repo-worker-seat:codex",
    interpretation: {
      interpretationKind: "observer-relative-validated-resource-ref-result-evidence",
      validationIsReviewOnly: true,
      resultEvidenceIsExternalOnly: true,
      payloadTruthClaimed: false,
      successInferred: false,
      approvalInferred: false,
      acceptedContinuity: false,
      resultReceiptContinuity: false,
      bytesAuthority: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      callsEdge: false,
      fetchesPayload: false,
      parsesPayload: false,
      executesWork: false,
      acceptsContinuity: false,
      grantsAuthority: false,
      grantsApproval: false,
      claimsCausalTruth: false,
      claimsReadiness: false
    },
    validation: {
      status: "edge-validated-resource-ref-result-evidence-complete",
      validationArtifactPresent: true,
      resultEvidencePresent: true,
      requiredRefsPresent: true,
      externalEvidencePosturePreserved: true,
      unsafeClaimsBlocked: true,
      unsafeSeamRefsBlocked: true,
      issues: []
    },
    reviewStatus: "edge-validated-resource-ref-result-evidence-emitted",
    warnings: [
      "validated-resource-ref-evidence-observed",
      "operator-mediated-result-evidence-observed",
      "payload-not-fetched-or-parsed",
      "success-approval-and-continuity-not-inferred"
    ],
    rejections: []
  };
}

function build(evidenceArtifact = validCausalEvidence()) {
  return buildTestbedEdgeValidatedResourceRefResultEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

test("validated resource-ref result evidence remains review-only Testbed pressure", () => {
  const review = build();

  assert.equal(review.artifactKind, "testbed_edge_validated_resource_ref_result_evidence");
  assert.equal(review.schemaVersion, TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_SCHEMA_VERSION);
  assert.equal(review.reviewStatus, TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.VISIBLE);
  assert.deepEqual(review.reasonCodes, ["edge_validated_resource_ref_result_evidence_visible"]);
  assert.equal(review.sourceArtifactKind, "causal-edge-validated-resource-ref-result-evidence");
  assert.equal(review.sourceReviewStatus, "edge-validated-resource-ref-result-evidence-emitted");
  assert.equal(review.sourceValidationRef, "edge-resource-evidence-validation:fixture");
  assert.equal(review.sourceResourceRef, "bytes-resource:handoff-result:fixture");
  assert.equal(review.sourcePointerRef, "bytes_external_resource_pointer:fixture");
  assert.equal(review.sourceResolutionReceiptRef, "bytes-resource-resolution-receipt:fixture");
  assert.equal(review.sourceResultEvidenceRef, "edge-operator-mediated-result-evidence:fixture");
  assert.equal(review.resultEvidencePresent, true);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
  assert.equal(review.testbedExecutedEdge, false);
  assert.equal(review.testbedCalledEdge, false);
  assert.equal(review.testbedFetchedPayload, false);
  assert.equal(review.testbedParsedPayload, false);
  assert.equal(review.testbedCreatedResultReceiptContinuity, false);
  assert.equal(review.testbedAcceptedContinuity, false);
  assert.equal(review.causalReviewIsTruth, false);
  assert.equal(review.testbedReviewIsReadiness, false);
  assert.equal(review.bytesPointerIsAuthority, false);
  assert.equal(review.resultEvidenceIsExternalOnly, true);
});

test("validated resource-ref evidence can be pressured before result evidence exists", () => {
  const evidence = validCausalEvidence();
  evidence.sourceResultEvidenceRef = null;
  evidence.validation.resultEvidencePresent = false;

  const review = build(evidence);

  assert.equal(review.reviewStatus, TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.VISIBLE);
  assert.equal(review.sourceResultEvidenceRef, null);
  assert.equal(review.resultEvidencePresent, false);
  assert.equal(review.testbedCreatedResultReceiptContinuity, false);
});

test("payload parsing success approval and continuity overclaims fail closed", () => {
  const evidence = validCausalEvidence();
  evidence.boundary.parsesPayload = true;
  evidence.interpretation.successInferred = true;
  evidence.interpretation.resultReceiptContinuity = true;
  evidence.validation.unsafeClaimsBlocked = false;
  evidence.validation.issues = ["unsafe-authority-truth-success-approval-or-continuity-claim"];

  const review = build(evidence);

  assert.equal(review.reviewStatus, TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_validated_resource_ref_result_evidence_boundary_overclaim"), true);
  assert.equal(review.reasonCodes.includes("edge_validated_resource_ref_result_evidence_interpretation_overclaim"), true);
  assert.equal(review.reasonCodes.includes("edge_validated_resource_ref_result_evidence_causal_validation_blocked"), true);
});

test("unsafe refs fail closed and do not make Bytes authority", () => {
  const evidence = validCausalEvidence();
  evidence.sourcePointerRef = "http://127.0.0.1/pointer.json";
  evidence.sourceResolutionReceiptRef = null;

  const review = build(evidence);

  assert.equal(review.reviewStatus, TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_validated_resource_ref_result_evidence_resolution_receipt_ref_missing"), true);
  assert.equal(review.reasonCodes.includes("edge_validated_resource_ref_result_evidence_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.bytesPointerIsAuthority, false);
  assert.equal(review.validationIsAcceptedContinuity, false);
});

test("malformed input reports bounded statuses", () => {
  const malformed = build(null);

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["edge_validated_resource_ref_result_evidence_missing_or_malformed"]);
  assert.deepEqual(listTestbedEdgeValidatedResourceRefResultEvidenceStatuses(), [
    "edge_validated_resource_ref_result_evidence_visible",
    "edge_validated_resource_ref_result_evidence_blocked",
    "edge_validated_resource_ref_result_evidence_incomplete",
    "edge_validated_resource_ref_result_evidence_malformed"
  ]);
});
