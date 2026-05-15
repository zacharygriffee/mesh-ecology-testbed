export const TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_EVIDENCE_SCHEMA_VERSION =
  "testbed_local_layer_frontier_candidate_evidence.v1";

export const TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES = Object.freeze({
  FRONTIER_CANDIDATE_VISIBLE: "frontier_candidate_visible",
  FRONTIER_CANDIDATE_BLOCKED: "frontier_candidate_blocked",
  FRONTIER_CANDIDATE_MALFORMED: "frontier_candidate_malformed",
  FRONTIER_CANDIDATE_INCOMPLETE: "frontier_candidate_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-local-layer-frontier-candidate-evidence";
const EXPECTED_SCHEMA = "causal-substrate/local-layer-frontier-candidate-evidence/v1";
const EXPECTED_SOURCE_SCHEMA = "mesh-ecology-spine/local-layer-collaborative-frontier/v0";

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

function frontierRefs(artifact) {
  return isPlainObject(artifact?.frontierRefs) ? artifact.frontierRefs : {};
}

function orderingEvidence(artifact) {
  return isPlainObject(artifact?.orderingEvidence) ? artifact.orderingEvidence : {};
}

function source(artifact) {
  return isPlainObject(artifact?.source) ? artifact.source : {};
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function collectAllRefs(refs) {
  return [
    refs.frontierId,
    refs.projectionLaneRef,
    refs.layerRef,
    refs.observerRef,
    ...stringArray(refs.writerRefs),
    ...stringArray(refs.headRefs),
    ...stringArray(refs.linearizedEntryRefs),
    ...stringArray(refs.causalFrontierRefs),
    ...stringArray(refs.sourceProjectionEventRefs),
    ...stringArray(refs.sourceHappeningRefs)
  ].filter((ref) => typeof ref === "string" && ref.trim() !== "");
}

function validateFrontierEvidence({ evidenceArtifact, requiredSourceRefs = [] } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_MALFORMED,
      reasonCodes: Object.freeze(["frontier_candidate_evidence_missing_or_malformed"])
    });
  }

  const refs = frontierRefs(evidenceArtifact);
  const order = orderingEvidence(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const evidenceSource = source(evidenceArtifact);
  const sourceRefs = [
    ...stringArray(refs.sourceProjectionEventRefs),
    ...stringArray(refs.sourceHappeningRefs)
  ];
  const suppliedSourceRefs = new Set(sourceRefs);
  const missingRequiredRefs = stringArray(requiredSourceRefs).filter((ref) => !suppliedSourceRefs.has(ref));

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("frontier_candidate_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("frontier_candidate_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("frontier_candidate_schema_version_mismatch");
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("frontier_candidate_artifact_id_missing");
  if (evidenceArtifact.reviewStatus !== "local-layer-frontier-candidate-evidence-emitted") {
    reasonCodes.push("frontier_candidate_not_emitted");
  }
  if (evidenceSource.sourceRepo !== "mesh-ecology-spine") reasonCodes.push("frontier_candidate_source_repo_mismatch");
  if (evidenceSource.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("frontier_candidate_source_schema_mismatch");

  if (!nonEmptyString(refs.frontierId)) reasonCodes.push("frontier_candidate_frontier_id_missing");
  if (!nonEmptyString(refs.projectionLaneRef)) reasonCodes.push("frontier_candidate_projection_lane_ref_missing");
  if (!nonEmptyString(refs.layerRef)) reasonCodes.push("frontier_candidate_layer_ref_missing");
  if (!nonEmptyString(refs.observerRef)) reasonCodes.push("frontier_candidate_observer_ref_missing");
  if (stringArray(refs.writerRefs).length === 0) reasonCodes.push("frontier_candidate_writer_refs_missing");
  if (stringArray(refs.headRefs).length === 0) reasonCodes.push("frontier_candidate_head_refs_missing");
  if (stringArray(refs.linearizedEntryRefs).length === 0) reasonCodes.push("frontier_candidate_linearized_entry_refs_missing");
  if (stringArray(refs.causalFrontierRefs).length === 0) reasonCodes.push("frontier_candidate_causal_frontier_refs_missing");
  if (sourceRefs.length === 0) reasonCodes.push("frontier_candidate_source_refs_missing");
  if (collectAllRefs(refs).some(unsafeSeamRef)) reasonCodes.push("frontier_candidate_ref_contains_compat_or_path_seam");

  if (order.orderingSource !== "autobase_linearization") reasonCodes.push("frontier_candidate_ordering_source_invalid");
  if (order.wallClockDefinesCausalOrder !== false) reasonCodes.push("frontier_candidate_wall_clock_claims_causal_order");
  if (order.collaborativeCausalOrderCandidate !== "autobase-or-equivalent-linearization") {
    reasonCodes.push("frontier_candidate_collaborative_order_candidate_missing");
  }
  if (
    order.headsRequired !== true ||
    order.writerRefsRequired !== true ||
    order.sourceRefsRequired !== true ||
    order.lineageRefsRequired !== true
  ) {
    reasonCodes.push("frontier_candidate_ordering_required_flags_missing");
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
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.claimsLayerSettlement !== false ||
    evidenceBoundary.publishesToMesh !== false ||
    evidenceBoundary.startsBackend !== false
  ) {
    reasonCodes.push("frontier_candidate_boundary_overclaim");
  }

  if (
    evidenceValidation.status !== "local-layer-frontier-candidate-valid-evidence" ||
    evidenceValidation.writerRefsPresent !== true ||
    evidenceValidation.headRefsPresent !== true ||
    evidenceValidation.linearizedEntryRefsPresent !== true ||
    evidenceValidation.causalFrontierRefsPresent !== true ||
    evidenceValidation.sourceRefsPresent !== true ||
    evidenceValidation.wallClockCausalOrderBlocked !== true ||
    evidenceValidation.unsafeSeamRefsBlocked !== true ||
    evidenceValidation.unsafeClaimsBlocked !== true
  ) {
    reasonCodes.push("frontier_candidate_validation_not_ready");
  }

  if (missingRequiredRefs.length > 0) reasonCodes.push("frontier_candidate_required_source_refs_missing");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("claims") ||
    code.includes("canonical") ||
    code.includes("compat") ||
    code.includes("path_seam") ||
    code.includes("wall_clock")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES.FRONTIER_CANDIDATE_VISIBLE,
    reasonCodes: Object.freeze(["frontier_candidate_visible"])
  });
}

export function buildTestbedLocalLayerFrontierCandidateEvidence({
  evidenceArtifact = null,
  requiredSourceRefs = [],
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const refs = frontierRefs(evidenceArtifact);
  const order = orderingEvidence(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const validationResult = validateFrontierEvidence({ evidenceArtifact, requiredSourceRefs });

  return Object.freeze({
    artifactKind: "testbed_local_layer_frontier_candidate_evidence",
    schemaVersion: TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-local-layer-frontier-candidate:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    frontierId: nonEmptyString(refs.frontierId),
    projectionLaneRef: nonEmptyString(refs.projectionLaneRef),
    layerRef: nonEmptyString(refs.layerRef),
    observerRef: nonEmptyString(refs.observerRef),
    writerRefCount: stringArray(refs.writerRefs).length,
    headRefCount: stringArray(refs.headRefs).length,
    linearizedEntryRefCount: stringArray(refs.linearizedEntryRefs).length,
    causalFrontierRefCount: stringArray(refs.causalFrontierRefs).length,
    sourceProjectionEventRefCount: stringArray(refs.sourceProjectionEventRefs).length,
    sourceHappeningRefCount: stringArray(refs.sourceHappeningRefs).length,
    requiredSourceRefs: Object.freeze(stringArray(requiredSourceRefs)),
    orderingSource: nonEmptyString(order.orderingSource),
    wallClockDefinesCausalOrder: order.wallClockDefinesCausalOrder === true,
    collaborativeCausalOrderCandidate: nonEmptyString(order.collaborativeCausalOrderCandidate),
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledCausalSubstrate: false,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
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
    causalSubstrateBoundaryReviewOnly: evidenceBoundary.reviewOnly === true,
    causalSubstrateBoundaryEvidenceOnly: evidenceBoundary.evidenceOnly === true,
    causalSubstrateOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalSubstrateOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalSubstrateWritesContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalSubstrateAcceptsCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    causalSubstrateClaimsCausalTruth: evidenceBoundary.claimsCausalTruth === true,
    causalSubstrateClaimsLayerSettlement: evidenceBoundary.claimsLayerSettlement === true,
    causalSubstrateValidationWallClockBlocked: evidenceValidation.wallClockCausalOrderBlocked === true,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedLocalLayerFrontierCandidateStatuses() {
  return Object.freeze(Object.values(TESTBED_LOCAL_LAYER_FRONTIER_CANDIDATE_STATUSES));
}
