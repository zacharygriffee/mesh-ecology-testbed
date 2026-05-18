export const TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_operator_decision_continuity_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_operator_decision_continuity_visible",
  BLOCKED: "edge_local_layer_operator_decision_continuity_blocked",
  MALFORMED: "edge_local_layer_operator_decision_continuity_malformed",
  INCOMPLETE: "edge_local_layer_operator_decision_continuity_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-operator-decision-continuity-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-operator-decision-continuity-evidence/v1";
const EXPECTED_LANE = "local-layer-continuity-lane:operator-owned-devices";
const EXPECTED_NAMESPACE = "local-layer/continuity";
const EXPECTED_EVENT_KIND = "operator_recorded_local_layer_decision";

const ALLOWED_DECISION_KINDS = Object.freeze([
  "approve_repo_work_packet",
  "reject_repo_work_packet",
  "mark_local_layer_work_blocked",
  "mark_local_layer_work_held",
  "mark_local_layer_work_continued",
  "record_causal_testbed_pressure_review"
]);

const DEFERRED_DECISION_KINDS = Object.freeze([
  "approve_production_promotion_gate",
  "reject_production_promotion_gate",
  "approve_writer_admission",
  "reject_writer_admission",
  "approve_reader_admission",
  "reject_reader_admission",
  "approve_state_migration",
  "reject_state_migration",
  "approve_schema_promotion",
  "reject_schema_promotion",
  "approve_compatibility_removal",
  "reject_compatibility_removal"
]);

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
  return /^https?:\/\//i.test(ref) ||
    /^ssh:\/\//i.test(ref) ||
    /^git@/i.test(ref) ||
    ref.includes("\\") ||
    /\blocalhost\b/i.test(ref) ||
    /\b127\.0\.0\.1\b/.test(ref) ||
    ref.startsWith("/") ||
    ref.startsWith("./") ||
    ref.startsWith("../") ||
    ref.startsWith("~");
}

