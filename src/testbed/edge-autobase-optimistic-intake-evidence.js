export const TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_autobase_optimistic_intake_evidence.v1";

export const TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES = Object.freeze({
  OPTIMISTIC_INTAKE_VISIBLE: "optimistic_intake_visible",
  OPTIMISTIC_INTAKE_BLOCKED: "optimistic_intake_blocked",
  OPTIMISTIC_INTAKE_MALFORMED: "optimistic_intake_malformed",
  OPTIMISTIC_INTAKE_INCOMPLETE: "optimistic_intake_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-autobase-optimistic-intake-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-autobase-optimistic-intake-evidence/v1";
const EXPECTED_SOURCE_ARTIFACT_KIND = "edge_sandboxed_autobase_optimistic_intake_lab_result";
const EXPECTED_SOURCE_SCHEMA = "edge_sandboxed_autobase_optimistic_intake_lab_result.v0";

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

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function candidateRefs(artifact) {
  return isPlainObject(artifact?.candidateRefs) ? artifact.candidateRefs : {};
}

function intakePosture(artifact) {
  return isPlainObject(artifact?.intakePosture) ? artifact.intakePosture : {};
}

function source(artifact) {
  return isPlainObject(artifact?.source) ? artifact.source : {};
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function collectAllRefs(refs) {
  return [
    refs.acceptedCandidateWriterRef,
    refs.rejectedCandidateWriterRef,
    ...stringArray(refs.acceptedSourceProjectionEventRefs),
    ...stringArray(refs.rejectedSourceProjectionEventRefs)
  ].filter((ref) => typeof ref === "string" && ref.trim() !== "");
}

function validateOptimisticIntakeEvidence({ evidenceArtifact, requiredSourceRefs = [] } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_MALFORMED,
      reasonCodes: Object.freeze(["optimistic_intake_evidence_missing_or_malformed"])
    });
  }

  const refs = candidateRefs(evidenceArtifact);
  const posture = intakePosture(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const evidenceSource = source(evidenceArtifact);
  const sourceRefs = [
    ...stringArray(refs.acceptedSourceProjectionEventRefs),
    ...stringArray(refs.rejectedSourceProjectionEventRefs)
  ];
  const suppliedSourceRefs = new Set(sourceRefs);
  const missingRequiredRefs = stringArray(requiredSourceRefs).filter((ref) => !suppliedSourceRefs.has(ref));

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("optimistic_intake_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("optimistic_intake_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("optimistic_intake_schema_version_mismatch");
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("optimistic_intake_artifact_id_missing");
  if (evidenceArtifact.reviewStatus !== "edge-autobase-optimistic-intake-evidence-emitted") {
    reasonCodes.push("optimistic_intake_not_emitted");
  }
  if (evidenceSource.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("optimistic_intake_source_repo_mismatch");
  if (evidenceSource.sourceArtifactKind !== EXPECTED_SOURCE_ARTIFACT_KIND) {
    reasonCodes.push("optimistic_intake_source_artifact_kind_mismatch");
  }
  if (evidenceSource.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("optimistic_intake_source_schema_mismatch");

  if (!nonEmptyString(refs.acceptedCandidateWriterRef)) reasonCodes.push("optimistic_intake_accepted_candidate_writer_missing");
  if (!nonEmptyString(refs.rejectedCandidateWriterRef)) reasonCodes.push("optimistic_intake_rejected_candidate_writer_missing");
  if (stringArray(refs.acceptedSourceProjectionEventRefs).length === 0) {
    reasonCodes.push("optimistic_intake_accepted_source_refs_missing");
  }
  if (stringArray(refs.rejectedSourceProjectionEventRefs).length === 0) {
    reasonCodes.push("optimistic_intake_rejected_source_refs_missing");
  }
  if (collectAllRefs(refs).some(unsafeSeamRef)) reasonCodes.push("optimistic_intake_ref_contains_compat_or_path_seam");

  if (posture.sandboxedAutobaseLab !== true) reasonCodes.push("optimistic_intake_sandbox_posture_missing");
  if (posture.optimisticIntakeLab !== true) reasonCodes.push("optimistic_intake_lab_posture_missing");
  if (posture.nonWriterIntakeAllowed !== true) reasonCodes.push("optimistic_intake_non_writer_posture_missing");
  if (posture.acceptedViaAckWriter !== true) reasonCodes.push("optimistic_intake_ack_writer_missing");
  if (posture.rejectedWithoutAckWriter !== true) reasonCodes.push("optimistic_intake_rejection_gate_missing");
  if (posture.appendSuccessIsAcceptance !== false) reasonCodes.push("optimistic_intake_append_as_acceptance");
  if (posture.acceptanceSource !== "deterministic_apply_ackWriter_and_derived_view_materialization") {
    reasonCodes.push("optimistic_intake_acceptance_source_mismatch");
  }
  if (
    posture.productionLocalLayerState === true ||
    posture.writesDurableLocalLayerState === true ||
    posture.localStoreRootIsIntegrationSeam === true ||
    posture.httpSeam === true ||
    posture.sshSeam === true ||
    posture.wallClockDefinesCausalOrder === true
  ) {
    reasonCodes.push("optimistic_intake_backend_or_seam_overclaim");
  }

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.callsEdge !== false ||
    evidenceBoundary.callsMesh !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.acceptsAppendAsAcceptance !== false ||
    evidenceBoundary.grantsWriterAuthority !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.claimsLayerSettlement !== false ||
    evidenceBoundary.publishesToMesh !== false ||
    evidenceBoundary.startsBackend !== false
  ) {
    reasonCodes.push("optimistic_intake_boundary_overclaim");
  }

  if (
    evidenceValidation.status !== "edge-autobase-optimistic-intake-valid-evidence" ||
    evidenceValidation.acceptedCandidateMaterialized !== true ||
    evidenceValidation.rejectedCandidateNotMaterialized !== true ||
    evidenceValidation.nonWriterBeforeAppend !== true ||
    evidenceValidation.ackWriterAcceptancePresent !== true ||
    evidenceValidation.appendSuccessAcceptanceBlocked !== true ||
    evidenceValidation.unsafeSeamRefsBlocked !== true ||
    evidenceValidation.unsafeClaimsBlocked !== true
  ) {
    reasonCodes.push("optimistic_intake_validation_not_ready");
  }

  if (missingRequiredRefs.length > 0) reasonCodes.push("optimistic_intake_required_source_refs_missing");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam") ||
    code.includes("append_as_acceptance")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES.OPTIMISTIC_INTAKE_VISIBLE,
    reasonCodes: Object.freeze(["optimistic_intake_visible"])
  });
}

export function buildTestbedEdgeAutobaseOptimisticIntakeEvidence({
  evidenceArtifact = null,
  requiredSourceRefs = [],
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const refs = candidateRefs(evidenceArtifact);
  const posture = intakePosture(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const validationResult = validateOptimisticIntakeEvidence({ evidenceArtifact, requiredSourceRefs });

  return Object.freeze({
    artifactKind: "testbed_edge_autobase_optimistic_intake_evidence",
    schemaVersion: TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-autobase-optimistic-intake:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    acceptedCandidateWriterRef: nonEmptyString(refs.acceptedCandidateWriterRef),
    rejectedCandidateWriterRef: nonEmptyString(refs.rejectedCandidateWriterRef),
    acceptedSourceProjectionEventRefCount: stringArray(refs.acceptedSourceProjectionEventRefs).length,
    rejectedSourceProjectionEventRefCount: stringArray(refs.rejectedSourceProjectionEventRefs).length,
    requiredSourceRefs: Object.freeze(stringArray(requiredSourceRefs)),
    sandboxedAutobaseLab: posture.sandboxedAutobaseLab === true,
    optimisticIntakeLab: posture.optimisticIntakeLab === true,
    nonWriterIntakeAllowed: posture.nonWriterIntakeAllowed === true,
    acceptedViaAckWriter: posture.acceptedViaAckWriter === true,
    rejectedWithoutAckWriter: posture.rejectedWithoutAckWriter === true,
    appendSuccessIsAcceptance: posture.appendSuccessIsAcceptance === true,
    acceptanceSource: nonEmptyString(posture.acceptanceSource),
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledCausalSubstrate: false,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedAcceptsAppendAsAcceptance: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    authorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    storageBackendInstalled: false,
    causalSubstrateBoundaryReviewOnly: evidenceBoundary.reviewOnly === true,
    causalSubstrateBoundaryEvidenceOnly: evidenceBoundary.evidenceOnly === true,
    causalSubstrateOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalSubstrateOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalSubstrateAcceptsCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    causalSubstrateAcceptsAppendAsAcceptance: evidenceBoundary.acceptsAppendAsAcceptance === true,
    causalSubstrateGrantsWriterAuthority: evidenceBoundary.grantsWriterAuthority === true,
    causalSubstrateClaimsCausalTruth: evidenceBoundary.claimsCausalTruth === true,
    causalSubstrateValidationRejectedCandidateNotMaterialized: evidenceValidation.rejectedCandidateNotMaterialized === true,
    causalSubstrateValidationAppendSuccessBlocked: evidenceValidation.appendSuccessAcceptanceBlocked === true,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedEdgeAutobaseOptimisticIntakeStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_AUTOBASE_OPTIMISTIC_INTAKE_STATUSES));
}
