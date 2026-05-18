export const TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_writer_admission_v0_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_writer_admission_v0_visible",
  BLOCKED: "edge_local_layer_writer_admission_v0_blocked",
  MALFORMED: "edge_local_layer_writer_admission_v0_malformed",
  INCOMPLETE: "edge_local_layer_writer_admission_v0_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-writer-admission-v0-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-writer-admission-v0-evidence/v1";
const EXPECTED_SOURCE_KIND = "edge_local_layer_writer_admission_v0_packet";
const EXPECTED_SOURCE_SCHEMA = "edge_local_layer_writer_admission_v0_packet.v0";

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
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_writer_admission_v0_missing_or_malformed"])
    });
  }

  const source = isPlainObject(evidenceArtifact.source) ? evidenceArtifact.source : {};
  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const roles = isPlainObject(evidenceArtifact.roleSeparation) ? evidenceArtifact.roleSeparation : {};
  const writerPolicy = isPlainObject(evidenceArtifact.writerAdmissionPolicy) ? evidenceArtifact.writerAdmissionPolicy : {};
  const readerPolicy = isPlainObject(evidenceArtifact.readerPolicy) ? evidenceArtifact.readerPolicy : {};
  const acceptance = isPlainObject(evidenceArtifact.acceptanceRule) ? evidenceArtifact.acceptanceRule : {};
  const route = isPlainObject(evidenceArtifact.implementationRoute) ? evidenceArtifact.implementationRoute : {};
  const causal = isPlainObject(evidenceArtifact.causalInterpretation) ? evidenceArtifact.causalInterpretation : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.packetId,
    refs.packetHash,
    refs.layerRef,
    refs.laneRef,
    refs.operatorRef,
    refs.sourceFixtureRef,
    refs.sourceLaneEntryRef,
    refs.sourceSemanticEventRef,
    ...stringArray(refs.sourceRefs),
    ...stringArray(refs.observerRefs),
    ...stringArray(refs.readerRefs),
    ...stringArray(refs.proposerRefs),
    ...stringArray(refs.candidateAppenderRefs),
    ...stringArray(refs.admittedWriterRefs),
    ...stringArray(refs.operatorApproverRefs),
    ...stringArray(refs.rejectedWriterRefs),
    ...stringArray(refs.supersedesAdmissionRefs),
    refs.nextGate,
    refs.finalGate
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_writer_admission_v0_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_writer_admission_v0_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_writer_admission_v0_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-writer-admission-v0-evidence-emitted") {
    reasonCodes.push("edge_local_layer_writer_admission_v0_not_emitted");
  }
  if (source.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("edge_local_layer_writer_admission_v0_source_repo_mismatch");
  if (source.sourceArtifactKind !== EXPECTED_SOURCE_KIND) reasonCodes.push("edge_local_layer_writer_admission_v0_source_kind_mismatch");
  if (source.sourceSchema !== EXPECTED_SOURCE_SCHEMA) reasonCodes.push("edge_local_layer_writer_admission_v0_source_schema_mismatch");
  if (!nonEmptyString(refs.packetId)) reasonCodes.push("edge_local_layer_writer_admission_v0_packet_ref_missing");
  if (!nonEmptyString(refs.packetHash)) reasonCodes.push("edge_local_layer_writer_admission_v0_packet_hash_missing");
  if (!nonEmptyString(refs.layerRef) || !nonEmptyString(refs.laneRef)) reasonCodes.push("edge_local_layer_writer_admission_v0_layer_or_lane_ref_missing");
  if (stringArray(refs.sourceRefs).length < 5) reasonCodes.push("edge_local_layer_writer_admission_v0_source_refs_missing");
  if (
    stringArray(refs.observerRefs).length === 0 ||
    stringArray(refs.readerRefs).length === 0 ||
    stringArray(refs.proposerRefs).length === 0 ||
    stringArray(refs.candidateAppenderRefs).length === 0 ||
    stringArray(refs.admittedWriterRefs).length === 0 ||
    stringArray(refs.operatorApproverRefs).length === 0
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_role_refs_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_writer_admission_v0_ref_contains_compat_or_path_seam");
  if (
    roles.observabilityIsAuthority !== false ||
    roles.observabilityIsWritability !== false ||
    roles.readabilityIsWritability !== false ||
    roles.proposerIsWriter !== false ||
    roles.candidateAppendIsWriterAdmission !== false ||
    roles.candidateAppendIsAcceptedContinuity !== false ||
    roles.writabilityIsAuthority !== false ||
    roles.admittedWriterIsAuthority !== false ||
    roles.operatorApprovalIsContinuityAcceptance !== false ||
    roles.appendSuccessIsAcceptance !== false ||
    roles.applyValidationOwnsAcceptance !== true ||
    roles.operatorMediationRequired !== true
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_role_separation_missing_or_unsafe");
  }
  if (
    writerPolicy.policyKind !== "operator_owned_device_writer_admission_v0" ||
    writerPolicy.writerPolicyVersion !== 0 ||
    stringArray(writerPolicy.admittedWriterRefs).length === 0 ||
    stringArray(writerPolicy.candidateAppenderRefs).length === 0 ||
    stringArray(writerPolicy.operatorApproverRefs).length === 0 ||
    writerPolicy.explicitOperatorApprovalRequiredForAdmission !== true ||
    writerPolicy.writerAdmissionRequiredBeforeAcceptance !== true ||
    writerPolicy.deterministicApplyRequired !== true ||
    writerPolicy.candidateAppenderCanAppendProvisional !== true ||
    writerPolicy.candidateAppendRequiresAcceptanceGate !== true ||
    writerPolicy.candidateAppendMaterializesContinuity !== false ||
    writerPolicy.generalWriterAuthorityGranted !== false ||
    writerPolicy.writerAuthorityGranted !== false ||
    writerPolicy.authorityGranted !== false
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_writer_policy_missing_or_unsafe");
  }
  if (
    readerPolicy.readerPolicyKind !== "operator_owned_local_layer_readers_by_explicit_refs" ||
    stringArray(readerPolicy.observerRefs).length === 0 ||
    stringArray(readerPolicy.readerRefs).length === 0 ||
    readerPolicy.explicitKeyOrProofRequired !== true ||
    readerPolicy.readAccessImpliesWriteAccess !== false ||
    readerPolicy.readAccessImpliesAuthority !== false ||
    readerPolicy.publicRead !== false ||
    readerPolicy.localPathReadSeam !== false ||
    readerPolicy.httpReadSeam !== false ||
    readerPolicy.sshReadSeam !== false
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_reader_policy_missing_or_unsafe");
  }
  if (
    acceptance.ruleKind !== "deterministic_apply_validates_admitted_writer_input" ||
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.candidateAppendIsAcceptance !== false ||
    acceptance.replicaVisibilityIsContinuity !== false ||
    acceptance.linearizationIsTruth !== false ||
    acceptance.operatorApprovalIsTruth !== false ||
    acceptance.testbedReviewIsReadiness !== false ||
    acceptance.causalReviewIsTruth !== false ||
    acceptance.requiresValidSchema !== true ||
    acceptance.requiresSourceRefs !== true ||
    acceptance.requiresCausalSubstrateInterpretation !== true ||
    acceptance.requiresFailClosedTestbedPressure !== true ||
    acceptance.requiresOperatorApprovalForAdmission !== true ||
    acceptance.requiresAdmittedWriterForAcceptedContinuity !== true ||
    acceptance.requiresDeterministicApplyValidation !== true
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_acceptance_rule_missing_or_unsafe");
  }
  if (
    route.currentStage !== "writer_admission_v0" ||
    route.nextImplementationGate !== "operator_recorded_promotion_decision" ||
    route.finalPromotionGate !== "production_local_layer_lane_promotion_decision" ||
    route.productionCheckpointRequired !== true ||
    route.productionBackendAllowed !== false ||
    route.productionLanePromotionAllowed !== false ||
    route.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_route_missing_or_unsafe");
  }
  if (
    causal.interpretationKind !== "observer-relative-local-layer-writer-admission-policy-evidence" ||
    causal.policyShapeOnly !== true ||
    causal.observerRelative !== true ||
    causal.branchRelative !== true ||
    causal.sourceShareBoundaryPreserved !== true ||
    causal.roleSeparationPreserved !== true ||
    causal.writerAdmissionGrantsAuthority !== false ||
    causal.candidateAppendIsContinuity !== false ||
    causal.causalSubstrateOwnsBackend !== false ||
    causal.causalSubstrateAcceptsTruth !== false
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_causal_interpretation_missing_or_unsafe");
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
    reasonCodes.push("edge_local_layer_writer_admission_v0_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-writer-admission-v0-valid-evidence" ||
    validation.expectedSourceSchemaPresent !== true ||
    validation.packetRefsPresent !== true ||
    validation.sourceRefsPresent !== true ||
    validation.roleRefsPresent !== true ||
    validation.roleSeparationPresent !== true ||
    validation.writerPolicyPresent !== true ||
    validation.readerPolicyPresent !== true ||
    validation.acceptanceRulePresent !== true ||
    validation.implementationRoutePresent !== true ||
    validation.refsSafe !== true ||
    validation.noProductionOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_writer_admission_v0_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_writer_admission_v0_visible"])
  });
}

export function buildTestbedEdgeLocalLayerWriterAdmissionV0Evidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const route = isPlainObject(evidenceArtifact?.implementationRoute) ? evidenceArtifact.implementationRoute : {};
  const roles = isPlainObject(evidenceArtifact?.roleSeparation) ? evidenceArtifact.roleSeparation : {};
  const writerPolicy = isPlainObject(evidenceArtifact?.writerAdmissionPolicy) ? evidenceArtifact.writerAdmissionPolicy : {};
  const boundary = isPlainObject(evidenceArtifact?.boundary) ? evidenceArtifact.boundary : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_writer_admission_v0_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-writer-admission-v0:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    packetId: nonEmptyString(refs.packetId),
    layerRef: nonEmptyString(refs.layerRef),
    laneRef: nonEmptyString(refs.laneRef),
    nextGate: nonEmptyString(route.nextImplementationGate),
    finalPromotionGate: nonEmptyString(route.finalPromotionGate),
    observerRefCount: stringArray(refs.observerRefs).length,
    readerRefCount: stringArray(refs.readerRefs).length,
    candidateAppenderRefCount: stringArray(refs.candidateAppenderRefs).length,
    admittedWriterRefCount: stringArray(refs.admittedWriterRefs).length,
    operatorApproverRefCount: stringArray(refs.operatorApproverRefs).length,
    observabilityIsWritability: roles.observabilityIsWritability === true,
    readabilityIsWritability: roles.readabilityIsWritability === true,
    writabilityIsAuthority: roles.writabilityIsAuthority === true,
    admittedWriterIsAuthority: roles.admittedWriterIsAuthority === true,
    candidateAppendMaterializesContinuity: writerPolicy.candidateAppendMaterializesContinuity === true,
    writerAuthorityGranted: writerPolicy.writerAuthorityGranted === true,
    productionBackendAllowed: route.productionBackendAllowed === true,
    productionLanePromotionAllowed: route.productionLanePromotionAllowed === true,
    edgeStateMigrationAllowed: route.edgeStateMigrationAllowed === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false,
    testbedStartsProductionBackend: false,
    causalEvidenceOpenedAutobase: boundary.opensAutobase === true,
    causalEvidenceWritesContinuityRecords: boundary.writesContinuityRecords === true,
    causalEvidenceGrantsWriterAuthority: boundary.grantsWriterAuthority === true
  });
}

export function listTestbedEdgeLocalLayerWriterAdmissionV0Statuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES));
}
