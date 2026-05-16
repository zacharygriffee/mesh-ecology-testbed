export const TESTBED_PLATFORM_APPEND_LOG_HAPPENING_EVIDENCE_SCHEMA_VERSION =
  "testbed_platform_append_log_happening_evidence.v1";

export const TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES = Object.freeze({
  VISIBLE: "platform_append_log_happening_visible",
  BLOCKED: "platform_append_log_happening_blocked",
  MALFORMED: "platform_append_log_happening_malformed",
  INCOMPLETE: "platform_append_log_happening_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-append-log-happening-map";
const EXPECTED_SCHEMA = "causal-substrate/append-log-happening-map/v1";
const EXPECTED_PLATFORM_SCHEMA = "mesh-ecology-platform/dock-append-log-view/v1";

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

function source(artifact) {
  return isPlainObject(artifact?.source) ? artifact.source : {};
}

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function appendLogRefs(artifact) {
  return isPlainObject(artifact?.appendLogRefs) ? artifact.appendLogRefs : {};
}

function happeningRefs(artifact) {
  return Array.isArray(artifact?.happeningRefs)
    ? artifact.happeningRefs.filter(isPlainObject)
    : [];
}

function unsafeRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function validatePlatformAppendLogHappeningEvidence({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["platform_append_log_happening_missing_or_malformed"])
    });
  }

  const evidenceSource = source(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const evidenceAppendLogRefs = appendLogRefs(evidenceArtifact);
  const evidenceHappenings = happeningRefs(evidenceArtifact);
  const allRefs = [
    evidenceArtifact.sourceViewHashRef,
    ...stringArray(evidenceAppendLogRefs.entryRefs),
    ...stringArray(evidenceAppendLogRefs.entryHashRefs),
    ...stringArray(evidenceAppendLogRefs.sourceReceiptRefs),
    ...stringArray(evidenceAppendLogRefs.payloadRefs),
    ...stringArray(evidenceAppendLogRefs.artifactRefs),
    ...evidenceHappenings.flatMap((happening) => [
      happening.happeningId,
      happening.sourceEntryRef,
      happening.sourceEntryHashRef,
      happening.payloadRef,
      happening.sourceReceiptRef,
      happening.sourceArtifactRef,
      ...stringArray(happening.parentEntryRefs),
      ...stringArray(happening.parentEntryHashRefs)
    ])
  ].filter((entry) => typeof entry === "string" && entry.trim() !== "");

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("platform_append_log_happening_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("platform_append_log_happening_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("platform_append_log_happening_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "append-log-happening-map-emitted") reasonCodes.push("platform_append_log_happening_not_emitted");
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("platform_append_log_happening_artifact_id_missing");
  if (evidenceSource.sourceRepo !== "mesh-ecology-platform") reasonCodes.push("platform_append_log_happening_source_repo_mismatch");
  if (evidenceSource.sourceSchema !== EXPECTED_PLATFORM_SCHEMA) reasonCodes.push("platform_append_log_happening_source_schema_mismatch");
  if (!nonEmptyString(evidenceArtifact.sourceViewHashRef)) reasonCodes.push("platform_append_log_happening_view_hash_ref_missing");
  if (evidenceValidation.status !== "append-log-view-valid") reasonCodes.push("platform_append_log_happening_validation_not_ready");
  if (evidenceValidation.platformRefSemanticsPresent !== true) reasonCodes.push("platform_append_log_happening_ref_semantics_missing");

  if (
    stringArray(evidenceAppendLogRefs.entryRefs).length === 0 ||
    stringArray(evidenceAppendLogRefs.entryHashRefs).length === 0 ||
    stringArray(evidenceAppendLogRefs.sourceReceiptRefs).length === 0 ||
    stringArray(evidenceAppendLogRefs.payloadRefs).length === 0 ||
    stringArray(evidenceAppendLogRefs.artifactRefs).length === 0
  ) {
    reasonCodes.push("platform_append_log_happening_append_log_refs_missing");
  }
  if (evidenceHappenings.length === 0) reasonCodes.push("platform_append_log_happening_refs_missing");

  for (const happening of evidenceHappenings) {
    if (!nonEmptyString(happening.happeningId)) reasonCodes.push("platform_append_log_happening_happening_id_missing");
    if (!nonEmptyString(happening.sourceEntryRef)) reasonCodes.push("platform_append_log_happening_entry_ref_missing");
    if (!nonEmptyString(happening.sourceEntryHashRef)) reasonCodes.push("platform_append_log_happening_entry_hash_ref_missing");
    if (!nonEmptyString(happening.payloadRef)) reasonCodes.push("platform_append_log_happening_payload_ref_missing");
    if (!nonEmptyString(happening.sourceReceiptRef)) reasonCodes.push("platform_append_log_happening_receipt_ref_missing");
    if (!nonEmptyString(happening.sourceArtifactRef)) reasonCodes.push("platform_append_log_happening_artifact_ref_missing");
    if (happening.acceptedAsCanonicalHistory !== false) {
      reasonCodes.push("platform_append_log_happening_canonical_history_overclaim");
    }
  }
  if (allRefs.some(unsafeRef)) reasonCodes.push("platform_append_log_happening_ref_contains_compat_or_path_seam");

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.sourceRuntimeFetched !== false ||
    evidenceBoundary.sourceRepoCalled !== false ||
    evidenceBoundary.sourceRepoMutated !== false ||
    evidenceBoundary.replaysAppendLog !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.startsBackend !== false ||
    evidenceBoundary.requiresAutobase !== false ||
    evidenceBoundary.publishesToMesh !== false
  ) {
    reasonCodes.push("platform_append_log_happening_boundary_overclaim");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.BLOCKED,
      reasonCodes: Object.freeze([...new Set(reasonCodes)])
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze([...new Set(reasonCodes)])
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["platform_append_log_happening_visible"])
  });
}

