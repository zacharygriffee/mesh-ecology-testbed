import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  buildTestbedEdgeLocalLayerNodeRoleLabEvidence
} from "../src/testbed/edge-local-layer-node-role-lab-evidence.js";
import {
  buildTestbedEdgeNodeRoleReviewChainEvidence,
  listTestbedEdgeNodeRoleReviewChainStatuses,
  TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES
} from "../src/testbed/edge-node-role-review-chain-evidence.js";

const CREATED_AT = "2026-05-17T15:30:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-node-role-lab-evidence",
    schema: "causal-substrate/edge-local-layer-node-role-lab-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-node-role-lab-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-17T15:00:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_sandboxed_local_layer_node_role_lab_result",
      sourceSchema: "edge_sandboxed_local_layer_node_role_lab_result.v0"
    },
    refs: {
      sourceStorageLaneCandidateRef: "edge-local-layer-storage-lane-candidate:aaaaaaaaaaaaaaaaaaaaaaaa",
      projectionViewRef: "edge-local-layer-node-role-view:aaaaaaaaaaaaaaaaaaaaaaaa",
      nodeRefs: {
        authorityNodeRef: "autobase-writer:authority-device",
        admittedWriterRef: "autobase-writer:admitted-device",
        candidateWriterRef: "autobase-writer:candidate-device",
        observerWriterRef: "autobase-writer:observer-device"
      },
      acceptedProjectionRecordRefs: ["projection:mesh-ecology-edge:node-role-lab:accepted"],
      acceptedLogEntryRefs: ["projection-log-entry:node-role-lab:accepted:0"],
      acceptedLaneEntryRefs: ["edge-local-layer-projection-lane-entry:accepted"],
      acceptedApplyResultRefs: ["edge-local-layer-projection-lane-apply:accepted"],
      acceptedWriterRefs: ["autobase-writer:admitted-device"],
      acceptedLinearizedEntryRefs: ["node-role-linearized-entry:0:accepted"],
      rejectedReviewRefs: ["node-role-rejected-review:0:candidate"],
      rejectedWriterRefs: ["autobase-writer:candidate-device"]
    },
    roleSeparation: {
      observabilityIsAuthority: false,
      observabilityIsWritability: false,
      writabilityIsAuthority: false,
      appendSuccessIsAcceptance: false,
      deterministicApplyOwnsAcceptance: true,
      operatorWriterAdmissionRequired: true,
      candidateWriterAppendVisibleAsReviewEvidence: true,
      derivedViewIncludesAcceptedOnly: true,
      observerCanObserveAcceptedView: true,
      observerAcceptedContinuityInput: false,
      candidateAppendAttempted: true,
      candidateAcceptedContinuityInput: false,
      admittedAcceptedContinuityInput: true
    },
    causalInterpretation: {
      interpretationKind: "observer_relative_local_layer_node_role_evidence",
      acceptedContinuityInputKind: "mesh_ecology_local_layer_projection_event",
      storageEnvelopeKind: "edge_local_layer_projection_lane_entry",
      observerRelative: true,
      branchRelative: true,
      sourceShareBoundaryPreserved: true,
      deviceBranchesRemainDeviceOwned: true,
      localLayerStoresProjectionRefs: true,
      causalSubstrateOwnsBackend: false,
      causalSubstrateAcceptsTruth: false,
      acceptanceSource: "deterministic_apply_and_operator_writer_admission_policy"
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      callsEdge: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      claimsAuthority: false,
      claimsDurableState: false,
      claimsReplicatedState: false,
      startsBackend: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-node-role-lab-valid-evidence",
      expectedSourceSchemaPresent: true,
      projectionViewPresent: true,
      sourceRefsPresent: true,
      nodeRoleRefsPresent: true,
      roleSeparationPresent: true,
      acceptedOnlyViewPresent: true,
      rejectedReviewEvidencePresent: true,
      labPostureSafe: true,
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true
    },
    reviewStatus: "edge-local-layer-node-role-lab-evidence-emitted"
  };
}

function testbedReviewEvidence(causal = causalEvidence()) {
  return buildTestbedEdgeLocalLayerNodeRoleLabEvidence({
    evidenceArtifact: causal,
    createdAt: CREATED_AT,
    evidenceId: "testbed-edge-node-role-lab:aaaaaaaaaaaaaaaa"
  });
}

function edgeReviewStatus({ causal = causalEvidence(), review = testbedReviewEvidence(causal), extra = {} } = {}) {
  return {
    artifactKind: "edge_local_layer_node_role_lab_review_status",
    ecosystemSeamId: "testbed",
    viewId: "edge-local-layer-node-role-lab-review-status:aaaaaaaaaaaaaaaa",
    createdAt: CREATED_AT,
    readinessInputKind: "local_layer_node_role_review",
    selfWorkReadinessInput: true,
    localLayerNodeRolesReviewed: true,
    readyForSelfWorkReadiness: true,
    causalArtifactId: causal.artifactId,
    sourceStorageLaneCandidateRef: causal.refs.sourceStorageLaneCandidateRef,
    projectionViewRef: causal.refs.projectionViewRef,
    testbedReviewEvidenceId: review.evidenceId,
    testbedReviewStatus: review.reviewStatus,
    testbedReviewImportStatus: "imported",
    nodeRoleLabReviewState: "local_layer_node_role_lab_review_available",
    readyForOperatorReview: true,
    readyForWriterAuthority: false,
    readyForAppendAcceptance: false,
    readyForAutobaseBackend: false,
    readyForDurableLocalLayerState: false,
    readyForReplicatedState: false,
    writerAuthorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    causalTruthClaimed: false,
    runtimeAuthorityClaimed: false,
    ...extra
  };
}

