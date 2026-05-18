import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerDisposableProductionShapedBackendLabEvidence,
  listTestbedEdgeLocalLayerDisposableProductionShapedBackendLabStatuses,
  TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES
} from "../src/testbed/edge-local-layer-disposable-production-shaped-backend-lab-evidence.js";

const CREATED_AT = "2026-05-17T23:20:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-disposable-production-shaped-backend-lab-evidence",
    schema: "causal-substrate/edge-local-layer-disposable-production-shaped-backend-lab-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-disposable-production-shaped-backend-lab-evidence:fixture",
    reviewStatus: "edge-local-layer-disposable-production-shaped-backend-lab-evidence-emitted",
    refs: {
      sourceArtifactId: "edge-local-layer-disposable-production-shaped-backend-lab:aaaaaaaaaaaaaaaaaaaaaaaa",
      sourceArtifactHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      sourceProductionBackendWedgeRef: "edge-local-layer-production-backend-wedge:bbbbbbbbbbbbbbbbbbbbbbbb",
      sourceProductionBackendWedgeHash: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      sourceOperatorPromotionDecisionRef: "edge-local-layer-operator-recorded-promotion-decision:cccccccccccccccccccccccc",
      sourceWriterAdmissionPacketRef: "edge-local-layer-writer-admission-v0:dddddddddddddddddddddddd",
      sourceRefs: [
        "edge-local-layer-disposable-production-shaped-backend-lab:aaaaaaaaaaaaaaaaaaaaaaaa",
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "edge-local-layer-production-backend-wedge:bbbbbbbbbbbbbbbbbbbbbbbb",
        "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "edge-local-layer-operator-recorded-promotion-decision:cccccccccccccccccccccccc",
        "edge-local-layer-writer-admission-v0:dddddddddddddddddddddddd",
        "local-layer-continuity-lane-entry:eeeeeeeeeeeeeeeeeeeeeeee",
        "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "mesh-ecology-local-layer-continuity-event:ffffffffffffffffffffffff",
        "autobase-writer:111111111111111111111111",
        "autobase-head:autobase-writer-111111111111111111111111:length-1:111111111111111111111111",
        "autobase-linearized-entry:local-layer-continuity-lane:0:222222222222222222222222"
      ],
      laneEntryRef: "local-layer-continuity-lane-entry:eeeeeeeeeeeeeeeeeeeeeeee",
      laneEntryHash: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      semanticEventRef: "mesh-ecology-local-layer-continuity-event:ffffffffffffffffffffffff",
      writerRefs: ["autobase-writer:111111111111111111111111"],
      headRefs: ["autobase-head:autobase-writer-111111111111111111111111:length-1:111111111111111111111111"],
      linearizedEntryRefs: ["autobase-linearized-entry:local-layer-continuity-lane:0:222222222222222222222222"]
    },
    backendShape: {
      backendKind: "autobase",
      corestoreRole: "local-layer-node",
      corestorePolicy: "one-corestore-per-role-process",
      namespacePolicy: "stable-namespaces-within-role-corestore",
      namespaceRef: "corestore-namespace:local-layer-continuity-production-shaped-lab",
      laneRef: "local-layer-continuity-lane:operator-owned-devices-production-shaped-lab",
      storageLaneKind: "bounded_autobase_local_layer_continuity_lane",
      semanticInputKind: "mesh_ecology_local_layer_continuity_event",
      storageEnvelopeKind: "mesh_ecology_local_layer_lane_entry"
    },
    laneEntry: {
      artifactKind: "mesh_ecology_local_layer_lane_entry",
      schemaVersion: "mesh_ecology_local_layer_lane_entry.v0",
      entryId: "local-layer-continuity-lane-entry:eeeeeeeeeeeeeeeeeeeeeeee",
      entryHash: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      laneRef: "local-layer-continuity-lane:operator-owned-devices-production-shaped-lab",
      namespaceRef: "corestore-namespace:local-layer-continuity-production-shaped-lab",
      writerRef: "autobase-writer:111111111111111111111111",
      semanticEventKind: "mesh_ecology_local_layer_continuity_event",
      semanticEventRef: "mesh-ecology-local-layer-continuity-event:ffffffffffffffffffffffff",
      semanticPayloadHash: "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      sourceRefs: [
        "mesh-ecology-local-layer-continuity-event:ffffffffffffffffffffffff",
        "edge-cross-project-work-packet:repo-work:continuity-lane-lab",
        "edge-self-work-review:continuity-lane-lab",
        "operator-seat:test",
        "edge-device:test",
        "continuity:previous-self-work"
      ],
      labStorageEnvelope: true,
      semanticContinuityUnit: false,
      preservesSemanticContinuityEvent: true,
      productionLaneEntry: false,
      productionLocalLayerState: false,
      durableLocalLayerContinuity: false,
      appendSuccessIsAcceptance: false,
      linearizationIsTruth: false,
      replicaVisibilityIsContinuity: false
    },
    acceptancePosture: {
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      linearizationIsTruth: false,
      replicaVisibilityIsContinuity: false,
      labSuccessIsProductionReadiness: false,
      wedgePacketIsProductionPromotion: false,
      acceptedProductionContinuity: false,
      requiresSeparateProductionPromotionGate: true
    },
    storageRootPosture: {
      disposableStorageRootRequired: true,
      localPathIsLabInputOnly: true,
      localPathIsContinuitySeam: false,
      localPathIsCanonicalIdentity: false,
      edgeStateMigration: false
    },
    productionGateDecision: {
      gateState: "disposable_production_shaped_backend_lab_allowed_production_promotion_blocked",
      decision: "continue_lab_backed_wedge_only",
      nextGate: "production_local_layer_lane_promotion_decision",
      productionIsExpectedFutureWork: true,
      productionBackendStarted: false,
      productionLanePromoted: false,
      edgeStateMigrationAllowed: false
    },
    labPosture: {
      disposableProductionShapedBackendLab: true,
      sandboxedAutobaseLab: true,
      productionShapedNamespace: true,
      autobaseBackendOpened: true,
      corestoreOpened: true,
      writesAutobase: true,
      productionBackendStarted: false,
      productionLocalLayerState: false,
      productionLanePromoted: false,
      writesDurableLocalLayerState: false,
      edgeStateMigration: false,
      localStoreRootIsIntegrationSeam: false,
      httpSeam: false,
      sshSeam: false,
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      labResultIsReadiness: false
    },
    causalInterpretation: {
      disposableBackendLabEvidenceOnly: true,
      productionBackendStarted: false,
      productionLanePromoted: false,
      edgeStateMigrated: false,
      causalSubstrateOwnsBackend: false,
      causalSubstrateAcceptsTruth: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      observesDisposableAutobaseLab: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      startsProductionBackend: false,
      grantsWriterAuthority: false,
      claimsCausalTruth: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-disposable-production-shaped-backend-lab-valid-evidence",
      refsPresent: true,
      backendShapeSafe: true,
      laneEntrySafe: true,
      acceptancePostureSafe: true,
      storageRootPostureSafe: true,
      productionGateSafe: true,
      labPostureSafe: true,
      refsSafe: true,
      noProductionOverclaim: true
    }
  };
}

