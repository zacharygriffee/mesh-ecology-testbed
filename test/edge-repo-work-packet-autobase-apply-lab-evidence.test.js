import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeRepoWorkPacketAutobaseApplyLabEvidence,
  listTestbedEdgeRepoWorkPacketAutobaseApplyLabStatuses,
  TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES
} from "../src/testbed/edge-repo-work-packet-autobase-apply-lab-evidence.js";

const CREATED_AT = "2026-05-17T18:10:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-repo-work-packet-autobase-apply-lab-evidence",
    schema: "causal-substrate/edge-repo-work-packet-autobase-apply-lab-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-repo-work-packet-autobase-apply-lab-evidence:fixture",
    reviewStatus: "edge-repo-work-packet-autobase-apply-lab-evidence-emitted",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_sandboxed_autobase_repo_work_packet_projection_log_apply_lab_result",
      sourceSchema: "edge_sandboxed_autobase_repo_work_packet_projection_log_apply_lab_result.v0"
    },
    refs: {
      labResultId: "edge-autobase-apply-lab:aaaaaaaaaaaaaaaa",
      sourceApplyResultRef: "edge-repo-work-packet-projection-log-apply-result:aaaaaaaaaaaaaaaaaaaaaaaa",
      writerRefs: ["autobase-writer:aaaaaaaa"],
      headRefs: ["autobase-head:autobase-writer-aaaaaaaa:length-1:bbbbbbbb"],
      linearizedEntryRefs: ["autobase-linearized-entry:repo-work-packet-apply:0:aaaaaaaa"],
      checkpointRef: "edge-local-layer-production-checkpoint:repo-work-packet-projection-log-apply:aaaaaaaa"
    },
    labPosture: {
      sandboxedAutobaseLab: true,
      autobaseBackend: true,
      writesAutobase: true,
      derivedViewMaterialized: true,
      productionCheckpointReached: true,
      productionLocalLayerState: false,
      writesDurableLocalLayerState: false,
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      labResultIsReadiness: false
    },
    productionPromotionCheckpoint: {
      checkpointState: "pre_production_autobase_apply_lab_passed",
      nextCheckpoint: "production_local_layer_lane_promotion_decision",
      productionIsExpectedFutureWork: true,
      promotionDecisionStillRequired: true
    },
    storageLanePosture: {
      productionBackendPromoted: false,
      productionPromotionCheckpointReached: true,
      storageRecordPromoted: false,
      edgeStateMigration: false,
      appendSuccessIsAcceptance: false,
      linearizationIsTruth: false
    },
    boundary: {
      opensAutobase: false,
      opensCorestore: false,
      startsProductionBackend: false,
      writesContinuityRecords: false,
      claimsCausalTruth: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-repo-work-packet-autobase-apply-lab-valid-evidence",
      sandboxAutobaseObserved: true,
      checkpointPresent: true,
      storageLaneSafe: true,
      refsSafe: true,
      noProductionOverclaim: true
    }
  };
}

test("consumes repo-work-packet Autobase apply lab as checkpoint pressure", () => {
  const review = buildTestbedEdgeRepoWorkPacketAutobaseApplyLabEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_repo_work_packet_autobase_apply_lab_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.VISIBLE);
  assert.equal(review.checkpointState, "pre_production_autobase_apply_lab_passed");
  assert.equal(review.nextCheckpoint, "production_local_layer_lane_promotion_decision");
  assert.equal(review.productionIsExpectedFutureWork, true);
  assert.equal(review.promotionDecisionStillRequired, true);
  assert.equal(review.sandboxedAutobaseLab, true);
  assert.equal(review.autobaseBackendObserved, true);
  assert.equal(review.writesAutobaseObserved, true);
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedWritesContinuityRecords, false);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
});

test("blocks checkpoint evidence with production overclaims", () => {
  const evidence = causalEvidence();
  evidence.labPosture.productionLocalLayerState = true;
  evidence.storageLanePosture.productionBackendPromoted = true;
  evidence.validation.noProductionOverclaim = false;
  const review = buildTestbedEdgeRepoWorkPacketAutobaseApplyLabEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("repo_work_packet_autobase_apply_lab_posture_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("repo_work_packet_autobase_apply_lab_storage_posture_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("repo_work_packet_autobase_apply_lab_validation_not_ready"), true);
});

test("blocks unsafe refs and missing promotion checkpoint posture", () => {
  const evidence = causalEvidence();
  evidence.refs.sourceApplyResultRef = "http://127.0.0.1:8787/apply";
  evidence.productionPromotionCheckpoint.productionIsExpectedFutureWork = false;
  const review = buildTestbedEdgeRepoWorkPacketAutobaseApplyLabEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("repo_work_packet_autobase_apply_lab_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("repo_work_packet_autobase_apply_lab_checkpoint_missing_or_unsafe"), true);
});

test("lists bounded Autobase apply lab statuses", () => {
  assert.deepEqual(
    listTestbedEdgeRepoWorkPacketAutobaseApplyLabStatuses(),
    Object.values(TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES)
  );
});
