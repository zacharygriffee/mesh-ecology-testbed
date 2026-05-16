export const TESTBED_RESOLUTION_REFINEMENT_EVIDENCE_SCHEMA_VERSION =
  "testbed_resolution_refinement_evidence.v1";

export const TESTBED_RESOLUTION_REFINEMENT_STATUSES = Object.freeze({
  COMPATIBLE: "resolution_refinement_compatible",
  DIVERGENCE_DECLARED: "resolution_refinement_divergence_declared",
  DIVERGENCE_POSTURE_REQUIRED: "resolution_refinement_divergence_posture_required",
  BLOCKED: "resolution_refinement_blocked",
  INCOMPLETE: "resolution_refinement_incomplete",
  MALFORMED: "resolution_refinement_malformed"
});

const EXPECTED_ARTIFACT_KIND = "causal-resolution-refinement-evidence";
const EXPECTED_SCHEMA = "causal-substrate/resolution-refinement-evidence/v1";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "")
    : [];
}

function refs(artifact) {
  return isPlainObject(artifact?.refs) ? artifact.refs : {};
}

function relation(artifact) {
  return isPlainObject(artifact?.relation) ? artifact.relation : {};
}

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function collectAllRefs(evidenceRefs) {
  return [
    evidenceRefs.coarseHappeningRef,
    evidenceRefs.coarseBranchRef,
    evidenceRefs.observerRef,
    evidenceRefs.referentRef,
    ...stringArray(evidenceRefs.refinedHappeningRefs),
    ...stringArray(evidenceRefs.refinedBranchRefs),
    ...stringArray(evidenceRefs.sourceEvidenceRefs)
  ].filter((ref) => typeof ref === "string" && ref.trim() !== "");
}

