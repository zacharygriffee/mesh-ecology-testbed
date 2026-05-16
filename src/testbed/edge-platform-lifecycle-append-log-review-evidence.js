export const TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_platform_lifecycle_append_log_review_evidence.v1";

export const TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES = Object.freeze({
  VISIBLE: "edge_platform_lifecycle_append_log_review_visible",
  INCOMPLETE: "edge_platform_lifecycle_append_log_review_incomplete",
  BLOCKED: "edge_platform_lifecycle_append_log_review_blocked",
  MALFORMED: "edge_platform_lifecycle_append_log_review_malformed"
});

const EXPECTED_ARTIFACT_KIND = "edge_platform_lifecycle_append_log_review_view";
const EXPECTED_LINKED_STATE = "platform_lifecycle_append_log_refs_linked";
const WAITING_STATE = "waiting_for_platform_append_log_review";
const MISMATCH_STATE = "platform_lifecycle_append_log_refs_mismatch";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "")
    : [];
}

function allRefs(view) {
  return [
    view?.viewId,
    view?.platformAppendLogReviewStatusRef,
    view?.sourceViewHashRef,
    view?.testbedReviewEvidenceId,
    ...stringArray(view?.platformReceiptRefs),
    ...stringArray(view?.sourceReceiptRefs),
    ...stringArray(view?.appendLogSourceReceiptRefs),
    ...stringArray(view?.matchedReceiptRefs),
    ...stringArray(view?.missingReceiptRefs)
  ].filter((entry) => typeof entry === "string" && entry.trim() !== "");
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function boundaryOverclaimed(view) {
  return view?.readyForPlatformState !== false ||
    view?.readyForPlatformExecution !== false ||
    view?.readyForDeployment !== false ||
    view?.platformOwnsReceiptTruth !== true ||
    view?.platformAppendLogReviewIsEvidenceOnly !== true ||
    view?.edgeRewritesPlatformTruth !== false ||
    view?.platformAuthorityClaimed !== false ||
    view?.edgeAuthorityGranted !== false ||
    view?.durableStateClaimed !== false ||
    view?.replicatedStateClaimed !== false ||
    view?.canonicalHistoryClaimed !== false ||
    view?.causalTruthClaimed !== false ||
    view?.runtimeAuthorityClaimed !== false ||
    view?.operatorMediationStillRequired !== true ||
    view?.callsPlatform !== false ||
    view?.executesAction !== false ||
    view?.mutatesHost !== false ||
    view?.publishesToMesh !== false;
}

function validateEdgePlatformLifecycleAppendLogReview({ reviewView } = {}) {
  const reasonCodes = [];

  if (!isPlainObject(reviewView)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_platform_lifecycle_append_log_review_missing_or_malformed"])
    });
  }

  const sourceReceiptRefs = stringArray(reviewView.sourceReceiptRefs);
  const appendLogSourceReceiptRefs = stringArray(reviewView.appendLogSourceReceiptRefs);
  const matchedReceiptRefs = stringArray(reviewView.matchedReceiptRefs);
  const missingReceiptRefs = stringArray(reviewView.missingReceiptRefs);

  if (reviewView.artifactKind !== EXPECTED_ARTIFACT_KIND) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_artifact_kind_mismatch");
  }
  if (!nonEmptyString(reviewView.viewId)) reasonCodes.push("edge_platform_lifecycle_append_log_review_view_id_missing");
  if (reviewView.operationLevel !== "local_review_artifact") {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_operation_level_mismatch");
  }
  if (reviewView.platformAppendLogLinkState === WAITING_STATE) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_waiting_for_append_log_review");
  } else if (reviewView.platformAppendLogLinkState === MISMATCH_STATE) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_refs_mismatch");
  } else if (reviewView.platformAppendLogLinkState !== EXPECTED_LINKED_STATE) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_link_state_unknown");
  }

  if (reviewView.readyForOperatorReview !== true) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_not_operator_ready");
  }
  if (sourceReceiptRefs.length === 0) reasonCodes.push("edge_platform_lifecycle_append_log_review_source_receipts_missing");
  if (appendLogSourceReceiptRefs.length === 0) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_append_log_receipts_missing");
  }
  if (matchedReceiptRefs.length !== sourceReceiptRefs.length) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_matched_receipts_incomplete");
  }
  if (missingReceiptRefs.length > 0) reasonCodes.push("edge_platform_lifecycle_append_log_review_missing_receipts_present");
  if (!nonEmptyString(reviewView.platformAppendLogReviewStatusRef)) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_status_ref_missing");
  }
  if (!nonEmptyString(reviewView.sourceViewHashRef)) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_view_hash_ref_missing");
  }
  if (!nonEmptyString(reviewView.testbedReviewEvidenceId)) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_testbed_review_ref_missing");
  }
  if (allRefs(reviewView).some(unsafeSeamRef)) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_ref_contains_compat_or_path_seam");
  }
  if (boundaryOverclaimed(reviewView)) {
    reasonCodes.push("edge_platform_lifecycle_append_log_review_boundary_overclaim");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam") ||
    code.includes("missing_receipts_present")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_platform_lifecycle_append_log_review_visible"])
  });
}

