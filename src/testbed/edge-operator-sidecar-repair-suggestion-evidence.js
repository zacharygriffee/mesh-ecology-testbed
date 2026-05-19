export const TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_operator_sidecar_repair_suggestion_evidence.v1";

export const TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES = Object.freeze({
  VISIBLE: "sidecar_repair_suggestion_visible",
  BLOCKED: "sidecar_repair_suggestion_blocked",
  INCOMPLETE: "sidecar_repair_suggestion_incomplete",
  MALFORMED: "sidecar_repair_suggestion_malformed"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-operator-sidecar-repair-suggestion-evidence";
const EXPECTED_REVIEW_STATUS = "edge-operator-sidecar-repair-suggestion-evidence-emitted";

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

function boundary(evidence) {
  return isPlainObject(evidence?.boundary) ? evidence.boundary : {};
}

function validation(evidence) {
  return isPlainObject(evidence?.validation) ? evidence.validation : {};
}

function allRefs(evidence) {
  return [
    evidence?.sourceSuggestionRef,
    evidence?.sourceFailureRef,
    evidence?.sourceWorkPacketRef,
    evidence?.sourceOperatorDecisionRef,
    evidence?.sourceAgentRunRef,
    ...stringArray(evidence?.targetRefs),
    ...stringArray(evidence?.proposedRepairRefs),
    ...stringArray(evidence?.preservedEvidenceRefs)
  ].filter((entry) => typeof entry === "string" && entry.trim() !== "");
}

function validateSidecarEvidence(evidenceArtifact) {
  const reasonCodes = [];

  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["sidecar_repair_suggestion_missing_or_malformed"])
    });
  }

  const sourceBoundary = boundary(evidenceArtifact);
  const sourceValidation = validation(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("sidecar_repair_suggestion_artifact_kind_mismatch");
  if (evidenceArtifact.reviewStatus !== EXPECTED_REVIEW_STATUS) reasonCodes.push("sidecar_repair_suggestion_not_causal_emitted");
  if (!nonEmptyString(evidenceArtifact.sourceSuggestionRef)) reasonCodes.push("sidecar_repair_suggestion_ref_missing");
  if (!nonEmptyString(evidenceArtifact.sourceFailureRef)) reasonCodes.push("sidecar_repair_suggestion_failure_ref_missing");
  if (!nonEmptyString(evidenceArtifact.sourceWorkPacketRef)) reasonCodes.push("sidecar_repair_suggestion_work_packet_ref_missing");
  if (!nonEmptyString(evidenceArtifact.sourceOperatorDecisionRef)) reasonCodes.push("sidecar_repair_suggestion_operator_decision_ref_missing");
  if (!nonEmptyString(evidenceArtifact.failureKind)) reasonCodes.push("sidecar_repair_suggestion_failure_kind_missing");
  if (stringArray(evidenceArtifact.proposedRepairRefs).length === 0) reasonCodes.push("sidecar_repair_suggestion_repair_refs_missing");
  if (stringArray(evidenceArtifact.preservedEvidenceRefs).length === 0) reasonCodes.push("sidecar_repair_suggestion_preserved_evidence_missing");
  if (evidenceArtifact.requiresOperatorApproval !== true) reasonCodes.push("sidecar_repair_suggestion_operator_approval_posture_missing");

  if (
    sourceBoundary.reviewOnly !== true ||
    sourceBoundary.evidenceOnly !== true ||
    sourceBoundary.callsEdge !== false ||
    sourceBoundary.executesWork !== false ||
    sourceBoundary.writesContinuityRecords !== false ||
    sourceBoundary.acceptsContinuity !== false ||
    sourceBoundary.grantsAuthority !== false ||
    sourceBoundary.grantsApproval !== false ||
    sourceBoundary.claimsCausalTruth !== false ||
    sourceBoundary.claimsReadiness !== false ||
    sourceBoundary.startsBackend !== false
  ) {
    reasonCodes.push("sidecar_repair_suggestion_boundary_overclaim");
  }

  if (
    sourceValidation.unsafeSeamRefsBlocked === false ||
    sourceValidation.unsafeClaimsBlocked === false ||
    stringArray(sourceValidation.issues).some((issue) =>
      issue.includes("claim") ||
      issue.includes("unsafe") ||
      issue.includes("expanded")
    )
  ) {
    reasonCodes.push("sidecar_repair_suggestion_causal_validation_blocked");
  }

  if (allRefs(evidenceArtifact).some(refContainsUnsafeSeam)) {
    reasonCodes.push("sidecar_repair_suggestion_ref_contains_compat_or_path_seam");
  }

  if (reasonCodes.some((code) =>
    code.includes("overclaim") ||
    code.includes("blocked") ||
    code.includes("unsafe") ||
    code.includes("path_seam") ||
    code.includes("mismatch")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["sidecar_repair_suggestion_visible"])
  });
}

export function buildTestbedEdgeOperatorSidecarRepairSuggestionEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validateSidecarEvidence(evidenceArtifact);
  const sourceBoundary = boundary(evidenceArtifact);

  return Object.freeze({
    artifactKind: "testbed_edge_operator_sidecar_repair_suggestion_evidence",
    schemaVersion: TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-operator-sidecar-repair-suggestion:${nonEmptyString(evidenceArtifact?.sourceSuggestionRef, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    sourceSuggestionRef: nonEmptyString(evidenceArtifact?.sourceSuggestionRef),
    sourceFailureRef: nonEmptyString(evidenceArtifact?.sourceFailureRef),
    sourceWorkPacketRef: nonEmptyString(evidenceArtifact?.sourceWorkPacketRef),
    sourceOperatorDecisionRef: nonEmptyString(evidenceArtifact?.sourceOperatorDecisionRef),
    failureKind: nonEmptyString(evidenceArtifact?.failureKind),
    sameScope: evidenceArtifact?.sameScope === true,
    scopeChanged: evidenceArtifact?.scopeChanged === true,
    requiresOperatorApproval: evidenceArtifact?.requiresOperatorApproval === true,
    proposedRepairRefCount: stringArray(evidenceArtifact?.proposedRepairRefs).length,
    preservedEvidenceRefCount: stringArray(evidenceArtifact?.preservedEvidenceRefs).length,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedCalledEdge: false,
    testbedMutatedEdge: false,
    testbedOpenedEdgeStorage: false,
    testbedStartedAutobaseBackend: false,
    causalReviewIsTruth: false,
    testbedReviewIsReadiness: false,
    sidecarSuggestionIsApproval: false,
    sidecarSuggestionIsExecution: false,
    sidecarSuggestionIsAuthority: false,
    sidecarSuggestionIsAcceptedContinuity: false,
    sidecarBecomesOperator: false,
    sourceBoundaryReviewOnly: sourceBoundary.reviewOnly === true,
    sourceBoundaryEvidenceOnly: sourceBoundary.evidenceOnly === true
  });
}

export function listTestbedEdgeOperatorSidecarRepairSuggestionStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_OPERATOR_SIDECAR_REPAIR_SUGGESTION_STATUSES));
}
