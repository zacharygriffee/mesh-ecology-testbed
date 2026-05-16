import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeAutobaseOptimisticIntakeEvidence,
  listTestbedEdgeAutobaseOptimisticIntakeStatuses,
  TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES
} from "../src/testbed/edge-autobase-optimistic-intake-evidence.js";

const CREATED_AT = "2026-05-16T18:10:00.000Z";

function validOptimisticIntakeEvidenceArtifact() {
  return {
    artifactKind: "causal-edge-autobase-optimistic-intake-evidence",
    schema: "causal-substrate/edge-autobase-optimistic-intake-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-autobase-optimistic-intake-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-16T18:00:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_sandboxed_autobase_optimistic_intake_lab_result",
      sourceSchema: "edge_sandboxed_autobase_optimistic_intake_lab_result.v0"
    },
    candidateRefs: {
      acceptedCandidateWriterRef: "autobase-writer:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      rejectedCandidateWriterRef: "autobase-writer:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      acceptedSourceProjectionEventRefs: [
        "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa"
      ],
      rejectedSourceProjectionEventRefs: [
        "projection:mesh-ecology-edge:operator_situation_view:bbbbbbbbbbbbbbbb"
      ]
    },
    intakePosture: {
      sandboxedAutobaseLab: true,
      optimisticIntakeLab: true,
      nonWriterIntakeAllowed: true,
      acceptedViaAckWriter: true,
      rejectedWithoutAckWriter: true,
      appendSuccessIsAcceptance: false,
      acceptanceSource: "deterministic_apply_ackWriter_and_derived_view_materialization",
      productionLocalLayerState: false,
      writesDurableLocalLayerState: false,
      localStoreRootIsIntegrationSeam: false,
      httpSeam: false,
      sshSeam: false,
      wallClockDefinesCausalOrder: false
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
      acceptsAppendAsAcceptance: false,
      grantsWriterAuthority: false,
      claimsCausalTruth: false,
      claimsLayerSettlement: false,
      publishesToMesh: false,
      startsBackend: false
    },
    validation: {
      status: "edge-autobase-optimistic-intake-valid-evidence",
      parseableObject: true,
      expectedSourceSchemaPresent: true,
      acceptedCandidateMaterialized: true,
      rejectedCandidateNotMaterialized: true,
      nonWriterBeforeAppend: true,
      ackWriterAcceptancePresent: true,
      appendSuccessAcceptanceBlocked: true,
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true,
      issues: []
    },
    reviewStatus: "edge-autobase-optimistic-intake-evidence-emitted",
    warnings: [
      "optimistic-intake-preserved-as-evidence-only",
      "append-success-is-not-acceptance",
      "ack-writer-and-derived-view-materialization-are-acceptance-evidence",
      "non-writer-intake-does-not-grant-authority"
    ],
    rejections: []
  };
}

function build(evidenceArtifact = validOptimisticIntakeEvidenceArtifact(), overrides = {}) {
  return buildTestbedEdgeAutobaseOptimisticIntakeEvidence({
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
  assert.equal(evidence.testbedAcceptsAppendAsAcceptance, false);
  assert.equal(evidence.testbedGrantsWriterAuthority, false);
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

test("valid optimistic intake evidence is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_autobase_optimistic_intake_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["optimistic_intake_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-autobase-optimistic-intake-evidence");
  assert.equal(evidence.sourceSchema, "causal-substrate/edge-autobase-optimistic-intake-evidence/v1");
  assert.equal(evidence.sourceSchemaVersion, 1);
  assert.equal(evidence.acceptedSourceProjectionEventRefCount, 1);
  assert.equal(evidence.rejectedSourceProjectionEventRefCount, 1);
  assert.equal(evidence.sandboxedAutobaseLab, true);
  assert.equal(evidence.optimisticIntakeLab, true);
  assert.equal(evidence.nonWriterIntakeAllowed, true);
  assert.equal(evidence.acceptedViaAckWriter, true);
  assert.equal(evidence.rejectedWithoutAckWriter, true);
  assert.equal(evidence.appendSuccessIsAcceptance, false);
  assert.equal(evidence.acceptanceSource, "deterministic_apply_ackWriter_and_derived_view_materialization");
  assert.equal(evidence.causalSubstrateBoundaryReviewOnly, true);
  assert.equal(evidence.causalSubstrateBoundaryEvidenceOnly, true);
  assert.equal(evidence.causalSubstrateOpenedAutobase, false);
  assert.equal(evidence.causalSubstrateOpenedCorestore, false);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, false);
  assert.equal(evidence.causalSubstrateAcceptsAppendAsAcceptance, false);
  assert.equal(evidence.causalSubstrateGrantsWriterAuthority, false);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, false);
  assert.equal(evidence.causalSubstrateValidationRejectedCandidateNotMaterialized, true);
  assert.equal(evidence.causalSubstrateValidationAppendSuccessBlocked, true);
  assertPassiveEvidence(evidence);
});

test("optimistic intake evidence blocks append-as-acceptance and boundary overclaims", () => {
  const artifact = validOptimisticIntakeEvidenceArtifact();
  artifact.intakePosture.appendSuccessIsAcceptance = true;
  artifact.boundary.acceptsAppendAsAcceptance = true;
  artifact.validation.appendSuccessAcceptanceBlocked = false;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("optimistic_intake_append_as_acceptance"), true);
  assert.equal(evidence.reasonCodes.includes("optimistic_intake_boundary_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("optimistic_intake_validation_not_ready"), true);
  assert.equal(evidence.appendSuccessIsAcceptance, true);
  assert.equal(evidence.causalSubstrateAcceptsAppendAsAcceptance, true);
  assert.equal(evidence.causalSubstrateValidationAppendSuccessBlocked, false);
  assertPassiveEvidence(evidence);
});

test("optimistic intake evidence blocks rejected materialization and unsafe seams", () => {
  const artifact = validOptimisticIntakeEvidenceArtifact();
  artifact.candidateRefs.acceptedSourceProjectionEventRefs = ["http://127.0.0.1:8787/projection"];
  artifact.validation.rejectedCandidateNotMaterialized = false;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("optimistic_intake_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("optimistic_intake_validation_not_ready"), true);
  assert.equal(evidence.causalSubstrateValidationRejectedCandidateNotMaterialized, false);
  assertPassiveEvidence(evidence);
});

test("optimistic intake evidence reports reviewer-required missing source refs", () => {
  const evidence = build(validOptimisticIntakeEvidenceArtifact(), {
    requiredSourceRefs: [
      "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
      "projection:mesh-ecology-edge:operator_situation_view:missing"
    ]
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("optimistic_intake_required_source_refs_missing"), true);
  assert.deepEqual(evidence.requiredSourceRefs, [
    "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
    "projection:mesh-ecology-edge:operator_situation_view:missing"
  ]);
  assertPassiveEvidence(evidence);
});

test("optimistic intake evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedEdgeAutobaseOptimisticIntakeEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["optimistic_intake_evidence_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedEdgeAutobaseOptimisticIntakeStatuses(), [
    "optimistic_intake_visible",
    "optimistic_intake_blocked",
    "optimistic_intake_malformed",
    "optimistic_intake_incomplete"
  ]);
});
