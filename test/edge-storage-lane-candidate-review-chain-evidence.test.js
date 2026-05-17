import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  buildTestbedEdgeStorageLaneCandidateEvidence
} from "../src/testbed/edge-storage-lane-candidate-evidence.js";
import {
  buildTestbedEdgeStorageLaneCandidateReviewChainEvidence,
  listTestbedEdgeStorageLaneCandidateReviewChainStatuses,
  TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES
} from "../src/testbed/edge-storage-lane-candidate-review-chain-evidence.js";

const CREATED_AT = "2026-05-17T16:30:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-storage-lane-candidate-evidence",
    schema: "causal-substrate/edge-storage-lane-candidate-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-storage-lane-candidate-evidence:bbbbbbbbbbbbbbbb",
    emittedAt: "2026-05-17T16:00:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_local_layer_storage_lane_candidate",
      sourceSchema: "edge_local_layer_storage_lane_candidate.v0"
    },
    refs: {
      candidateId: "edge-local-layer-storage-lane-candidate:bbbbbbbbbbbbbbbbbbbbbbbb",
      layerRef: "local-layer:operator-owned-devices",
      projectionLaneRef: "local-layer-projection-lane:edge-operator-situation",
      observerRef: "observer:edge-operator",
      sourceProjectionEventRefs: ["projection:mesh-ecology-edge:operator_situation_view:bbbbbbbbbbbbbbbb"],
      sourceEntryRefs: ["projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:bbbbbbbbbbbbbbbb:0"],
      sourceIdentityHashes: [`sha256:${"b".repeat(64)}`],
      sourceRefs: [
        "projection:mesh-ecology-edge:operator_situation_view:bbbbbbbbbbbbbbbb",
        "projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:bbbbbbbbbbbbbbbb:0",
        `sha256:${"b".repeat(64)}`
      ]
    },
    writerAdmission: {
      policyKind: "operator_owned_local_layer_explicit_writer_admission",
      admittedWriterRefs: ["local-layer-writer:operator-device-a"],
      candidateWriterRefs: ["local-layer-writer:operator-device-b"],
      rejectedWriterRefs: [],
      generalWriterAuthorityGranted: false,
      nonWriterOptimisticAppendAllowed: true,
      optimisticAppendRequiresAcceptanceGate: true,
      writerAdmissionRequiredBeforeAcceptance: true,
      operatorMediationRequired: true
    },
    acceptanceRule: {
      ruleKind: "apply_validation_accepts_projection_lane_entry",
      appendSuccessIsAcceptance: false,
      replicaVisibilityIsContinuity: false,
      linearizationIsTruth: false,
      requiresWriterAdmission: true,
      requiresCausalSubstrateInterpretation: true,
      requiresFailClosedTestbedPressure: true
    },
    storageLanePosture: {
      intendedStorageLane: "bounded_autobase_equivalent_projection_lane",
      storageDirection: "bounded_autobase_equivalent_linearization",
      promotedSemanticUnit: "mesh_ecology_local_layer_projection_event",
      storageEnvelopeKind: "edge_local_layer_projection_lane_entry",
      storageEnvelopeSchema: "edge_local_layer_projection_lane_entry.v0",
      productionBackendPromoted: false,
      productionAutobaseStarted: false,
      storageRecordPromoted: false,
      edgeStateMigration: false,
      appendSuccessIsAcceptance: false,
      linearizationIsTruth: false,
      replicaVisibilityIsContinuity: false,
      wallClockDefinesCausalOrder: false,
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
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      startsBackend: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-storage-lane-candidate-valid-evidence",
      writerAdmissionPresent: true,
      acceptanceRulePresent: true,
      storageLanePosturePresent: true,
      readerPolicyPresent: true,
      boundarySafe: true,
      noAuthorityOrTruthClaim: true
    },
    reviewStatus: "edge-storage-lane-candidate-evidence-emitted"
  };
}

function testbedReviewEvidence(causal = causalEvidence()) {
  return buildTestbedEdgeStorageLaneCandidateEvidence({
    evidenceArtifact: causal,
    createdAt: CREATED_AT,
    evidenceId: "testbed-edge-storage-lane-candidate:bbbbbbbbbbbbbbbb"
  });
}

function edgeReviewStatus({ causal = causalEvidence(), review = testbedReviewEvidence(causal), extra = {} } = {}) {
  return {
    artifactKind: "edge_local_layer_storage_lane_candidate_review_status",
    ecosystemSeamId: "testbed",
    viewId: "edge-local-layer-storage-lane-candidate-review-status:bbbbbbbbbbbbbbbb",
    createdAt: CREATED_AT,
    readinessInputKind: "local_layer_storage_lane_candidate_review",
    selfWorkReadinessInput: true,
    localLayerStorageLaneCandidateReviewed: true,
    readyForSelfWorkReadiness: true,
    candidateId: causal.refs.candidateId,
    causalArtifactId: causal.artifactId,
    testbedReviewEvidenceId: review.evidenceId,
    testbedReviewStatus: review.reviewStatus,
    testbedReviewImportStatus: "imported",
    storageLaneCandidateReviewState: "local_layer_storage_lane_candidate_review_available",
    readyForOperatorReview: true,
    readyForWriterAuthority: false,
    readyForAppendAcceptance: false,
    readyForAutobaseBackend: false,
    readyForDurableLocalLayerState: false,
    readyForReplicatedState: false,
    appendSuccessIsAcceptance: false,
    replicaVisibilityIsContinuity: false,
    linearizationIsTruth: false,
    productionAutobaseStarted: false,
    productionBackendPromoted: false,
    writerAuthorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    causalTruthClaimed: false,
    runtimeAuthorityClaimed: false,
    ...extra
  };
}

