export const TESTBED_LOCAL_LAYER_PROJECTION_LOG_EVIDENCE_SCHEMA_VERSION =
  "testbed_local_layer_projection_log_evidence.v1";

export const TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES = Object.freeze({
  PROJECTION_LOG_VISIBLE: "projection_log_visible",
  PROJECTION_LOG_BLOCKED: "projection_log_blocked",
  PROJECTION_LOG_MALFORMED: "projection_log_malformed",
  PROJECTION_LOG_INCOMPLETE: "projection_log_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "edge_projection_event_log_entry";
const EXPECTED_SCHEMA_VERSION = "edge_projection_event_log_entry.v0";
const EXPECTED_PROJECTION_EVENT_SCHEMA = "mesh-ecology-spine/local-layer-projection-event/v0";
const EXPECTED_PRODUCER_REPO = "mesh-ecology-edge";
const SHA256_REF = /^sha256:[a-f0-9]{64}$/u;
const EXPECTED_NAMESPACE_PREFIX = Object.freeze([
  "mesh-ecology",
  "local-layer",
  "projection-event",
  "v0",
  "producer-mesh-ecology-edge",
  "projection-operator-situation-view"
]);

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

function logPosture(entry) {
  return isPlainObject(entry?.logPosture) ? entry.logPosture : {};
}

function timePosture(entry) {
  return isPlainObject(entry?.timePosture) ? entry.timePosture : {};
}

function nonClaims(entry) {
  return isPlainObject(entry?.nonClaims) ? entry.nonClaims : {};
}

function projectionEvent(entry) {
  return isPlainObject(entry?.projectionEvent) ? entry.projectionEvent : {};
}

function storagePosture(event) {
  return isPlainObject(event?.storagePosture) ? event.storagePosture : {};
}

function eventNonClaims(event) {
  return isPlainObject(event?.nonClaims) ? event.nonClaims : {};
}

function validationPosture(event) {
  return isPlainObject(event?.validation) ? event.validation : {};
}

function missingRequiredRefs(eventRefs, requiredRefs) {
  const refSet = new Set(eventRefs);
  return requiredRefs.filter((ref) => !refSet.has(ref));
}

function unsafeNamespacePart(part) {
  return /:\/\/|\/|\\|(^|[.-])\.\.($|[.-])|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+/iu.test(part);
}

function namespaceHasExpectedPrefix(namespaceParts) {
  return EXPECTED_NAMESPACE_PREFIX.every((part, index) => namespaceParts[index] === part);
}

function validateProjectionEventInsideLog(event) {
  const reasonCodes = [];
  const claims = eventNonClaims(event);
  const storage = storagePosture(event);
  const validation = validationPosture(event);

  if (!isPlainObject(event)) return ["projection_log_event_missing_or_malformed"];
  if (event.schemaVersion !== EXPECTED_PROJECTION_EVENT_SCHEMA) reasonCodes.push("projection_log_event_schema_mismatch");
  if (event.producerRepo !== EXPECTED_PRODUCER_REPO) reasonCodes.push("projection_log_event_producer_repo_mismatch");
  if (!nonEmptyString(event.eventId)) reasonCodes.push("projection_log_event_id_missing");
  if (!Array.isArray(event.sourceRefs) || event.sourceRefs.length === 0) reasonCodes.push("projection_log_event_source_refs_missing");
  if (!nonEmptyString(event.payloadHash) || !SHA256_REF.test(event.payloadHash)) reasonCodes.push("projection_log_event_payload_hash_invalid");
  if (event.payloadHashAlgorithm !== "sha256-canonical-json") reasonCodes.push("projection_log_event_payload_hash_algorithm_mismatch");
  if (event.derivedOnly !== true) reasonCodes.push("projection_log_event_derived_only_missing");
  if (event.payloadEmbedded === true) reasonCodes.push("projection_log_event_embeds_payload");
  if (
    claims.truthClaimed === true ||
    claims.completionClaimed === true ||
    claims.authorityGranted === true ||
    claims.rendererOwnsAuthority === true ||
    claims.durableStateClaimed === true ||
    claims.replicatedStateClaimed === true
  ) {
    reasonCodes.push("projection_log_event_claims_truth_completion_authority_or_state");
  }
  if (storage.currentDurability !== "not_durable_state") reasonCodes.push("projection_log_event_current_durability_overclaim");
  if (storage.currentExportOnly !== true) reasonCodes.push("projection_log_event_export_only_missing");
  if (validation.sourceRefsPresent !== true || validation.payloadHashPresent !== true) {
    reasonCodes.push("projection_log_event_validation_flags_missing");
  }
  if (validation.localFileTruth === true || validation.durableState === true) {
    reasonCodes.push("projection_log_event_validation_claims_local_file_or_durable_state");
  }

  return reasonCodes;
}

function validateProjectionLogEntry({ logEntry, requiredSourceRefs = [] } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(logEntry)) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_MALFORMED,
      reasonCodes: Object.freeze(["projection_log_entry_missing_or_malformed"])
    });
  }

  const namespaceParts = stringArray(logEntry.namespaceParts);
  const sourceRefs = stringArray(logEntry.sourceRefs);
  const transportRefs = stringArray(logEntry.transportRefs);
  const posture = logPosture(logEntry);
  const time = timePosture(logEntry);
  const claims = nonClaims(logEntry);
  const event = projectionEvent(logEntry);
  const eventReasonCodes = validateProjectionEventInsideLog(event);
  const missingRefs = missingRequiredRefs(sourceRefs, stringArray(requiredSourceRefs));

  if (logEntry.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("projection_log_artifact_kind_mismatch");
  if (logEntry.schemaVersion !== EXPECTED_SCHEMA_VERSION) reasonCodes.push("projection_log_schema_mismatch");
  if (!nonEmptyString(logEntry.entryId)) reasonCodes.push("projection_log_entry_id_missing");
  if (!Number.isInteger(logEntry.sequence) || logEntry.sequence < 0) reasonCodes.push("projection_log_sequence_invalid");
  if (!nonEmptyString(logEntry.appendedAt)) reasonCodes.push("projection_log_appended_at_missing");
  if (
    time.appendedAtMeaning !== "operator_local_wall_clock_observation_metadata" ||
    time.localCausalOrderSource !== "single_writer_sequence_and_event_refs" ||
    time.wallClockDefinesCausalOrder !== false ||
    time.collaborativeCausalOrderRequiresAutobaseOrEquivalent !== true
  ) {
    reasonCodes.push("projection_log_time_posture_missing_or_unsafe");
  }
  if (!nonEmptyString(logEntry.projectionEventId)) reasonCodes.push("projection_log_projection_event_id_missing");
  if (logEntry.projectionEventSchema !== EXPECTED_PROJECTION_EVENT_SCHEMA) reasonCodes.push("projection_log_projection_event_schema_mismatch");
  if (!nonEmptyString(logEntry.projectionRef)) reasonCodes.push("projection_log_projection_ref_missing");
  if (!nonEmptyString(logEntry.payloadHash) || !SHA256_REF.test(logEntry.payloadHash)) reasonCodes.push("projection_log_payload_hash_invalid");
  if (logEntry.payloadHashAlgorithm !== "sha256-canonical-json") reasonCodes.push("projection_log_payload_hash_algorithm_mismatch");
  if (sourceRefs.length === 0) reasonCodes.push("projection_log_source_refs_missing");
  if (namespaceParts.length === 0) reasonCodes.push("projection_log_namespace_parts_missing");
  if (namespaceParts.length > 0 && !namespaceHasExpectedPrefix(namespaceParts)) reasonCodes.push("projection_log_namespace_prefix_mismatch");
  if (namespaceParts.some(unsafeNamespacePart)) reasonCodes.push("projection_log_namespace_contains_scaffold_or_path");
  if (transportRefs.some((ref) => /http|ssh|localhost|127\.0\.0\.1/iu.test(ref))) {
    reasonCodes.push("projection_log_transport_ref_contains_compat_scaffold");
  }

  if (logEntry.projectionEventId !== event.eventId) reasonCodes.push("projection_log_event_id_ref_mismatch");
  if (logEntry.payloadHash !== event.payloadHash) reasonCodes.push("projection_log_payload_hash_ref_mismatch");
  if (logEntry.projectionRef !== event.projectionRef) reasonCodes.push("projection_log_projection_ref_mismatch");

  if (posture.singleWriterLocalCorestoreProof !== true) reasonCodes.push("projection_log_single_writer_corestore_proof_missing");
  if (posture.writesProjectionLog !== true) reasonCodes.push("projection_log_write_flag_missing");
  if (
    posture.replicatedLocalLayerState === true ||
    posture.autobaseBackend === true ||
    posture.hyperbeeIndex === true ||
    posture.httpSeam === true ||
    posture.sshSeam === true ||
    posture.localStoreRootIsIntegrationSeam === true
  ) {
    reasonCodes.push("projection_log_storage_transport_or_store_seam_overclaim");
  }
  if (
    claims.truthClaimed === true ||
    claims.completionClaimed === true ||
    claims.authorityGranted === true ||
    claims.replicatedStateClaimed === true ||
    claims.rendererOwnsAuthority === true
  ) {
    reasonCodes.push("projection_log_claims_truth_completion_authority_or_state");
  }

  if (missingRefs.length > 0) reasonCodes.push("projection_log_required_source_refs_missing");
  reasonCodes.push(...eventReasonCodes);

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("claims") ||
    code.includes("scaffold") ||
    code.includes("seam") ||
    code.includes("time_posture") ||
    code.includes("embeds_payload")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_VISIBLE,
    reasonCodes: Object.freeze(["projection_log_visible"])
  });
}

