import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerContinuityLaneAutobaseLabEvidence,
  listTestbedEdgeLocalLayerContinuityLaneAutobaseLabStatuses,
  TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES
} from "../src/testbed/edge-local-layer-continuity-lane-autobase-lab-evidence.js";

const CREATED_AT = "2026-05-17T19:10:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-continuity-lane-autobase-lab-evidence",
    schema: "causal-substrate/edge-local-layer-continuity-lane-autobase-lab-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-continuity-lane-autobase-lab-evidence:fixture",
    reviewStatus: "edge-local-layer-continuity-lane-autobase-lab-evidence-emitted",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_local_layer_continuity_lane_autobase_lab_result",
      sourceSchema: "edge_local_layer_continuity_lane_autobase_lab_result.v0"
    },
    refs: {
      laneEntryId: "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa",
      laneEntryHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      semanticEventRef: "continuity:edge-repo-work-packet:continuity-lane-lab",
      semanticPayloadHash: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      sourceRefs: ["continuity:edge-repo-work-packet:continuity-lane-lab"],
      writerRefs: ["autobase-writer:aaaaaaaa"],
      headRefs: ["autobase-head:autobase-writer-aaaaaaaa:length-1:bbbbbbbb"],
      linearizedEntryRefs: ["autobase-linearized-entry:local-layer-continuity-lane:0:aaaaaaaa"],
      nextGate: "production_local_layer_lane_promotion_decision"
    },
    laneEntryPosture: {
      labStorageEnvelope: true,
      semanticContinuityUnit: false,
      preservesSemanticContinuityEvent: true,
      productionLaneEntry: false,
      productionLocalLayerState: false,
      durableLocalLayerContinuity: false,
      edgeStateMigration: false,
      appendSuccessIsAcceptance: false,
      linearizationIsTruth: false,
      replicaVisibilityIsContinuity: false
    },
    labPosture: {
      sandboxedAutobaseLab: true,
      autobaseBackendOpened: true,
      writesAutobase: true,
      derivedViewMaterialized: true,
      implementationWedge: true,
      productionLocalLayerState: false,
      productionLanePromoted: false,
      writesDurableLocalLayerState: false,
      edgeStateMigration: false,
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      labResultIsReadiness: false
    },
    productionGateDecision: {
      gateState: "implementation_wedge_allowed_production_promotion_blocked",
      nextGate: "production_local_layer_lane_promotion_decision",
      productionIsExpectedFutureWork: true,
      productionLanePromoted: false,
      edgeStateMigrationAllowed: false
    },
    boundary: {
      opensAutobase: false,
      opensCorestore: false,
      startsProductionBackend: false,
      writesContinuityRecords: false,
      claimsCausalTruth: false,
      migratesEdgeState: false,
      grantsWriterAuthority: false
    },
    validation: {
      status: "edge-local-layer-continuity-lane-autobase-lab-valid-evidence",
      laneEntryPresent: true,
      sandboxAutobaseObserved: true,
      productionGatePresent: true,
      refsSafe: true,
      noProductionOverclaim: true
    }
  };
}

test("consumes Edge continuity-lane Autobase lab as implementation-wedge pressure", () => {
  const review = buildTestbedEdgeLocalLayerContinuityLaneAutobaseLabEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_continuity_lane_autobase_lab_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.VISIBLE);
  assert.equal(review.laneEntryId, "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa");
  assert.equal(review.semanticEventRef, "continuity:edge-repo-work-packet:continuity-lane-lab");
  assert.equal(review.nextGate, "production_local_layer_lane_promotion_decision");
  assert.equal(review.productionIsExpectedFutureWork, true);
  assert.equal(review.productionLanePromoted, false);
  assert.equal(review.edgeStateMigrationAllowed, false);
  assert.equal(review.sandboxedAutobaseLab, true);
  assert.equal(review.autobaseBackendObserved, true);
  assert.equal(review.writesAutobaseObserved, true);
  assert.equal(review.implementationWedge, true);
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedWritesContinuityRecords, false);
  assert.equal(review.testbedClaimsCausalTruth, false);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
});

test("blocks continuity-lane lab evidence with production overclaims", () => {
  const evidence = causalEvidence();
  evidence.laneEntryPosture.productionLaneEntry = true;
  evidence.labPosture.productionLanePromoted = true;
  evidence.validation.noProductionOverclaim = false;
  const review = buildTestbedEdgeLocalLayerContinuityLaneAutobaseLabEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_continuity_lane_autobase_lab_entry_posture_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_continuity_lane_autobase_lab_posture_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_continuity_lane_autobase_lab_validation_not_ready"), true);
});

test("blocks unsafe refs and missing gate posture", () => {
  const evidence = causalEvidence();
  evidence.refs.sourceRefs.push("http://127.0.0.1:8787/status");
  evidence.productionGateDecision.productionIsExpectedFutureWork = false;
  const review = buildTestbedEdgeLocalLayerContinuityLaneAutobaseLabEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_continuity_lane_autobase_lab_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_continuity_lane_autobase_lab_gate_missing_or_unsafe"), true);
});

test("lists bounded continuity-lane Autobase lab statuses", () => {
  assert.deepEqual(
    listTestbedEdgeLocalLayerContinuityLaneAutobaseLabStatuses(),
    Object.values(TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES)
  );
});
