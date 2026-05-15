import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedLocalLayerProjectionHappeningMapEvidence,
  listTestbedLocalLayerProjectionHappeningMapStatuses,
  TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_EVIDENCE_SCHEMA_VERSION,
  TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES
} from "../src/testbed/local-layer-projection-happening-map-evidence.js";

const CREATED_AT = "2026-05-15T13:10:00.000Z";

function validHappeningMapArtifact() {
  return {
    artifactKind: "causal-edge-projection-log-happening-map",
    schema: "causal-substrate/edge-projection-log-happening-map/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-projection-log-happening-map:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-15T13:05:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceSchema: "edge_projection_event_log_entry.v0",
      sourceArtifactKind: "edge_projection_event_log_entry"
    },
    happeningRefs: [
      {
        happeningId: "causal-edge-projection-log-happening:bbbbbbbbbbbbbbbb",
        happeningLabel: "edge-projection-event-log-entry",
        sourceEntryRef: "projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa:0",
        sourceProjectionEventRef: "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
        projectionRef: "edge-operator-situation:op-status",
        payloadHash: `sha256:${"a".repeat(64)}`,
        payloadHashAlgorithm: "sha256-canonical-json",
        sequence: 0,
        namespaceParts: [
          "mesh-ecology",
          "local-layer",
          "projection-event",
          "v0",
          "producer-mesh-ecology-edge",
          "projection-operator-situation-view"
        ],
        sourceRefs: [
          "edge-operator-situation:op-status",
          "operation:op-status",
          `sha256:${"b".repeat(64)}`
        ],
        transportRefs: ["protomux-rpc:hyperdht_direct_peer"],
        temporalRef: "2026-05-15T13:00:01.000Z",
        temporalRefSource: "log-entry",
        temporalRefMeaning: "wall-clock-observation-metadata",
        localCausalOrderSource: "single-writer-sequence-and-event-refs",
        wallClockDefinesCausalOrder: false,
        collaborativeCausalOrderCandidate: "autobase-or-equivalent-linearization",
        causalRole: "edge-projection-log-entry-as-happening-reference",
        acceptedAsCanonicalHistory: false
      }
    ],
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      edgeRuntimeFetched: false,
      edgeCalled: false,
      edgeMutated: false,
      sourceCorestoreOpened: false,
      replaysProjectionLog: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      startsBackend: false,
      requiresAutobase: false,
      publishesToMesh: false
    },
    validation: {
      status: "edge-projection-log-entry-valid",
      parseableObject: true,
      entryPreservedAsReference: true,
      sourceRefsPresent: true,
      temporalRefPresent: true,
      timePostureDistinguishesWallClock: true,
      namespacePartsSemantic: true,
      noStorageOrTransportOverclaim: true,
      noAuthorityOrTruthClaim: true,
      issues: []
    },
    reviewStatus: "edge-projection-log-happening-map-emitted",
    warnings: [
      "edge-projection-log-entry-preserved-as-happening-reference-only",
      "wall-clock-temporal-ref-is-observation-metadata-not-causal-order",
      "collaborative-causal-order-should-use-autobase-or-equivalent-linearization",
      "mapping-does-not-write-continuity-records"
    ],
    rejections: []
  };
}

function build(happeningMapArtifact = validHappeningMapArtifact(), overrides = {}) {
  return buildTestbedLocalLayerProjectionHappeningMapEvidence({
    happeningMapArtifact,
    createdAt: CREATED_AT,
    ...overrides
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedCalledCausalSubstrate, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedReplayedProjectionLog, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.testbedAcceptsCanonicalHistory, false);
  assert.equal(evidence.testbedClaimsCausalTruth, false);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.storageBackendInstalled, false);
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("valid causal projection happening map is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_local_layer_projection_happening_map_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["projection_happening_map_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-projection-log-happening-map");
  assert.equal(evidence.sourceSchema, "causal-substrate/edge-projection-log-happening-map/v1");
  assert.equal(evidence.sourceSchemaVersion, 1);
  assert.equal(evidence.happeningRefCount, 1);
  assert.equal(evidence.firstTemporalRef, "2026-05-15T13:00:01.000Z");
  assert.equal(evidence.firstTemporalRefMeaning, "wall-clock-observation-metadata");
  assert.equal(evidence.firstLocalCausalOrderSource, "single-writer-sequence-and-event-refs");
  assert.equal(evidence.firstWallClockDefinesCausalOrder, false);
  assert.equal(evidence.firstCollaborativeCausalOrderCandidate, "autobase-or-equivalent-linearization");
  assert.equal(evidence.firstAcceptedAsCanonicalHistory, false);
  assert.equal(evidence.causalSubstrateBoundaryReviewOnly, true);
  assert.equal(evidence.causalSubstrateBoundaryEvidenceOnly, true);
  assert.equal(evidence.causalSubstrateOpenedEdgeCorestore, false);
  assert.equal(evidence.causalSubstrateWritesContinuityRecords, false);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, false);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, false);
  assert.equal(evidence.causalSubstrateTimePostureDistinguishesWallClock, true);
  assertPassiveEvidence(evidence);
});

