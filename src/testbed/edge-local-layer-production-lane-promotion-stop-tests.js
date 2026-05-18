export const TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_TESTS_SCHEMA_VERSION =
  "testbed_edge_local_layer_production_lane_promotion_stop_tests.v1";

export const TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES = Object.freeze({
  READY: "edge_local_layer_production_lane_promotion_stop_tests_ready",
  BLOCKED: "edge_local_layer_production_lane_promotion_stop_tests_blocked",
  MALFORMED: "edge_local_layer_production_lane_promotion_stop_tests_malformed"
});

export const REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES = Object.freeze([
  "append_success_mistaken_for_acceptance",
  "apply_success_mistaken_for_truth",
  "linearization_mistaken_for_truth",
  "replica_visibility_mistaken_for_continuity",
  "lab_success_mistaken_for_readiness",
  "derived_view_mistaken_for_source_continuity",
  "local_path_mistaken_for_canonical_seam",
  "http_or_ssh_mistaken_for_canonical_seam",
  "writer_visibility_mistaken_for_authority",
  "autobase_open_mistaken_for_production_backend",
  "testbed_review_mistaken_for_readiness",
  "causal_review_mistaken_for_truth",
  "edge_state_migration_without_gate",
  "production_lane_promotion_without_spine_decision"
]);

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "") : [];
}

function evaluateStopCase(candidate, stopCase) {
  const flags = isPlainObject(candidate.flags) ? candidate.flags : {};
  const refs = isPlainObject(candidate.refs) ? candidate.refs : {};
  switch (stopCase) {
    case "append_success_mistaken_for_acceptance":
      return flags.appendSuccessIsAcceptance === false;
    case "apply_success_mistaken_for_truth":
      return flags.applySuccessIsTruth === false;
    case "linearization_mistaken_for_truth":
      return flags.linearizationIsTruth === false;
    case "replica_visibility_mistaken_for_continuity":
      return flags.replicaVisibilityIsContinuity === false;
    case "lab_success_mistaken_for_readiness":
      return flags.labSuccessIsProductionReadiness === false;
    case "derived_view_mistaken_for_source_continuity":
      return flags.derivedViewIsSourceContinuity === false;
    case "local_path_mistaken_for_canonical_seam":
      return flags.localPathIsCanonicalContinuitySeam === false && stringArray(refs.localPathRefs).length === 0;
    case "http_or_ssh_mistaken_for_canonical_seam":
      return flags.httpOrSshIsCanonicalContinuitySeam === false && stringArray(refs.httpOrSshRefs).length === 0;
    case "writer_visibility_mistaken_for_authority":
      return flags.writerVisibilityIsAuthority === false && flags.writerAuthorityGranted === false;
    case "autobase_open_mistaken_for_production_backend":
      return flags.autobaseOpenIsProductionBackend === false && flags.productionBackendStarted === false;
    case "testbed_review_mistaken_for_readiness":
      return flags.testbedReviewIsReadiness === false;
    case "causal_review_mistaken_for_truth":
      return flags.causalReviewIsTruth === false;
    case "edge_state_migration_without_gate":
      return flags.edgeStateMigrationAllowed === false && flags.edgeStateMigrated === false;
    case "production_lane_promotion_without_spine_decision":
      return flags.productionLanePromoted === false &&
        flags.spinePromotionDecisionRecorded === false &&
        flags.promotesWithoutSpineDecision === false;
    default:
      return false;
  }
}

export function buildEdgeLocalLayerProductionLanePromotionStopTestReview({
  candidate = null,
  createdAt = new Date().toISOString(),
  reviewId = null
} = {}) {
  if (!isPlainObject(candidate)) {
    return Object.freeze({
      artifactKind: "testbed_edge_local_layer_production_lane_promotion_stop_tests",
      schemaVersion: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_TESTS_SCHEMA_VERSION,
      reviewId: nonEmptyString(reviewId, `testbed-edge-production-lane-promotion-stop-tests:malformed:${createdAt}`),
      createdAt,
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_production_lane_promotion_candidate_missing_or_malformed"]),
      readyForProductionPromotion: false,
      testbedReviewIsReadiness: false,
      causalReviewIsTruth: false
    });
  }

  const requestedCases = stringArray(candidate.stopCases);
  const missingCases = REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES.filter((stopCase) => !requestedCases.includes(stopCase));
  const failedCases = REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES.filter((stopCase) => !evaluateStopCase(candidate, stopCase));
  const reasonCodes = [
    ...missingCases.map((stopCase) => `missing_stop_case:${stopCase}`),
    ...failedCases.map((stopCase) => `failed_stop_case:${stopCase}`)
  ];
  const reviewStatus = reasonCodes.length > 0
    ? TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.BLOCKED
    : TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.READY;

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_production_lane_promotion_stop_tests",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_TESTS_SCHEMA_VERSION,
    reviewId: nonEmptyString(reviewId, `testbed-edge-production-lane-promotion-stop-tests:${nonEmptyString(candidate.candidateId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus,
    candidateId: nonEmptyString(candidate.candidateId),
    sourceBackendLabReviewRef: nonEmptyString(candidate.sourceBackendLabReviewRef),
    stopCasesReviewed: Object.freeze([...REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES]),
    reasonCodes: Object.freeze(reasonCodes.length > 0 ? reasonCodes : ["edge_local_layer_production_lane_promotion_stop_tests_ready"]),
    readyForProductionPromotion: false,
    readyForProductionPromotionPacketReview: reviewStatus === TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.READY,
    testbedReviewIsReadiness: false,
    causalReviewIsTruth: false,
    appendSuccessIsAcceptance: false,
    applySuccessIsTruth: false,
    linearizationIsTruth: false,
    replicaVisibilityIsContinuity: false,
    labSuccessIsReadiness: false,
    derivedViewIsSourceContinuity: false,
    localPathIsCanonicalContinuitySeam: false,
    httpOrSshIsCanonicalContinuitySeam: false,
    writerVisibilityIsAuthority: false,
    autobaseOpenIsProductionBackend: false,
    edgeStateMigrationAllowed: false,
    productionLanePromoted: false,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedStartsProductionBackend: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false
  });
}

export function listEdgeLocalLayerProductionLanePromotionStopCases() {
  return REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES;
}
