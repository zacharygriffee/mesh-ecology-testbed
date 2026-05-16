export const TESTBED_EDGE_SELF_WORK_TRACE_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_self_work_trace_evidence.v1";

export const TESTBED_EDGE_SELF_WORK_TRACE_STATUSES = Object.freeze({
  COMPLETE: "edge_self_work_trace_complete",
  INCOMPLETE: "edge_self_work_trace_incomplete",
  BLOCKED: "edge_self_work_trace_blocked",
  MALFORMED: "edge_self_work_trace_malformed"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-self-work-trace-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-self-work-trace-evidence/v1";

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

function refs(artifact) {
  return isPlainObject(artifact?.refs) ? artifact.refs : {};
}

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function allRefs(evidenceRefs) {
  return Object.values(evidenceRefs).flat().filter((entry) => typeof entry === "string" && entry.trim() !== "");
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function validateEdgeSelfWorkTrace({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_self_work_trace_missing_or_malformed"])
    });
  }

  const evidenceRefs = refs(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("edge_self_work_trace_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_self_work_trace_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_self_work_trace_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-self-work-trace-evidence-emitted") reasonCodes.push("edge_self_work_trace_not_emitted");
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("edge_self_work_trace_artifact_id_missing");

  if (stringArray(evidenceRefs.operatorIntentRefs).length === 0) reasonCodes.push("edge_self_work_trace_operator_intent_refs_missing");
  if (stringArray(evidenceRefs.workPacketRefs).length === 0) reasonCodes.push("edge_self_work_trace_work_packet_refs_missing");
  if (stringArray(evidenceRefs.operatorDecisionRefs).length === 0 && stringArray(evidenceRefs.approvalRefs).length === 0) {
    reasonCodes.push("edge_self_work_trace_operator_mediation_refs_missing");
  }
  if (stringArray(evidenceRefs.executorReceiptRefs).length === 0) reasonCodes.push("edge_self_work_trace_executor_receipt_refs_missing");
  if (stringArray(evidenceRefs.verificationRefs).length === 0) reasonCodes.push("edge_self_work_trace_verification_refs_missing");
  if (stringArray(evidenceRefs.causalHappeningRefs).length === 0 && stringArray(evidenceRefs.causalFrontierRefs).length === 0) {
    reasonCodes.push("edge_self_work_trace_causal_refs_missing");
  }
  if (stringArray(evidenceRefs.operatorReturnSurfaceRefs).length === 0) reasonCodes.push("edge_self_work_trace_operator_return_refs_missing");
  if (allRefs(evidenceRefs).some(unsafeSeamRef)) reasonCodes.push("edge_self_work_trace_ref_contains_compat_or_path_seam");

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.callsEdge !== false ||
    evidenceBoundary.callsPlatform !== false ||
    evidenceBoundary.callsMesh !== false ||
    evidenceBoundary.executesWork !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.claimsCompletion !== false ||
    evidenceBoundary.claimsRuntimeAuthority !== false ||
    evidenceBoundary.startsBackend !== false
  ) {
    reasonCodes.push("edge_self_work_trace_boundary_overclaim");
  }

  if (
    evidenceValidation.status !== "edge-self-work-trace-complete" ||
    evidenceValidation.requiredLoopRefsPresent !== true ||
    evidenceValidation.causalRefsPresent !== true ||
    evidenceValidation.verificationRefsPresent !== true ||
    evidenceValidation.unsafeSeamRefsBlocked !== true ||
    evidenceValidation.unsafeClaimsBlocked !== true
  ) {
    reasonCodes.push("edge_self_work_trace_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.COMPLETE,
    reasonCodes: Object.freeze(["edge_self_work_trace_complete"])
  });
}

export function buildTestbedEdgeSelfWorkTraceEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceRefs = refs(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const validationResult = validateEdgeSelfWorkTrace({ evidenceArtifact });

  return Object.freeze({
    artifactKind: "testbed_edge_self_work_trace_evidence",
    schemaVersion: TESTBED_EDGE_SELF_WORK_TRACE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-self-work-trace:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    operatorIntentRefCount: stringArray(evidenceRefs.operatorIntentRefs).length,
    workPacketRefCount: stringArray(evidenceRefs.workPacketRefs).length,
    operatorDecisionRefCount: stringArray(evidenceRefs.operatorDecisionRefs).length,
    approvalRefCount: stringArray(evidenceRefs.approvalRefs).length,
    executorReceiptRefCount: stringArray(evidenceRefs.executorReceiptRefs).length,
    verificationRefCount: stringArray(evidenceRefs.verificationRefs).length,
    causalHappeningRefCount: stringArray(evidenceRefs.causalHappeningRefs).length,
    causalFrontierRefCount: stringArray(evidenceRefs.causalFrontierRefs).length,
    operatorReturnSurfaceRefCount: stringArray(evidenceRefs.operatorReturnSurfaceRefs).length,
    sourceValidationStatus: nonEmptyString(evidenceValidation.status),
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
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false,
    causalSubstrateBoundaryReviewOnly: evidenceBoundary.reviewOnly === true,
    causalSubstrateCallsEdge: evidenceBoundary.callsEdge === true,
    causalSubstrateExecutesWork: evidenceBoundary.executesWork === true,
    causalSubstrateClaimsCompletion: evidenceBoundary.claimsCompletion === true,
    causalSubstrateClaimsCausalTruth: evidenceBoundary.claimsCausalTruth === true
  });
}

export function listTestbedEdgeSelfWorkTraceStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_SELF_WORK_TRACE_STATUSES));
}
