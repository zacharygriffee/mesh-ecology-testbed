import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeStorageLaneCandidateEvidence,
  listTestbedEdgeStorageLaneCandidateStatuses,
  TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES
} from "../src/testbed/edge-storage-lane-candidate-evidence.js";

const CREATED_AT = "2026-05-17T12:30:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-storage-lane-candidate-evidence",
    schema: "causal-substrate/edge-storage-lane-candidate-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-storage-lane-candidate-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-17T12:00:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_local_layer_storage_lane_candidate",
      sourceSchema: "edge_local_layer_storage_lane_candidate.v0"
    },
    refs: {
      candidateId: "edge-local-layer-storage-lane-candidate:aaaaaaaaaaaaaaaaaaaaaaaa",
      layerRef: "local-layer:operator-owned-devices",
      projectionLaneRef: "local-layer-projection-lane:edge-operator-situation",
      observerRef: "observer:edge-operator",
      sourceProjectionEventRefs: ["projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa"],
      sourceEntryRefs: ["projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa:0"],
      sourceIdentityHashes: [`sha256:${"a".repeat(64)}`],
      sourceRefs: [
        "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
        "projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa:0",
        `sha256:${"a".repeat(64)}`
      ]
    },
    writerAdmission: {
      policyKind: "operator_owned_local_layer_explicit_writer_admission",
      admittedWriterRefs: ["local-layer-writer:operator-device-a"],
      candidateWriterRefs: ["local-layer-writer:operator-device-a"],
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

function build(evidenceArtifact = causalEvidence()) {
  return buildTestbedEdgeStorageLaneCandidateEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

test("storage lane candidate causal evidence is consumed as review-only pressure", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_storage_lane_candidate_evidence");
  assert.equal(evidence.schemaVersion, "testbed_edge_storage_lane_candidate_evidence.v1");
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["storage_lane_candidate_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-storage-lane-candidate-evidence");
  assert.equal(evidence.sourceReviewStatus, "edge-storage-lane-candidate-evidence-emitted");
  assert.equal(evidence.sourceProjectionEventRefCount, 1);
  assert.equal(evidence.sourceEntryRefCount, 1);
  assert.equal(evidence.sourceIdentityHashCount, 1);
  assert.equal(evidence.admittedWriterRefCount, 1);
  assert.equal(evidence.writerAdmissionRequiredBeforeAcceptance, true);
  assert.equal(evidence.operatorMediationRequired, true);
  assert.equal(evidence.appendSuccessIsAcceptance, false);
  assert.equal(evidence.replicaVisibilityIsContinuity, false);
  assert.equal(evidence.linearizationIsTruth, false);
  assert.equal(evidence.productionAutobaseStarted, false);
  assert.equal(evidence.edgeStateMigration, false);
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
});

test("storage lane candidate review blocks append acceptance and backend overclaims", () => {
  const artifact = causalEvidence();
  artifact.acceptanceRule.appendSuccessIsAcceptance = true;
  artifact.storageLanePosture.productionAutobaseStarted = true;
  artifact.boundary.opensAutobase = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_acceptance_rule_missing_or_unsafe"), true);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_storage_posture_missing_or_unsafe"), true);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_boundary_overclaim"), true);
  assert.equal(evidence.appendSuccessIsAcceptance, true);
  assert.equal(evidence.productionAutobaseStarted, true);
  assert.equal(evidence.causalEvidenceOpenedAutobase, true);
});

test("storage lane candidate review blocks unsafe refs and writer admission drift", () => {
  const artifact = causalEvidence();
  artifact.writerAdmission.admittedWriterRefs = ["ssh://operator-device-a"];
  artifact.writerAdmission.generalWriterAuthorityGranted = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_writer_admission_missing_or_unsafe"), true);
});

test("storage lane candidate review reports missing refs as incomplete", () => {
  const artifact = causalEvidence();
  artifact.refs.sourceProjectionEventRefs = [];
  artifact.refs.sourceEntryRefs = [];
  artifact.refs.sourceRefs = [];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_projection_event_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_entry_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("storage_lane_candidate_source_refs_missing"), true);
});

test("storage lane candidate status vocabulary is bounded", () => {
  assert.deepEqual(listTestbedEdgeStorageLaneCandidateStatuses(), [
    "storage_lane_candidate_visible",
    "storage_lane_candidate_blocked",
    "storage_lane_candidate_malformed",
    "storage_lane_candidate_incomplete"
  ]);
});