export function buildTestbedEdgePlatformLifecycleAppendLogReviewEvidence({
  reviewView = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const validationResult = validateEdgePlatformLifecycleAppendLogReview({ reviewView });
  const sourceReceiptRefs = stringArray(reviewView?.sourceReceiptRefs);
  const matchedReceiptRefs = stringArray(reviewView?.matchedReceiptRefs);
  const missingReceiptRefs = stringArray(reviewView?.missingReceiptRefs);

  return Object.freeze({
    artifactKind: "testbed_edge_platform_lifecycle_append_log_review_evidence",
    schemaVersion: TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(
      evidenceId,
      `testbed-edge-platform-lifecycle-append-log-review:${nonEmptyString(reviewView?.viewId, "unknown")}:${createdAt}`
    ),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(reviewView?.artifactKind),
    sourceViewId: nonEmptyString(reviewView?.viewId),
    sourceOperationLevel: nonEmptyString(reviewView?.operationLevel),
    sourcePlatformAppendLogLinkState: nonEmptyString(reviewView?.platformAppendLogLinkState),
    platformAppendLogReviewStatusRef: nonEmptyString(reviewView?.platformAppendLogReviewStatusRef),
    sourceViewHashRef: nonEmptyString(reviewView?.sourceViewHashRef),
    sourceTestbedReviewEvidenceId: nonEmptyString(reviewView?.testbedReviewEvidenceId),
    sourceReceiptRefCount: sourceReceiptRefs.length,
    matchedReceiptRefCount: matchedReceiptRefs.length,
    missingReceiptRefCount: missingReceiptRefs.length,
    readyForOperatorReview: reviewView?.readyForOperatorReview === true,
    readyForPlatformState: reviewView?.readyForPlatformState === true,
    readyForPlatformExecution: reviewView?.readyForPlatformExecution === true,
    readyForDeployment: reviewView?.readyForDeployment === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledEdge: false,
    testbedCalledPlatform: false,
    testbedReplayedAppendLog: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    platformAuthorityClaimed: false,
    edgeAuthorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    canonicalHistoryClaimed: false,
    runtimeAuthorityClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    sourcePlatformAuthorityClaimed: reviewView?.platformAuthorityClaimed === true,
    sourceEdgeAuthorityGranted: reviewView?.edgeAuthorityGranted === true,
    sourceDurableStateClaimed: reviewView?.durableStateClaimed === true,
    sourceReplicatedStateClaimed: reviewView?.replicatedStateClaimed === true,
    sourceCanonicalHistoryClaimed: reviewView?.canonicalHistoryClaimed === true,
    sourceCausalTruthClaimed: reviewView?.causalTruthClaimed === true,
    sourceRuntimeAuthorityClaimed: reviewView?.runtimeAuthorityClaimed === true,
    sourceCallsPlatform: reviewView?.callsPlatform === true,
    sourceExecutesAction: reviewView?.executesAction === true,
    sourceMutatesHost: reviewView?.mutatesHost === true,
    sourcePublishesToMesh: reviewView?.publishesToMesh === true
  });
}

export function listTestbedEdgePlatformLifecycleAppendLogReviewStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_PLATFORM_LIFECYCLE_APPEND_LOG_REVIEW_STATUSES));
}