function validate({ evidenceArtifact }) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_operator_decision_continuity_missing_or_malformed"])
    });
  }

  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const backend = isPlainObject(evidenceArtifact.backend) ? evidenceArtifact.backend : {};
  const laneEntry = isPlainObject(evidenceArtifact.laneEntry) ? evidenceArtifact.laneEntry : {};
  const decision = isPlainObject(evidenceArtifact.operatorDecision) ? evidenceArtifact.operatorDecision : {};
  const view = isPlainObject(evidenceArtifact.acceptedEventsView) ? evidenceArtifact.acceptedEventsView : {};
  const readerObservation = isPlainObject(evidenceArtifact.readerObservation) ? evidenceArtifact.readerObservation : {};
  const productionPosture = isPlainObject(evidenceArtifact.productionPosture) ? evidenceArtifact.productionPosture : {};
  const causal = isPlainObject(evidenceArtifact.causalInterpretation) ? evidenceArtifact.causalInterpretation : {};
  const boundary = isPlainObject(evidenceArtifact.boundary) ? evidenceArtifact.boundary : {};
  const validation = isPlainObject(evidenceArtifact.validation) ? evidenceArtifact.validation : {};
  const allRefs = [
    refs.sourceResultRef,
    refs.sourceResultHash,
    refs.laneEntryRef,
    refs.laneEntryHash,
    refs.semanticEventRef,
    ...stringArray(refs.writerRefs),
    ...stringArray(refs.headRefs),
    ...stringArray(refs.linearizedEntryRefs),
    backend.laneRef,
    laneEntry.entryId,
    laneEntry.entryHash,
    laneEntry.writerRef,
    laneEntry.writerAdmissionRef,
    laneEntry.semanticEventRef,
    ...stringArray(laneEntry.sourceRefs),
    decision.operatorDecisionRef,
    decision.operatorSeatRef,
    decision.targetRef,
    decision.sourceWorkPacketRef,
    ...stringArray(decision.affectedArtifactRefs),
    ...stringArray(decision.sourceReviewRefs),
    ...stringArray(decision.provenanceRefs),
    view.viewRef,
    ...stringArray(view.acceptedEventRefs),
    readerObservation.observationRef,
    readerObservation.readerRef,
    readerObservation.readerDeviceRef,
    ...stringArray(readerObservation.observedAcceptedEventRefs)
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_operator_decision_continuity_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_operator_decision_continuity_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_operator_decision_continuity_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-operator-decision-continuity-evidence-emitted") {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_not_emitted");
  }
  if (
    !nonEmptyString(refs.sourceResultRef) ||
    !nonEmptyString(refs.laneEntryRef) ||
    !nonEmptyString(refs.semanticEventRef) ||
    stringArray(refs.writerRefs).length < 1 ||
    stringArray(refs.headRefs).length < 1 ||
    stringArray(refs.linearizedEntryRefs).length < 1
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_refs_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_operator_decision_continuity_ref_contains_compat_or_path_seam");
  if (
    backend.backendKind !== "autobase" ||
    backend.corestoreOpened !== true ||
    backend.autobaseOpened !== true ||
    backend.productionBackendStarted !== true ||
    backend.storageRootIsCanonicalSeam !== false ||
    backend.edgeStateMigration !== false ||
    backend.laneRef !== EXPECTED_LANE ||
    backend.namespaceRef !== EXPECTED_NAMESPACE
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_backend_missing_or_unsafe");
  }
  if (
    laneEntry.artifactKind !== "mesh_ecology_local_layer_lane_entry" ||
    laneEntry.schemaVersion !== "mesh_ecology_local_layer_lane_entry.v0" ||
    laneEntry.laneRef !== EXPECTED_LANE ||
    laneEntry.namespaceRef !== EXPECTED_NAMESPACE ||
    laneEntry.semanticEventKind !== "mesh_ecology_local_layer_continuity_event" ||
    laneEntry.semanticEventEventKind !== EXPECTED_EVENT_KIND ||
    laneEntry.productionLaneEntry !== true ||
    laneEntry.storageEnvelope !== true ||
    laneEntry.preservesSemanticContinuityEvent !== true ||
    laneEntry.semanticContinuityUnit !== false ||
    laneEntry.appendSuccessIsAcceptance !== false ||
    laneEntry.linearizationIsTruth !== false ||
    laneEntry.replicaVisibilityIsContinuity !== false ||
    laneEntry.viewOutputIsSourceContinuity !== false ||
    laneEntry.localPathIsCanonicalSeam !== false ||
    laneEntry.httpOrSshIsCanonicalSeam !== false ||
    laneEntry.truthClaimed !== false ||
    laneEntry.authorityGranted !== false ||
    laneEntry.causalTruthClaimed !== false ||
    laneEntry.testbedReadinessClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_entry_missing_or_unsafe");
  }
  if (
    decision.eventKind !== EXPECTED_EVENT_KIND ||
    !ALLOWED_DECISION_KINDS.includes(decision.decisionKind) ||
    DEFERRED_DECISION_KINDS.includes(decision.decisionKind) ||
    !nonEmptyString(decision.operatorDecisionRef) ||
    !nonEmptyString(decision.operatorSeatRef) ||
    (!nonEmptyString(decision.targetRef) && stringArray(decision.affectedArtifactRefs).length === 0) ||
    (!nonEmptyString(decision.sourceWorkPacketRef) && stringArray(decision.sourceReviewRefs).length === 0) ||
    !nonEmptyString(decision.approvedScopeRef) ||
    !nonEmptyString(decision.forbiddenScopeRef) ||
    !nonEmptyString(decision.decisionValue) ||
    !nonEmptyString(decision.decisionReasonDigest) ||
    !nonEmptyString(decision.issuedAt) ||
    decision.defaultReadOnlyObserverVisibility !== "filtered_decision_posture" ||
    decision.fullDecisionReasonVisibleToReadOnlyObservers !== false ||
    decision.fullDecisionReasonRequiresExplicitReaderPolicy !== true ||
    decision.viewAccessIsAuthority !== false ||
    decision.viewAccessIsApproval !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_decision_missing_or_unsafe");
  }
  if (
    decision.rootAdjacentDecisionKind !== false ||
    decision.decisionIsExecution !== false ||
    decision.decisionIsGlobalAuthority !== false ||
    decision.decisionIsReadiness !== false ||
    decision.decisionIsWriterAdmission !== false ||
    decision.decisionIsProductionPromotion !== false ||
    decision.agentDraftIsOperatorApproval !== false ||
    decision.edgeStatusIsApproval !== false ||
    decision.causalReviewIsTruth !== false ||
    decision.testbedReviewIsReadiness !== false ||
    decision.truthClaimed !== false ||
    decision.authorityGranted !== false ||
    decision.globalAuthorityGranted !== false ||
    decision.meshTruthClaimed !== false ||
    decision.readinessClaimed !== false ||
    decision.executionClaimed !== false ||
    decision.writerAdmissionClaimed !== false ||
    decision.productionPromotionClaimed !== false ||
    decision.causalTruthClaimed !== false ||
    decision.testbedReadinessClaimed !== false ||
    decision.edgeStatusApprovalClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_decision_overclaim");
  }
  if (
    view.artifactKind !== "edge_local_layer_production_accepted_events_view" ||
    view.schemaVersion !== "edge_local_layer_production_accepted_events_view.v0" ||
    view.viewRef !== "local-layer-continuity-accepted-events-view" ||
    view.acceptedOperatorDecisionCount < 1 ||
    !stringArray(view.acceptedEventRefs).includes(laneEntry.entryId) ||
    !stringArray(view.acceptedDecisionKinds).includes(decision.decisionKind) ||
    view.filteredReaderVisibility !== true ||
    view.fullDecisionReasonVisible !== false ||
    view.derivedOnly !== true ||
    view.reconstructableFromSourceLane !== true ||
    view.viewIsSourceContinuity !== false ||
    view.truthClaimed !== false ||
    view.authorityGranted !== false ||
    view.sourceContinuityClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_view_missing_or_unsafe");
  }
  if (
    readerObservation.artifactKind !== "edge_local_layer_production_reader_observation" ||
    readerObservation.schemaVersion !== "edge_local_layer_production_reader_observation.v0" ||
    readerObservation.observerPath !== "read-only-observer-view-replica-proof" ||
    readerObservation.realReplicaProof !== true ||
    !stringArray(readerObservation.observedAcceptedEventRefs).includes(laneEntry.entryId) ||
    readerObservation.readOnlyObserverCanReadAllowedView !== true ||
    readerObservation.observerAppendBlocked !== true ||
    readerObservation.readOnlyObserverCannotWriteAcceptedContinuity !== true ||
    readerObservation.replicaVisibilityIsContinuity !== false ||
    readerObservation.viewOutputIsSourceContinuity !== false ||
    readerObservation.authorityGranted !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_reader_observation_missing_or_unsafe");
  }
  if (
    productionPosture.productionLanePromoted !== true ||
    productionPosture.productionLocalLayerContinuity !== true ||
    productionPosture.edgeStateMigration !== false ||
    productionPosture.defaultBackendSwitch !== false ||
    productionPosture.jsonCompatibilityRemoved !== false ||
    productionPosture.httpOrSshCanonicalSeam !== false ||
    productionPosture.causalSubstrateBackendOwner !== false ||
    productionPosture.testbedReadinessClaimed !== false ||
    productionPosture.edgeStatusIsPromotionApproval !== false ||
    productionPosture.truthClaimed !== false ||
    productionPosture.authorityGranted !== false ||
    productionPosture.meshTruthClaimed !== false ||
    productionPosture.causalTruthClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_posture_missing_or_unsafe");
  }
  if (
    causal.interpretationKind !== "observer-relative-local-layer-operator-decision-continuity-evidence" ||
    causal.interpretsOperatorDecisionAsContinuityEvidence !== true ||
    causal.operatorDecisionIsTruth !== false ||
    causal.operatorDecisionIsExecution !== false ||
    causal.operatorDecisionIsGlobalAuthority !== false ||
    causal.operatorDecisionIsMeshSettlement !== false ||
    causal.operatorDecisionIsReadiness !== false ||
    causal.observerRelativeContinuity !== true ||
    causal.branchSettlementClaimed !== false ||
    causal.lineageSettlementClaimed !== false ||
    causal.causalTruthClaimed !== false ||
    causal.causalSubstrateOwnsBackend !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_causal_interpretation_missing_or_unsafe");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.observesProductionLaneResult !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.executesOperatorDecision !== false ||
    boundary.grantsWriterAuthority !== false ||
    boundary.approvesProductionPromotion !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.claimsMeshTruth !== false ||
    boundary.claimsLineageSettlement !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-operator-decision-continuity-valid-evidence" ||
    validation.refsPresent !== true ||
    validation.backendSafe !== true ||
    validation.laneEntrySafe !== true ||
    validation.operatorDecisionSafe !== true ||
    validation.acceptedEventsViewSafe !== true ||
    validation.readerObservationSafe !== true ||
    validation.productionPostureSafe !== true ||
    validation.refsSafe !== true ||
    validation.noAuthorityOrTruthOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_operator_decision_continuity_validation_not_ready");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_operator_decision_continuity_visible"])
  });
}

