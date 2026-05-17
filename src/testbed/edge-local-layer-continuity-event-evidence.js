export const TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_continuity_event_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES = Object.freeze({
  CONTINUITY_EVENT_VISIBLE: "continuity_event_visible",
  CONTINUITY_EVENT_BLOCKED: "continuity_event_blocked",
  CONTINUITY_EVENT_MALFORMED: "continuity_event_malformed",
  CONTINUITY_EVENT_INCOMPLETE: "continuity_event_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "mesh_ecology_local_layer_continuity_event";
const EXPECTED_SCHEMA_VERSION = "mesh-ecology-edge/local-layer-continuity-event-draft/v0";
const EXPECTED_OPERATION_EVENT_KIND = "edge_operation_event";
const CONTINUITY_EVENT_ROLE_PROFILES = Object.freeze({
  edge_operation_event_scaffold: Object.freeze({
    category: "operation_event",
    storageKind: "local_json_operation_trail",
    crossingTargetDomain: "local_layer_continuity_draft"
  }),
  edge_repo_work_packet_scaffold: Object.freeze({
    category: "repo_work_packet",
    storageKind: "local_json_or_exported_work_packet",
    crossingTargetDomain: "repo_owned_work_review"
  })
});

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "").map((entry) => entry.trim())
    : [];
}

function refContainsUnsafeSeam(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|ssh|http/iu.test(ref);
}

function origin(event) {
  return isPlainObject(event?.origin) ? event.origin : {};
}

function membraneCrossing(event) {
  return isPlainObject(event?.membraneCrossing) ? event.membraneCrossing : {};
}

function storagePosture(event) {
  return isPlainObject(event?.storagePosture) ? event.storagePosture : {};
}

function acceptancePosture(event) {
  return isPlainObject(event?.acceptancePosture) ? event.acceptancePosture : {};
}

function nonClaims(event) {
  return isPlainObject(event?.nonClaims) ? event.nonClaims : {};
}

function extractContinuityEvent({ continuityEvent = null, sourceOperationEvent = null } = {}) {
  if (isPlainObject(continuityEvent)) return continuityEvent;
  if (isPlainObject(sourceOperationEvent?.localLayerContinuityEvent)) {
    return sourceOperationEvent.localLayerContinuityEvent;
  }
  return null;
}

function continuityRoleProfile(continuityEvent) {
  const role = nonEmptyString(continuityEvent?.continuityRole);
  return CONTINUITY_EVENT_ROLE_PROFILES[role] ?? null;
}

