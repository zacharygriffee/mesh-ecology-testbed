import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgePlatformLifecycleAppendLogReviewEvidence,
  listTestbedEdgePlatformLifecycleAppendLogReviewStatuses,
  TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES
} from "../src/testbed/edge-platform-lifecycle-append-log-review-evidence.js";

const CREATED_AT = "2026-05-16T20:35:00.000Z";

function validReviewView() {
  return {
    artifactKind: "edge_platform_lifecycle_append_log_review_view",
    viewId: "edge-platform-lifecycle-append-log-review:fixture",
    operationLevel: "local_review_artifact",
    createdAt: "2026-05-16T20:34:00.000Z",
    platformAppendLogLinkState: "platform_lifecycle_append_log_refs_linked",
    receiptImportCount: 1,
    importedReceiptCount: 1,
    platformReceiptRefs: ["platform-receipt:install-fixture"],
    sourceReceiptRefs: ["platform-receipt:install-fixture"],
    appendLogSourceReceiptRefs: ["platform-receipt:install-fixture"],
    matchedReceiptRefs: ["platform-receipt:install-fixture"],
    missingReceiptRefs: [],
    platformAppendLogReviewStatusRef: "edge-platform-append-log-causal-review-status:fixture",
    platformAppendLogReviewState: "platform_append_log_review_available",
    platformAppendLogReadyForOperatorReview: true,
    causalArtifactId: "causal-append-log-happening-map:fixture",
    sourceViewHashRef: "sha256:platform-append-log-view-fixture",
    testbedReviewEvidenceId: "testbed-platform-append-log-happening:fixture",
    readyForOperatorReview: true,
    readyForPlatformState: false,
    readyForPlatformExecution: false,
    readyForDeployment: false,
    platformOwnsReceiptTruth: true,
    platformAppendLogReviewIsEvidenceOnly: true,
    edgeRewritesPlatformTruth: false,
    platformAuthorityClaimed: false,
    edgeAuthorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    canonicalHistoryClaimed: false,
    causalTruthClaimed: false,
    runtimeAuthorityClaimed: false,
    operatorMediationStillRequired: true,
    callsPlatform: false,
    executesAction: false,
    mutatesHost: false,
    publishesToMesh: false
  };
}

function build(reviewView = validReviewView()) {
  return buildTestbedEdgePlatformLifecycleAppendLogReviewEvidence({
    reviewView,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedCalledEdge, false);
  assert.equal(evidence.testbedCalledPlatform, false);
  assert.equal(evidence.testbedReplayedAppendLog, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.testbedAcceptsCanonicalHistory, false);
  assert.equal(evidence.testbedClaimsCausalTruth, false);
  assert.equal(evidence.platformAuthorityClaimed, false);
  assert.equal(evidence.edgeAuthorityGranted, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.canonicalHistoryClaimed, false);
  assert.equal(evidence.runtimeAuthorityClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
}

test("Edge Platform lifecycle append-log review view is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_platform_lifecycle_append_log_review_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["edge_platform_lifecycle_append_log_review_visible"]);
  assert.equal(evidence.sourceArtifactKind, "edge_platform_lifecycle_append_log_review_view");
  assert.equal(evidence.sourceViewId, "edge-platform-lifecycle-append-log-review:fixture");
  assert.equal(evidence.sourcePlatformAppendLogLinkState, "platform_lifecycle_append_log_refs_linked");
  assert.equal(evidence.sourceReceiptRefCount, 1);
  assert.equal(evidence.matchedReceiptRefCount, 1);
  assert.equal(evidence.missingReceiptRefCount, 0);
  assert.equal(evidence.readyForOperatorReview, true);
  assert.equal(evidence.readyForPlatformState, false);
  assert.equal(evidence.readyForPlatformExecution, false);
  assert.equal(evidence.readyForDeployment, false);
  assertPassiveEvidence(evidence);
});

test("Edge Platform lifecycle append-log review blocks source authority and backend overclaims", () => {
  const view = validReviewView();
  view.platformAuthorityClaimed = true;
  view.durableStateClaimed = true;
  view.callsPlatform = true;

  const evidence = build(view);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_boundary_overclaim"), true);
  assert.equal(evidence.sourcePlatformAuthorityClaimed, true);
  assert.equal(evidence.sourceDurableStateClaimed, true);
  assert.equal(evidence.sourceCallsPlatform, true);
  assertPassiveEvidence(evidence);
});

test("Edge Platform lifecycle append-log review blocks mismatch and unsafe seam refs", () => {
  const view = validReviewView();
  view.platformAppendLogLinkState = "platform_lifecycle_append_log_refs_mismatch";
  view.readyForOperatorReview = false;
  view.missingReceiptRefs = ["http://127.0.0.1/platform-receipt"];

  const evidence = build(view);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_refs_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_missing_receipts_present"), true);
  assert.equal(evidence.missingReceiptRefCount, 1);
  assertPassiveEvidence(evidence);
});

test("Edge Platform lifecycle append-log review reports waiting and missing refs as incomplete", () => {
  const view = validReviewView();
  view.platformAppendLogLinkState = "waiting_for_platform_append_log_review";
  view.readyForOperatorReview = false;
  view.appendLogSourceReceiptRefs = [];
  view.matchedReceiptRefs = [];
  view.platformAppendLogReviewStatusRef = null;
  view.sourceViewHashRef = null;
  view.testbedReviewEvidenceId = null;

  const evidence = build(view);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_waiting_for_append_log_review"), true);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_append_log_receipts_missing"), true);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_status_ref_missing"), true);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_view_hash_ref_missing"), true);
  assert.equal(evidence.reasonCodes.includes("edge_platform_lifecycle_append_log_review_testbed_review_ref_missing"), true);
  assertPassiveEvidence(evidence);
});

test("Edge Platform lifecycle append-log review handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedEdgePlatformLifecycleAppendLogReviewEvidence({
    reviewView: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["edge_platform_lifecycle_append_log_review_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedEdgePlatformLifecycleAppendLogReviewStatuses(), [
    "edge_platform_lifecycle_append_log_review_visible",
    "edge_platform_lifecycle_append_log_review_incomplete",
    "edge_platform_lifecycle_append_log_review_blocked",
    "edge_platform_lifecycle_append_log_review_malformed"
  ]);
});
