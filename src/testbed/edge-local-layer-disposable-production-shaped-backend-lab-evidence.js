export const TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_disposable_production_shaped_backend_lab_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_disposable_production_shaped_backend_lab_visible",
  BLOCKED: "edge_local_layer_disposable_production_shaped_backend_lab_blocked",
  MALFORMED: "edge_local_layer_disposable_production_shaped_backend_lab_malformed",
  INCOMPLETE: "edge_local_layer_disposable_production_shaped_backend_lab_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-disposable-production-shaped-backend-lab-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-disposable-production-shaped-backend-lab-evidence/v1";

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

function validate({ evidenceArtifact }) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_disposable_production_shaped_backend_lab_missing_or_malformed"])
    });
  }

  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const backend = isPlainObject(evidenceArtifact.backendShape) ? evidenceArtifact.backendShape : {};
  const laneEntry = isPlainObject(evidenceArtifact.laneEntry) ? evidenceArtifact.laneEntry : {};
  const acceptance = isPlainObject(evidenceArtifact.acceptancePosture) ? evidenceArtifact.acceptancePosture : {};
  const storageRoot = isPlainObject(evidenceArtifact.storageRootPosture) ? evidenceArtifact.storageRootPosture : {};
  const gate = isPlainObject(evidenceArtifact.productionGateDecision) ? evidenceArtifact.productionGateDecision : {};
  const posture = isPlainObject(evidenceArtifact.labPosture) ? evidenceArtifact.labPosture : {};
  const causal = isPlainObject(evidenceArtifact.causalInterpretation) ? evidenceArtifact.causalInterpretation : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.sourceArtifactId,
    refs.sourceArtifactHash,
    refs.sourceProductionBackendWedgeRef,
    refs.sourceProductionBackendWedgeHash,
    refs.sourceOperatorPromotionDecisionRef,
    refs.sourceWriterAdmissionPacketRef,
    ...stringArray(refs.sourceRefs),
    refs.laneEntryRef,
    refs.laneEntryHash,
    refs.semanticEventRef,
    ...stringArray(refs.writerRefs),
    ...stringArray(refs.headRefs),
    ...stringArray(refs.linearizedEntryRefs),
    backend.namespaceRef,
    backend.laneRef
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-disposable-production-shaped-backend-lab-evidence-emitted") {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_not_emitted");
  }
  if (
    !nonEmptyString(refs.sourceArtifactId) ||
    !nonEmptyString(refs.sourceProductionBackendWedgeRef) ||
    !nonEmptyString(refs.sourceOperatorPromotionDecisionRef) ||
    !nonEmptyString(refs.laneEntryRef) ||
    stringArray(refs.sourceRefs).length < 12 ||
    stringArray(refs.writerRefs).length < 1 ||
    stringArray(refs.headRefs).length < 1 ||
    stringArray(refs.linearizedEntryRefs).length < 1
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_refs_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_ref_contains_compat_or_path_seam");
  if (
    backend.backendKind !== "autobase" ||
    backend.namespaceRef !== "corestore-namespace:local-layer-continuity-production-shaped-lab" ||
    backend.laneRef !== "local-layer-continuity-lane:operator-owned-devices-production-shaped-lab" ||
    backend.storageLaneKind !== "bounded_autobase_local_layer_continuity_lane" ||
    backend.semanticInputKind !== "mesh_ecology_local_layer_continuity_event" ||
    backend.storageEnvelopeKind !== "mesh_ecology_local_layer_lane_entry"
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_backend_shape_missing_or_unsafe");
  }
  if (
    laneEntry.artifactKind !== "mesh_ecology_local_layer_lane_entry" ||
    laneEntry.schemaVersion !== "mesh_ecology_local_layer_lane_entry.v0" ||
    laneEntry.laneRef !== backend.laneRef ||
    laneEntry.namespaceRef !== backend.namespaceRef ||
    laneEntry.preservesSemanticContinuityEvent !== true ||
    laneEntry.productionLaneEntry !== false ||
    laneEntry.productionLocalLayerState !== false ||
    laneEntry.durableLocalLayerContinuity !== false ||
    laneEntry.appendSuccessIsAcceptance !== false ||
    laneEntry.linearizationIsTruth !== false ||
    laneEntry.replicaVisibilityIsContinuity !== false
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_lane_entry_missing_or_unsafe");
  }
  if (
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.applySuccessIsTruth !== false ||
    acceptance.linearizationIsTruth !== false ||
    acceptance.replicaVisibilityIsContinuity !== false ||
    acceptance.labSuccessIsProductionReadiness !== false ||
    acceptance.wedgePacketIsProductionPromotion !== false ||
    acceptance.acceptedProductionContinuity !== false ||
    acceptance.requiresSeparateProductionPromotionGate !== true
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_acceptance_posture_missing_or_unsafe");
  }
  if (
    storageRoot.disposableStorageRootRequired !== true ||
    storageRoot.localPathIsLabInputOnly !== true ||
    storageRoot.localPathIsContinuitySeam !== false ||
    storageRoot.localPathIsCanonicalIdentity !== false ||
    storageRoot.edgeStateMigration !== false
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_storage_root_posture_missing_or_unsafe");
  }
  if (
    gate.gateState !== "disposable_production_shaped_backend_lab_allowed_production_promotion_blocked" ||
    gate.nextGate !== "production_local_layer_lane_promotion_decision" ||
    gate.productionIsExpectedFutureWork !== true ||
    gate.productionBackendStarted !== false ||
    gate.productionLanePromoted !== false ||
    gate.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_production_gate_missing_or_unsafe");
  }
  if (
    posture.disposableProductionShapedBackendLab !== true ||
    posture.sandboxedAutobaseLab !== true ||
    posture.productionShapedNamespace !== true ||
    posture.autobaseBackendOpened !== true ||
    posture.corestoreOpened !== true ||
    posture.writesAutobase !== true ||
    posture.productionBackendStarted !== false ||
    posture.productionLocalLayerState !== false ||
    posture.productionLanePromoted !== false ||
    posture.writesDurableLocalLayerState !== false ||
    posture.edgeStateMigration !== false ||
    posture.localStoreRootIsIntegrationSeam !== false ||
    posture.httpSeam !== false ||
    posture.sshSeam !== false ||
    posture.appendSuccessIsAcceptance !== false ||
    posture.applySuccessIsTruth !== false ||
    posture.labResultIsReadiness !== false
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_posture_missing_or_unsafe");
  }
  if (
    causal.disposableBackendLabEvidenceOnly !== true ||
    causal.productionBackendStarted !== false ||
    causal.productionLanePromoted !== false ||
    causal.edgeStateMigrated !== false ||
    causal.causalSubstrateOwnsBackend !== false ||
    causal.causalSubstrateAcceptsTruth !== false
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_causal_interpretation_missing_or_unsafe");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.observesDisposableAutobaseLab !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.startsProductionBackend !== false ||
    boundary.grantsWriterAuthority !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-disposable-production-shaped-backend-lab-valid-evidence" ||
    validation.refsPresent !== true ||
    validation.backendShapeSafe !== true ||
    validation.laneEntrySafe !== true ||
    validation.acceptancePostureSafe !== true ||
    validation.storageRootPostureSafe !== true ||
    validation.productionGateSafe !== true ||
    validation.labPostureSafe !== true ||
    validation.refsSafe !== true ||
    validation.noProductionOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_disposable_production_shaped_backend_lab_validation_not_ready");
  }

  if (reasonCodes.some((code) => code.includes("mismatch") || code.includes("overclaim") || code.includes("unsafe") || code.includes("path_seam"))) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_disposable_production_shaped_backend_lab_visible"])
  });
}

