import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeRepoWorkPacketProjectionLogCandidateEvidence,
  listTestbedEdgeRepoWorkPacketProjectionLogCandidateStatuses,
  TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES
} from "../src/testbed/edge-repo-work-packet-projection-log-candidate-evidence.js";

function causalEvidence(overrides = {}) {
  return {
    artifactKind: "causal-edge-repo-work-packet-projection-log-candidate-evidence",
    schema: "causal-substrate/edge-repo-work-packet-projection-log-candidate-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-repo-work-packet-projection-log-candidate-evidence:fixture",
    emittedAt: "2026-05-17T16:30:00.000Z",
    reviewStatus: "edge-repo-work-packet-projection-log-candidate-evidence-emitted",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_repo_work_packet_projection_log_candidate",
      sourceSchema: "edge_repo_work_packet_projection_log_candidate.v0"
    },
    refs: {
      candidateId: "edge-repo-work-packet-projection-log-candidate:aaaaaaaaaaaaaaaaaaaaaaaa",
      workPacketRef: "edge-cross-project-work-packet:repo-work:continuity-event",
      continuityEventId: "continuity:edge-repo-work-packet:example",
      projectionLaneRef: "local-layer-projection-lane:repo-work-packets",
      observerRef: "observer:edge-operator",
      sourceRefs: ["edge-repo-work-packet-continuity-review-chain:fixture"]
    },
    storageEnvelope: {
      storageEnvelopeOnly: true,
      semanticContinuityUnit: false,
      productionStorageRecord: false
    },
    writerAdmission: {
      policyKind: "operator_owned_local_layer_explicit_writer_admission",
      admittedWriterRefs: ["local-layer-writer:operator-device-a"],
      candidateWriterRefs: ["local-layer-writer:operator-device-a"],
      rejectedWriterRefs: [],
      generalWriterAuthorityGranted: false,
      writerAdmissionRequiredBeforeAcceptance: true,
      operatorMediationRequired: true
    },
    acceptanceRule: {
      appendSuccessIsAcceptance: false,
      storageVisibilityIsContinuity: false,
      replicaVisibilityIsContinuity: false,
      reviewVisibilityIsReadiness: false,
      requiresCausalSubstrateInterpretation: true,
      requiresFailClosedTestbedPressure: true
    },
    storageLanePosture: {
      intendedStorageLane: "bounded_autobase_equivalent_projection_lane",
      productionBackendPromoted: false,
      productionAutobaseStarted: false,
      edgeStateMigration: false,
      localFileStorageIsSubstrate: false,
      localPathSeam: false,
      httpSeam: false,
      sshSeam: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      claimsCausalTruth: false,
      startsBackend: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-repo-work-packet-projection-log-candidate-valid-evidence",
      storageEnvelopeSafe: true,
      writerAdmissionSafe: true,
      acceptanceRuleSafe: true,
      storageLanePostureSafe: true,
      boundarySafe: true,
      noAuthorityOrTruthClaim: true
    },
    ...overrides
  };
}

test("repo work packet projection-log candidate causal evidence is consumed as review-only pressure", () => {
  const evidence = buildTestbedEdgeRepoWorkPacketProjectionLogCandidateEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: "2026-05-17T16:45:00.000Z"
  });

  assert.equal(evidence.artifactKind, "testbed_edge_repo_work_packet_projection_log_candidate_evidence");
  assert.equal(evidence.schemaVersion, "testbed_edge_repo_work_packet_projection_log_candidate_evidence.v1");
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["repo_work_packet_projection_log_candidate_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-repo-work-packet-projection-log-candidate-evidence");
  assert.equal(evidence.candidateId, "edge-repo-work-packet-projection-log-candidate:aaaaaaaaaaaaaaaaaaaaaaaa");
  assert.equal(evidence.continuityEventId, "continuity:edge-repo-work-packet:example");
  assert.equal(evidence.appendSuccessIsAcceptance, false);
  assert.equal(evidence.productionAutobaseStarted, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.causalTruthClaimed, false);
});

test("repo work packet projection-log candidate review blocks append acceptance and backend overclaims", () => {
  const evidence = buildTestbedEdgeRepoWorkPacketProjectionLogCandidateEvidence({
    evidenceArtifact: causalEvidence({
      acceptanceRule: {
        appendSuccessIsAcceptance: true,
        storageVisibilityIsContinuity: false,
        replicaVisibilityIsContinuity: false,
        reviewVisibilityIsReadiness: true,
        requiresCausalSubstrateInterpretation: true,
        requiresFailClosedTestbedPressure: true
      },
      storageLanePosture: {
        intendedStorageLane: "bounded_autobase_equivalent_projection_lane",
        productionBackendPromoted: false,
        productionAutobaseStarted: true,
        edgeStateMigration: false,
        localFileStorageIsSubstrate: false,
        localPathSeam: false,
        httpSeam: false,
        sshSeam: false
      }
    })
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("repo_work_packet_projection_log_candidate_acceptance_rule_missing_or_unsafe"), true);
  assert.equal(evidence.reasonCodes.includes("repo_work_packet_projection_log_candidate_storage_posture_missing_or_unsafe"), true);
});

test("repo work packet projection-log candidate review blocks unsafe refs and writer authority", () => {
  const evidence = buildTestbedEdgeRepoWorkPacketProjectionLogCandidateEvidence({
    evidenceArtifact: causalEvidence({
      refs: {
        candidateId: "edge-repo-work-packet-projection-log-candidate:aaaaaaaaaaaaaaaaaaaaaaaa",
        continuityEventId: "continuity:edge-repo-work-packet:example",
        sourceRefs: ["http://127.0.0.1:8787/status"]
      },
      writerAdmission: {
        policyKind: "operator_owned_local_layer_explicit_writer_admission",
        admittedWriterRefs: ["local-layer-writer:operator-device-a"],
        generalWriterAuthorityGranted: true,
        writerAdmissionRequiredBeforeAcceptance: true,
        operatorMediationRequired: true
      }
    })
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("repo_work_packet_projection_log_candidate_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("repo_work_packet_projection_log_candidate_writer_admission_missing_or_unsafe"), true);
});

test("repo work packet projection-log candidate status vocabulary is bounded", () => {
  assert.deepEqual(listTestbedEdgeRepoWorkPacketProjectionLogCandidateStatuses(), [
    "repo_work_packet_projection_log_candidate_visible",
    "repo_work_packet_projection_log_candidate_blocked",
    "repo_work_packet_projection_log_candidate_malformed",
    "repo_work_packet_projection_log_candidate_incomplete"
  ]);
});
