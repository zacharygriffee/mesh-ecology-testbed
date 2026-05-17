export const TESTBED_EDGE_STORAGE_LANE_CANDIDATE_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_storage_lane_candidate_evidence.v1";

export const TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES = Object.freeze({
  VISIBLE: "storage_lane_candidate_visible",
  BLOCKED: "storage_lane_candidate_blocked",
  MALFORMED: "storage_lane_candidate_malformed",
  INCOMPLETE: "storage_lane_candidate_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-storage-lane-candidate-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-storage-lane-candidate-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_local_layer_storage_lane_candidate";
const EXPECTED_SOURCE_SCHEMA = "edge_local_layer_storage_lane_candidate.v0";

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

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|ssh|http/iu.test(ref);
}

function refs(artifact) {
  return isPlainObject(artifact?.refs) ? artifact.refs : {};
}

function writerAdmission(artifact) {
  return isPlainObject(artifact?.writerAdmission) ? artifact.writerAdmission : {};
}

function acceptanceRule(artifact) {
  return isPlainObject(artifact?.acceptanceRule) ? artifact.acceptanceRule : {};
}

function storageLanePosture(artifact) {
  return isPlainObject(artifact?.storageLanePosture) ? artifact.storageLanePosture : {};
}

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function source(artifact) {
  return isPlainObject(artifact?.source) ? artifact.source : {};
}

function collectAllRefs(evidenceRefs, writer) {
  return [
    evidenceRefs.candidateId,
    evidenceRefs.layerRef,
    evidenceRefs.projectionLaneRef,
    evidenceRefs.observerRef,
    ...stringArray(evidenceRefs.sourceProjectionEventRefs),
    ...stringArray(evidenceRefs.sourceEntryRefs),
    ...stringArray(evidenceRefs.sourceIdentityHashes),
    ...stringArray(evidenceRefs.sourceRefs),
    ...stringArray(writer.admittedWriterRefs),
    ...stringArray(writer.candidateWriterRefs),
    ...stringArray(writer.rejectedWriterRefs)
  ].filter((ref) => typeof ref === "string" && ref.trim() !== "");
}

function validateStorageLaneCandidate({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["storage_lane_candidate_missing_or_malformed"])
    });
  }

  const evidenceRefs = refs(evidenceArtifact);
  const writer = writerAdmission(evidenceArtifact);
  const acceptance = acceptanceRule(evidenceArtifact);
  const storage = storageLanePosture(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const evidenceSource = source(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("storage_lane_candidate_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("storage_lane_candidate_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("storage_lane_candidate_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-storage-lane-candidate-evidence-emitted") {
    reasonCodes.push("storage_lane_candidate_not_emitted");
  }
  if (evidenceSource.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("storage_lane_candidate_source_repo_mismatch");
  if (evidenceSource.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("storage_lane_candidate_source_kind_mismatch");
  if (evidenceSource.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("storage_lane_candidate_source_schema_mismatch");

  if (!nonEmptyString(evidenceRefs.candidateId)) reasonCodes.push("storage_lane_candidate_id_missing");
  if (stringArray(evidenceRefs.sourceProjectionEventRefs).length === 0) reasonCodes.push("storage_lane_candidate_projection_event_refs_missing");
  if (stringArray(evidenceRefs.sourceEntryRefs).length === 0) reasonCodes.push("storage_lane_candidate_entry_refs_missing");
  if (stringArray(evidenceRefs.sourceRefs).length === 0) reasonCodes.push("storage_lane_candidate_source_refs_missing");
  if (collectAllRefs(evidenceRefs, writer).some(unsafeSeamRef)) reasonCodes.push("storage_lane_candidate_ref_contains_compat_or_path_seam");

  if (
    writer.policyKind !== "operator_owned_local_layer_explicit_writer_admission" ||
    stringArray(writer.admittedWriterRefs).length === 0 ||
    writer.generalWriterAuthorityGranted !== false ||
    writer.writerAdmissionRequiredBeforeAcceptance !== true ||
    writer.operatorMediationRequired !== true ||
    writer.optimisticAppendRequiresAcceptanceGate !== true
  ) {
    reasonCodes.push("storage_lane_candidate_writer_admission_missing_or_unsafe");
  }

  if (
    acceptance.ruleKind !== "apply_validation_accepts_projection_lane_entry" ||
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.replicaVisibilityIsContinuity !== false ||
    acceptance.linearizationIsTruth !== false ||
    acceptance.requiresWriterAdmission !== true ||
    acceptance.requiresCausalSubstrateInterpretation !== true ||
    acceptance.requiresFailClosedTestbedPressure !== true
  ) {
    reasonCodes.push("storage_lane_candidate_acceptance_rule_missing_or_unsafe");
  }

  if (!validStorageLanePosture(storage)) reasonCodes.push("storage_lane_candidate_storage_posture_missing_or_unsafe");

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.startsBackend !== false ||
    evidenceBoundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("storage_lane_candidate_boundary_overclaim");
  }

  if (
    evidenceValidation.status !== "edge-storage-lane-candidate-valid-evidence" ||
    evidenceValidation.writerAdmissionPresent !== true ||
    evidenceValidation.acceptanceRulePresent !== true ||
    evidenceValidation.storageLanePosturePresent !== true ||
    evidenceValidation.readerPolicyPresent !== true ||
    evidenceValidation.boundarySafe !== true ||
    evidenceValidation.noAuthorityOrTruthClaim !== true
  ) {
    reasonCodes.push("storage_lane_candidate_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("compat") ||
    code.includes("path_seam") ||
    code.includes("storage_posture") ||
    code.includes("acceptance_rule") ||
    code.includes("writer_admission")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["storage_lane_candidate_visible"])
  });
}

export function buildTestbedEdgeStorageLaneCandidateEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceRefs = refs(evidenceArtifact);
  const writer = writerAdmission(evidenceArtifact);
  const acceptance = acceptanceRule(evidenceArtifact);
  const storage = storageLanePosture(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const result = validateStorageLaneCandidate({ evidenceArtifact });

  return Object.freeze({
    artifactKind: "testbed_edge_storage_lane_candidate_evidence",
    schemaVersion: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-storage-lane-candidate:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    candidateId: nonEmptyString(evidenceRefs.candidateId),
    sourceProjectionEventRefCount: stringArray(evidenceRefs.sourceProjectionEventRefs).length,
    sourceEntryRefCount: stringArray(evidenceRefs.sourceEntryRefs).length,
    sourceIdentityHashCount: stringArray(evidenceRefs.sourceIdentityHashes).length,
    sourceRefCount: stringArray(evidenceRefs.sourceRefs).length,
    admittedWriterRefCount: stringArray(writer.admittedWriterRefs).length,
    rejectedWriterRefCount: stringArray(writer.rejectedWriterRefs).length,
    writerAdmissionRequiredBeforeAcceptance: writer.writerAdmissionRequiredBeforeAcceptance === true,
    operatorMediationRequired: writer.operatorMediationRequired === true,
    appendSuccessIsAcceptance: acceptance.appendSuccessIsAcceptance === true,
    replicaVisibilityIsContinuity: acceptance.replicaVisibilityIsContinuity === true,
    linearizationIsTruth: acceptance.linearizationIsTruth === true,
    intendedStorageLane: nonEmptyString(storage.intendedStorageLane),
    storageDirection: nonEmptyString(storage.storageDirection),
    promotedSemanticUnit: nonEmptyString(storage.promotedSemanticUnit),
    productionAutobaseStarted: storage.productionAutobaseStarted === true,
    productionBackendPromoted: storage.productionBackendPromoted === true,
    edgeStateMigration: storage.edgeStateMigration === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    causalEvidenceOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalEvidenceOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalEvidenceWritesContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalEvidenceAcceptsCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    productionProofClaimed: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    authorityGranted: false,
    meshTruthClaimed: false,
    completionClaimed: false
  });
}

function validStorageLanePosture(posture) {
  return posture.intendedStorageLane === "bounded_autobase_equivalent_projection_lane" &&
    posture.storageDirection === "bounded_autobase_equivalent_linearization" &&
    posture.promotedSemanticUnit === "mesh_ecology_local_layer_projection_event" &&
    posture.storageEnvelopeKind === "edge_local_layer_projection_lane_entry" &&
    posture.storageEnvelopeSchema === "edge_local_layer_projection_lane_entry.v0" &&
    posture.productionBackendPromoted === false &&
    posture.productionAutobaseStarted === false &&
    posture.storageRecordPromoted === false &&
    posture.edgeStateMigration === false &&
    posture.appendSuccessIsAcceptance === false &&
    posture.linearizationIsTruth === false &&
    posture.replicaVisibilityIsContinuity === false &&
    posture.wallClockDefinesCausalOrder === false &&
    posture.localPathSeam === false &&
    posture.httpSeam === false &&
    posture.sshSeam === false;
}

export function listTestbedEdgeStorageLaneCandidateStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_STORAGE_LANE_CANDIDATE_STATUSES));
}