export function buildTestbedEdgeLocalLayerDisposableProductionShapedBackendLabEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const backend = isPlainObject(evidenceArtifact?.backendShape) ? evidenceArtifact.backendShape : {};
  const gate = isPlainObject(evidenceArtifact?.productionGateDecision) ? evidenceArtifact.productionGateDecision : {};
  const posture = isPlainObject(evidenceArtifact?.labPosture) ? evidenceArtifact.labPosture : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_disposable_production_shaped_backend_lab_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-disposable-production-shaped-backend-lab:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceProductionBackendWedgeRef: nonEmptyString(refs.sourceProductionBackendWedgeRef),
    sourceOperatorPromotionDecisionRef: nonEmptyString(refs.sourceOperatorPromotionDecisionRef),
    laneEntryRef: nonEmptyString(refs.laneEntryRef),
    backendKind: nonEmptyString(backend.backendKind),
    namespaceRef: nonEmptyString(backend.namespaceRef),
    laneRef: nonEmptyString(backend.laneRef),
    nextGate: nonEmptyString(gate.nextGate),
    disposableLabVisible: posture.disposableProductionShapedBackendLab === true,
    productionBackendStarted: posture.productionBackendStarted === true || gate.productionBackendStarted === true,
    productionLanePromoted: posture.productionLanePromoted === true || gate.productionLanePromoted === true,
    edgeStateMigrationAllowed: posture.edgeStateMigration === true || gate.edgeStateMigrationAllowed === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedStartsProductionBackend: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false
  });
}

export function listTestbedEdgeLocalLayerDisposableProductionShapedBackendLabStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_DISPOSABLE_PRODUCTION_SHAPED_BACKEND_LAB_STATUSES));
}
