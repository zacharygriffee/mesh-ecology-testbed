export const TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_local_layer_production_continuity_lane_evidence.v1";

export const TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES = Object.freeze({
  VISIBLE: "edge_local_layer_production_continuity_lane_visible",
  BLOCKED: "edge_local_layer_production_continuity_lane_blocked",
  MALFORMED: "edge_local_layer_production_continuity_lane_malformed",
  INCOMPLETE: "edge_local_layer_production_continuity_lane_incomplete"
});

const EXPECTED_KIND = "causal-edge-local-layer-production-continuity-lane-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-production-continuity-lane-evidence/v1";
const EXPECTED_LANE = "local-layer-continuity-lane:operator-owned-devices";
const EXPECTED_NAMESPACE = "local-layer/continuity";
const EXPECTED_EVENT_KIND = "repo_work_packet_continuity_event";

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
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["edge_local_layer_production_continuity_lane_missing_or_malformed"])
    });
  }

  const refs = isPlainObject(evidenceArtifact.refs) ? evidenceArtifact.refs : {};
  const backend = isPlainObject(evidenceArtifact.backend) ? evidenceArtifact.backend : {};
  const laneEntry = isPlainObject(evidenceArtifact.laneEntry) ? evidenceArtifact.laneEntry : {};
  const view = isPlainObject(evidenceArtifact.acceptedEventsView) ? evidenceArtifact.acceptedEventsView : {};
  const readerObservation = isPlainObject(evidenceArtifact.readerObservation) ? evidenceArtifact.readerObservation : {};
  const readerTransportPosture = isPlainObject(readerObservation.transportPosture) ? readerObservation.transportPosture : {};
  const readerNonClaims = isPlainObject(readerObservation.nonClaims) ? readerObservation.nonClaims : {};
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
    view.viewRef,
    ...stringArray(view.acceptedEventRefs),
    readerObservation.observationRef,
    readerObservation.readerRef,
    readerObservation.readerDeviceRef,
    readerObservation.sourceViewKey,
    readerObservation.observerViewKey,
    ...stringArray(readerObservation.observedAcceptedEventRefs)
  ].filter(Boolean);

  if (evidenceArtifact.artifactKind !== EXPECTED_KIND) reasonCodes.push("edge_local_layer_production_continuity_lane_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("edge_local_layer_production_continuity_lane_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("edge_local_layer_production_continuity_lane_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-local-layer-production-continuity-lane-evidence-emitted") {
    reasonCodes.push("edge_local_layer_production_continuity_lane_not_emitted");
  }
  if (
    !nonEmptyString(refs.sourceResultRef) ||
    !nonEmptyString(refs.sourceResultHash) ||
    !nonEmptyString(refs.laneEntryRef) ||
    !nonEmptyString(refs.semanticEventRef) ||
    stringArray(refs.writerRefs).length < 1 ||
    stringArray(refs.headRefs).length < 1 ||
    stringArray(refs.linearizedEntryRefs).length < 1
  ) {
    reasonCodes.push("edge_local_layer_production_continuity_lane_refs_missing");
  }
  if (allRefs.some(unsafeSeamRef)) reasonCodes.push("edge_local_layer_production_continuity_lane_ref_contains_compat_or_path_seam");
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
    reasonCodes.push("edge_local_layer_production_continuity_lane_backend_missing_or_unsafe");
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
    reasonCodes.push("edge_local_layer_production_continuity_lane_entry_missing_or_unsafe");
  }
  if (
    view.artifactKind !== "edge_local_layer_production_accepted_events_view" ||
    view.schemaVersion !== "edge_local_layer_production_accepted_events_view.v0" ||
    view.viewRef !== "local-layer-continuity-accepted-events-view" ||
    view.acceptedEventCount < 1 ||
    !stringArray(view.acceptedEventRefs).includes(laneEntry.entryId) ||
    view.derivedOnly !== true ||
    view.reconstructableFromSourceLane !== true ||
    view.viewIsSourceContinuity !== false ||
    view.viewDeletionLosesSourceContinuity !== false ||
    view.rejectedEntriesAreAcceptedContinuity !== false ||
    view.truthClaimed !== false ||
    view.authorityGranted !== false ||
    view.sourceContinuityClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_production_continuity_lane_view_missing_or_unsafe");
  }
  if (
    readerObservation.artifactKind !== "edge_local_layer_production_reader_observation" ||
    readerObservation.schemaVersion !== "edge_local_layer_production_reader_observation.v0" ||
    readerObservation.observerPath !== "read-only-observer-view-replica-proof" ||
    readerObservation.realReplicaProof !== true ||
    !nonEmptyString(readerObservation.observationRef) ||
    !nonEmptyString(readerObservation.readerRef) ||
    !nonEmptyString(readerObservation.readerDeviceRef) ||
    !nonEmptyString(readerObservation.sourceViewKey) ||
    !nonEmptyString(readerObservation.observerViewKey) ||
    readerObservation.observedResultCount < 1 ||
    readerObservation.observedAcceptedEventCount < 1 ||
    !stringArray(readerObservation.observedAcceptedEventRefs).includes(laneEntry.entryId) ||
    readerObservation.readOnlyObserverCanReadAllowedView !== true ||
    readerObservation.observerAppendBlocked !== true ||
    readerObservation.readOnlyObserverCannotWriteAcceptedContinuity !== true ||
    readerObservation.replicaVisibilityIsContinuity !== false ||
    readerObservation.viewOutputIsSourceContinuity !== false ||
    readerObservation.authorityGranted !== false ||
    readerTransportPosture.transportKind !== "corestore-protocol-stream" ||
    readerTransportPosture.readOnlyReplica !== true ||
    readerTransportPosture.httpSeam !== false ||
    readerTransportPosture.sshSeam !== false ||
    readerTransportPosture.localPathIsCanonicalSeam !== false ||
    readerNonClaims.truthClaimed !== false ||
    readerNonClaims.authorityGranted !== false ||
    readerNonClaims.writerGranted !== false ||
    readerNonClaims.continuityAcceptanceClaimed !== false ||
    readerNonClaims.sourceContinuityClaimed !== false ||
    readerNonClaims.readinessClaimed !== false
  ) {
    reasonCodes.push("edge_local_layer_production_continuity_lane_reader_observation_missing_or_unsafe");
  }
  if (
    productionPosture.productionLanePromoted !== true ||
    productionPosture.productionLocalLayerContinuity !== true ||
    productionPosture.acceptedContinuityInputs < 1 ||
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
    reasonCodes.push("edge_local_layer_production_continuity_lane_posture_missing_or_unsafe");
  }
  if (
    causal.interpretsProductionLaneResultAsEvidence !== true ||
    causal.observerRelativeContinuity !== true ||
    causal.branchSettlementClaimed !== false ||
    causal.lineageSettlementClaimed !== false ||
    causal.causalTruthClaimed !== false ||
    causal.causalSubstrateOwnsBackend !== false
  ) {
    reasonCodes.push("edge_local_layer_production_continuity_lane_causal_interpretation_missing_or_unsafe");
  }
  if (
    boundary.reviewOnly !== true ||
    boundary.evidenceOnly !== true ||
    boundary.observesProductionLaneResult !== true ||
    boundary.opensAutobase !== false ||
    boundary.opensCorestore !== false ||
    boundary.writesContinuityRecords !== false ||
    boundary.grantsWriterAuthority !== false ||
    boundary.claimsCausalTruth !== false ||
    boundary.claimsMeshTruth !== false ||
    boundary.claimsLineageSettlement !== false ||
    boundary.migratesEdgeState !== false
  ) {
    reasonCodes.push("edge_local_layer_production_continuity_lane_boundary_overclaim");
  }
  if (
    validation.status !== "edge-local-layer-production-continuity-lane-valid-evidence" ||
    validation.refsPresent !== true ||
    validation.backendSafe !== true ||
    validation.laneEntrySafe !== true ||
    validation.acceptedEventsViewSafe !== true ||
    validation.readerObservationSafe !== true ||
    validation.productionPostureSafe !== true ||
    validation.refsSafe !== true ||
    validation.noAuthorityOrTruthOverclaim !== true
  ) {
    reasonCodes.push("edge_local_layer_production_continuity_lane_validation_not_ready");
  }

  if (reasonCodes.some((code) => code.includes("mismatch") || code.includes("overclaim") || code.includes("unsafe") || code.includes("path_seam"))) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }
  return Object.freeze({
    reviewStatus: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["edge_local_layer_production_continuity_lane_visible"])
  });
}

