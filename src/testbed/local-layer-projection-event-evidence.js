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

function promotionPosture(event) {
  return isPlainObject(event?.promotionPosture) ? event.promotionPosture : {};
}

function writerPolicy(event) {
  return isPlainObject(event?.writerPolicy) ? event.writerPolicy : {};
}

function readerPolicy(event) {
  return isPlainObject(event?.readerPolicy) ? event.readerPolicy : {};
}

function refContainsUnsafeSeam(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|ssh|http/iu.test(ref);
}

function causalRefsHaveTopology(causalRefs = {}) {
  return stringArray(causalRefs.branchRefs).length > 0 ||
    stringArray(causalRefs.segmentRefs).length > 0 ||
    stringArray(causalRefs.happeningRefs).length > 0 ||
    nonEmptyString(causalRefs.presentPointRef) !== null;
}

function causalRefDeferralValid(causalRefs = {}) {
  return causalRefs.deferred === true &&
    nonEmptyString(causalRefs.deferredReason) !== null &&
    causalRefsHaveTopology(causalRefs) === false;
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
  const promotion = promotionPosture(projectionEvent);
  const writerPolicyShape = writerPolicy(projectionEvent);
  const readerPolicyShape = readerPolicy(projectionEvent);
  const causalRefs = isPlainObject(projectionEvent.causalRefs) ? projectionEvent.causalRefs : {};
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
  if (sourceRefs.some(refContainsUnsafeSeam)) reasonCodes.push("projection_event_source_ref_contains_compat_or_path_seam");
  if (!isPlainObject(projectionEvent.causalRefs)) reasonCodes.push("projection_event_causal_refs_missing");
  if (!Array.isArray(causalRefs.branchRefs)) reasonCodes.push("projection_event_branch_refs_missing");
  if (!Array.isArray(causalRefs.segmentRefs)) reasonCodes.push("projection_event_segment_refs_missing");
  if (!Array.isArray(causalRefs.happeningRefs)) reasonCodes.push("projection_event_happening_refs_missing");
  if (isPlainObject(projectionEvent.causalRefs)) {
    const hasTopology = causalRefsHaveTopology(causalRefs);
    const validDeferral = causalRefDeferralValid(causalRefs);
    if (!hasTopology && !validDeferral) reasonCodes.push("projection_event_causal_refs_or_deferral_missing");
    if (causalRefs.deferred === true && !validDeferral) reasonCodes.push("projection_event_causal_ref_deferral_malformed");
  }
  if (!nonEmptyString(projectionEvent.payloadHash)) reasonCodes.push("projection_event_payload_hash_missing");
  if (nonEmptyString(projectionEvent.payloadHash) && !SHA256_REF.test(projectionEvent.payloadHash)) reasonCodes.push("projection_event_payload_hash_invalid");
  if (projectionEvent.payloadHashAlgorithm !== EXPECTED_PAYLOAD_HASH_ALGORITHM) reasonCodes.push("projection_event_payload_hash_algorithm_mismatch");
  if (!nonEmptyString(projectionEvent.identityHash)) reasonCodes.push("projection_event_identity_hash_missing");
  if (nonEmptyString(projectionEvent.identityHash) && !SHA256_REF.test(projectionEvent.identityHash)) reasonCodes.push("projection_event_identity_hash_invalid");
  if (projectionEvent.identityHashAlgorithm !== EXPECTED_PAYLOAD_HASH_ALGORITHM) reasonCodes.push("projection_event_identity_hash_algorithm_mismatch");
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
  if (promotion.promotedMaterial !== true ||
    promotion.promotionRole !== "semantic_continuity_input") {
    reasonCodes.push("projection_event_promotion_posture_missing");
  }
  if (promotion.storageRecordPromoted === true ||
    promotion.backendPromoted === true ||
    promotion.derivedViewPromoted === true ||
    promotion.reviewStatusPromoted === true ||
    promotion.replicatedLocalLayerContinuityClaimed === true) {
    reasonCodes.push("projection_event_promotion_overclaim");
  }
  if (writerPolicyShape.writerKind !== "edge_producer_operator_owned_local_layer_participant" ||
    writerPolicyShape.writerRepo !== "mesh-ecology-edge" ||
    writerPolicyShape.boundedMultiwriterDeferred !== true ||
    writerPolicyShape.autobaseWriterPolicyPromoted !== false) {
    reasonCodes.push("projection_event_writer_policy_missing_or_unsafe");
  }
  if (readerPolicyShape.readerKind !== "operator_owned_local_layer_readers_by_explicit_refs" ||
    readerPolicyShape.explicitKeyOrProofRequired !== true ||
    readerPolicyShape.publicRead !== false ||
    readerPolicyShape.localPathReadSeam !== false ||
    readerPolicyShape.httpReadSeam !== false ||
    readerPolicyShape.sshReadSeam !== false) {
    reasonCodes.push("projection_event_reader_policy_missing_or_unsafe");
  }
  if (storage.currentDurability !== "not_durable_state") reasonCodes.push("projection_event_current_durability_overclaim");
  if (storage.currentExportOnly !== true) reasonCodes.push("projection_event_export_only_missing");
  if (storage.intendedDurableLane !== "autobase_compatible_local_layer_projection_log") {
    reasonCodes.push("projection_event_intended_lane_mismatch");
  }
  if (validation.localFileTruth === true || validation.durableState === true) {
    reasonCodes.push("projection_event_validation_claims_local_file_or_durable_state");
  }
  if (validation.promotedSemanticInput !== true || validation.sourceRefsSemantic !== true) {
    reasonCodes.push("projection_event_promotion_validation_missing");
  }

  if (missingRefs.length > 0) reasonCodes.push("projection_event_required_source_refs_missing");
  if (stale.length > 0) reasonCodes.push("projection_event_stale_source_ref");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("claims") ||
    code.includes("causal_refs_or_deferral_missing") ||
    code.includes("causal_ref_deferral_malformed") ||
    code.includes("causal_refs_missing") ||
    code.includes("identity_hash") ||
    code.includes("embeds_payload") ||
    code.includes("stale") ||
    code.includes("compat_scaffold") ||
    code.includes("path_seam") ||
    code.includes("unsafe")
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
  const causalRefs = isPlainObject(projectionEvent?.causalRefs) ? projectionEvent.causalRefs : {};
  const causalRefCount = stringArray(causalRefs.branchRefs).length +
    stringArray(causalRefs.segmentRefs).length +
    stringArray(causalRefs.happeningRefs).length +
    (nonEmptyString(causalRefs.presentPointRef) ? 1 : 0);
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
    identityHash: nonEmptyString(projectionEvent?.identityHash),
    identityHashAlgorithm: nonEmptyString(projectionEvent?.identityHashAlgorithm),
    sourceRefCount: sourceRefs.length,
    sourceRefs: Object.freeze(sourceRefs),
    causalRefCount,
    causalRefsDeferred: causalRefs.deferred === true,
    causalRefDeferralReason: nonEmptyString(causalRefs.deferredReason),
    causalRefDeferralValid: causalRefDeferralValid(causalRefs),
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
    promotionRole: nonEmptyString(promotionPosture(projectionEvent).promotionRole),
    promotedMaterial: promotionPosture(projectionEvent).promotedMaterial === true,
    storageRecordPromoted: promotionPosture(projectionEvent).storageRecordPromoted === true,
    backendPromoted: promotionPosture(projectionEvent).backendPromoted === true,
    writerPolicyKind: nonEmptyString(writerPolicy(projectionEvent).writerKind),
    readerPolicyKind: nonEmptyString(readerPolicy(projectionEvent).readerKind),
    explicitKeyOrProofRequired: readerPolicy(projectionEvent).explicitKeyOrProofRequired === true,
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
