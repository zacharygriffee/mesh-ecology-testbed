export const TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_EVIDENCE_SCHEMA_VERSION =
  "testbed_local_layer_projection_happening_map_evidence.v1";

export const TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES = Object.freeze({
  HAPPENING_MAP_VISIBLE: "projection_happening_map_visible",
  HAPPENING_MAP_BLOCKED: "projection_happening_map_blocked",
  HAPPENING_MAP_MALFORMED: "projection_happening_map_malformed",
  HAPPENING_MAP_INCOMPLETE: "projection_happening_map_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-projection-log-happening-map";
const EXPECTED_SCHEMA = "causal-substrate/edge-projection-log-happening-map/v1";
const EXPECTED_SOURCE_SCHEMA = "edge_projection_event_log_entry.v0";
const EXPECTED_NAMESPACE_PREFIX = Object.freeze([
  "mesh-ecology",
  "local-layer",
  "projection-event",
  "v0",
  "producer-mesh-ecology-edge",
  "projection-operator-situation-view"
]);
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

function objectArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => isPlainObject(entry))
    : [];
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

function unsafeNamespacePart(part) {
  return /:\/\/|\/|\\|(^|[.-])\.\.($|[.-])|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+/iu.test(part);
}

function namespaceHasExpectedPrefix(namespaceParts) {
  return EXPECTED_NAMESPACE_PREFIX.every((part, index) => namespaceParts[index] === part);
}

function validateHappeningRef(ref) {
  const reasonCodes = [];
  const namespaceParts = stringArray(ref.namespaceParts);
  const sourceRefs = stringArray(ref.sourceRefs);
  const transportRefs = stringArray(ref.transportRefs);

  if (!nonEmptyString(ref.happeningId) || !ref.happeningId.startsWith("causal-edge-projection-log-happening:")) {
    reasonCodes.push("projection_happening_ref_id_invalid");
  }
  if (ref.happeningLabel !== "edge-projection-event-log-entry") {
    reasonCodes.push("projection_happening_ref_label_mismatch");
  }
  if (!nonEmptyString(ref.sourceEntryRef)) reasonCodes.push("projection_happening_ref_source_entry_missing");
  if (!nonEmptyString(ref.sourceProjectionEventRef)) reasonCodes.push("projection_happening_ref_projection_event_missing");
  if (!nonEmptyString(ref.projectionRef)) reasonCodes.push("projection_happening_ref_projection_ref_missing");
  if (!nonEmptyString(ref.payloadHash) || !SHA256_REF.test(ref.payloadHash)) {
    reasonCodes.push("projection_happening_ref_payload_hash_invalid");
  }
  if (ref.payloadHashAlgorithm !== "sha256-canonical-json") {
    reasonCodes.push("projection_happening_ref_payload_hash_algorithm_mismatch");
  }
  if (!Number.isInteger(ref.sequence) || ref.sequence < 0) {
    reasonCodes.push("projection_happening_ref_sequence_invalid");
  }
  if (sourceRefs.length === 0) reasonCodes.push("projection_happening_ref_source_refs_missing");
  if (namespaceParts.length === 0) reasonCodes.push("projection_happening_ref_namespace_parts_missing");
  if (namespaceParts.length > 0 && !namespaceHasExpectedPrefix(namespaceParts)) {
    reasonCodes.push("projection_happening_ref_namespace_prefix_mismatch");
  }
  if (namespaceParts.some(unsafeNamespacePart)) {
    reasonCodes.push("projection_happening_ref_namespace_contains_scaffold_or_path");
  }
  if (transportRefs.some((transportRef) => /http|ssh|localhost|127\.0\.0\.1/iu.test(transportRef))) {
    reasonCodes.push("projection_happening_ref_transport_contains_compat_scaffold");
  }
  if (!nonEmptyString(ref.temporalRef)) reasonCodes.push("projection_happening_ref_observation_time_missing");
  if (!["log-entry", "projection-event"].includes(ref.temporalRefSource)) {
    reasonCodes.push("projection_happening_ref_temporal_source_invalid");
  }
  if (ref.temporalRefMeaning !== "wall-clock-observation-metadata") {
    reasonCodes.push("projection_happening_ref_temporal_meaning_unsafe");
  }
  if (ref.localCausalOrderSource !== "single-writer-sequence-and-event-refs") {
    reasonCodes.push("projection_happening_ref_local_causal_order_source_invalid");
  }
  if (ref.wallClockDefinesCausalOrder !== false) {
    reasonCodes.push("projection_happening_ref_wall_clock_claims_causal_order");
  }
  if (ref.collaborativeCausalOrderCandidate !== "autobase-or-equivalent-linearization") {
    reasonCodes.push("projection_happening_ref_collaborative_causal_order_candidate_missing");
  }
  if (ref.causalRole !== "edge-projection-log-entry-as-happening-reference") {
    reasonCodes.push("projection_happening_ref_causal_role_mismatch");
  }
  if (ref.acceptedAsCanonicalHistory !== false) {
    reasonCodes.push("projection_happening_ref_claims_canonical_history");
  }

  return reasonCodes;
}

function validateProjectionHappeningMap({ happeningMapArtifact, requiredSourceRefs = [] } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(happeningMapArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_MALFORMED,
      reasonCodes: Object.freeze(["projection_happening_map_missing_or_malformed"])
    });
  }

  const mapBoundary = boundary(happeningMapArtifact);
  const mapValidation = validation(happeningMapArtifact);
  const mapSource = source(happeningMapArtifact);
  const happeningRefs = objectArray(happeningMapArtifact.happeningRefs);
  const suppliedSourceRefs = new Set(happeningRefs.flatMap((ref) => stringArray(ref.sourceRefs)));
  const missingRequiredRefs = stringArray(requiredSourceRefs).filter((ref) => !suppliedSourceRefs.has(ref));

  if (happeningMapArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("projection_happening_map_artifact_kind_mismatch");
  if (happeningMapArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("projection_happening_map_schema_mismatch");
  if (happeningMapArtifact.schemaVersion !== 1) reasonCodes.push("projection_happening_map_schema_version_mismatch");
  if (!nonEmptyString(happeningMapArtifact.artifactId)) reasonCodes.push("projection_happening_map_artifact_id_missing");
  if (happeningMapArtifact.reviewStatus !== "edge-projection-log-happening-map-emitted") {
    reasonCodes.push("projection_happening_map_not_emitted");
  }
  if (mapSource.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("projection_happening_map_source_repo_mismatch");
  if (mapSource.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("projection_happening_map_source_schema_mismatch");
  if (happeningRefs.length === 0) reasonCodes.push("projection_happening_map_refs_missing");

  if (
    mapBoundary.reviewOnly !== true ||
    mapBoundary.evidenceOnly !== true ||
    mapBoundary.edgeRuntimeFetched !== false ||
    mapBoundary.edgeCalled !== false ||
    mapBoundary.edgeMutated !== false ||
    mapBoundary.sourceCorestoreOpened !== false ||
    mapBoundary.replaysProjectionLog !== false ||
    mapBoundary.writesContinuityRecords !== false ||
    mapBoundary.acceptsCanonicalHistory !== false ||
    mapBoundary.claimsCausalTruth !== false ||
    mapBoundary.startsBackend !== false ||
    mapBoundary.requiresAutobase !== false ||
    mapBoundary.publishesToMesh !== false
  ) {
    reasonCodes.push("projection_happening_map_boundary_overclaim");
  }

  if (
    mapValidation.status !== "edge-projection-log-entry-valid" ||
    mapValidation.entryPreservedAsReference !== true ||
    mapValidation.sourceRefsPresent !== true ||
    mapValidation.temporalRefPresent !== true ||
    mapValidation.timePostureDistinguishesWallClock !== true ||
    mapValidation.namespacePartsSemantic !== true ||
    mapValidation.noStorageOrTransportOverclaim !== true ||
    mapValidation.noAuthorityOrTruthClaim !== true
  ) {
    reasonCodes.push("projection_happening_map_validation_not_ready");
  }

  for (const ref of happeningRefs) {
    reasonCodes.push(...validateHappeningRef(ref));
  }
  if (missingRequiredRefs.length > 0) reasonCodes.push("projection_happening_map_required_source_refs_missing");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("scaffold") ||
    code.includes("claims") ||
    code.includes("canonical") ||
    code.includes("wall_clock")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES.HAPPENING_MAP_VISIBLE,
    reasonCodes: Object.freeze(["projection_happening_map_visible"])
  });
}

export function buildTestbedLocalLayerProjectionHappeningMapEvidence({
  happeningMapArtifact = null,
  requiredSourceRefs = [],
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const refs = objectArray(happeningMapArtifact?.happeningRefs);
  const firstRef = refs[0] ?? {};
  const mapBoundary = boundary(happeningMapArtifact);
  const mapValidation = validation(happeningMapArtifact);
  const validationResult = validateProjectionHappeningMap({ happeningMapArtifact, requiredSourceRefs });

  return Object.freeze({
    artifactKind: "testbed_local_layer_projection_happening_map_evidence",
    schemaVersion: TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-local-layer-projection-happening-map:${nonEmptyString(happeningMapArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(happeningMapArtifact?.artifactKind),
    sourceSchema: nonEmptyString(happeningMapArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(happeningMapArtifact?.schemaVersion) ? happeningMapArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(happeningMapArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(happeningMapArtifact?.reviewStatus),
    happeningRefCount: refs.length,
    firstHappeningId: nonEmptyString(firstRef.happeningId),
    firstSourceEntryRef: nonEmptyString(firstRef.sourceEntryRef),
    firstSourceProjectionEventRef: nonEmptyString(firstRef.sourceProjectionEventRef),
    firstTemporalRef: nonEmptyString(firstRef.temporalRef),
    firstTemporalRefMeaning: nonEmptyString(firstRef.temporalRefMeaning),
    firstLocalCausalOrderSource: nonEmptyString(firstRef.localCausalOrderSource),
    firstCollaborativeCausalOrderCandidate: nonEmptyString(firstRef.collaborativeCausalOrderCandidate),
    firstWallClockDefinesCausalOrder: firstRef.wallClockDefinesCausalOrder === true,
    firstAcceptedAsCanonicalHistory: firstRef.acceptedAsCanonicalHistory === true,
    requiredSourceRefs: Object.freeze(stringArray(requiredSourceRefs)),
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedCalledCausalSubstrate: false,
    testbedOpenedCorestore: false,
    testbedReplayedProjectionLog: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    authorityGranted: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    storageBackendInstalled: false,
    autobaseRequiredNow: mapBoundary.requiresAutobase === true,
    causalSubstrateBoundaryReviewOnly: mapBoundary.reviewOnly === true,
    causalSubstrateBoundaryEvidenceOnly: mapBoundary.evidenceOnly === true,
    causalSubstrateOpenedEdgeCorestore: mapBoundary.sourceCorestoreOpened === true,
    causalSubstrateWritesContinuityRecords: mapBoundary.writesContinuityRecords === true,
    causalSubstrateAcceptsCanonicalHistory: mapBoundary.acceptsCanonicalHistory === true,
    causalSubstrateClaimsCausalTruth: mapBoundary.claimsCausalTruth === true,
    causalSubstrateTimePostureDistinguishesWallClock: mapValidation.timePostureDistinguishesWallClock === true,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedLocalLayerProjectionHappeningMapStatuses() {
  return Object.freeze(Object.values(TESTBED_LOCAL_LAYER_PROJECTION_HAPPENING_MAP_STATUSES));
}
