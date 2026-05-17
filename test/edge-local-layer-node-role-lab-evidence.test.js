import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerNodeRoleLabEvidence,
  listTestbedEdgeLocalLayerNodeRoleLabStatuses,
  TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES
} from "../src/testbed/edge-local-layer-node-role-lab-evidence.js";

const CREATED_AT = "2026-05-17T13:30:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-node-role-lab-evidence",
    schema: "causal-substrate/edge-local-layer-node-role-lab-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-node-role-lab-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-17T13:00:00.000Z",
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

function build(evidenceArtifact = causalEvidence()) {
  return buildTestbedEdgeLocalLayerNodeRoleLabEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

test("node role lab causal evidence is consumed as review-only pressure", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_local_layer_node_role_lab_evidence");
  assert.equal(evidence.schemaVersion, "testbed_edge_local_layer_node_role_lab_evidence.v1");
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["node_role_lab_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-local-layer-node-role-lab-evidence");
  assert.equal(evidence.sourceReviewStatus, "edge-local-layer-node-role-lab-evidence-emitted");
  assert.equal(evidence.acceptedProjectionRecordRefCount, 1);
  assert.equal(evidence.acceptedLogEntryRefCount, 1);
  assert.equal(evidence.rejectedReviewRefCount, 1);
  assert.equal(evidence.observabilityIsAuthority, false);
  assert.equal(evidence.writabilityIsAuthority, false);
  assert.equal(evidence.appendSuccessIsAcceptance, false);
  assert.equal(evidence.deterministicApplyOwnsAcceptance, true);
  assert.equal(evidence.observerAcceptedContinuityInput, false);
  assert.equal(evidence.candidateAcceptedContinuityInput, false);
  assert.equal(evidence.admittedAcceptedContinuityInput, true);
  assert.equal(evidence.acceptedContinuityInputKind, "mesh_ecology_local_layer_projection_event");
  assert.equal(evidence.deviceBranchesRemainDeviceOwned, true);
  assert.equal(evidence.localLayerStoresProjectionRefs, true);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.authorityGranted, false);
});

test("node role lab review blocks authority and append acceptance drift", () => {
  const artifact = causalEvidence();
  artifact.roleSeparation.observabilityIsAuthority = true;
  artifact.roleSeparation.appendSuccessIsAcceptance = true;
  artifact.roleSeparation.candidateAcceptedContinuityInput = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("node_role_lab_role_separation_missing_or_unsafe"), true);
  assert.equal(evidence.observabilityIsAuthority, true);
  assert.equal(evidence.candidateAcceptedContinuityInput, true);
});

test("node role lab review blocks unsafe refs and backend overclaims", () => {
  const artifact = causalEvidence();
  artifact.refs.nodeRefs.observerWriterRef = "ssh://observer-device";
  artifact.boundary.opensAutobase = true;
  artifact.boundary.claimsCausalTruth = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("node_role_lab_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("node_role_lab_boundary_overclaim"), true);
  assert.equal(evidence.causalEvidenceOpenedAutobase, true);
});

test("node role lab review reports missing source refs as incomplete", () => {
  const artifact = causalEvidence();
  artifact.refs.acceptedProjectionRecordRefs = [];
  artifact.refs.acceptedLogEntryRefs = [];
  artifact.refs.rejectedReviewRefs = [];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("node_role_lab_accepted_projection_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("node_role_lab_accepted_log_entry_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("node_role_lab_rejected_review_refs_missing"), true);
});

test("node role lab status vocabulary is bounded", () => {
  assert.deepEqual(listTestbedEdgeLocalLayerNodeRoleLabStatuses(), [
    "node_role_lab_visible",
    "node_role_lab_blocked",
    "node_role_lab_malformed",
    "node_role_lab_incomplete"
  ]);
});
