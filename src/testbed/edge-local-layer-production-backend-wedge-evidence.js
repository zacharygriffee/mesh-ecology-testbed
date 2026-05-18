export const TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_production_backend_wedge_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_production_backend_wedge_visible",
  BLOCKED: "edge_local_layer_production_backend_wedge_blocked",
  MALFORMED: "edge_local_layer_production_backend_wedge_malformed",
  INCOMPLETE: "edge_local_layer_production_backend_wedge_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-production-backend-wedge-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-production-backend-wedge-evidence/v1";

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
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_production_backend_wedge_missing_or_malformed"])
    });
  }

  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const auth = isPlainObject(evidenceArtifact.labAuthorization) ? evidenceArtifact.labAuthorization : {};
  const wedge = isPlainObject(evidenceArtifact.backendWedge) ? evidenceArtifact.backendWedge : {};
  const rule = isPlainObject(evidenceArtifact.acceptanceRule) ? evidenceArtifact.acceptanceRule : {};
  const route = isPlainObject(evidenceArtifact.implementationRoute) ? evidenceArtifact.implementationRoute : {};
  const causal = isPlainObject(evidenceArtifact.causalInterpretation) ? evidenceArtifact.causalInterpretation : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.wedgeId,
    refs.wedgeHash,
    refs.sourceOperatorPromotionDecisionRef,
    refs.sourceWriterAdmissionPacketRef,
    refs.sourceLayerRef,
    refs.sourceLaneRef,
    ...stringArray(refs.sourceRefs),
    refs.nextGate,
    refs.finalGate,
    wedge.namespaceRef,
    wedge.laneRef,
    wedge.writerPolicyRef,
    wedge.readerPolicyRef,
    wedge.acceptanceRuleRef
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_production_backend_wedge_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_production_backend_wedge_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_production_backend_wedge_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-production-backend-wedge-evidence-emitted") {
    reasonCodes.push("edge_local_layer_production_backend_wedge_not_emitted");
  }
  if (!nonEmptyString(refs.wedgeId) || !nonEmptyString(refs.sourceOperatorPromotionDecisionRef) || stringArray(refs.sourceRefs).length < 8) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_refs_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_production_backend_wedge_ref_contains_compat_or_path_seam");
  if (
    auth.authorizesDisposableProductionShapedBackendLab !== true ||
    auth.authorizesProductionBackend !== false ||
    auth.authorizesProductionLanePromotion !== false ||
    auth.authorizesEdgeStateMigration !== false ||
    auth.requiresDisposableStorageRoot !== true ||
    auth.requiresNoLocalPathAsContinuitySeam !== true ||
    auth.requiresNoHttpOrSshSeam !== true ||
    auth.requiresNoWriterAuthorityGrant !== true
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_lab_authorization_missing_or_unsafe");
  }
  if (
    wedge.backendKind !== "autobase" ||
    wedge.namespaceRef !== "corestore-namespace:local-layer-continuity-production-shaped-lab" ||
    wedge.laneRef !== "local-layer-continuity-lane:operator-owned-devices-production-shaped-lab" ||
    wedge.productionBackendStarted !== false ||
    wedge.productionLanePromoted !== false ||
    wedge.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_backend_fields_missing_or_unsafe");
  }
  if (
    rule.ruleKind !== "production_backend_wedge_authorizes_disposable_lab_only" ||
    rule.appendSuccessIsAcceptance !== false ||
    rule.applySuccessIsTruth !== false ||
    rule.labSuccessIsProductionReadiness !== false ||
    rule.wedgePacketIsProductionPromotion !== false ||
    rule.requiresSeparateProductionPromotionGate !== true
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_acceptance_rule_missing_or_unsafe");
  }
  if (
    route.currentStage !== "production_backend_wedge" ||
    route.nextImplementationGate !== "disposable_production_shaped_backend_lab" ||
    route.disposableLabAuthorized !== true ||
    route.productionBackendAllowed !== false ||
    route.productionLanePromotionAllowed !== false ||
    route.edgeStateMigrationAllowed !== false
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_route_missing_or_unsafe");
  }
  if (
    causal.backendWedgeEvidenceOnly !== true ||
    causal.productionBackendStarted !== false ||
    causal.productionLanePromoted !== false ||
    causal.causalSubstrateOwnsBackend !== false ||
    causal.causalSubstrateAcceptsTruth !== false
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_causal_interpretation_missing_or_unsafe");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.startsProductionBackend !== false ||
    boundary.grantsWriterAuthority !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-production-backend-wedge-valid-evidence" ||
    validation.refsPresent !== true ||
    validation.labAuthorizationSafe !== true ||
    validation.backendWedgeSafe !== true ||
    validation.acceptanceRuleSafe !== true ||
    validation.implementationRouteSafe !== true ||
    validation.refsSafe !== true ||
    validation.noProductionOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_production_backend_wedge_validation_not_ready");
  }

  if (reasonCodes.some((code) => code.includes("mismatch") || code.includes("overclaim") || code.includes("unsafe") || code.includes("path_seam"))) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_production_backend_wedge_visible"])
  });
}

export function buildTestbedEdgeLocalLayerProductionBackendWedgeEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const auth = isPlainObject(evidenceArtifact?.labAuthorization) ? evidenceArtifact.labAuthorization : {};
  const wedge = isPlainObject(evidenceArtifact?.backendWedge) ? evidenceArtifact.backendWedge : {};
  const route = isPlainObject(evidenceArtifact?.implementationRoute) ? evidenceArtifact.implementationRoute : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_production_backend_wedge_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-production-backend-wedge:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    wedgeId: nonEmptyString(refs.wedgeId),
    sourceOperatorPromotionDecisionRef: nonEmptyString(refs.sourceOperatorPromotionDecisionRef),
    nextGate: nonEmptyString(route.nextImplementationGate),
    disposableLabAuthorized: auth.authorizesDisposableProductionShapedBackendLab === true,
    productionBackendAuthorized: auth.authorizesProductionBackend === true,
    productionLanePromotionAuthorized: auth.authorizesProductionLanePromotion === true,
    edgeStateMigrationAllowed: auth.authorizesEdgeStateMigration === true || route.edgeStateMigrationAllowed === true,
    backendKind: nonEmptyString(wedge.backendKind),
    namespaceRef: nonEmptyString(wedge.namespaceRef),
    laneRef: nonEmptyString(wedge.laneRef),
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

export function listTestbedEdgeLocalLayerProductionBackendWedgeStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_BACKEND_WEDGE_STATUSES));
}
