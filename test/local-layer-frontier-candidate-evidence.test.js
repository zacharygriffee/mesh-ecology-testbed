import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedLocalLayerFrontierCandidateEvidence,
  listTestbedLocalLayerFrontierCandidateStatuses,
  TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_EVIDENCE_SCHEMA_VERSION,
  TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES
} from "../src/testbed/local-layer-frontier-candidate-evidence.js";

const CREATED_AT = "2026-05-15T14:10:00.000Z";

function validFrontierEvidenceArtifact() {
  return {
    artifactKind: "causal-local-layer-frontier-candidate-evidence",
    schema: "causal-substrate/local-layer-frontier-candidate-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-local-layer-frontier-candidate-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-15T14:00:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-spine",
      sourceArtifactKind: "local_layer_collaborative_projection_frontier_candidate",
      sourceSchema: "mesh-ecology-spine/local-layer-collaborative-frontier/v0"
    },
    frontierRefs: {
      frontierId: "local-layer-frontier:operator-situation:aaaaaaaaaaaaaaaa",
      projectionLaneRef: "local-layer-projection-log:operator-situation",
      layerRef: "local-layer:operator-owned-devices",
      observerRef: "operator-participant:edge-operator",
      writerRefs: [
        "local-layer-writer:device-a",
        "local-layer-writer:device-b"
      ],
      headRefs: [
        "autobase-head:device-a:1:aaaaaaaaaaaaaaaa",
        "autobase-head:device-b:1:bbbbbbbbbbbbbbbb"
      ],
      linearizedEntryRefs: [
        "local-layer-linearized-entry:0:aaaaaaaaaaaaaaaa",
        "local-layer-linearized-entry:1:bbbbbbbbbbbbbbbb"
      ],
      causalFrontierRefs: [
        "causal-frontier:aaaaaaaaaaaaaaaa"
      ],
      sourceProjectionEventRefs: [
        "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa"
      ],
      sourceHappeningRefs: [
        "causal-edge-projection-log-happening:bbbbbbbbbbbbbbbb"
      ]
    },
    orderingEvidence: {
      orderingSource: "autobase_linearization",
      wallClockDefinesCausalOrder: false,
      headsRequired: true,
      writerRefsRequired: true,
      sourceRefsRequired: true,
      lineageRefsRequired: true,
      collaborativeCausalOrderCandidate: "autobase-or-equivalent-linearization"
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
      callsMesh: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      claimsLayerSettlement: false,
      publishesToMesh: false,
      startsBackend: false
    },
    validation: {
      status: "local-layer-frontier-candidate-valid-evidence",
      parseableObject: true,
      expectedSourceSchemaPresent: true,
      writerRefsPresent: true,
      headRefsPresent: true,
      linearizedEntryRefsPresent: true,
      causalFrontierRefsPresent: true,
      sourceRefsPresent: true,
      wallClockCausalOrderBlocked: true,
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true,
      storageLanePosturePresent: true,
      issues: []
    },
    reviewStatus: "local-layer-frontier-candidate-evidence-emitted",
    warnings: [
      "frontier-candidate-preserved-as-evidence-only",
      "autobase-linearization-named-without-opening-autobase",
      "wall-clock-time-is-observation-metadata-not-causal-order"
    ],
    rejections: []
  };
}

function build(evidenceArtifact = validFrontierEvidenceArtifact(), overrides = {}) {
  return buildTestbedLocalLayerFrontierCandidateEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT,
    ...overrides
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

test("valid causal frontier candidate evidence is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_local_layer_frontier_candidate_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["frontier_candidate_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-local-layer-frontier-candidate-evidence");
  assert.equal(evidence.sourceSchema, "causal-substrate/local-layer-frontier-candidate-evidence/v1");
  assert.equal(evidence.sourceSchemaVersion, 1);
  assert.equal(evidence.frontierId, "local-layer-frontier:operator-situation:aaaaaaaaaaaaaaaa");
  assert.equal(evidence.writerRefCount, 2);
  assert.equal(evidence.headRefCount, 2);
  assert.equal(evidence.linearizedEntryRefCount, 2);
  assert.equal(evidence.causalFrontierRefCount, 1);
  assert.equal(evidence.sourceProjectionEventRefCount, 1);
  assert.equal(evidence.sourceHappeningRefCount, 1);
  assert.equal(evidence.orderingSource, "autobase_linearization");
  assert.equal(evidence.wallClockDefinesCausalOrder, false);
  assert.equal(evidence.collaborativeCausalOrderCandidate, "autobase-or-equivalent-linearization");
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
  assert.equal(evidence.causalSubstrateBoundaryReviewOnly, true);
  assert.equal(evidence.causalSubstrateBoundaryEvidenceOnly, true);
  assert.equal(evidence.causalSubstrateOpenedAutobase, false);
  assert.equal(evidence.causalSubstrateOpenedCorestore, false);
  assert.equal(evidence.causalSubstrateWritesContinuityRecords, false);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, false);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, false);
  assert.equal(evidence.causalSubstrateClaimsLayerSettlement, false);
  assert.equal(evidence.causalSubstrateValidationWallClockBlocked, true);
  assertPassiveEvidence(evidence);
});

