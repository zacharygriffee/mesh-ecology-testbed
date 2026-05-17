export const TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_continuity_lane_autobase_lab_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_continuity_lane_autobase_lab_visible",
  BLOCKED: "edge_local_layer_continuity_lane_autobase_lab_blocked",
  MALFORMED: "edge_local_layer_continuity_lane_autobase_lab_malformed",
  INCOMPLETE: "edge_local_layer_continuity_lane_autobase_lab_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-continuity-lane-autobase-lab-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-continuity-lane-autobase-lab-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_local_layer_continuity_lane_autobase_lab_result";
const EXPECTED_SOURCE_SCHEMA = "edge_local_layer_continuity_lane_autobase_lab_result.v0";

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
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_continuity_lane_autobase_lab_missing_or_malformed"])
    });
  }

  const source = isPlainObject(evidenceArtifact.source) ? evidenceArtifact.source : {};
  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const gate = isPlainObject(evidenceArtifact.productionGateDecision) ? evidenceArtifact.productionGateDecision : {};
  const entryPosture = isPlainObject(evidenceArtifact.laneEntryPosture) ? evidenceArtifact.laneEntryPosture : {};
  const labPosture = isPlainObject(evidenceArtifact.labPosture) ? evidenceArtifact.labPosture : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.laneEntryId,
    refs.laneEntryHash,
    refs.semanticEventRef,
    refs.semanticPayloadHash,
    refs.nextGate,
    ...stringArray(refs.sourceRefs),
    ...stringArray(refs.writerRefs),
    ...stringArray(refs.headRefs),
    ...stringArray(refs.linearizedEntryRefs)
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-continuity-lane-autobase-lab-evidence-emitted") {
    reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_not_emitted");
  }
  if (source.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_source_repo_mismatch");
  if (source.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_source_kind_mismatch");
  if (source.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_source_schema_mismatch");
  if (!nonEmptyString(refs.laneEntryId)) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_lane_entry_ref_missing");
  if (!nonEmptyString(refs.semanticEventRef)) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_semantic_event_ref_missing");
  if (stringArray(refs.sourceRefs).length === 0) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_source_refs_missing");
  if (stringArray(refs.writerRefs).length === 0) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_writer_refs_missing");
  if (stringArray(refs.headRefs).length === 0) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_head_refs_missing");
  if (stringArray(refs.linearizedEntryRefs).length === 0) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_linearized_refs_missing");
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_ref_contains_compat_or_path_seam");
  if (
    entryPosture.labStorageEnvelope !== true ||
    entryPosture.semanticContinuityUnit !== false ||
    entryPosture.preservesSemanticContinuityEvent !== true ||
    entryPosture.productionLaneEntry !== false ||
    entryPosture.productionLocalLayerState !== false ||
    entryPosture.durableLocalLayerContinuity !== false ||
    entryPosture.edgeStateMigration !== false ||
    entryPosture.appendSuccessIsAcceptance !== false ||
    entryPosture.linearizationIsTruth !== false ||
    entryPosture.replicaVisibilityIsContinuity !== false
  ) {
    reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_entry_posture_missing_or_unsafe");
  }
  if (
    labPosture.sandboxedAutobaseLab !== true ||
    labPosture.autobaseBackendOpened !== true ||
    labPosture.writesAutobase !== true ||
    labPosture.derivedViewMaterialized !== true ||
    labPosture.implementationWedge !== true ||
    labPosture.productionLocalLayerState !== false ||
    labPosture.productionLanePromoted !== false ||
    labPosture.writesDurableLocalLayerState !== false ||
    labPosture.edgeStateMigration !== false ||
    labPosture.appendSuccessIsAcceptance !== false ||
    labPosture.applySuccessIsTruth !== false ||
    labPosture.labResultIsReadiness !== false
  ) {
    reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_posture_missing_or_unsafe");
  }
  if (
    gate.gateState !== "implementation_wedge_allowed_production_promotion_blocked" ||
    gate.nextGate !== "production_local_layer_lane_promotion_decision" ||
    gate.productionIsExpectedFutureWork !== true ||
    gate.productionLanePromoted !== false ||
    gate.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_gate_missing_or_unsafe");
  }
  if (
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.startsProductionBackend !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.migratesEdgeState !== false ||
    boundary.grantsWriterAuthority !== false
  ) {
    reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-continuity-lane-autobase-lab-valid-evidence" ||
    validation.laneEntryPresent !== true ||
    validation.sandboxAutobaseObserved !== true ||
    validation.productionGatePresent !== true ||
    validation.refsSafe !== true ||
    validation.noProductionOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_continuity_lane_autobase_lab_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_continuity_lane_autobase_lab_visible"])
  });
}

export function buildTestbedEdgeLocalLayerContinuityLaneAutobaseLabEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const gate = isPlainObject(evidenceArtifact?.productionGateDecision) ? evidenceArtifact.productionGateDecision : {};
  const labPosture = isPlainObject(evidenceArtifact?.labPosture) ? evidenceArtifact.labPosture : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_continuity_lane_autobase_lab_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-continuity-lane-autobase-lab:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    laneEntryId: nonEmptyString(refs.laneEntryId),
    semanticEventRef: nonEmptyString(refs.semanticEventRef),
    nextGate: nonEmptyString(gate.nextGate),
    productionIsExpectedFutureWork: gate.productionIsExpectedFutureWork === true,
    productionLanePromoted: gate.productionLanePromoted === true,
    edgeStateMigrationAllowed: gate.edgeStateMigrationAllowed === true,
    sandboxedAutobaseLab: labPosture.sandboxedAutobaseLab === true,
    autobaseBackendObserved: labPosture.autobaseBackendOpened === true,
    writesAutobaseObserved: labPosture.writesAutobase === true,
    implementationWedge: labPosture.implementationWedge === true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedClaimsCausalTruth: false,
    testbedStartsProductionBackend: false,
    testbedGrantsWriterAuthority: false,
    reviewOnly: true,
    evidenceOnly: true
  });
}

export function listTestbedEdgeLocalLayerContinuityLaneAutobaseLabStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_LANE_AUTOBASE_LAB_STATUSES));
}