test("consumes disposable production-shaped backend lab causal evidence as pressure", () => {
  const review = buildTestbedEdgeLocalLayerDisposableProductionShapedBackendLabEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_disposable_production_shaped_backend_lab_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.VISIBLE);
  assert.equal(review.disposableLabVisible, true);
  assert.equal(review.backendKind, "autobase");
  assert.equal(review.nextGate, "production_local_layer_lane_promotion_decision");
  assert.equal(review.productionBackendStarted, false);
  assert.equal(review.productionLanePromoted, false);
  assert.equal(review.edgeStateMigrationAllowed, false);
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedStartsProductionBackend, false);
  assert.equal(review.testbedClaimsCausalTruth, false);
});

test("blocks disposable backend lab production promotion and boundary overclaims", () => {
  const evidence = causalEvidence();
  evidence.productionGateDecision.productionLanePromoted = true;
  evidence.labPosture.productionBackendStarted = true;
  evidence.boundary.opensAutobase = true;
  evidence.validation.noProductionOverclaim = false;
  const review = buildTestbedEdgeLocalLayerDisposableProductionShapedBackendLabEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_disposable_production_shaped_backend_lab_production_gate_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_disposable_production_shaped_backend_lab_posture_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_disposable_production_shaped_backend_lab_boundary_overclaim"), true);
});

test("blocks disposable backend lab unsafe refs and readiness overclaims", () => {
  const evidence = causalEvidence();
  evidence.backendShape.laneRef = "http://127.0.0.1:8787/lane";
  evidence.acceptancePosture.labSuccessIsProductionReadiness = true;
  const review = buildTestbedEdgeLocalLayerDisposableProductionShapedBackendLabEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_disposable_production_shaped_backend_lab_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_disposable_production_shaped_backend_lab_backend_shape_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_disposable_production_shaped_backend_lab_acceptance_posture_missing_or_unsafe"), true);
});

test("lists bounded disposable backend lab statuses", () => {
  assert.deepEqual(
    listTestbedEdgeLocalLayerDisposableProductionShapedBackendLabStatuses(),
    Object.values(TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES)
  );
});