test("projection happening map evidence blocks wall-clock-as-causal-order drift", () => {
  const artifact = validHappeningMapArtifact();
  artifact.happeningRefs[0].wallClockDefinesCausalOrder = true;
  artifact.validation.timePostureDistinguishesWallClock = false;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_wall_clock_claims_causal_order"), true);
  assert.equal(evidence.reasonCodes.includes("projection_happening_map_validation_not_ready"), true);
  assert.equal(evidence.firstWallClockDefinesCausalOrder, true);
  assert.equal(evidence.causalSubstrateTimePostureDistinguishesWallClock, false);
  assertPassiveEvidence(evidence);
});

test("projection happening map evidence blocks boundary overclaims", () => {
  const artifact = validHappeningMapArtifact();
  artifact.boundary.sourceCorestoreOpened = true;
  artifact.boundary.writesContinuityRecords = true;
  artifact.boundary.acceptsCanonicalHistory = true;
  artifact.boundary.claimsCausalTruth = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_happening_map_boundary_overclaim"), true);
  assert.equal(evidence.causalSubstrateOpenedEdgeCorestore, true);
  assert.equal(evidence.causalSubstrateWritesContinuityRecords, true);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, true);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, true);
  assertPassiveEvidence(evidence);
});

test("projection happening map evidence blocks namespace transport and canonical-history drift", () => {
  const artifact = validHappeningMapArtifact();
  artifact.happeningRefs[0].namespaceParts = [
    "mesh-ecology",
    "local-layer",
    "projection-event",
    "v0",
    "producer-http://127.0.0.1:8787",
    "../projection-operator-situation-view"
  ];
  artifact.happeningRefs[0].transportRefs = ["ssh://edge-device", "http://127.0.0.1:8787"];
  artifact.happeningRefs[0].acceptedAsCanonicalHistory = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_namespace_prefix_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_namespace_contains_scaffold_or_path"), true);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_transport_contains_compat_scaffold"), true);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_claims_canonical_history"), true);
  assert.equal(evidence.firstAcceptedAsCanonicalHistory, true);
  assertPassiveEvidence(evidence);
});

test("projection happening map evidence reports missing refs and observation time as incomplete", () => {
  const artifact = validHappeningMapArtifact();
  artifact.happeningRefs[0].sourceRefs = [];
  delete artifact.happeningRefs[0].temporalRef;
  artifact.validation.sourceRefsPresent = false;
  artifact.validation.temporalRefPresent = false;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_source_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("projection_happening_ref_observation_time_missing"), true);
  assert.equal(evidence.reasonCodes.includes("projection_happening_map_validation_not_ready"), true);
  assertPassiveEvidence(evidence);
});

test("projection happening map evidence reports reviewer-required missing source refs", () => {
  const evidence = build(validHappeningMapArtifact(), {
    requiredSourceRefs: ["operation:op-status", "contact-proof:missing"]
  });

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_happening_map_required_source_refs_missing"), true);
  assert.deepEqual(evidence.requiredSourceRefs, ["operation:op-status", "contact-proof:missing"]);
  assertPassiveEvidence(evidence);
});

test("projection happening map evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedLocalLayerProjectionHappeningMapEvidence({
    happeningMapArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["projection_happening_map_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedLocalLayerProjectionHappeningMapStatuses(), [
    "projection_happening_map_visible",
    "projection_happening_map_blocked",
    "projection_happening_map_malformed",
    "projection_happening_map_incomplete"
  ]);
});
