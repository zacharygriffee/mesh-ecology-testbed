export const TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_repo_work_packet_projection_log_candidate_evidence.v1";

export const TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES = Object.freeze({
  VISIBLE: "repo_work_packet_projection_log_candidate_visible",
  BLOCKED: "repo_work_packet_projection_log_candidate_blocked",
  MALFORMED: "repo_work_packet_projection_log_candidate_malformed",
  INCOMPLETE: "repo_work_packet_projection_log_candidate_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-repo-work-packet-projection-log-candidate-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-repo-work-packet-projection-log-candidate-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_repo_work_packet_projection_log_candidate";
const EXPECTED_SOURCE_SCHEMA = "edge_repo_work_packet_projection_log_candidate.v0";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "") : [];
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|ssh|http/iu.test(ref);
}

function validateCandidateEvidence({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["repo_work_packet_projection_log_candidate_missing_or_malformed"])
    });
  }

  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const source = isPlainObject(evidenceArtifact.source) ? evidenceArtifact.source : {};
  const envelope = isPlainObject(evidenceArtifact.storageEnvelope) ? evidenceArtifact.storageEnvelope : {};
  const writer = isPlainObject(evidenceArtifact.writerAdmission) ? evidenceArtifact.writerAdmission : {};
  const acceptance = isPlainObject(evidenceArtifact.acceptanceRule) ? evidenceArtifact.acceptanceRule : {};
  const storage = isPlainObject(evidenceArtifact.storageLanePosture) ? evidenceArtifact.storageLanePosture : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.candidateId,
    refs.workPacketRef,
    refs.continuityEventId,
    refs.projectionLaneRef,
    refs.observerRef,
    ...stringArray(refs.sourceRefs),
    ...stringArray(writer.admittedWriterRefs),
    ...stringArray(writer.candidateWriterRefs)
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("repo_work_packet_projection_log_candidate_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("repo_work_packet_projection_log_candidate_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("repo_work_packet_projection_log_candidate_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-repo-work-packet-projection-log-candidate-evidence-emitted") {
    reasonCodes.push("repo_work_packet_projection_log_candidate_not_emitted");
  }
  if (source.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("repo_work_packet_projection_log_candidate_source_repo_mismatch");
  if (source.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("repo_work_packet_projection_log_candidate_source_kind_mismatch");
  if (source.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("repo_work_packet_projection_log_candidate_source_schema_mismatch");
  if (!nonEmptyString(refs.candidateId)) reasonCodes.push("repo_work_packet_projection_log_candidate_id_missing");
  if (!nonEmptyString(refs.continuityEventId)) reasonCodes.push("repo_work_packet_projection_log_candidate_continuity_event_ref_missing");
  if (stringArray(refs.sourceRefs).length === 0) reasonCodes.push("repo_work_packet_projection_log_candidate_source_refs_missing");
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("repo_work_packet_projection_log_candidate_ref_contains_compat_or_path_seam");
  if (
    envelope.storageEnvelopeOnly !== true ||
    envelope.semanticContinuityUnit !== false ||
    envelope.productionStorageRecord !== false
  ) {
    reasonCodes.push("repo_work_packet_projection_log_candidate_storage_envelope_overclaim");
  }
  if (
    writer.policyKind !== "operator_owned_local_layer_explicit_writer_admission" ||
    stringArray(writer.admittedWriterRefs).length === 0 ||
    writer.generalWriterAuthorityGranted !== false ||
    writer.writerAdmissionRequiredBeforeAcceptance !== true ||
    writer.operatorMediationRequired !== true
  ) {
    reasonCodes.push("repo_work_packet_projection_log_candidate_writer_admission_missing_or_unsafe");
  }
  if (
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.storageVisibilityIsContinuity !== false ||
    acceptance.replicaVisibilityIsContinuity !== false ||
    acceptance.reviewVisibilityIsReadiness !== false ||
    acceptance.requiresCausalSubstrateInterpretation !== true ||
    acceptance.requiresFailClosedTestbedPressure !== true
  ) {
    reasonCodes.push("repo_work_packet_projection_log_candidate_acceptance_rule_missing_or_unsafe");
  }
  if (
    storage.intendedStorageLane !== "bounded_autobase_equivalent_projection_lane" ||
    storage.productionBackendPromoted !== false ||
    storage.productionAutobaseStarted !== false ||
    storage.edgeStateMigration !== false ||
    storage.localFileStorageIsSubstrate !== false ||
    storage.localPathSeam !== false ||
    storage.httpSeam !== false ||
    storage.sshSeam !== false
  ) {
    reasonCodes.push("repo_work_packet_projection_log_candidate_storage_posture_missing_or_unsafe");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.startsBackend !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("repo_work_packet_projection_log_candidate_boundary_overclaim");
  }
  if (
    validation.status !== "edge-repo-work-packet-projection-log-candidate-valid-evidence" ||
    validation.storageEnvelopeSafe !== true ||
    validation.writerAdmissionSafe !== true ||
    validation.acceptanceRuleSafe !== true ||
    validation.storageLanePostureSafe !== true ||
    validation.boundarySafe !== true ||
    validation.noAuthorityOrTruthClaim !== true
  ) {
    reasonCodes.push("repo_work_packet_projection_log_candidate_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam") ||
    code.includes("acceptance") ||
    code.includes("writer_admission") ||
    code.includes("storage_posture")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["repo_work_packet_projection_log_candidate_visible"])
  });
}

export function buildTestbedEdgeRepoWorkPacketProjectionLogCandidateEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validateCandidateEvidence({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const writer = isPlainObject(evidenceArtifact?.writerAdmission) ? evidenceArtifact.writerAdmission : {};
  const acceptance = isPlainObject(evidenceArtifact?.acceptanceRule) ? evidenceArtifact.acceptanceRule : {};
  const storage = isPlainObject(evidenceArtifact?.storageLanePosture) ? evidenceArtifact.storageLanePosture : {};
  const boundary = isPlainObject(evidenceArtifact?.boundary) ? evidenceArtifact.boundary : {};

  return Object.freeze({
    artifactKind: "testbed_edge_repo_work_packet_projection_log_candidate_evidence",
    schemaVersion: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-repo-work-packet-projection-log-candidate:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    candidateId: nonEmptyString(refs.candidateId),
    continuityEventId: nonEmptyString(refs.continuityEventId),
    sourceRefCount: stringArray(refs.sourceRefs).length,
    admittedWriterRefCount: stringArray(writer.admittedWriterRefs).length,
    appendSuccessIsAcceptance: acceptance.appendSuccessIsAcceptance === true,
    storageVisibilityIsContinuity: acceptance.storageVisibilityIsContinuity === true,
    reviewVisibilityIsReadiness: acceptance.reviewVisibilityIsReadiness === true,
    productionAutobaseStarted: storage.productionAutobaseStarted === true,
    productionBackendPromoted: storage.productionBackendPromoted === true,
    edgeStateMigration: storage.edgeStateMigration === true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedClaimsCausalTruth: false,
    causalEvidenceOpenedAutobase: boundary.opensAutobase === true,
    causalEvidenceOpenedCorestore: boundary.opensCorestore === true,
    causalEvidenceWritesContinuityRecords: boundary.writesContinuityRecords === true,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    authorityGranted: false,
    causalTruthClaimed: false,
    reviewOnly: true,
    evidenceOnly: true
  });
}

export function listTestbedEdgeRepoWorkPacketProjectionLogCandidateStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_CANDIDATE_STATUSES));
}