function validateContinuityEvent(continuityEvent) {
  const reasonCodes = [];

  if (!isPlainObject(continuityEvent)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_MALFORMED,
      reasonCodes: Object.freeze(["continuity_event_missing_or_malformed"])
    });
  }

  const eventOrigin = origin(continuityEvent);
  const crossing = membraneCrossing(continuityEvent);
  const storage = storagePosture(continuityEvent);
  const acceptance = acceptancePosture(continuityEvent);
  const claims = nonClaims(continuityEvent);
  const roleProfile = continuityRoleProfile(continuityEvent);
  const provenanceRefs = stringArray(continuityEvent.provenanceRefs);
  const evidenceRefs = stringArray(continuityEvent.evidenceRefs);
  const receiptRefs = stringArray(continuityEvent.receiptRefs);
  const participantRefs = stringArray(continuityEvent.participantRefs);
  const parentEventRefs = stringArray(eventOrigin.parentEventRefs);
  const refsToScan = [
    continuityEvent.eventId,
    continuityEvent.sourceEventRef,
    continuityEvent.operationRef,
    eventOrigin.originRef,
    eventOrigin.sourceRef,
    eventOrigin.operatorSeatRef,
    eventOrigin.deviceRef,
    eventOrigin.repoRef,
    crossing.crossingRef,
    ...parentEventRefs,
    ...provenanceRefs,
    ...evidenceRefs,
    ...receiptRefs,
    ...participantRefs
  ].filter((ref) => typeof ref === "string" && ref.trim() !== "");

  if (continuityEvent.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("continuity_event_artifact_kind_mismatch");
  if (continuityEvent.schemaVersion !== EXPECTED_SCHEMA_VERSION) reasonCodes.push("continuity_event_schema_mismatch");
  if (continuityEvent.draft !== true) reasonCodes.push("continuity_event_draft_posture_missing");
  if (continuityEvent.promotedContinuity !== false) reasonCodes.push("continuity_event_promotion_overclaim");
  if (roleProfile === null) reasonCodes.push("continuity_event_role_mismatch");
  if (roleProfile !== null && continuityEvent.continuityCategory !== roleProfile.category) {
    reasonCodes.push("continuity_event_category_mismatch");
  }
  if (!nonEmptyString(continuityEvent.eventId)) reasonCodes.push("continuity_event_id_missing");
  if (!nonEmptyString(continuityEvent.sourceEventRef)) reasonCodes.push("continuity_event_source_event_ref_missing");
  if (!nonEmptyString(continuityEvent.operationRef)) reasonCodes.push("continuity_event_operation_ref_missing");
  if (!nonEmptyString(continuityEvent.eventKind)) reasonCodes.push("continuity_event_kind_missing");
  if (continuityEvent.producerRepo !== "mesh-ecology-edge") reasonCodes.push("continuity_event_producer_repo_mismatch");

  if (!nonEmptyString(eventOrigin.originRef)) reasonCodes.push("continuity_event_origin_ref_missing");
  if (!nonEmptyString(eventOrigin.sourceRef)) reasonCodes.push("continuity_event_origin_source_ref_missing");
  if (!nonEmptyString(eventOrigin.operatorSeatRef)) reasonCodes.push("continuity_event_operator_seat_ref_missing");
  if (eventOrigin.repoRef !== "repo:mesh-ecology-edge") reasonCodes.push("continuity_event_origin_repo_ref_mismatch");
  if (!Array.isArray(eventOrigin.parentEventRefs)) reasonCodes.push("continuity_event_parent_refs_missing");
  if (provenanceRefs.length === 0) reasonCodes.push("continuity_event_provenance_refs_missing");
  if (!provenanceRefs.includes(continuityEvent.sourceEventRef)) reasonCodes.push("continuity_event_source_ref_not_in_provenance");
  if (!provenanceRefs.includes(continuityEvent.operationRef)) reasonCodes.push("continuity_event_operation_ref_not_in_provenance");

  if (!nonEmptyString(crossing.crossingKind)) reasonCodes.push("continuity_event_crossing_kind_missing");
  if (!nonEmptyString(crossing.crossingRef)) reasonCodes.push("continuity_event_crossing_ref_missing");
  if (crossing.sourceDomain !== "edge_operator_loop") reasonCodes.push("continuity_event_crossing_source_domain_mismatch");
  if (roleProfile !== null && crossing.targetDomain !== roleProfile.crossingTargetDomain) {
    reasonCodes.push("continuity_event_crossing_target_domain_mismatch");
  }
  if (crossing.validationRequired !== true) reasonCodes.push("continuity_event_crossing_validation_missing");

  if (roleProfile !== null && storage.storageKind !== roleProfile.storageKind) {
    reasonCodes.push("continuity_event_storage_kind_mismatch");
  }
  if (storage.storageRole !== "compatibility_scaffold") reasonCodes.push("continuity_event_storage_role_mismatch");
  if (storage.scaffoldStorage !== true || storage.localFileStorage !== true) {
    reasonCodes.push("continuity_event_storage_scaffold_missing");
  }
  if (storage.sourceIsSubstrate !== false ||
    storage.localLayerSubstrate !== false ||
    storage.durableLocalLayerState !== false ||
    storage.decentralizedState !== false ||
    storage.canonicalMaterializedHistory !== false ||
    storage.autobaseBackend !== false ||
    storage.hypercoreCorestoreBackend !== false ||
    storage.hyperbeeIndex !== false) {
    reasonCodes.push("continuity_event_storage_overclaim");
  }

  if (acceptance.acceptedContinuity !== false ||
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.writeSuccessIsAcceptance !== false ||
    acceptance.storageVisibilityIsContinuity !== false) {
    reasonCodes.push("continuity_event_acceptance_overclaim");
  }
  if (acceptance.deterministicApplyRequired !== true) {
    reasonCodes.push("continuity_event_deterministic_apply_posture_missing");
  }

  if (claims.truthClaimed === true ||
    claims.completionClaimed === true ||
    claims.authorityGranted === true ||
    claims.storageIsSubstrate === true ||
    claims.appendSuccessIsAcceptance === true ||
    claims.writeSuccessIsAcceptance === true ||
    claims.materializedStateClaimed === true ||
    claims.durableStateClaimed === true ||
    claims.replicatedStateClaimed === true ||
    claims.canonicalHistoryClaimed === true ||
    claims.causalTruthClaimed === true ||
    claims.meshTruthClaimed === true ||
    claims.runtimeAuthorityClaimed === true ||
    claims.rendererAuthorityClaimed === true) {
    reasonCodes.push("continuity_event_truth_authority_state_or_substrate_overclaim");
  }

  if (refsToScan.some(refContainsUnsafeSeam)) {
    reasonCodes.push("continuity_event_ref_contains_transport_or_local_path_seam");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("transport_or_local_path") ||
    code.includes("promotion") ||
    code.includes("truth") ||
    code.includes("authority") ||
    code.includes("substrate")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_VISIBLE,
    reasonCodes: Object.freeze(["continuity_event_visible"])
  });
}

