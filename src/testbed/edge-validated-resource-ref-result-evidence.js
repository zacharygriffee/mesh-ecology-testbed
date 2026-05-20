export const TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_validated_resource_ref_result_evidence.v1";

export const TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES = Object.freeze({
  VISIBLE: "edge_validated_resource_ref_result_evidence_visible",
  BLOCKED: "edge_validated_resource_ref_result_evidence_blocked",
  INCOMPLETE: "edge_validated_resource_ref_result_evidence_incomplete",
  MALFORMED: "edge_validated_resource_ref_result_evidence_malformed"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-validated-resource-ref-result-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-validated-resource-ref-result-evidence/v1";
const EXPECTED_REVIEW_STATUS = "edge-validated-resource-ref-result-evidence-emitted";

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

function unsafeSeamRef(ref) {
  return /^(?:https?:\/\/|ssh:\/\/|file:\/\/|\/|\.\/|\.\.\/|localhost\b|127\.0\.0\.1\b)/iu.test(ref) ||
    /\b(?:localhost|127\.0\.0\.1|:\d{2,5}\b)/iu.test(ref);
}

function boundary(evidence) {
  return isPlainObject(evidence?.boundary) ? evidence.boundary : {};
}

function interpretation(evidence) {
  return isPlainObject(evidence?.interpretation) ? evidence.interpretation : {};
}

function validation(evidence) {
  return isPlainObject(evidence?.validation) ? evidence.validation : {};
}

function allRefs(evidence) {
  return [
    evidence?.sourceValidationRef,
    evidence?.sourceResourceRef,
    evidence?.sourcePointerRef,
    evidence?.sourceResolutionReceiptRef,
    evidence?.sourceResultEvidenceRef,
    evidence?.sourceHandoffRef,
    evidence?.sourceWorkPacketRef,
    evidence?.targetRef
  ].filter((entry) => typeof entry === "string" && entry.trim() !== "");
}

function validateEvidence(evidenceArtifact) {
  const reasonCodes = [];

  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_validated_resource_ref_result_evidence_missing_or_malformed"])
    });
  }

  const sourceBoundary = boundary(evidenceArtifact);
  const sourceInterpretation = interpretation(evidenceArtifact);
  const sourceValidation = validation(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_artifact_kind_mismatch");
  }
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA || evidenceArtifact.schemaVersion !== 1) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_schema_mismatch");
  }
  if (evidenceArtifact.reviewStatus !== EXPECTED_REVIEW_STATUS) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_not_causal_emitted");
  }
  if (!nonEmptyString(evidenceArtifact.sourceValidationRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_validation_ref_missing");
  }
  if (!nonEmptyString(evidenceArtifact.sourceResourceRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_resource_ref_missing");
  }
  if (!nonEmptyString(evidenceArtifact.sourcePointerRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_pointer_ref_missing");
  }
  if (!nonEmptyString(evidenceArtifact.sourceResolutionReceiptRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_resolution_receipt_ref_missing");
  }
  if (!nonEmptyString(evidenceArtifact.sourceHandoffRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_handoff_ref_missing");
  }
  if (!nonEmptyString(evidenceArtifact.sourceWorkPacketRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_work_packet_ref_missing");
  }

  if (
    sourceInterpretation.validationIsReviewOnly !== true ||
    sourceInterpretation.resultEvidenceIsExternalOnly !== true ||
    sourceInterpretation.payloadTruthClaimed !== false ||
    sourceInterpretation.successInferred !== false ||
    sourceInterpretation.approvalInferred !== false ||
    sourceInterpretation.acceptedContinuity !== false ||
    sourceInterpretation.resultReceiptContinuity !== false ||
    sourceInterpretation.bytesAuthority !== false
  ) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_interpretation_overclaim");
  }

  if (
    sourceBoundary.reviewOnly !== true ||
    sourceBoundary.evidenceOnly !== true ||
    sourceBoundary.callsEdge !== false ||
    sourceBoundary.fetchesPayload !== false ||
    sourceBoundary.parsesPayload !== false ||
    sourceBoundary.executesWork !== false ||
    sourceBoundary.acceptsContinuity !== false ||
    sourceBoundary.grantsAuthority !== false ||
    sourceBoundary.grantsApproval !== false ||
    sourceBoundary.claimsCausalTruth !== false ||
    sourceBoundary.claimsReadiness !== false
  ) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_boundary_overclaim");
  }

  if (
    sourceValidation.requiredRefsPresent !== true ||
    sourceValidation.externalEvidencePosturePreserved !== true ||
    sourceValidation.unsafeClaimsBlocked !== true ||
    sourceValidation.unsafeSeamRefsBlocked !== true ||
    stringArray(sourceValidation.issues).some((issue) =>
      issue.includes("claim") ||
      issue.includes("unsafe") ||
      issue.includes("payload") ||
      issue.includes("parse") ||
      issue.includes("fetch")
    )
  ) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_causal_validation_blocked");
  }

  if (allRefs(evidenceArtifact).some(unsafeSeamRef)) {
    reasonCodes.push("edge_validated_resource_ref_result_evidence_ref_contains_compat_or_path_seam");
  }

  if (reasonCodes.some((code) =>
    code.includes("overclaim") ||
    code.includes("blocked") ||
    code.includes("unsafe") ||
    code.includes("path_seam") ||
    code.includes("mismatch")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_validated_resource_ref_result_evidence_visible"])
  });
}

export function buildTestbedEdgeValidatedResourceRefResultEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validateEvidence(evidenceArtifact);
  const sourceBoundary = boundary(evidenceArtifact);
  const sourceInterpretation = interpretation(evidenceArtifact);
  const sourceValidation = validation(evidenceArtifact);

  return Object.freeze({
    artifactKind: "testbed_edge_validated_resource_ref_result_evidence",
    schemaVersion: TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-validated-resource-ref-result-evidence:${nonEmptyString(evidenceArtifact?.sourceValidationRef, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    sourceValidationRef: nonEmptyString(evidenceArtifact?.sourceValidationRef),
    sourceResourceRef: nonEmptyString(evidenceArtifact?.sourceResourceRef),
    sourcePointerRef: nonEmptyString(evidenceArtifact?.sourcePointerRef),
    sourceResolutionReceiptRef: nonEmptyString(evidenceArtifact?.sourceResolutionReceiptRef),
    sourceResultEvidenceRef: nonEmptyString(evidenceArtifact?.sourceResultEvidenceRef),
    sourceHandoffRef: nonEmptyString(evidenceArtifact?.sourceHandoffRef),
    sourceWorkPacketRef: nonEmptyString(evidenceArtifact?.sourceWorkPacketRef),
    targetRef: nonEmptyString(evidenceArtifact?.targetRef),
    resultEvidencePresent: sourceValidation.resultEvidencePresent === true,
    validationArtifactPresent: sourceValidation.validationArtifactPresent === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedCalledEdge: false,
    testbedMutatedEdge: false,
    testbedFetchedPayload: false,
    testbedParsedPayload: false,
    testbedCreatedResultReceiptContinuity: false,
    testbedAcceptedContinuity: false,
    testbedGrantedApproval: false,
    testbedGrantedAuthority: false,
    causalReviewIsTruth: false,
    testbedReviewIsReadiness: false,
    bytesPointerIsAuthority: false,
    validationIsApproval: false,
    validationIsExecution: false,
    validationIsAcceptedContinuity: false,
    resultEvidenceIsExternalOnly: sourceInterpretation.resultEvidenceIsExternalOnly === true,
    sourceBoundaryReviewOnly: sourceBoundary.reviewOnly === true,
    sourceBoundaryEvidenceOnly: sourceBoundary.evidenceOnly === true
  });
}

export function listTestbedEdgeValidatedResourceRefResultEvidenceStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_VALIDATED_RESOURCE_REF_RESULT_EVIDENCE_STATUSES));
}