export function buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validate({ evidenceArtifact });
  const refs = isPlainObject(evidenceArtifact?.refs) ? evidenceArtifact.refs : {};
  const backend = isPlainObject(evidenceArtifact?.backend) ? evidenceArtifact.backend : {};
  const laneEntry = isPlainObject(evidenceArtifact?.laneEntry) ? evidenceArtifact.laneEntry : {};
  const readerObservation = isPlainObject(evidenceArtifact?.readerObservation) ? evidenceArtifact.readerObservation : {};
  const productionPosture = isPlainObject(evidenceArtifact?.productionPosture) ? evidenceArtifact.productionPosture : {};

  return Object.freeze({
    artifactKind: "testbed_edge_local_layer_production_continuity_lane_evidence",
    schemaVersion: TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-local-layer-production-continuity-lane:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
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
    readerObservationRef: nonEmptyString(readerObservation.observationRef),
    readOnlyObserverReplicaProof: readerObservation.realReplicaProof === true,
    readOnlyObserverCanReadAllowedView: readerObservation.readOnlyObserverCanReadAllowedView === true,
    readOnlyObserverCannotWriteAcceptedContinuity: readerObservation.readOnlyObserverCannotWriteAcceptedContinuity === true,
    readerObservationIsContinuityAcceptance: false,
    backendKind: nonEmptyString(backend.backendKind),
    namespaceRef: nonEmptyString(backend.namespaceRef),
    laneRef: nonEmptyString(backend.laneRef),
    productionLanePromoted: productionPosture.productionLanePromoted === true,
    productionLocalLayerContinuity: productionPosture.productionLocalLayerContinuity === true,
    edgeStateMigration: productionPosture.edgeStateMigration === true,
    testbedReviewIsReadiness: false,
    causalReviewIsTruth: false,
    reviewOnly: true,
    evidenceOnly: true,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedStartsProductionBackend: false,
    testbedGrantsWriterAuthority: false,
    testbedClaimsCausalTruth: false,
    testbedClaimsReadiness: false
  });
}

export function listTestbedEdgeLocalLayerProductionContinuityLaneStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES));
}
