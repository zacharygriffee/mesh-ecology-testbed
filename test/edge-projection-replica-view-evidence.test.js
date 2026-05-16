import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeProjectionReplicaViewEvidence,
  listTestbedEdgeProjectionReplicaViewStatuses,
  TESTBED_EDGE_PROJECTION_REPLICA_VIEW_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES
} from "../src/testbed/edge-projection-replica-view-evidence.js";

const CREATED_AT = "2026-05-16T12:20:00.000Z";

function validCausalEvidenceArtifact() {
  return {
    artifactKind: "causal-edge-projection-replica-view-evidence",
    schema: "causal-substrate/edge-projection-replica-view-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-projection-replica-view-evidence:fixture",
    emittedAt: "2026-05-16T12:18:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_projection_event_log_replica_view",
      sourceSchema: "edge_projection_event_log_replica_view.v0"
    },
    replicaViewRefs: {
      viewId: "edge-projection-replica-view:fixture",
      sourceCoreKey: "a".repeat(64),
      viewHash: `sha256:${"b".repeat(64)}`,
      entryRefs: ["projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:fixture:0"],
      projectionEventRefs: ["projection:mesh-ecology-edge:operator_situation_view:fixture"],
      sourceRefs: [
        "causal-edge-self-work-trace-evidence:self-work-trace-fixture",
        "testbed-edge-self-work-trace:self-work-trace-fixture"
      ],
      transportRefs: ["hyperdht-protomux-rpc-direct-peer"],
      branchRefs: ["branch:edge-local-layer:operator-projection"],
      segmentRefs: ["segment:edge-local-layer:operator-projection:latest"],
      happeningRefs: ["happening:edge-projection-event-log-entry:fixture"],
      presentPointRefs: ["present-point:edge-operator:projection-replica-view"],
      observerRefs: ["observer:edge-operator"]
    },
    viewPosture: {
      derivedFromReadOnlyReplica: true,
      replicatedProjectionViewCandidate: true,
      sourceCoreKeyRequired: true,
      sourceLocalStoreRootUsedAsSeam: false,
      localPathSeam: false,
      httpSeam: false,
      sshSeam: false,
      writesSourceStore: false,
      writesReplicaStore: false,
      writesDurableLocalLayerState: false,
      productionLocalLayerState: false,
      autobaseBackend: false,
      wallClockDefinesCausalOrder: false,
      collaborativeCausalOrderCandidate: "autobase_or_equivalent_linearization"
    },
    continuityPosture: {
      observerRelativeReplicaView: true,
      sourceCoreKeyPresent: true,
      projectionRecordsVisible: true,
      semanticRefsPresent: true,
      causalRefsPresent: true,
      entryRefsPreserved: true,
      readOnlyReplicaView: true,
      acceptedAsCanonicalHistory: false,
      acceptedAsDurableState: false,
      acceptedAsRuntimeAuthority: false,
      causalContinuityRole: "projection-replica-view-continuity-evidence"
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      edgeRuntimeFetched: false,
      edgeCalled: false,
      edgeMutated: false,
      opensCorestore: false,
      opensAutobase: false,
      opensHyperDHT: false,
      opensProtomux: false,
      replaysProjectionLog: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsReplicatedState: false,
      claimsDurableState: false,
      claimsCausalTruth: false,
      startsBackend: false,
      publishesToMesh: false
    },
    validation: {
      status: "edge-projection-replica-view-valid-evidence",
      sourceCoreKeyPresent: true,
      projectionRecordsVisible: true,
      sourceRefsPresent: true,
      causalRefsPresent: true,
      unsafeRefsBlocked: true,
      unsafeClaimsBlocked: true
    },
    reviewStatus: "edge-projection-replica-view-evidence-emitted",
    reasonCodes: ["edge-projection-replica-view-preserved-as-evidence-only"]
  };
}

function build(evidenceArtifact = validCausalEvidenceArtifact(), overrides = {}) {
  return buildTestbedEdgeProjectionReplicaViewEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT,
    ...overrides
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedCalledCausalSubstrate, false);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedOpenedHyperDHT, false);
  assert.equal(evidence.testbedOpenedProtomux, false);
  assert.equal(evidence.testbedReplayedProjectionLog, false);
  assert.equal(evidence.testbedWroteContinuityRecords, false);
  assert.equal(evidence.testbedAcceptedCanonicalHistory, false);
  assert.equal(evidence.testbedClaimedCausalTruth, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
}

