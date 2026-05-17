import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeAutobaseProjectionViewEvidence,
  listTestbedEdgeAutobaseProjectionViewStatuses,
  TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES
} from "../src/testbed/edge-autobase-projection-view-evidence.js";

const CREATED_AT = "2026-05-16T18:20:00.000Z";

function validCausalEvidenceArtifact() {
  return {
    artifactKind: "causal-edge-autobase-projection-view-evidence",
    schema: "causal-substrate/edge-autobase-projection-view-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-autobase-projection-view-evidence:fixture",
    emittedAt: "2026-05-16T18:18:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_autobase_projection_view",
      sourceSchema: "edge_autobase_projection_view.v0"
    },
    projectionViewRefs: {
      viewId: "edge-autobase-projection-view:fixture",
      sourceFrontierCandidateId: "local-layer-frontier:fixture",
      projectionLaneRef: "local-layer-projection-log:edge-operator-situation",
      layerRef: "local-layer:operator-owned-devices",
      observerRef: "operator-participant:edge-operator",
      writerRefs: ["autobase-writer:a", "autobase-writer:b"],
      headRefs: ["autobase-head:a:length-2:aaaa", "autobase-head:b:length-2:bbbb"],
      linearizedEntryRefs: ["autobase-linearized-entry:0:aaaa", "autobase-linearized-entry:1:bbbb"],
      causalFrontierRefs: ["causal-frontier:autobase-linearization:fixture"],
      sourceProjectionEventRefs: ["projection:mesh-ecology-edge:operator_situation_view:a"],
      sourceEntryRefs: ["projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:a:0"],
      sourceHappeningRefs: ["causal-edge-projection-happening:device-a"]
    },
    orderingEvidence: {
      orderingSource: "autobase_linearization",
      wallClockDefinesCausalOrder: false,
      appendSuccessIsAcceptance: false,
      derivedFromAutobaseView: true,
      collaborativeProjectionViewCandidate: true
    },
    storageLanePosture: {
      intendedStorageLane: "bounded_autobase_equivalent_linearization",
      inputSemanticUnit: "mesh_ecology_local_layer_projection_event",
      requiresPromotedProjectionEventInput: true,
      sandboxedOnly: true,
      productionBackendPromoted: false,
      storageRecordPromoted: false,
      edgeStateMigration: false,
      appendSuccessIsAcceptance: false,
      linearizationIsTruth: false,
      replicaVisibilityIsContinuity: false,
      wallClockDefinesCausalOrder: false,
      discoveryAbsenceIsFailure: false
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
      claimsDurableState: false,
      claimsReplicatedState: false,
      claimsRuntimeAuthority: false,
      startsBackend: false,
      publishesToMesh: false
    },
    validation: {
      status: "edge-autobase-projection-view-valid-evidence"
    },
    reviewStatus: "edge-autobase-projection-view-evidence-emitted"
  };
}

function build(evidenceArtifact = validCausalEvidenceArtifact()) {
  return buildTestbedEdgeAutobaseProjectionViewEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedCalledCausalSubstrate, false);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.testbedAcceptsCanonicalHistory, false);
  assert.equal(evidence.testbedClaimsCausalTruth, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.canonicalHistoryClaimed, false);
  assert.equal(evidence.runtimeAuthorityClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
}

test("valid causal Autobase projection view is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_autobase_projection_view_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["autobase_projection_view_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-autobase-projection-view-evidence");
  assert.equal(evidence.sourceSchema, "causal-substrate/edge-autobase-projection-view-evidence/v1");
  assert.equal(evidence.sourceReviewStatus, "edge-autobase-projection-view-evidence-emitted");
  assert.equal(evidence.viewId, "edge-autobase-projection-view:fixture");
  assert.equal(evidence.sourceFrontierCandidateId, "local-layer-frontier:fixture");
  assert.equal(evidence.writerRefCount, 2);
  assert.equal(evidence.headRefCount, 2);
  assert.equal(evidence.linearizedEntryRefCount, 2);
  assert.equal(evidence.causalFrontierRefCount, 1);
  assert.equal(evidence.orderingSource, "autobase_linearization");
  assert.equal(evidence.derivedFromAutobaseView, true);
  assert.equal(evidence.collaborativeProjectionViewCandidate, true);
  assert.equal(evidence.wallClockDefinesCausalOrder, false);
  assert.equal(evidence.appendSuccessIsAcceptance, false);
  assert.equal(evidence.intendedStorageLane, "bounded_autobase_equivalent_linearization");
  assert.equal(evidence.inputSemanticUnit, "mesh_ecology_local_layer_projection_event");
  assert.equal(evidence.requiresPromotedProjectionEventInput, true);
  assert.equal(evidence.sandboxedOnly, true);
  assert.equal(evidence.productionBackendPromoted, false);
  assert.equal(evidence.storageRecordPromoted, false);
  assert.equal(evidence.appendSuccessIsAcceptanceStorage, false);
  assert.equal(evidence.linearizationIsTruth, false);
  assert.equal(evidence.replicaVisibilityIsContinuity, false);
  assert.equal(evidence.discoveryAbsenceIsFailure, false);
  assertPassiveEvidence(evidence);
});

test("Autobase projection view review blocks backend state and authority overclaims", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.boundary.opensAutobase = true;
  artifact.boundary.claimsDurableState = true;
  artifact.boundary.claimsReplicatedState = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("autobase_projection_view_boundary_overclaim"), true);
  assert.equal(evidence.causalEvidenceOpenedAutobase, true);
  assert.equal(evidence.causalEvidenceClaimedDurableState, true);
  assert.equal(evidence.causalEvidenceClaimedReplicatedState, true);
  assertPassiveEvidence(evidence);
});

test("Autobase projection view review blocks unsafe refs and append-success ordering", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.projectionViewRefs.sourceEntryRefs = ["../projection-entry.json"];
  artifact.orderingEvidence.appendSuccessIsAcceptance = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("autobase_projection_view_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("autobase_projection_view_ordering_posture_overclaim"), true);
  assert.equal(evidence.appendSuccessIsAcceptance, true);
  assertPassiveEvidence(evidence);
});

test("Autobase projection view review reports missing collaborative refs as incomplete", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.projectionViewRefs.writerRefs = [];
  artifact.projectionViewRefs.headRefs = [];
  artifact.projectionViewRefs.causalFrontierRefs = [];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("autobase_projection_view_writer_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("autobase_projection_view_head_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("autobase_projection_view_causal_frontier_refs_missing"), true);
  assertPassiveEvidence(evidence);
});

test("Autobase projection view review handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedEdgeAutobaseProjectionViewEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["autobase_projection_view_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedEdgeAutobaseProjectionViewStatuses(), [
    "autobase_projection_view_visible",
    "autobase_projection_view_blocked",
    "autobase_projection_view_malformed",
    "autobase_projection_view_incomplete"
  ]);
});
