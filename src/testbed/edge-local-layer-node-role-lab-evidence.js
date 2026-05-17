export const TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_node_role_lab_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES = Object.freeze({
  VISIBLE: "node_role_lab_visible",
  BLOCKED: "node_role_lab_blocked",
  MALFORMED: "node_role_lab_malformed",
  INCOMPLETE: "node_role_lab_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-local-layer-node-role-lab-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-node-role-lab-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_sandboxed_local_layer_node_role_lab_result";
const EXPECTED_SOURCE_SCHEMA = "edge_sandboxed_local_layer_node_role_lab_result.v0";

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

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|ssh|http/iu.test(ref);
}

function refs(artifact) {
  return isPlainObject(artifact?.refs) ? artifact.refs : {};
}

function roleSeparation(artifact) {
  return isPlainObject(artifact?.roleSeparation) ? artifact.roleSeparation : {};
}

function causalInterpretation(artifact) {
  return isPlainObject(artifact?.causalInterpretation) ? artifact.causalInterpretation : {};
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

function collectAllRefs(evidenceRefs) {
  return [
    evidenceRefs.sourceStorageLaneCandidateRef,
    evidenceRefs.projectionViewRef,
    ...Object.values(isPlainObject(evidenceRefs.nodeRefs) ? evidenceRefs.nodeRefs : {}),
    ...stringArray(evidenceRefs.acceptedProjectionRecordRefs),
    ...stringArray(evidenceRefs.acceptedLogEntryRefs),
    ...stringArray(evidenceRefs.acceptedLaneEntryRefs),
    ...stringArray(evidenceRefs.acceptedApplyResultRefs),
    ...stringArray(evidenceRefs.acceptedWriterRefs),
    ...stringArray(evidenceRefs.acceptedLinearizedEntryRefs),
    ...stringArray(evidenceRefs.rejectedReviewRefs),
    ...stringArray(evidenceRefs.rejectedWriterRefs)
  ].filter((ref) => typeof ref === "string" && ref.trim() !== "");
}

function validateNodeRoleLabEvidence({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["node_role_lab_missing_or_malformed"])
    });
  }

  const evidenceRefs = refs(evidenceArtifact);
  const roles = roleSeparation(evidenceArtifact);
  const causal = causalInterpretation(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const evidenceSource = source(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("node_role_lab_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("node_role_lab_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("node_role_lab_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-node-role-lab-evidence-emitted") {
    reasonCodes.push("node_role_lab_not_emitted");
  }
  if (evidenceSource.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("node_role_lab_source_repo_mismatch");
  if (evidenceSource.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("node_role_lab_source_kind_mismatch");
  if (evidenceSource.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("node_role_lab_source_schema_mismatch");

  if (!nonEmptyString(evidenceRefs.sourceStorageLaneCandidateRef)) reasonCodes.push("node_role_lab_storage_candidate_ref_missing");
  if (!nonEmptyString(evidenceRefs.projectionViewRef)) reasonCodes.push("node_role_lab_projection_view_ref_missing");
  if (stringArray(evidenceRefs.acceptedProjectionRecordRefs).length === 0) reasonCodes.push("node_role_lab_accepted_projection_refs_missing");
  if (stringArray(evidenceRefs.acceptedLogEntryRefs).length === 0) reasonCodes.push("node_role_lab_accepted_log_entry_refs_missing");
  if (stringArray(evidenceRefs.rejectedReviewRefs).length === 0) reasonCodes.push("node_role_lab_rejected_review_refs_missing");
  if (collectAllRefs(evidenceRefs).some(unsafeSeamRef)) reasonCodes.push("node_role_lab_ref_contains_compat_or_path_seam");

  if (
    roles.observabilityIsAuthority !== false ||
    roles.observabilityIsWritability !== false ||
    roles.writabilityIsAuthority !== false ||
    roles.appendSuccessIsAcceptance !== false ||
    roles.deterministicApplyOwnsAcceptance !== true ||
    roles.operatorWriterAdmissionRequired !== true ||
    roles.candidateWriterAppendVisibleAsReviewEvidence !== true ||
    roles.derivedViewIncludesAcceptedOnly !== true ||
    roles.observerCanObserveAcceptedView !== true ||
    roles.observerAcceptedContinuityInput !== false ||
    roles.candidateAppendAttempted !== true ||
    roles.candidateAcceptedContinuityInput !== false ||
    roles.admittedAcceptedContinuityInput !== true
  ) {
    reasonCodes.push("node_role_lab_role_separation_missing_or_unsafe");
  }

  if (
    causal.interpretationKind !== "observer_relative_local_layer_node_role_evidence" ||
    causal.acceptedContinuityInputKind !== "mesh_ecology_local_layer_projection_event" ||
    causal.storageEnvelopeKind !== "edge_local_layer_projection_lane_entry" ||
    causal.observerRelative !== true ||
    causal.sourceShareBoundaryPreserved !== true ||
    causal.deviceBranchesRemainDeviceOwned !== true ||
    causal.localLayerStoresProjectionRefs !== true ||
    causal.causalSubstrateOwnsBackend !== false ||
    causal.causalSubstrateAcceptsTruth !== false
  ) {
    reasonCodes.push("node_role_lab_causal_interpretation_missing_or_unsafe");
  }

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.claimsAuthority !== false ||
    evidenceBoundary.claimsDurableState !== false ||
    evidenceBoundary.claimsReplicatedState !== false ||
    evidenceBoundary.startsBackend !== false ||
    evidenceBoundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("node_role_lab_boundary_overclaim");
  }

  if (
    evidenceValidation.status !== "edge-local-layer-node-role-lab-valid-evidence" ||
    evidenceValidation.expectedSourceSchemaPresent !== true ||
    evidenceValidation.projectionViewPresent !== true ||
    evidenceValidation.sourceRefsPresent !== true ||
    evidenceValidation.nodeRoleRefsPresent !== true ||
    evidenceValidation.roleSeparationPresent !== true ||
    evidenceValidation.acceptedOnlyViewPresent !== true ||
    evidenceValidation.rejectedReviewEvidencePresent !== true ||
    evidenceValidation.labPostureSafe !== true ||
    evidenceValidation.unsafeSeamRefsBlocked !== true ||
    evidenceValidation.unsafeClaimsBlocked !== true
  ) {
    reasonCodes.push("node_role_lab_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("compat") ||
    code.includes("path_seam") ||
    code.includes("causal_interpretation") ||
    code.includes("role_separation")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["node_role_lab_visible"])
  });
}

export function buildTestbedEdgeLocalLayerNodeRoleLabEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceRefs = refs(evidenceArtifact);
  const roles = roleSeparation(evidenceArtifact);
  const causal = causalInterpretation(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const result = validateNodeRoleLabEvidence({ evidenceArtifact });

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_node_role_lab_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-node-role-lab:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    sourceStorageLaneCandidateRef: nonEmptyString(evidenceRefs.sourceStorageLaneCandidateRef),
    projectionViewRef: nonEmptyString(evidenceRefs.projectionViewRef),
    acceptedProjectionRecordRefCount: stringArray(evidenceRefs.acceptedProjectionRecordRefs).length,
    acceptedLogEntryRefCount: stringArray(evidenceRefs.acceptedLogEntryRefs).length,
    rejectedReviewRefCount: stringArray(evidenceRefs.rejectedReviewRefs).length,
    observabilityIsAuthority: roles.observabilityIsAuthority === true,
    observabilityIsWritability: roles.observabilityIsWritability === true,
    writabilityIsAuthority: roles.writabilityIsAuthority === true,
    appendSuccessIsAcceptance: roles.appendSuccessIsAcceptance === true,
    deterministicApplyOwnsAcceptance: roles.deterministicApplyOwnsAcceptance === true,
    operatorWriterAdmissionRequired: roles.operatorWriterAdmissionRequired === true,
    observerAcceptedContinuityInput: roles.observerAcceptedContinuityInput === true,
    candidateAcceptedContinuityInput: roles.candidateAcceptedContinuityInput === true,
    admittedAcceptedContinuityInput: roles.admittedAcceptedContinuityInput === true,
    acceptedContinuityInputKind: nonEmptyString(causal.acceptedContinuityInputKind),
    storageEnvelopeKind: nonEmptyString(causal.storageEnvelopeKind),
    deviceBranchesRemainDeviceOwned: causal.deviceBranchesRemainDeviceOwned === true,
    localLayerStoresProjectionRefs: causal.localLayerStoresProjectionRefs === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    causalEvidenceOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalEvidenceOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalEvidenceWritesContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalEvidenceAcceptsCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    productionProofClaimed: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    authorityGranted: false,
    meshTruthClaimed: false,
    completionClaimed: false
  });
}

export function listTestbedEdgeLocalLayerNodeRoleLabStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_NODE_ROLE_LAB_STATUSES));
}