test("valid causal projection replica view is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_projection_replica_view_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["projection_replica_view_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-projection-replica-view-evidence");
  assert.equal(evidence.sourceSchema, "causal-substrate/edge-projection-replica-view-evidence/v1");
  assert.equal(evidence.sourceSchemaVersion, 1);
  assert.equal(evidence.edgeSourceArtifactKind, "edge_projection_event_log_replica_view");
  assert.equal(evidence.edgeSourceSchema, "edge_projection_event_log_replica_view.v0");
  assert.equal(evidence.sourceCoreKey, "a".repeat(64));
  assert.equal(evidence.entryRefCount, 1);
  assert.equal(evidence.projectionEventRefCount, 1);
  assert.equal(evidence.sourceRefCount, 2);
  assert.equal(evidence.transportRefCount, 1);
  assert.equal(evidence.happeningRefCount, 1);
  assert.equal(evidence.branchRefCount, 1);
  assert.equal(evidence.segmentRefCount, 1);
  assert.equal(evidence.replicatedProjectionViewCandidate, true);
  assert.equal(evidence.derivedFromReadOnlyReplica, true);
  assert.equal(evidence.productionLocalLayerState, false);
  assert.equal(evidence.writesDurableLocalLayerState, false);
  assert.equal(evidence.writesReplicaStore, false);
  assert.equal(evidence.httpSeam, false);
  assert.equal(evidence.sshSeam, false);
  assert.equal(evidence.localPathSeam, false);
  assert.equal(evidence.wallClockDefinesCausalOrder, false);
  assert.equal(evidence.continuityRole, "projection-replica-view-continuity-evidence");
  assert.equal(evidence.observerRelativeReplicaView, true);
  assert.equal(evidence.acceptedAsCanonicalHistory, false);
  assert.equal(evidence.acceptedAsDurableState, false);
  assert.equal(evidence.acceptedAsRuntimeAuthority, false);
  assertPassiveEvidence(evidence);
});

test("projection replica view evidence blocks backend state and authority overclaims", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.boundary.opensCorestore = true;
  artifact.boundary.claimsReplicatedState = true;
  artifact.boundary.claimsDurableState = true;
  artifact.viewPosture.writesReplicaStore = true;
  artifact.viewPosture.productionLocalLayerState = true;
  artifact.continuityPosture.acceptedAsCanonicalHistory = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_posture_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_continuity_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_boundary_overclaim"), true);
  assert.equal(evidence.causalEvidenceOpenedCorestore, true);
  assert.equal(evidence.causalEvidenceClaimedReplicatedState, true);
  assert.equal(evidence.causalEvidenceClaimedDurableState, true);
  assert.equal(evidence.writesReplicaStore, true);
  assert.equal(evidence.productionLocalLayerState, true);
  assert.equal(evidence.acceptedAsCanonicalHistory, true);
  assertPassiveEvidence(evidence);
});

test("projection replica view evidence blocks unsafe refs and wall-clock causal ordering", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.replicaViewRefs.sourceRefs = ["../state/targets.json"];
  artifact.replicaViewRefs.transportRefs = ["ssh://edge-host", "http://127.0.0.1:8787"];
  artifact.viewPosture.wallClockDefinesCausalOrder = true;
  artifact.viewPosture.httpSeam = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_posture_overclaim"), true);
  assert.equal(evidence.httpSeam, true);
  assert.equal(evidence.wallClockDefinesCausalOrder, true);
  assertPassiveEvidence(evidence);
});

test("projection replica view evidence reports missing source or causal refs as incomplete", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.replicaViewRefs.sourceRefs = [];
  artifact.replicaViewRefs.branchRefs = [];
  artifact.replicaViewRefs.segmentRefs = [];
  artifact.replicaViewRefs.happeningRefs = [];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_source_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_causal_refs_missing"), true);
  assertPassiveEvidence(evidence);
});

test("projection replica view evidence reports reviewer-required missing source refs", () => {
  const evidence = build(validCausalEvidenceArtifact(), {
    requiredSourceRefs: [
      "causal-edge-self-work-trace-evidence:self-work-trace-fixture",
      "testbed:missing"
    ]
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_replica_view_required_source_refs_missing"), true);
  assert.deepEqual(evidence.requiredSourceRefs, [
    "causal-edge-self-work-trace-evidence:self-work-trace-fixture",
    "testbed:missing"
  ]);
  assertPassiveEvidence(evidence);
});

test("projection replica view evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedEdgeProjectionReplicaViewEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["projection_replica_view_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedEdgeProjectionReplicaViewStatuses(), [
    "projection_replica_view_visible",
    "projection_replica_view_blocked",
    "projection_replica_view_malformed",
    "projection_replica_view_incomplete"
  ]);
});