export function buildTestbedPlatformAppendLogHappeningEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceSource = source(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceAppendLogRefs = appendLogRefs(evidenceArtifact);
  const evidenceHappenings = happeningRefs(evidenceArtifact);
  const validationResult = validatePlatformAppendLogHappeningEvidence({ evidenceArtifact });

  return Object.freeze({
    artifactKind: "testbed_platform_append_log_happening_evidence",
    schemaVersion: TESTBED_PLATFORM_APPEND_LOG_HAPPENING_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-platform-append-log-happening:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    sourceRepo: nonEmptyString(evidenceSource.sourceRepo),
    sourcePlatformSchema: nonEmptyString(evidenceSource.sourceSchema),
    sourceViewRef: nonEmptyString(evidenceArtifact?.sourceViewRef),
    sourceViewHashRef: nonEmptyString(evidenceArtifact?.sourceViewHashRef),
    happeningRefCount: evidenceHappenings.length,
    entryRefCount: stringArray(evidenceAppendLogRefs.entryRefs).length,
    entryHashRefCount: stringArray(evidenceAppendLogRefs.entryHashRefs).length,
    sourceReceiptRefCount: stringArray(evidenceAppendLogRefs.sourceReceiptRefs).length,
    payloadRefCount: stringArray(evidenceAppendLogRefs.payloadRefs).length,
    artifactRefCount: stringArray(evidenceAppendLogRefs.artifactRefs).length,
    firstHappeningId: nonEmptyString(evidenceHappenings[0]?.happeningId),
    firstSourceEntryRef: nonEmptyString(evidenceHappenings[0]?.sourceEntryRef),
    firstSourceReceiptRef: nonEmptyString(evidenceHappenings[0]?.sourceReceiptRef),
    firstSourceArtifactRef: nonEmptyString(evidenceHappenings[0]?.sourceArtifactRef),
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledCausalSubstrate: false,
    testbedCalledPlatform: false,
    testbedReplayedAppendLog: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    canonicalHistoryClaimed: false,
    runtimeAuthorityClaimed: false,
    platformAuthorityClaimed: false,
    edgeAuthorityGranted: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    causalEvidenceCalledPlatform: evidenceBoundary.sourceRepoCalled === true,
    causalEvidenceMutatedPlatform: evidenceBoundary.sourceRepoMutated === true,
    causalEvidenceReplayedAppendLog: evidenceBoundary.replaysAppendLog === true,
    causalEvidenceWroteContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalEvidenceAcceptedCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    causalEvidenceClaimedCausalTruth: evidenceBoundary.claimsCausalTruth === true,
    causalEvidenceStartedBackend: evidenceBoundary.startsBackend === true,
    causalEvidenceRequiredAutobase: evidenceBoundary.requiresAutobase === true
  });
}

export function listTestbedPlatformAppendLogHappeningStatuses() {
  return Object.freeze(Object.values(TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES));
}