function validateResolutionRefinementEvidence({ evidenceArtifact, requireCompatible = false } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_RESOLUTION_REFINEMENT_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["resolution_refinement_evidence_missing_or_malformed"])
    });
  }

  const evidenceRefs = refs(evidenceArtifact);
  const evidenceRelation = relation(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("resolution_refinement_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("resolution_refinement_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("resolution_refinement_schema_version_mismatch");
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("resolution_refinement_artifact_id_missing");
  if (!["resolution-refinement-evidence-emitted", "resolution-refinement-divergence-posture-required"].includes(evidenceArtifact.reviewStatus)) {
    reasonCodes.push("resolution_refinement_source_review_status_invalid");
  }

  if (!nonEmptyString(evidenceRefs.coarseHappeningRef)) reasonCodes.push("resolution_refinement_coarse_happening_ref_missing");
  if (!nonEmptyString(evidenceRefs.coarseBranchRef)) reasonCodes.push("resolution_refinement_coarse_branch_ref_missing");
  if (!nonEmptyString(evidenceRefs.observerRef)) reasonCodes.push("resolution_refinement_observer_ref_missing");
  if (!nonEmptyString(evidenceRefs.referentRef)) reasonCodes.push("resolution_refinement_referent_ref_missing");
  if (stringArray(evidenceRefs.refinedHappeningRefs).length === 0) reasonCodes.push("resolution_refinement_refined_happening_refs_missing");
  if (stringArray(evidenceRefs.sourceEvidenceRefs).length === 0) reasonCodes.push("resolution_refinement_source_evidence_refs_missing");
  if (collectAllRefs(evidenceRefs).some(unsafeSeamRef)) reasonCodes.push("resolution_refinement_ref_contains_compat_or_path_seam");

  if (evidenceRelation.coarseRemainsValidSourceRef !== true) reasonCodes.push("resolution_refinement_coarse_source_not_preserved");
  if (evidenceRelation.contradictsCoarse === true && !nonEmptyString(evidenceRelation.divergencePosture)) {
    reasonCodes.push("resolution_refinement_divergence_posture_missing");
  }
  if (requireCompatible && evidenceRelation.aggregatesToCoarse !== true) {
    reasonCodes.push("resolution_refinement_required_compatibility_missing");
  }

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.claimsUniversalObserverPerspective !== false ||
    evidenceBoundary.claimsRuntimeAuthority !== false ||
    evidenceBoundary.startsBackend !== false
  ) {
    reasonCodes.push("resolution_refinement_boundary_overclaim");
  }

  if (
    evidenceValidation.parseableObject !== true ||
    evidenceValidation.coarseHappeningRefPresent !== true ||
    evidenceValidation.refinedHappeningRefsPresent !== true ||
    evidenceValidation.coarsePreserved !== true ||
    evidenceValidation.unsafeSeamRefsBlocked !== true ||
    evidenceValidation.unsafeClaimsBlocked !== true
  ) {
    reasonCodes.push("resolution_refinement_validation_not_ready");
  }

  if (evidenceValidation.status === "resolution-refinement-divergence-posture-required") {
    reasonCodes.push("resolution_refinement_divergence_posture_required");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam") ||
    code.includes("posture_required")
  )) {
    return Object.freeze({
      reviewStatus: codeStatus(reasonCodes),
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_RESOLUTION_REFINEMENT_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (evidenceValidation.status === "resolution-refinement-divergence-declared") {
    return Object.freeze({
      reviewStatus: TESTBED_RESOLUTION_REFINEMENT_STATUSES.DIVERGENCE_DECLARED,
      reasonCodes: Object.freeze(["resolution_refinement_divergence_declared"])
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_RESOLUTION_REFINEMENT_STATUSES.COMPATIBLE,
    reasonCodes: Object.freeze(["resolution_refinement_compatible"])
  });
}

function codeStatus(reasonCodes) {
  return reasonCodes.includes("resolution_refinement_divergence_posture_required")
    ? TESTBED_RESOLUTION_REFINEMENT_STATUSES.DIVERGENCE_POSTURE_REQUIRED
    : TESTBED_RESOLUTION_REFINEMENT_STATUSES.BLOCKED;
}

export function buildTestbedResolutionRefinementEvidence({
  evidenceArtifact = null,
  requireCompatible = false,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceRefs = refs(evidenceArtifact);
  const evidenceRelation = relation(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const validationResult = validateResolutionRefinementEvidence({ evidenceArtifact, requireCompatible });

  return Object.freeze({
    artifactKind: "testbed_resolution_refinement_evidence",
    schemaVersion: TESTBED_RESOLUTION_REFINEMENT_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-resolution-refinement:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    coarseHappeningRef: nonEmptyString(evidenceRefs.coarseHappeningRef),
    coarseBranchRef: nonEmptyString(evidenceRefs.coarseBranchRef),
    observerRef: nonEmptyString(evidenceRefs.observerRef),
    referentRef: nonEmptyString(evidenceRefs.referentRef),
    refinedHappeningRefCount: stringArray(evidenceRefs.refinedHappeningRefs).length,
    refinedBranchRefCount: stringArray(evidenceRefs.refinedBranchRefs).length,
    sourceEvidenceRefCount: stringArray(evidenceRefs.sourceEvidenceRefs).length,
    relationKind: nonEmptyString(evidenceRelation.relationKind),
    aggregatesToCoarse: evidenceRelation.aggregatesToCoarse === true,
    contradictsCoarse: evidenceRelation.contradictsCoarse === true,
    coarseRemainsValidSourceRef: evidenceRelation.coarseRemainsValidSourceRef === true,
    divergencePosture: nonEmptyString(evidenceRelation.divergencePosture),
    sourceValidationStatus: nonEmptyString(evidenceValidation.status),
    sourceAggregationCompatibilityDeclared: evidenceValidation.aggregationCompatibilityDeclared === true,
    sourceDivergencePosturePresentWhenNeeded: evidenceValidation.divergencePosturePresentWhenNeeded === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledCausalSubstrate: false,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    authorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false,
    causalSubstrateBoundaryReviewOnly: evidenceBoundary.reviewOnly === true,
    causalSubstrateBoundaryEvidenceOnly: evidenceBoundary.evidenceOnly === true,
    causalSubstrateOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalSubstrateOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalSubstrateWritesContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalSubstrateAcceptsCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    causalSubstrateClaimsCausalTruth: evidenceBoundary.claimsCausalTruth === true,
    causalSubstrateClaimsUniversalObserverPerspective: evidenceBoundary.claimsUniversalObserverPerspective === true,
    causalSubstrateClaimsRuntimeAuthority: evidenceBoundary.claimsRuntimeAuthority === true
  });
}

export function listTestbedResolutionRefinementStatuses() {
  return Object.freeze(Object.values(TESTBED_RESOLUTION_REFINEMENT_STATUSES));
}
