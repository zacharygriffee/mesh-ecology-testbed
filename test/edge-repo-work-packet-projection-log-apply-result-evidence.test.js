import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeRepoWorkPacketProjectionLogApplyResultEvidence,
  listTestbedEdgeRepoWorkPacketProjectionLogApplyResultStatuses,
  TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES
} from "../src/testbed/edge-repo-work-packet-projection-log-apply-result-evidence.js";

const CREATED_AT = "2026-05-17T17:10:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-repo-work-packet-projection-log-apply-result-evidence",
    schema: "causal-substrate/edge-repo-work-packet-projection-log-apply-result-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-repo-work-packet-projection-log-apply-result-evidence:fixture",
    reviewStatus: "edge-repo-work-packet-projection-log-apply-result-evidence-emitted",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_repo_work_packet_projection_log_apply_result",
      sourceSchema: "edge_repo_work_packet_projection_log_apply_result.v0"
    },
    refs: {
      applyResultId: "edge-repo-work-packet-projection-log-apply-result:aaaaaaaaaaaaaaaaaaaaaaaa",
      candidateRef: {
        kind: "edge_repo_work_packet_projection_log_candidate",
        id: "edge-repo-work-packet-projection-log-candidate:aaaaaaaaaaaaaaaaaaaaaaaa",
        hash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      appendRef: {
        kind: "edge_repo_work_packet_projection_log_lab_append_record",
        id: "edge-repo-work-packet-projection-log-lab-append:aaaaaaaaaaaaaaaaaaaaaaaa",
        hash: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      }
    },
    applyState: "accepted_lab",
    acceptedContinuity: false,
    acceptedProductionContinuity: false,
    checks: {
      schemaValid: true,
      sourceRefsPresent: true,
      causalRefsOrDeferralValid: true,
      storageEnvelopeOnly: true,
      writerPolicyLabOnly: true,
      unsafeCanonicalSeamsAbsent: true,
      nonClaimsPreserved: true
    },
    boundedShape: {
      refsOnly: true,
      candidatePayloadEmbedded: false,
      appendPayloadEmbedded: false,
      arbitraryMetadataAllowed: false,
      arbitraryNotesAllowed: false,
      maxBlockedReasons: 12,
      blobPayloadsUseExternalRefs: true
    },
    posture: {
      appendSuccessIsAcceptance: false,
      applySuccessIsTruth: false,
      labResultIsReadiness: false,
      productionAutobaseStarted: false,
      durableContinuityPromoted: false,
      edgeStateMigrated: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      acceptsProductionContinuity: false,
      claimsCausalTruth: false,
      startsBackend: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-repo-work-packet-projection-log-apply-result-valid-evidence",
      acceptedLabOnly: true,
      checksSafe: true,
      boundedShapeSafe: true,
      postureSafe: true,
      refsSafe: true,
      noAuthorityOrTruthClaim: true
    }
  };
}

test("consumes repo-work-packet projection-log apply result as review-only pressure", () => {
  const review = buildTestbedEdgeRepoWorkPacketProjectionLogApplyResultEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_repo_work_packet_projection_log_apply_result_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.VISIBLE);
  assert.equal(review.applyState, "accepted_lab");
  assert.equal(review.acceptedContinuity, false);
  assert.equal(review.acceptedProductionContinuity, false);
  assert.equal(review.appendSuccessIsAcceptance, false);
  assert.equal(review.applySuccessIsTruth, false);
  assert.equal(review.labResultIsReadiness, false);
  assert.equal(review.productionAutobaseStarted, false);
  assert.equal(review.durableContinuityPromoted, false);
  assert.equal(review.edgeStateMigrated, false);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
});

test("blocks apply result overclaims before Edge can treat review as readiness", () => {
  const evidence = causalEvidence();
  evidence.acceptedProductionContinuity = true;
  evidence.posture.labResultIsReadiness = true;
  evidence.validation.noAuthorityOrTruthClaim = false;
  const review = buildTestbedEdgeRepoWorkPacketProjectionLogApplyResultEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("repo_work_packet_projection_log_apply_result_continuity_overclaim"), true);
  assert.equal(review.reasonCodes.includes("repo_work_packet_projection_log_apply_result_posture_overclaim"), true);
  assert.equal(review.reasonCodes.includes("repo_work_packet_projection_log_apply_result_validation_not_ready"), true);
  assert.equal(review.acceptedProductionContinuity, true);
  assert.equal(review.labResultIsReadiness, true);
});

test("blocks unsafe refs and unbounded embedded payload posture", () => {
  const evidence = causalEvidence();
  evidence.refs.candidateRef.id = "http://127.0.0.1:8787/candidate";
  evidence.boundedShape.candidatePayloadEmbedded = true;
  evidence.boundedShape.arbitraryNotesAllowed = true;
  evidence.validation.boundedShapeSafe = false;
  evidence.validation.refsSafe = false;
  const review = buildTestbedEdgeRepoWorkPacketProjectionLogApplyResultEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("repo_work_packet_projection_log_apply_result_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("repo_work_packet_projection_log_apply_result_bounded_shape_missing_or_unsafe"), true);
});

test("lists bounded apply-result statuses", () => {
  assert.deepEqual(
    listTestbedEdgeRepoWorkPacketProjectionLogApplyResultStatuses(),
    Object.values(TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES)
  );
});
