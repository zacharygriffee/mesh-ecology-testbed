export const TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_repo_work_packet_autobase_apply_lab_evidence.v1";

export const TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES = Object.freeze({
  VISIBLE: "repo_work_packet_autobase_apply_lab_visible",
  BLOCKED: "repo_work_packet_autobase_apply_lab_blocked",
  MALFORMED: "repo_work_packet_autobase_apply_lab_malformed",
  INCOMPLETE: "repo_work_packet_autobase_apply_lab_incomplete"
});

const EXPECTED_KIND = "causal-edge-repo-work-packet-autobase-apply-lab-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-repo-work-packet-autobase-apply-lab-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_sandboxed_autobase_repo_work_packet_projection_log_apply_lab_result";
const EXPECTED_SOURCE_SCHEMA = "edge_sandboxed_autobase_repo_work_packet_projection_log_apply_lab_result.v0";

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
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["repo_work_packet_autobase_apply_lab_missing_or_malformed"])
    });
  }

  const source = isPlainObject(evidenceArtifact.source) ? evidenceArtifact.source : {};
  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const checkpoint = isPlainObject(evidenceArtifact.productionPromotionCheckpoint)
    ? evidenceArtifact.productionPromotionCheckpoint
    : {};
  const labPosture = isPlainObject(evidenceArtifact.labPosture) ? evidenceArtifact.labPosture : {};
  const storage = isPlainObject(evidenceArtifact.storageLanePosture) ? evidenceArtifact.storageLanePosture : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.labResultId,
    refs.sourceApplyResultRef,
    refs.checkpointRef,
    ...stringArray(refs.writerRefs),
    ...stringArray(refs.headRefs),
    ...stringArray(refs.linearizedEntryRefs)
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("repo_work_packet_autobase_apply_lab_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("repo_work_packet_autobase_apply_lab_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("repo_work_packet_autobase_apply_lab_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-repo-work-packet-autobase-apply-lab-evidence-emitted") {
    reasonCodes.push("repo_work_packet_autobase_apply_lab_not_emitted");
  }
  if (source.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("repo_work_packet_autobase_apply_lab_source_repo_mismatch");
  if (source.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("repo_work_packet_autobase_apply_lab_source_kind_mismatch");
  if (source.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("repo_work_packet_autobase_apply_lab_source_schema_mismatch");
  if (!nonEmptyString(refs.sourceApplyResultRef)) reasonCodes.push("repo_work_packet_autobase_apply_lab_apply_result_ref_missing");
  if (stringArray(refs.writerRefs).length === 0) reasonCodes.push("repo_work_packet_autobase_apply_lab_writer_refs_missing");
  if (stringArray(refs.headRefs).length === 0) reasonCodes.push("repo_work_packet_autobase_apply_lab_head_refs_missing");
  if (stringArray(refs.linearizedEntryRefs).length === 0) reasonCodes.push("repo_work_packet_autobase_apply_lab_linearized_refs_missing");
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("repo_work_packet_autobase_apply_lab_ref_contains_compat_or_path_seam");
  if (
    labPosture.sandboxedAutobaseLab !== true ||
    labPosture.autobaseBackend !== true ||
    labPosture.writesAutobase !== true ||
    labPosture.derivedViewMaterialized !== true ||
    labPosture.productionCheckpointReached !== true ||
    labPosture.productionLocalLayerState !== false ||
    labPosture.writesDurableLocalLayerState !== false ||
    labPosture.appendSuccessIsAcceptance !== false ||
    labPosture.applySuccessIsTruth !== false ||
    labPosture.labResultIsReadiness !== false
  ) {
    reasonCodes.push("repo_work_packet_autobase_apply_lab_posture_missing_or_unsafe");
  }
  if (
    checkpoint.checkpointState !== "pre_production_autobase_apply_lab_passed" ||
    checkpoint.nextCheckpoint !== "production_local_layer_lane_promotion_decision" ||
    checkpoint.productionIsExpectedFutureWork !== true ||
    checkpoint.promotionDecisionStillRequired !== true
  ) {
    reasonCodes.push("repo_work_packet_autobase_apply_lab_checkpoint_missing_or_unsafe");
  }
  if (
    storage.productionBackendPromoted !== false ||
    storage.productionPromotionCheckpointReached !== true ||
    storage.storageRecordPromoted !== false ||
    storage.edgeStateMigration !== false ||
    storage.appendSuccessIsAcceptance !== false ||
    storage.linearizationIsTruth !== false
  ) {
    reasonCodes.push("repo_work_packet_autobase_apply_lab_storage_posture_missing_or_unsafe");
  }
  if (
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.startsProductionBackend !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("repo_work_packet_autobase_apply_lab_boundary_overclaim");
  }
  if (
    validation.status !== "edge-repo-work-packet-autobase-apply-lab-valid-evidence" ||
    validation.sandboxAutobaseObserved !== true ||
    validation.checkpointPresent !== true ||
    validation.storageLaneSafe !== true ||
    validation.refsSafe !== true ||
    validation.noProductionOverclaim !== true
  ) {
    reasonCodes.push("repo_work_packet_autobase_apply_lab_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam") ||
    code.includes("storage_posture")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["repo_work_packet_autobase_apply_lab_visible"])
  });
}

export function buildTestbedEdgeRepoWorkPacketAutobaseApplyLabEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const checkpoint = isPlainObject(evidenceArtifact?.productionPromotionCheckpoint)
    ? evidenceArtifact.productionPromotionCheckpoint
    : {};
  const labPosture = isPlainObject(evidenceArtifact?.labPosture) ? evidenceArtifact.labPosture : {};

  return Object.freeze({
    artifactKind: "testbed_edge_repo_work_packet_autobase_apply_lab_evidence",
    schemaVersion: TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-repo-work-packet-autobase-apply-lab:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceApplyResultRef: nonEmptyString(refs.sourceApplyResultRef),
    checkpointRef: nonEmptyString(refs.checkpointRef),
    checkpointState: nonEmptyString(checkpoint.checkpointState),
    nextCheckpoint: nonEmptyString(checkpoint.nextCheckpoint),
    productionIsExpectedFutureWork: checkpoint.productionIsExpectedFutureWork === true,
    promotionDecisionStillRequired: checkpoint.promotionDecisionStillRequired === true,
    sandboxedAutobaseLab: labPosture.sandboxedAutobaseLab === true,
    autobaseBackendObserved: labPosture.autobaseBackend === true,
    writesAutobaseObserved: labPosture.writesAutobase === true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedClaimsCausalTruth: false,
    reviewOnly: true,
    evidenceOnly: true
  });
}

export function listTestbedEdgeRepoWorkPacketAutobaseApplyLabStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_REPO_WORK_PACKET_AUTOBASE_APPLY_LAB_STATUSES));
}
