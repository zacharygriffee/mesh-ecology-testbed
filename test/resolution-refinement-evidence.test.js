import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedResolutionRefinementEvidence,
  listTestbedResolutionRefinementStatuses,
  TESTBED_RESOLUTION_REFINEMENT_EVIDENCE_SCHEMA_VERSION,
  TESTBED_RESOLUTION_REFINEMENT_STATUSES
} from "../src/testbed/resolution-refinement-evidence.js";

const CREATED_AT = "2026-05-16T10:15:00.000Z";

function compatibleArtifact() {
  return {
    artifactKind: "causal-resolution-refinement-evidence",
    schema: "causal-substrate/resolution-refinement-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-resolution-refinement-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-16T10:00:00.000Z",
    source: {
      sourceRepo: "causal-substrate"
    },
    refs: {
      coarseHappeningRef: "happening:platform-artifact-activation:aaaaaaaaaaaaaaaa",
      coarseBranchRef: "branch:platform-artifact-lifecycle:aaaaaaaaaaaaaaaa",
      observerRef: "observer:platform-host-a",
      referentRef: "referent:artifact:demo-package",
      refinedHappeningRefs: [
        "happening:platform-cpu-temperature-threshold:bbbbbbbbbbbbbbbb",
        "happening:platform-service-health-transition:cccccccccccccccc"
      ],
      refinedBranchRefs: [
        "branch:platform-artifact-activation-resolution:bbbbbbbbbbbbbbbb"
      ],
      sourceEvidenceRefs: [
        "receipt:mesh-ecology-platform:activation:aaaaaaaaaaaaaaaa"
      ]
    },
    relation: {
      relationKind: "decomposition",
      aggregatesToCoarse: true,
      contradictsCoarse: false,
      coarseRemainsValidSourceRef: true,
      currentResolutionLeaf: true,
      observerResolution: "platform-activation-coarse",
      basisResolution: "platform-lifecycle-v1"
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      claimsUniversalObserverPerspective: false,
      claimsRuntimeAuthority: false,
      startsBackend: false
    },
    validation: {
      status: "resolution-refinement-compatible",
      parseableObject: true,
      coarseHappeningRefPresent: true,
      coarseBranchRefPresent: true,
      observerRefPresent: true,
      referentRefPresent: true,
      refinedHappeningRefsPresent: true,
      sourceEvidenceRefsPresent: true,
      aggregationCompatibilityDeclared: true,
      coarsePreserved: true,
      divergencePosturePresentWhenNeeded: true,
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true,
      issues: []
    },
    reviewStatus: "resolution-refinement-evidence-emitted",
    warnings: [],
    rejections: []
  };
}