test("pre-Autobase frontier fixture evidence remains visible without backend claims", () => {
  const artifact = validFrontierEvidenceArtifact();
  artifact.artifactId = "causal-local-layer-frontier-candidate-evidence:fixture";
  artifact.frontierRefs.frontierId = "local-layer-frontier:6fbd2eeefed242208326ce7f";
  artifact.orderingEvidence.orderingSource = "frontier_candidate_fixture";
  artifact.warnings = [
    "frontier-candidate-preserved-as-evidence-only",
    "frontier-candidate-fixture-precedes-autobase-backend",
    "wall-clock-time-is-observation-metadata-not-causal-order"
  ];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["frontier_candidate_visible"]);
  assert.equal(evidence.orderingSource, "frontier_candidate_fixture");
  assert.equal(evidence.wallClockDefinesCausalOrder, false);
  assert.equal(evidence.causalSubstrateOpenedAutobase, false);
  assert.equal(evidence.causalSubstrateOpenedCorestore, false);
  assert.equal(evidence.causalSubstrateWritesContinuityRecords, false);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, false);
  assertPassiveEvidence(evidence);
});

test("frontier candidate evidence blocks wall-clock-as-causal-order drift", () => {
  const artifact = validFrontierEvidenceArtifact();
  artifact.orderingEvidence.wallClockDefinesCausalOrder = true;
  artifact.validation.wallClockCausalOrderBlocked = false;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_wall_clock_claims_causal_order"), true);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_validation_not_ready"), true);
  assert.equal(evidence.wallClockDefinesCausalOrder, true);
  assert.equal(evidence.causalSubstrateValidationWallClockBlocked, false);
  assertPassiveEvidence(evidence);
});

test("frontier candidate evidence blocks causal-substrate boundary overclaims", () => {
  const artifact = validFrontierEvidenceArtifact();
  artifact.boundary.opensAutobase = true;
  artifact.boundary.opensCorestore = true;
  artifact.boundary.writesContinuityRecords = true;
  artifact.boundary.acceptsCanonicalHistory = true;
  artifact.boundary.claimsCausalTruth = true;
  artifact.boundary.claimsLayerSettlement = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_boundary_overclaim"), true);
  assert.equal(evidence.causalSubstrateOpenedAutobase, true);
  assert.equal(evidence.causalSubstrateOpenedCorestore, true);
  assert.equal(evidence.causalSubstrateWritesContinuityRecords, true);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, true);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, true);
  assert.equal(evidence.causalSubstrateClaimsLayerSettlement, true);
  assertPassiveEvidence(evidence);
});

test("frontier candidate evidence blocks HTTP SSH local path seam refs", () => {
  const artifact = validFrontierEvidenceArtifact();
  artifact.frontierRefs.writerRefs = ["local-layer-writer:http://127.0.0.1:8787"];
  artifact.frontierRefs.headRefs = ["ssh://device-a"];
  artifact.frontierRefs.sourceProjectionEventRefs = ["../projection-event.json"];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_ref_contains_compat_or_path_seam"), true);
  assertPassiveEvidence(evidence);
});

test("frontier candidate evidence reports missing writer heads frontier and source refs as incomplete", () => {
  const artifact = validFrontierEvidenceArtifact();
  artifact.frontierRefs.writerRefs = [];
  artifact.frontierRefs.headRefs = [];
  artifact.frontierRefs.linearizedEntryRefs = [];
  artifact.frontierRefs.causalFrontierRefs = [];
  artifact.frontierRefs.sourceProjectionEventRefs = [];
  artifact.validation.writerRefsPresent = false;
  artifact.validation.headRefsPresent = false;
  artifact.validation.linearizedEntryRefsPresent = false;
  artifact.validation.causalFrontierRefsPresent = false;
  artifact.validation.sourceRefsPresent = false;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_writer_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_head_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_linearized_entry_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_causal_frontier_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_validation_not_ready"), true);
  assertPassiveEvidence(evidence);
});

test("frontier candidate evidence reports reviewer-required missing source refs", () => {
  const evidence = build(validFrontierEvidenceArtifact(), {
    requiredSourceRefs: [
      "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
      "causal-edge-projection-log-happening:missing"
    ]
  });

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("frontier_candidate_required_source_refs_missing"), true);
  assert.deepEqual(evidence.requiredSourceRefs, [
    "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
    "causal-edge-projection-log-happening:missing"
  ]);
  assertPassiveEvidence(evidence);
});

test("frontier candidate evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedLocalLayerFrontierCandidateEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["frontier_candidate_evidence_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedLocalLayerFrontierCandidateStatuses(), [
    "frontier_candidate_visible",
    "frontier_candidate_blocked",
    "frontier_candidate_malformed",
    "frontier_candidate_incomplete"
  ]);
});
