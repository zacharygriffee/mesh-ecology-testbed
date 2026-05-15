export const TESTBED_LOCAL_LAYER_PROJECTION_EVENT_EVIDENCE_SCHEMA_VERSION =
  "testbed_local_layer_projection_event_evidence.v1";

export const TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES = Object.freeze({
  PROJECTION_EVENT_VISIBLE: "projection_event_visible",
  PROJECTION_EVENT_BLOCKED: "projection_event_blocked",
  PROJECTION_EVENT_MALFORMED: "projection_event_malformed",
  PROJECTION_EVENT_INCOMPLETE: "projection_event_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "mesh_ecology_local_layer_projection_event";
const EXPECTED_SCHEMA_VERSION = "mesh-ecology-spine/local-layer-projection-event/v0";
const EXPECTED_PRODUCER_REPO = "mesh-ecology-edge";
const EXPECTED_PROJECTION_KIND = "operator_situation_view";
const EXPECTED_PAYLOAD_HASH_ALGORITHM = "sha256-canonical-json";
const SHA256_REF = /^sha256:[a-f0-9]{64}$/u;

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

function nonClaims(event) {
  return isPlainObject(event?.nonClaims) ? event.nonClaims : {};
}

function storagePosture(event) {
  return isPlainObject(event?.storagePosture) ? event.storagePosture : {};
}

function singleWriterProof(event) {
  return isPlainObject(event?.singleWriterProof) ? event.singleWriterProof : {};
}

function validationPosture(event) {
  return isPlainObject(event?.validation) ? event.validation : {};
}

function missingRequiredRefs(eventRefs, requiredRefs) {
  const refSet = new Set(eventRefs);
  return requiredRefs.filter((ref) => !refSet.has(ref));
}

function staleRefs(eventRefs, staleSourceRefs) {
  const eventSet = new Set(eventRefs);
  return staleSourceRefs.filter((ref) => eventSet.has(ref));
}

function validateProjectionEvent({ projectionEvent, requiredSourceRefs = [], staleSourceRefs = [] } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(projectionEvent)) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_MALFORMED,
      reasonCodes: Object.freeze(["projection_event_missing_or_malformed"])
    });
  }

  const sourceRefs = stringArray(projectionEvent.sourceRefs);
  const transportRefs = stringArray(projectionEvent.transportRefs);
  const claims = nonClaims(projectionEvent);
  const storage = storagePosture(projectionEvent);
  const writer = singleWriterProof(projectionEvent);
  const validation = validationPosture(projectionEvent);
  const missingRefs = missingRequiredRefs(sourceRefs, stringArray(requiredSourceRefs));
  const stale = staleRefs(sourceRefs, stringArray(staleSourceRefs));

  if (projectionEvent.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("projection_event_artifact_kind_mismatch");
  if (projectionEvent.schemaVersion !== EXPECTED_SCHEMA_VERSION) reasonCodes.push("projection_event_schema_mismatch");
  if (projectionEvent.producerRepo !== EXPECTED_PRODUCER_REPO) reasonCodes.push("projection_event_producer_repo_mismatch");
  if (projectionEvent.projectionKind !== EXPECTED_PROJECTION_KIND) reasonCodes.push("projection_event_kind_mismatch");
  if (!nonEmptyString(projectionEvent.eventId)) reasonCodes.push("projection_event_id_missing");
  if (!nonEmptyString(projectionEvent.producerParticipantRef)) reasonCodes.push("projection_event_participant_ref_missing");
  if (!nonEmptyString(projectionEvent.projectionSchema)) reasonCodes.push("projection_event_projection_schema_missing");
  if (!nonEmptyString(projectionEvent.projectionRef)) reasonCodes.push("projection_event_projection_ref_missing");
  if (sourceRefs.length === 0) reasonCodes.push("projection_event_source_refs_missing");
  if (!nonEmptyString(projectionEvent.payloadHash)) reasonCodes.push("projection_event_payload_hash_missing");
  if (nonEmptyString(projectionEvent.payloadHash) && !SHA256_REF.test(projectionEvent.payloadHash)) reasonCodes.push("projection_event_payload_hash_invalid");
  if (projectionEvent.payloadHashAlgorithm !== EXPECTED_PAYLOAD_HASH_ALGORITHM) reasonCodes.push("projection_event_payload_hash_algorithm_mismatch");
  if (projectionEvent.derivedOnly !== true) reasonCodes.push("projection_event_derived_only_missing");
  if (projectionEvent.payloadEmbedded === true) reasonCodes.push("projection_event_embeds_payload");
  if (transportRefs.some((ref) => /http|ssh|localhost|127\.0\.0\.1/iu.test(ref))) {
    reasonCodes.push("projection_event_transport_ref_contains_compat_scaffold");
  }

  if (claims.truthClaimed === true ||
    claims.completionClaimed === true ||
    claims.authorityGranted === true ||
    claims.rendererOwnsAuthority === true ||
    claims.durableStateClaimed === true ||
    claims.replicatedStateClaimed === true) {
    reasonCodes.push("projection_event_claims_truth_completion_authority_or_state");
  }

  if (writer.proofOnly !== true) reasonCodes.push("projection_event_single_writer_proof_missing");
  if (writer.writesProjectionLog === true || writer.backend !== "none") reasonCodes.push("projection_event_storage_backend_overclaim");
  if (storage.currentDurability !== "not_durable_state") reasonCodes.push("projection_event_current_durability_overclaim");
  if (storage.currentExportOnly !== true) reasonCodes.push("projection_event_export_only_missing");
  if (storage.intendedDurableLane !== "autobase_compatible_local_layer_projection_log") {
    reasonCodes.push("projection_event_intended_lane_mismatch");
  }
  if (validation.localFileTruth === true || validation.durableState === true) {
    reasonCodes.push("projection_event_validation_claims_local_file_or_durable_state");
  }

  if (missingRefs.length > 0) reasonCodes.push("projection_event_required_source_refs_missing");
  if (stale.length > 0) reasonCodes.push("projection_event_stale_source_ref");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("claims") ||
    code.includes("embeds_payload") ||
    code.includes("stale") ||
    code.includes("compat_scaffold")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_VISIBLE,
    reasonCodes: Object.freeze(["projection_event_visible"])
  });
}

