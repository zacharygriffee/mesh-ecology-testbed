export const TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_repo_work_packet_projection_log_apply_result_evidence.v1";

export const TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES = Object.freeze({
  VISIBLE: "repo_work_packet_projection_log_apply_result_visible",
  BLOCKED: "repo_work_packet_projection_log_apply_result_blocked",
  MALFORMED: "repo_work_packet_projection_log_apply_result_malformed",
  INCOMPLETE: "repo_work_packet_projection_log_apply_result_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-repo-work-packet-projection-log-apply-result-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-repo-work-packet-projection-log-apply-result-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_repo_work_packet_projection_log_apply_result";
const EXPECTED_SOURCE_SCHEMA = "edge_repo_work_packet_projection_log_apply_result.v0";

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

function validateApplyResultEvidence({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["repo_work_packet_projection_log_apply_result_missing_or_malformed"])
    });
  }

  const source = isPlainObject(evidenceArtifact.source) ? evidenceArtifact.source : {};
  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const candidateRef = isPlainObject(refs.candidateRef) ? refs.candidateRef : {};
  const appendRef = isPlainObject(refs.appendRef) ? refs.appendRef : {};
  const checks = isPlainObject(evidenceArtifact.checks) ? evidenceArtifact.checks : {};
  const boundedShape = isPlainObject(evidenceArtifact.boundedShape) ? evidenceArtifact.boundedShape : {};
  const posture = isPlainObject(evidenceArtifact.posture) ? evidenceArtifact.posture : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.applyResultId,
    candidateRef.id,
    candidateRef.hash,
    appendRef.id,
    appendRef.hash
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("repo_work_packet_projection_log_apply_result_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("repo_work_packet_projection_log_apply_result_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("repo_work_packet_projection_log_apply_result_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-repo-work-packet-projection-log-apply-result-evidence-emitted") {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_not_emitted");
  }
  if (source.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("repo_work_packet_projection_log_apply_result_source_repo_mismatch");
  if (source.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("repo_work_packet_projection_log_apply_result_source_kind_mismatch");
  if (source.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("repo_work_packet_projection_log_apply_result_source_schema_mismatch");
  if (!nonEmptyString(refs.applyResultId)) reasonCodes.push("repo_work_packet_projection_log_apply_result_id_missing");
  if (!nonEmptyString(candidateRef.id) || !nonEmptyString(candidateRef.hash)?.startsWith("sha256:")) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_candidate_ref_missing");
  }
  if (!nonEmptyString(appendRef.id) || !nonEmptyString(appendRef.hash)?.startsWith("sha256:")) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_append_ref_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("repo_work_packet_projection_log_apply_result_ref_contains_compat_or_path_seam");
  if (evidenceArtifact.applyState !== "accepted_lab") {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_not_lab_accepted");
  }
  if (evidenceArtifact.acceptedContinuity !== false || evidenceArtifact.acceptedProductionContinuity !== false) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_continuity_overclaim");
  }
  if (
    checks.schemaValid !== true ||
    checks.sourceRefsPresent !== true ||
    checks.causalRefsOrDeferralValid !== true ||
    checks.storageEnvelopeOnly !== true ||
    checks.writerPolicyLabOnly !== true ||
    checks.unsafeCanonicalSeamsAbsent !== true ||
    checks.nonClaimsPreserved !== true
  ) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_checks_missing_or_unsafe");
  }
  if (
    boundedShape.refsOnly !== true ||
    boundedShape.candidatePayloadEmbedded !== false ||
    boundedShape.appendPayloadEmbedded !== false ||
    boundedShape.arbitraryMetadataAllowed !== false ||
    boundedShape.arbitraryNotesAllowed !== false ||
    boundedShape.blobPayloadsUseExternalRefs !== true
  ) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_bounded_shape_missing_or_unsafe");
  }
  if (
    posture.appendSuccessIsAcceptance !== false ||
    posture.applySuccessIsTruth !== false ||
    posture.labResultIsReadiness !== false ||
    posture.productionAutobaseStarted !== false ||
    posture.durableContinuityPromoted !== false ||
    posture.edgeStateMigrated !== false
  ) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_posture_overclaim");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.acceptsProductionContinuity !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.startsBackend !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_boundary_overclaim");
  }
  if (
    validation.status !== "edge-repo-work-packet-projection-log-apply-result-valid-evidence" ||
    validation.acceptedLabOnly !== true ||
    validation.checksSafe !== true ||
    validation.boundedShapeSafe !== true ||
    validation.postureSafe !== true ||
    validation.refsSafe !== true ||
    validation.noAuthorityOrTruthClaim !== true
  ) {
    reasonCodes.push("repo_work_packet_projection_log_apply_result_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam") ||
    code.includes("continuity") ||
    code.includes("posture")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["repo_work_packet_projection_log_apply_result_visible"])
  });
}

export function buildTestbedEdgeRepoWorkPacketProjectionLogApplyResultEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validateApplyResultEvidence({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const candidateRef = isPlainObject(refs.candidateRef) ? refs.candidateRef : {};
  const appendRef = isPlainObject(refs.appendRef) ? refs.appendRef : {};
  const posture = isPlainObject(evidenceArtifact?.posture) ? evidenceArtifact.posture : {};
  const boundary = isPlainObject(evidenceArtifact?.boundary) ? evidenceArtifact.boundary : {};

  return Object.freeze({
    artifactKind: "testbed_edge_repo_work_packet_projection_log_apply_result_evidence",
    schemaVersion: TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-repo-work-packet-projection-log-apply-result:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    applyResultId: nonEmptyString(refs.applyResultId),
    candidateId: nonEmptyString(candidateRef.id),
    appendId: nonEmptyString(appendRef.id),
    applyState: nonEmptyString(evidenceArtifact?.applyState),
    acceptedContinuity: evidenceArtifact?.acceptedContinuity === true,
    acceptedProductionContinuity: evidenceArtifact?.acceptedProductionContinuity === true,
    appendSuccessIsAcceptance: posture.appendSuccessIsAcceptance === true,
    applySuccessIsTruth: posture.applySuccessIsTruth === true,
    labResultIsReadiness: posture.labResultIsReadiness === true,
    productionAutobaseStarted: posture.productionAutobaseStarted === true,
    durableContinuityPromoted: posture.durableContinuityPromoted === true,
    edgeStateMigrated: posture.edgeStateMigrated === true,
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

export function listTestbedEdgeRepoWorkPacketProjectionLogApplyResultStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_REPO_WORK_PACKET_PROJECTION_LOG_APPLY_RESULT_STATUSES));
}
