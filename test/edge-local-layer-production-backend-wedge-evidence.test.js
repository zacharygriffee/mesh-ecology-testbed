import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerProductionBackendWedgeEvidence,
  listTestbedEdgeLocalLayerProductionBackendWedgeStatuses,
  TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES
} from "../src/testbed/edge-local-layer-production-backend-wedge-evidence.js";

const CREATED_AT = "2026-05-17T22:20:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-production-backend-wedge-evidence",
    schema: "causal-substrate/edge-local-layer-production-backend-wedge-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-production-backend-wedge-evidence:fixture",
    reviewStatus: "edge-local-layer-production-backend-wedge-evidence-emitted",
    refs: {
      wedgeId: "edge-local-layer-production-backend-wedge:aaaaaaaaaaaaaaaaaaaaaaaa",
      wedgeHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      sourceOperatorPromotionDecisionRef: "edge-local-layer-operator-recorded-promotion-decision:bbbbbbbbbbbbbbbbbbbbbbbb",
      sourceWriterAdmissionPacketRef: "edge-local-layer-writer-admission-v0:cccccccccccccccccccccccc",
      sourceLayerRef: "local-layer:operator-owned-devices",
      sourceLaneRef: "local-layer-continuity-lane:operator-owned-devices-lab",
      sourceRefs: [
        "edge-local-layer-operator-recorded-promotion-decision:bbbbbbbbbbbbbbbbbbbbbbbb",
        "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "operator-decision:record-local-layer-promotion-fields",
        "operator-recorded-promotion-decision:record-local-layer-promotion-fields",
        "edge-local-layer-writer-admission-v0:cccccccccccccccccccccccc",
        "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
        "edge-continuity-lane-autobase-lab-review-chain:fixture",
        "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa"
      ],
      nextGate: "disposable_production_shaped_backend_lab",
      finalGate: "production_local_layer_lane_promotion_decision"
    },
    labAuthorization: {
      authorizesDisposableProductionShapedBackendLab: true,
      authorizesProductionBackend: false,
      authorizesProductionLanePromotion: false,
      authorizesEdgeStateMigration: false,
      requiresDisposableStorageRoot: true,
      requiresNoLocalPathAsContinuitySeam: true,
      requiresNoHttpOrSshSeam: true,
      requiresNoWriterAuthorityGrant: true
    },
    backendWedge: {
      backendKind: "autobase",
      namespaceRef: "corestore-namespace:local-layer-continuity-production-shaped-lab",
      laneRef: "local-layer-continuity-lane:operator-owned-devices-production-shaped-lab",
      productionBackendStarted: false,
      productionLanePromoted: false,
      edgeStateMigrationAllowed: false
    },
    acceptanceRule: {
      ruleKind: "production_backend_wedge_authorizes_disposable_lab_only",
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      labSuccessIsProductionReadiness: false,
      wedgePacketIsProductionPromotion: false,
      requiresSeparateProductionPromotionGate: true
    },
    implementationRoute: {
      currentStage: "production_backend_wedge",
      nextImplementationGate: "disposable_production_shaped_backend_lab",
      disposableLabAuthorized: true,
      productionBackendAllowed: false,
      productionLanePromotionAllowed: false,
      edgeStateMigrationAllowed: false
    },
    causalInterpretation: {
      backendWedgeEvidenceOnly: true,
      productionBackendStarted: false,
      productionLanePromoted: false,
      causalSubstrateOwnsBackend: false,
      causalSubstrateAcceptsTruth: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      startsProductionBackend: false,
      grantsWriterAuthority: false,
      claimsCausalTruth: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-production-backend-wedge-valid-evidence",
      refsPresent: true,
      labAuthorizationSafe: true,
      backendWedgeSafe: true,
      acceptanceRuleSafe: true,
      implementationRouteSafe: true,
      refsSafe: true,
      noProductionOverclaim: true
    }
  };
}

test("consumes production backend wedge causal evidence as disposable lab pressure", () => {
  const review = buildTestbedEdgeLocalLayerProductionBackendWedgeEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_production_backend_wedge_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.VISIBLE);
  assert.equal(review.nextGate, "disposable_production_shaped_backend_lab");
  assert.equal(review.disposableLabAuthorized, true);
  assert.equal(review.productionBackendAuthorized, false);
  assert.equal(review.productionLanePromotionAuthorized, false);
  assert.equal(review.edgeStateMigrationAllowed, false);
  assert.equal(review.backendKind, "autobase");
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedStartsProductionBackend, false);
  assert.equal(review.testbedClaimsCausalTruth, false);
});

test("blocks production backend wedge authority and backend overclaims", () => {
  const evidence = causalEvidence();
  evidence.labAuthorization.authorizesProductionBackend = true;
  evidence.boundary.opensAutobase = true;
  evidence.validation.noProductionOverclaim = false;
  const review = buildTestbedEdgeLocalLayerProductionBackendWedgeEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_backend_wedge_lab_authorization_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_backend_wedge_boundary_overclaim"), true);
});

test("blocks production backend wedge unsafe refs and readiness overclaims", () => {
  const evidence = causalEvidence();
  evidence.backendWedge.laneRef = "http://127.0.0.1:8787/lane";
  evidence.acceptanceRule.labSuccessIsProductionReadiness = true;
  const review = buildTestbedEdgeLocalLayerProductionBackendWedgeEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_backend_wedge_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_backend_wedge_acceptance_rule_missing_or_unsafe"), true);
});

test("lists bounded production backend wedge statuses", () => {
  assert.deepEqual(
    listTestbedEdgeLocalLayerProductionBackendWedgeStatuses(),
    Object.values(TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES)
  );
});