export function buildTestbedLocalLayerProjectionLogEvidence({
  logEntry = null,
  requiredSourceRefs = [],
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const event = projectionEvent(logEntry);
  const namespaceParts = stringArray(logEntry?.namespaceParts);
  const sourceRefs = stringArray(logEntry?.sourceRefs);
  const validation = validateProjectionLogEntry({ logEntry, requiredSourceRefs });

  return Object.freeze({
    artifactKind: "testbed_local_layer_projection_log_evidence",
    schemaVersion: TESTBED_LOCAL_LAYER_PROJECTION_LOG_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-local-layer-projection-log:${nonEmptyString(logEntry?.entryId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    sourceArtifactKind: nonEmptyString(logEntry?.artifactKind),
    sourceSchemaVersion: nonEmptyString(logEntry?.schemaVersion),
    sourceEntryId: nonEmptyString(logEntry?.entryId),
    sourceAppendedAt: nonEmptyString(logEntry?.appendedAt),
    sourceProjectionEventId: nonEmptyString(logEntry?.projectionEventId),
    sourceProjectionEventSchema: nonEmptyString(logEntry?.projectionEventSchema),
    sourceProjectionRef: nonEmptyString(logEntry?.projectionRef),
    sourcePayloadHash: nonEmptyString(logEntry?.payloadHash),
    sourcePayloadHashAlgorithm: nonEmptyString(logEntry?.payloadHashAlgorithm),
    sourceProducerRepo: nonEmptyString(event.producerRepo),
    sourceEventId: nonEmptyString(event.eventId),
    sourceRefCount: sourceRefs.length,
    sourceRefs: Object.freeze(sourceRefs),
    requiredSourceRefs: Object.freeze(stringArray(requiredSourceRefs)),
    namespacePartCount: namespaceParts.length,
    namespaceParts: Object.freeze(namespaceParts),
    expectedNamespacePrefix: EXPECTED_NAMESPACE_PREFIX,
    singleWriterLocalCorestoreProof: logPosture(logEntry).singleWriterLocalCorestoreProof === true,
    writesProjectionLog: logPosture(logEntry).writesProjectionLog === true,
    appendedAtMeaning: nonEmptyString(timePosture(logEntry).appendedAtMeaning),
    localCausalOrderSource: nonEmptyString(timePosture(logEntry).localCausalOrderSource),
    wallClockDefinesCausalOrder: timePosture(logEntry).wallClockDefinesCausalOrder === true,
    collaborativeCausalOrderRequiresAutobaseOrEquivalent: timePosture(logEntry).collaborativeCausalOrderRequiresAutobaseOrEquivalent === true,
    replicatedLocalLayerState: logPosture(logEntry).replicatedLocalLayerState === true,
    autobaseBackend: logPosture(logEntry).autobaseBackend === true,
    hyperbeeIndex: logPosture(logEntry).hyperbeeIndex === true,
    httpSeam: logPosture(logEntry).httpSeam === true,
    sshSeam: logPosture(logEntry).sshSeam === true,
    localStoreRootIsIntegrationSeam: logPosture(logEntry).localStoreRootIsIntegrationSeam === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedOpenedCorestore: false,
    testbedOwnsProjectionLogContract: false,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    authorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    storageBackendInstalled: false,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedLocalLayerProjectionLogStatuses() {
  return Object.freeze(Object.values(TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES));
}