function build(evidenceArtifact = compatibleArtifact(), overrides = {}) {
  return buildTestbedResolutionRefinementEvidence({
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
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("compatible resolution refinement is visible as passive review evidence", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_resolution_refinement_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_RESOLUTION_REFINEMENT_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_RESOLUTION_REFINEMENT_STATUSES.COMPATIBLE);
  assert.deepEqual(evidence.reasonCodes, ["resolution_refinement_compatible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-resolution-refinement-evidence");
  assert.equal(evidence.sourceSchema, "causal-substrate/resolution-refinement-evidence/v1");
  assert.equal(evidence.sourceSchemaVersion, 1);
  assert.equal(evidence.coarseHappeningRef, "happening:platform-artifact-activation:aaaaaaaaaaaaaaaa");
  assert.equal(evidence.refinedHappeningRefCount, 2);
  assert.equal(evidence.sourceEvidenceRefCount, 1);
  assert.equal(evidence.aggregatesToCoarse, true);
  assert.equal(evidence.contradictsCoarse, false);
  assert.equal(evidence.coarseRemainsValidSourceRef, true);
  assert.equal(evidence.sourceAggregationCompatibilityDeclared, true);
  assert.equal(evidence.sourceDivergencePosturePresentWhenNeeded, true);
  assertPassiveEvidence(evidence);
});

test("contradictory refinement is blocked until divergence posture is explicit", () => {
  const artifact = compatibleArtifact();
  artifact.relation.aggregatesToCoarse = false;
  artifact.relation.contradictsCoarse = true;
  artifact.validation.status = "resolution-refinement-divergence-posture-required";
  artifact.validation.aggregationCompatibilityDeclared = false;
  artifact.validation.divergencePosturePresentWhenNeeded = false;
  artifact.reviewStatus = "resolution-refinement-divergence-posture-required";

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_RESOLUTION_REFINEMENT_STATUSES.DIVERGENCE_POSTURE_REQUIRED);
  assert.equal(evidence.reasonCodes.includes("resolution_refinement_divergence_posture_missing"), true);
  assert.equal(evidence.reasonCodes.includes("resolution_refinement_divergence_posture_required"), true);
  assert.equal(evidence.contradictsCoarse, true);
  assert.equal(evidence.sourceDivergencePosturePresentWhenNeeded, false);
  assertPassiveEvidence(evidence);
});

test("declared divergence is reviewable without claiming re-stabilization", () => {
  const artifact = compatibleArtifact();
  artifact.relation.aggregatesToCoarse = false;
  artifact.relation.contradictsCoarse = true;
  artifact.relation.divergencePosture = "reconciliation-required";
  artifact.validation.status = "resolution-refinement-divergence-declared";
  artifact.validation.aggregationCompatibilityDeclared = false;
  artifact.validation.divergencePosturePresentWhenNeeded = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_RESOLUTION_REFINEMENT_STATUSES.DIVERGENCE_DECLARED);
  assert.deepEqual(evidence.reasonCodes, ["resolution_refinement_divergence_declared"]);
  assert.equal(evidence.divergencePosture, "reconciliation-required");
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, false);
  assert.equal(evidence.causalSubstrateClaimsUniversalObserverPerspective, false);
  assertPassiveEvidence(evidence);
});

test("refinement evidence blocks causal-substrate authority and backend overclaims", () => {
  const artifact = compatibleArtifact();
  artifact.boundary.opensAutobase = true;
  artifact.boundary.opensCorestore = true;
  artifact.boundary.writesContinuityRecords = true;
  artifact.boundary.acceptsCanonicalHistory = true;
  artifact.boundary.claimsCausalTruth = true;
  artifact.boundary.claimsUniversalObserverPerspective = true;
  artifact.boundary.claimsRuntimeAuthority = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_RESOLUTION_REFINEMENT_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("resolution_refinement_boundary_overclaim"), true);
  assert.equal(evidence.causalSubstrateOpenedAutobase, true);
  assert.equal(evidence.causalSubstrateOpenedCorestore, true);
  assert.equal(evidence.causalSubstrateWritesContinuityRecords, true);
  assert.equal(evidence.causalSubstrateAcceptsCanonicalHistory, true);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, true);
  assert.equal(evidence.causalSubstrateClaimsUniversalObserverPerspective, true);
  assert.equal(evidence.causalSubstrateClaimsRuntimeAuthority, true);
  assertPassiveEvidence(evidence);
});

test("refinement evidence blocks HTTP SSH and local path refs", () => {
  const artifact = compatibleArtifact();
  artifact.refs.sourceEvidenceRefs = ["http://127.0.0.1:8787/activation.json"];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_RESOLUTION_REFINEMENT_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("resolution_refinement_ref_contains_compat_or_path_seam"), true);
  assertPassiveEvidence(evidence);
});

test("malformed refinement evidence remains passive and bounded", () => {
  const malformed = buildTestbedResolutionRefinementEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_RESOLUTION_REFINEMENT_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["resolution_refinement_evidence_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedResolutionRefinementStatuses(), [
    "resolution_refinement_compatible",
    "resolution_refinement_divergence_declared",
    "resolution_refinement_divergence_posture_required",
    "resolution_refinement_blocked",
    "resolution_refinement_incomplete",
    "resolution_refinement_malformed"
  ]);
});