export function buildTestbedLocalLayerProjectionEventEvidence({
  projectionEvent = null,
  requiredSourceRefs = [],
  staleSourceRefs = [],
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const sourceRefs = stringArray(projectionEvent?.sourceRefs);
  const transportRefs = stringArray(projectionEvent?.transportRefs);
  const validation = validateProjectionEvent({
    projectionEvent,
    requiredSourceRefs,
    staleSourceRefs
  });

  return Object.freeze({
    artifactKind: "testbed_local_layer_projection_event_evidence",
    schemaVersion: TESTBED_LOCAL_LAYER_PROJECTION_EVENT_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-local-layer-projection-event:${nonEmptyString(projectionEvent?.eventId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    sourceArtifactKind: nonEmptyString(projectionEvent?.artifactKind),
    sourceSchemaVersion: nonEmptyString(projectionEvent?.schemaVersion),
    sourceEventId: nonEmptyString(projectionEvent?.eventId),
    sourceProducerRepo: nonEmptyString(projectionEvent?.producerRepo),
    sourceProducerParticipantRef: nonEmptyString(projectionEvent?.producerParticipantRef),
    projectionKind: nonEmptyString(projectionEvent?.projectionKind),
    projectionSchema: nonEmptyString(projectionEvent?.projectionSchema),
    projectionRef: nonEmptyString(projectionEvent?.projectionRef),
    payloadHash: nonEmptyString(projectionEvent?.payloadHash),
    payloadHashAlgorithm: nonEmptyString(projectionEvent?.payloadHashAlgorithm),
    sourceRefCount: sourceRefs.length,
    sourceRefs: Object.freeze(sourceRefs),
    transportRefCount: transportRefs.length,
    transportRefs: Object.freeze(transportRefs),
    requiredSourceRefs: Object.freeze(stringArray(requiredSourceRefs)),
    staleSourceRefs: Object.freeze(stringArray(staleSourceRefs)),
    currentDurability: nonEmptyString(storagePosture(projectionEvent).currentDurability),
    intendedDurableLane: nonEmptyString(storagePosture(projectionEvent).intendedDurableLane),
    currentExportOnly: storagePosture(projectionEvent).currentExportOnly === true,
    singleWriterProofOnly: singleWriterProof(projectionEvent).proofOnly === true,
    writesProjectionLog: singleWriterProof(projectionEvent).writesProjectionLog === true,
    backend: nonEmptyString(singleWriterProof(projectionEvent).backend),
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedProjection: false,
    testbedOwnsProjectionContract: false,
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

export function listTestbedLocalLayerProjectionEventStatuses() {
  return Object.freeze(Object.values(TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES));
}