export function buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const laneEntry = isPlainObject(evidenceArtifact?.laneEntry) ? evidenceArtifact.laneEntry : {};
  const decision = isPlainObject(evidenceArtifact?.operatorDecision) ? evidenceArtifact.operatorDecision : {};
  const view = isPlainObject(evidenceArtifact?.acceptedEventsView) ? evidenceArtifact.acceptedEventsView : {};
  const productionPosture = isPlainObject(evidenceArtifact?.productionPosture) ? evidenceArtifact.productionPosture : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_operator_decision_continuity_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-operator-decision-continuity:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceResultRef: nonEmptyString(refs.sourceResultRef),
    laneEntryRef: nonEmptyString(refs.laneEntryRef),
    semanticEventRef: nonEmptyString(refs.semanticEventRef),
    eventKind: nonEmptyString(laneEntry.semanticEventEventKind),
    decisionKind: nonEmptyString(decision.decisionKind),
    operatorDecisionRef: nonEmptyString(decision.operatorDecisionRef),
    readerDecisionVisibility: nonEmptyString(decision.defaultReadOnlyObserverVisibility),
    fullDecisionReasonVisibleToReadOnlyObservers: decision.fullDecisionReasonVisibleToReadOnlyObservers === true,
    acceptedOperatorDecisionCount: Number.isFinite(view.acceptedOperatorDecisionCount) ? view.acceptedOperatorDecisionCount : 0,
    productionLanePromoted: productionPosture.productionLanePromoted === true,
    productionLocalLayerContinuity: productionPosture.productionLocalLayerContinuity === true,
    edgeStateMigration: productionPosture.edgeStateMigration === true,
    testbedReviewIsReadiness: false,
    causalReviewIsTruth: false,
    operatorDecisionIsExecution: false,
    operatorDecisionIsTruth: false,
    operatorDecisionIsAuthority: false,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedExecutesOperatorDecision: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false,
    testbedClaimsReadiness: false
  });
}

export function listTestbedEdgeLocalLayerOperatorDecisionContinuityStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES));
}
