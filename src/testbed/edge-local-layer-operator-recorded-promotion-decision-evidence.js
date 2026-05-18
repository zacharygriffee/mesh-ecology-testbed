export const TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_operator_recorded_promotion_decision_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_operator_recorded_promotion_decision_visible",
  BLOCKED: "edge_local_layer_operator_recorded_promotion_decision_blocked",
  MALFORMED: "edge_local_layer_operator_recorded_promotion_decision_malformed",
  INCOMPLETE: "edge_local_layer_operator_recorded_promotion_decision_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-operator-recorded-promotion-decision-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-operator-recorded-promotion-decision-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_local_layer_operator_recorded_promotion_decision";
const EXPECTED_SOURCE_SCHEMA = "edge_local_layer_operator_recorded_promotion_decision.v0";

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
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_operator_recorded_promotion_decision_missing_or_malformed"])
    });
  }

  const source = isPlainObject(evidenceArtifact.source) ? evidenceArtifact.source : {};
  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const fields = isPlainObject(evidenceArtifact.candidateProductionLaneFields) ? evidenceArtifact.candidateProductionLaneFields : {};
  const status = isPlainObject(evidenceArtifact.decisionStatus) ? evidenceArtifact.decisionStatus : {};
  const writerPolicy = isPlainObject(evidenceArtifact.writerPolicySummary) ? evidenceArtifact.writerPolicySummary : {};
  const readerPolicy = isPlainObject(evidenceArtifact.readerPolicySummary) ? evidenceArtifact.readerPolicySummary : {};
  const acceptance = isPlainObject(evidenceArtifact.acceptanceRule) ? evidenceArtifact.acceptanceRule : {};
  const route = isPlainObject(evidenceArtifact.implementationRoute) ? evidenceArtifact.implementationRoute : {};
  const causal = isPlainObject(evidenceArtifact.causalInterpretation) ? evidenceArtifact.causalInterpretation : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.decisionId,
    refs.decisionHash,
    refs.operatorRef,
    refs.operatorDecisionRef,
    refs.decisionRecordRef,
    refs.sourceWriterAdmissionPacketRef,
    refs.sourceWriterAdmissionPacketHash,
    refs.sourceLayerRef,
    refs.sourceLaneRef,
    ...stringArray(refs.sourceRefs),
    ...stringArray(refs.decisionNotesRefs),
    ...stringArray(refs.supersedesDecisionRefs),
    refs.nextGate,
    refs.finalGate,
    ...Object.values(fields).filter((value) => typeof value === "string")
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-operator-recorded-promotion-decision-evidence-emitted") {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_not_emitted");
  }
  if (source.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_source_repo_mismatch");
  if (source.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_source_kind_mismatch");
  if (source.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_source_schema_mismatch");
  if (!nonEmptyString(refs.decisionId) || !nonEmptyString(refs.decisionHash)) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_decision_ref_missing");
  if (!nonEmptyString(refs.sourceWriterAdmissionPacketRef) || stringArray(refs.sourceRefs).length < 6) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_source_refs_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_ref_contains_compat_or_path_seam");
  if (
    fields.promotedSemanticInputKind !== "mesh_ecology_local_layer_continuity_event" ||
    fields.storageEnvelopeKind !== "mesh_ecology_local_layer_lane_entry" ||
    fields.storageLaneKind !== "bounded_autobase_local_layer_continuity_lane" ||
    fields.productionBackendKind !== "autobase_candidate_not_started" ||
    fields.schemaPath !== "json_contract_first_with_hyperschema_trigger" ||
    fields.dispatchPath !== "hyperdispatch_deferred_until_dispatch_pressure" ||
    fields.promotedNow !== false ||
    fields.productionBackendStarted !== false ||
    fields.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_candidate_fields_missing_or_unsafe");
  }
  if (
    status.operatorDecisionRecorded !== true ||
    status.reversibleReviewArtifact !== true ||
    status.candidateProductionLaneFieldsNamed !== true ||
    status.productionLanePromoted !== false ||
    status.productionBackendStarted !== false ||
    status.productionExecutionAuthorized !== false ||
    status.edgeStateMigrationAllowed !== false ||
    status.writerAuthorityGranted !== false ||
    status.durableLocalLayerContinuityClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_status_missing_or_unsafe");
  }
  if (
    writerPolicy.policyKind !== "operator_owned_device_writer_admission_v0" ||
    stringArray(writerPolicy.admittedWriterRefs).length === 0 ||
    writerPolicy.writerAuthorityGranted !== false ||
    writerPolicy.writabilityIsAuthority !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_writer_policy_missing_or_unsafe");
  }
  if (
    readerPolicy.readerPolicyKind !== "operator_owned_local_layer_readers_by_explicit_refs" ||
    stringArray(readerPolicy.readerRefs).length === 0 ||
    readerPolicy.readAccessImpliesWriteAccess !== false ||
    readerPolicy.readAccessImpliesAuthority !== false ||
    readerPolicy.localPathReadSeam !== false ||
    readerPolicy.httpReadSeam !== false ||
    readerPolicy.sshReadSeam !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_reader_policy_missing_or_unsafe");
  }
  if (
    acceptance.ruleKind !== "operator_recorded_decision_names_promotion_fields_only" ||
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.operatorDecisionIsExecution !== false ||
    acceptance.operatorDecisionIsTruth !== false ||
    acceptance.testbedReviewIsReadiness !== false ||
    acceptance.causalReviewIsTruth !== false ||
    acceptance.productionPromotionRequiresSeparateGate !== true
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_acceptance_rule_missing_or_unsafe");
  }
  if (
    route.currentStage !== "operator_recorded_promotion_decision" ||
    route.nextImplementationGate !== "production_backend_wedge" ||
    route.finalPromotionGate !== "production_local_layer_lane_promotion_decision" ||
    route.productionBackendAllowed !== false ||
    route.productionLanePromotionAllowed !== false ||
    route.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_route_missing_or_unsafe");
  }
  if (
    causal.interpretationKind !== "observer-relative-local-layer-operator-recorded-promotion-decision-evidence" ||
    causal.decisionFieldEvidenceOnly !== true ||
    causal.operatorDecisionIsExecution !== false ||
    causal.productionLanePromoted !== false ||
    causal.causalSubstrateOwnsBackend !== false ||
    causal.causalSubstrateAcceptsTruth !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_causal_interpretation_missing_or_unsafe");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.acceptsProductionContinuity !== false ||
    boundary.grantsWriterAuthority !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.startsProductionBackend !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-operator-recorded-promotion-decision-valid-evidence" ||
    validation.decisionRefsPresent !== true ||
    validation.sourceRefsPresent !== true ||
    validation.candidateFieldsPresent !== true ||
    validation.decisionStatusSafe !== true ||
    validation.writerPolicySafe !== true ||
    validation.readerPolicySafe !== true ||
    validation.acceptanceRuleSafe !== true ||
    validation.implementationRouteSafe !== true ||
    validation.refsSafe !== true ||
    validation.noProductionOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_operator_recorded_promotion_decision_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_operator_recorded_promotion_decision_visible"])
  });
}

export function buildTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const fields = isPlainObject(evidenceArtifact?.candidateProductionLaneFields) ? evidenceArtifact.candidateProductionLaneFields : {};
  const route = isPlainObject(evidenceArtifact?.implementationRoute) ? evidenceArtifact.implementationRoute : {};
  const status = isPlainObject(evidenceArtifact?.decisionStatus) ? evidenceArtifact.decisionStatus : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_operator_recorded_promotion_decision_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-operator-recorded-promotion-decision:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    decisionId: nonEmptyString(refs.decisionId),
    sourceWriterAdmissionPacketRef: nonEmptyString(refs.sourceWriterAdmissionPacketRef),
    nextGate: nonEmptyString(route.nextImplementationGate),
    finalPromotionGate: nonEmptyString(route.finalPromotionGate),
    storageLaneKind: nonEmptyString(fields.storageLaneKind),
    productionBackendKind: nonEmptyString(fields.productionBackendKind),
    operatorDecisionRecorded: status.operatorDecisionRecorded === true,
    productionLanePromoted: status.productionLanePromoted === true,
    productionBackendStarted: status.productionBackendStarted === true,
    productionExecutionAuthorized: status.productionExecutionAuthorized === true,
    edgeStateMigrationAllowed: status.edgeStateMigrationAllowed === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false,
    testbedStartsProductionBackend: false
  });
}

export function listTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES));
}