export function buildTestbedEdgeLocalLayerContinuityEventEvidence({
  continuityEvent = null,
  sourceOperationEvent = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const event = extractContinuityEvent({ continuityEvent, sourceOperationEvent });
  const validation = validateContinuityEvent(event);
  const storage = storagePosture(event);
  const acceptance = acceptancePosture(event);
  const crossing = membraneCrossing(event);

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_continuity_event_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-continuity-event:${nonEmptyString(event?.eventId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    sourceArtifactKind: nonEmptyString(event?.artifactKind),
    sourceSchemaVersion: nonEmptyString(event?.schemaVersion),
    sourceEventId: nonEmptyString(event?.eventId),
    sourceOperationRef: nonEmptyString(event?.operationRef),
    sourceEventRef: nonEmptyString(event?.sourceEventRef),
    sourceEventKind: nonEmptyString(event?.eventKind),
    sourceProducerRepo: nonEmptyString(event?.producerRepo),
    sourceOperationEventKind: nonEmptyString(sourceOperationEvent?.artifactKind),
    sourceOperationEventValid: sourceOperationEvent?.artifactKind === EXPECTED_OPERATION_EVENT_KIND,
    continuityRole: nonEmptyString(event?.continuityRole),
    continuityCategory: nonEmptyString(event?.continuityCategory),
    draft: event?.draft === true,
    promotedContinuity: event?.promotedContinuity === true,
    originRef: nonEmptyString(origin(event).originRef),
    operatorSeatRef: nonEmptyString(origin(event).operatorSeatRef),
    deviceRef: nonEmptyString(origin(event).deviceRef),
    membraneCrossingKind: nonEmptyString(crossing.crossingKind),
    membraneCrossingRef: nonEmptyString(crossing.crossingRef),
    provenanceRefCount: stringArray(event?.provenanceRefs).length,
    participantRefCount: stringArray(event?.participantRefs).length,
    evidenceRefCount: stringArray(event?.evidenceRefs).length,
    receiptRefCount: stringArray(event?.receiptRefs).length,
    storageKind: nonEmptyString(storage.storageKind),
    storageRole: nonEmptyString(storage.storageRole),
    scaffoldStorage: storage.scaffoldStorage === true,
    localFileStorage: storage.localFileStorage === true,
    sourceIsSubstrate: storage.sourceIsSubstrate === true,
    localLayerSubstrate: storage.localLayerSubstrate === true,
    durableLocalLayerState: storage.durableLocalLayerState === true,
    decentralizedState: storage.decentralizedState === true,
    canonicalMaterializedHistory: storage.canonicalMaterializedHistory === true,
    autobaseBackend: storage.autobaseBackend === true,
    hypercoreCorestoreBackend: storage.hypercoreCorestoreBackend === true,
    hyperbeeIndex: storage.hyperbeeIndex === true,
    acceptedContinuity: acceptance.acceptedContinuity === true,
    deterministicApplyRequired: acceptance.deterministicApplyRequired === true,
    appendSuccessIsAcceptance: acceptance.appendSuccessIsAcceptance === true,
    writeSuccessIsAcceptance: acceptance.writeSuccessIsAcceptance === true,
    storageVisibilityIsContinuity: acceptance.storageVisibilityIsContinuity === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedCalledEdge: false,
    testbedMutatedEdge: false,
    testbedOpenedEdgeStorage: false,
    testbedStartedAutobaseBackend: false,
    truthClaimed: false,
    completionClaimed: false,
    authorityGranted: false,
    storageIsSubstrate: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    canonicalHistoryClaimed: false,
    causalTruthClaimed: false,
    meshTruthClaimed: false,
    runtimeAuthorityClaimed: false,
    rendererAuthorityClaimed: false
  });
}

export function listTestbedEdgeLocalLayerContinuityEventStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES));
}