test("node-role review chain pressures causal Testbed and Edge refs together", () => {
  const causal = causalEvidence();
  const review = testbedReviewEvidence(causal);
  const edgeStatus = edgeReviewStatus({ causal, review });
  const evidence = buildTestbedEdgeNodeRoleReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.artifactKind, "testbed_edge_node_role_review_chain_evidence");
  assert.equal(evidence.schemaVersion, "testbed_edge_node_role_review_chain_evidence.v1");
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["node_role_review_chain_visible"]);
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

test("committed node-role review chain fixture stays aligned end to end", async () => {
  const fixturePath = join(
    process.cwd(),
    "test",
    "fixtures",
    "edge-node-role-review-chain",
    "edge-node-role-review-chain-fixture.json"
  );
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  const rebuiltTestbedEvidence = buildTestbedEdgeLocalLayerNodeRoleLabEvidence({
    evidenceArtifact: fixture.causalEvidence,
    createdAt: fixture.createdAt,
    evidenceId: fixture.testbedReviewEvidence.evidenceId
  });
  const chain = buildTestbedEdgeNodeRoleReviewChainEvidence({
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

test("node-role review chain blocks mismatched Edge Testbed refs", () => {
  const causal = causalEvidence();
  const review = testbedReviewEvidence(causal);
  const edgeStatus = edgeReviewStatus({
    causal,
    review,
    extra: {
      testbedReviewEvidenceId: "testbed-edge-node-role-lab:bbbbbbbbbbbbbbbb"
    }
  });
  const evidence = buildTestbedEdgeNodeRoleReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("node_role_chain_edge_testbed_ref_mismatch"), true);
  assert.equal(evidence.testbedCalledEdge, false);
  assert.equal(evidence.testbedMutatedEdge, false);
});

test("node-role review chain blocks Edge authority storage and backend overclaims", () => {
  const causal = causalEvidence();
  const review = testbedReviewEvidence(causal);
  const edgeStatus = edgeReviewStatus({
    causal,
    review,
    extra: {
      readyForWriterAuthority: true,
      writerAuthorityGranted: true,
      readyForAutobaseBackend: true,
      durableStateClaimed: true,
      causalTruthClaimed: true
    }
  });
  const evidence = buildTestbedEdgeNodeRoleReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("node_role_chain_edge_status_overclaim"), true);
  assert.equal(evidence.edgeWriterAuthorityGranted, true);
  assert.equal(evidence.edgeReadyForAutobaseBackend, true);
  assert.equal(evidence.edgeDurableStateClaimed, true);
  assert.equal(evidence.edgeCausalTruthClaimed, true);
});

test("node-role review chain blocks Testbed boundary overclaims", () => {
  const causal = causalEvidence();
  const review = {
    ...testbedReviewEvidence(causal),
    testbedOpenedAutobase: true,
    testbedWritesContinuityRecords: true,
    testbedAcceptsCanonicalHistory: true
  };
  const edgeStatus = edgeReviewStatus({ causal, review });
  const evidence = buildTestbedEdgeNodeRoleReviewChainEvidence({
    causalEvidence: causal,
    testbedReviewEvidence: review,
    edgeReviewStatus: edgeStatus,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("node_role_chain_testbed_boundary_overclaim"), true);
  assert.equal(evidence.testbedOpenedAutobase, true);
  assert.equal(evidence.testbedWritesContinuityRecords, true);
  assert.equal(evidence.testbedAcceptsCanonicalHistory, true);
});

test("node-role review chain reports malformed inputs", () => {
  const evidence = buildTestbedEdgeNodeRoleReviewChainEvidence({
    causalEvidence: null,
    testbedReviewEvidence: null,
    edgeReviewStatus: null,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.MALFORMED);
  assert.equal(evidence.reasonCodes.includes("node_role_chain_causal_missing_or_malformed"), true);
  assert.equal(evidence.reasonCodes.includes("node_role_chain_testbed_missing_or_malformed"), true);
  assert.equal(evidence.reasonCodes.includes("node_role_chain_edge_status_missing_or_malformed"), true);
});

test("node-role review chain status vocabulary is bounded", () => {
  assert.deepEqual(listTestbedEdgeNodeRoleReviewChainStatuses(), [
    "node_role_review_chain_visible",
    "node_role_review_chain_blocked",
    "node_role_review_chain_malformed",
    "node_role_review_chain_incomplete"
  ]);
});