test("storage-lane candidate review chain pressures causal Testbed and Edge refs together", () => {
  const causal = causalEvidence();
  const review = testbedReviewEvidence(causal);
  const edgeStatus = edgeReviewStatus({ causal, review });
  const evidence = buildTestbedEdgeStorageLaneCandidateReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.artifactKind, "testbed_edge_storage_lane_candidate_review_chain_evidence");
  assert.equal(evidence.schemaVersion, "testbed_edge_storage_lane_candidate_review_chain_evidence.v1");
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["storage_lane_candidate_review_chain_visible"]);
  assert.equal(evidence.sourceCausalArtifactId, causal.artifactId);
  assert.equal(evidence.sourceTestbedEvidenceId, review.evidenceId);
  assert.equal(evidence.sourceEdgeStatusViewId, edgeStatus.viewId);
  assert.equal(evidence.edgeReadyForOperatorReview, true);
  assert.equal(evidence.edgeReadyForSelfWorkReadiness, true);
  assert.equal(evidence.edgeWriterAuthorityGranted, false);
  assert.equal(evidence.edgeReadyForAutobaseBackend, false);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedOpenedEdgeStorage, false);
  assert.equal(evidence.authorityGranted, false);
});

test("committed storage-lane candidate review chain fixture stays aligned end to end", async () => {
  const fixturePath = join(
    process.cwd(),
    "test",
    "fixtures",
    "edge-storage-lane-candidate-review-chain",
    "edge-storage-lane-candidate-review-chain-fixture.json"
  );
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  const rebuiltTestbedEvidence = buildTestbedEdgeStorageLaneCandidateEvidence({
    evidenceArtifact: fixture.causalEvidence,
    createdAt: fixture.createdAt,
    evidenceId: fixture.testbedReviewEvidence.evidenceId
  });
  const chain = buildTestbedEdgeStorageLaneCandidateReviewChainEvidence({
    causalEvidence: fixture.causalEvidence,
    testbedReviewEvidence: fixture.testbedReviewEvidence,
    edgeReviewStatus: fixture.edgeReviewStatus,
    createdAt: fixture.createdAt
  });

  assert.deepEqual(rebuiltTestbedEvidence, fixture.testbedReviewEvidence);
  assert.equal(chain.reviewStatus, fixture.expectedChain.reviewStatus);
  assert.deepEqual(chain.reasonCodes, fixture.expectedChain.reasonCodes);
  assert.equal(chain.sourceCausalArtifactId, fixture.causalEvidence.artifactId);
  assert.equal(chain.sourceTestbedEvidenceId, fixture.testbedReviewEvidence.evidenceId);
  assert.equal(chain.sourceEdgeStatusViewId, fixture.edgeReviewStatus.viewId);
  assert.equal(chain.testbedExecutedEdge, false);
  assert.equal(chain.testbedOpenedEdgeStorage, false);
  assert.equal(chain.edgeReadyForAutobaseBackend, false);
  assert.equal(chain.edgeDurableStateClaimed, false);
});

test("storage-lane candidate review chain blocks mismatched Edge Testbed refs", () => {
  const causal = causalEvidence();
  const review = testbedReviewEvidence(causal);
  const edgeStatus = edgeReviewStatus({
    causal,
    review,
    extra: {
      testbedReviewEvidenceId: "testbed-edge-storage-lane-candidate:cccccccccccccccc"
    }
  });
  const evidence = buildTestbedEdgeStorageLaneCandidateReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("storage_lane_chain_edge_testbed_ref_mismatch"), true);
  assert.equal(evidence.testbedCalledEdge, false);
  assert.equal(evidence.testbedMutatedEdge, false);
});

test("storage-lane candidate review chain blocks Edge backend and acceptance overclaims", () => {
  const causal = causalEvidence();
  const review = testbedReviewEvidence(causal);
  const edgeStatus = edgeReviewStatus({
    causal,
    review,
    extra: {
      readyForWriterAuthority: true,
      writerAuthorityGranted: true,
      readyForAutobaseBackend: true,
      appendSuccessIsAcceptance: true,
      productionAutobaseStarted: true,
      durableStateClaimed: true,
      causalTruthClaimed: true
    }
  });
  const evidence = buildTestbedEdgeStorageLaneCandidateReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("storage_lane_chain_edge_status_overclaim"), true);
  assert.equal(evidence.edgeWriterAuthorityGranted, true);
  assert.equal(evidence.edgeReadyForAutobaseBackend, true);
  assert.equal(evidence.edgeDurableStateClaimed, true);
  assert.equal(evidence.edgeCausalTruthClaimed, true);
});

test("storage-lane candidate review chain status vocabulary is bounded", () => {
  assert.deepEqual(listTestbedEdgeStorageLaneCandidateReviewChainStatuses(), [
    "storage_lane_candidate_review_chain_visible",
    "storage_lane_candidate_review_chain_blocked",
    "storage_lane_candidate_review_chain_malformed",
    "storage_lane_candidate_review_chain_incomplete"
  ]);
});
