import test from "node:test";
import assert from "node:assert/strict";

import {
  buildEdgeLocalLayerProductionLanePromotionStopTestReview,
  listEdgeLocalLayerProductionLanePromotionStopCases,
  REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES,
  TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES
} from "../src/testbed/edge-local-layer-production-lane-promotion-stop-tests.js";

const CREATED_AT = "2026-05-17T23:40:00.000Z";

function safeCandidate(overrides = {}) {
  return {
    candidateId: "edge-production-lane-promotion-stop-candidate:fixture",
    sourceBackendLabReviewRef: "edge-local-layer-disposable-production-shaped-backend-lab-review-status:fixture",
    stopCases: [...REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES],
    refs: {
      localPathRefs: [],
      httpOrSshRefs: []
    },
    flags: {
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      linearizationIsTruth: false,
      replicaVisibilityIsContinuity: false,
      labSuccessIsProductionReadiness: false,
      derivedViewIsSourceContinuity: false,
      localPathIsCanonicalContinuitySeam: false,
      httpOrSshIsCanonicalContinuitySeam: false,
      writerVisibilityIsAuthority: false,
      writerAuthorityGranted: false,
      autobaseOpenIsProductionBackend: false,
      productionBackendStarted: false,
      testbedReviewIsReadiness: false,
      causalReviewIsTruth: false,
      edgeStateMigrationAllowed: false,
      edgeStateMigrated: false,
      productionLanePromoted: false,
      spinePromotionDecisionRecorded: false,
      promotesWithoutSpineDecision: false
    },
    ...overrides
  };
}

test("production lane promotion stop tests declare every required fail-closed case", () => {
  const review = buildEdgeLocalLayerProductionLanePromotionStopTestReview({
    candidate: safeCandidate(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_production_lane_promotion_stop_tests");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.READY);
  assert.deepEqual(review.stopCasesReviewed, REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES);
  assert.equal(review.readyForProductionPromotion, false);
  assert.equal(review.readyForProductionPromotionPacketReview, true);
  assert.equal(review.appendSuccessIsAcceptance, false);
  assert.equal(review.applySuccessIsTruth, false);
  assert.equal(review.linearizationIsTruth, false);
  assert.equal(review.replicaVisibilityIsContinuity, false);
  assert.equal(review.labSuccessIsReadiness, false);
  assert.equal(review.derivedViewIsSourceContinuity, false);
  assert.equal(review.localPathIsCanonicalContinuitySeam, false);
  assert.equal(review.httpOrSshIsCanonicalContinuitySeam, false);
  assert.equal(review.writerVisibilityIsAuthority, false);
  assert.equal(review.autobaseOpenIsProductionBackend, false);
  assert.equal(review.edgeStateMigrationAllowed, false);
  assert.equal(review.productionLanePromoted, false);
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedStartsProductionBackend, false);
});

test("production lane promotion stop tests block append apply linearization replica and lab readiness overclaims", () => {
  const candidate = safeCandidate();
  candidate.flags.appendSuccessIsAcceptance = true;
  candidate.flags.applySuccessIsTruth = true;
  candidate.flags.linearizationIsTruth = true;
  candidate.flags.replicaVisibilityIsContinuity = true;
  candidate.flags.labSuccessIsProductionReadiness = true;
  const review = buildEdgeLocalLayerProductionLanePromotionStopTestReview({
    candidate,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("failed_stop_case:append_success_mistaken_for_acceptance"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:apply_success_mistaken_for_truth"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:linearization_mistaken_for_truth"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:replica_visibility_mistaken_for_continuity"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:lab_success_mistaken_for_readiness"), true);
});

test("production lane promotion stop tests block view seam writer backend and state drift", () => {
  const candidate = safeCandidate();
  candidate.flags.derivedViewIsSourceContinuity = true;
  candidate.flags.localPathIsCanonicalContinuitySeam = true;
  candidate.refs.localPathRefs = ["/tmp/edge-state"];
  candidate.flags.httpOrSshIsCanonicalContinuitySeam = true;
  candidate.refs.httpOrSshRefs = ["http://127.0.0.1:8787"];
  candidate.flags.writerVisibilityIsAuthority = true;
  candidate.flags.writerAuthorityGranted = true;
  candidate.flags.autobaseOpenIsProductionBackend = true;
  candidate.flags.productionBackendStarted = true;
  candidate.flags.edgeStateMigrationAllowed = true;
  candidate.flags.productionLanePromoted = true;
  candidate.flags.promotesWithoutSpineDecision = true;
  const review = buildEdgeLocalLayerProductionLanePromotionStopTestReview({
    candidate,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("failed_stop_case:derived_view_mistaken_for_source_continuity"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:local_path_mistaken_for_canonical_seam"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:http_or_ssh_mistaken_for_canonical_seam"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:writer_visibility_mistaken_for_authority"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:autobase_open_mistaken_for_production_backend"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:edge_state_migration_without_gate"), true);
  assert.equal(review.reasonCodes.includes("failed_stop_case:production_lane_promotion_without_spine_decision"), true);
});

test("production lane promotion stop tests block missing stop cases and malformed input", () => {
  const missing = buildEdgeLocalLayerProductionLanePromotionStopTestReview({
    candidate: safeCandidate({ stopCases: ["append_success_mistaken_for_acceptance"] }),
    createdAt: CREATED_AT
  });
  const malformed = buildEdgeLocalLayerProductionLanePromotionStopTestReview({
    candidate: null,
    createdAt: CREATED_AT
  });

  assert.equal(missing.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.BLOCKED);
  assert.equal(missing.reasonCodes.some((code) => code.startsWith("missing_stop_case:")), true);
  assert.equal(malformed.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_LANE_PROMOTION_STOP_STATUSES.MALFORMED);
  assert.deepEqual(listEdgeLocalLayerProductionLanePromotionStopCases(), REQUIRED_PRODUCTION_LANE_PROMOTION_STOP_CASES);
});
