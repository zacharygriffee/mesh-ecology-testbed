export const TESTBED_EDGE_PROJECTION_REPLICA_VIEW_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_projection_replica_view_evidence.v1";

export const TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES = Object.freeze({
  REPLICA_VIEW_VISIBLE: "projection_replica_view_visible",
  REPLICA_VIEW_BLOCKED: "projection_replica_view_blocked",
  REPLICA_VIEW_MALFORMED: "projection_replica_view_malformed",
  REPLICA_VIEW_INCOMPLETE: "projection_replica_view_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-projection-replica-view-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-projection-replica-view-evidence/v1";
const EXPECTED_SOURCE_REPO = "mesh-ecology-edge";
const EXPECTED_EDGE_ARTIFACT_KIND = "edge_projection_event_log_replica_view";
const EXPECTED_EDGE_SCHEMA = "edge_projection_event_log_replica_view.v0";
const SOURCE_CORE_KEY = /^[a-f0-9]{64}$/u;

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
  return isPlainObject(artifact?.replicaViewRefs) ? artifact.replicaViewRefs : {};
}

function source(artifact) {
  return isPlainObject(artifact?.source) ? artifact.source : {};
}

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function posture(artifact) {
  return isPlainObject(artifact?.viewPosture) ? artifact.viewPosture : {};
}

function continuity(artifact) {
  return isPlainObject(artifact?.continuityPosture) ? artifact.continuityPosture : {};
}

function allRefs(evidenceRefs) {
  return Object.values(evidenceRefs)
    .flat()
    .filter((entry) => typeof entry === "string" && entry.trim() !== "");
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function validateEdgeProjectionReplicaView({ evidenceArtifact, requiredSourceRefs = [] } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_MALFORMED,
      reasonCodes: Object.freeze(["projection_replica_view_missing_or_malformed"])
    });
  }

  const evidenceRefs = refs(evidenceArtifact);
  const evidenceSource = source(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const viewPosture = posture(evidenceArtifact);
  const continuityPosture = continuity(evidenceArtifact);
  const suppliedSourceRefs = new Set(stringArray(evidenceRefs.sourceRefs));
  const missingRequiredRefs = stringArray(requiredSourceRefs).filter((ref) => !suppliedSourceRefs.has(ref));
  const causalRefs = [
    ...stringArray(evidenceRefs.happeningRefs),
    ...stringArray(evidenceRefs.branchRefs),
    ...stringArray(evidenceRefs.segmentRefs)
  ];

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("projection_replica_view_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("projection_replica_view_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("projection_replica_view_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-projection-replica-view-evidence-emitted") {
    reasonCodes.push("projection_replica_view_not_emitted");
  }
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("projection_replica_view_artifact_id_missing");
  if (evidenceSource.sourceRepo !== EXPECTED_SOURCE_REPO) reasonCodes.push("projection_replica_view_source_repo_mismatch");
  if (evidenceSource.sourceArtifactKind !== EXPECTED_EDGE_ARTIFACT_KIND) {
    reasonCodes.push("projection_replica_view_source_artifact_kind_mismatch");
  }
  if (evidenceSource.sourceSchema !== EXPECTED_EDGE_SCHEMA) reasonCodes.push("projection_replica_view_source_schema_mismatch");
  if (evidenceValidation.status !== "edge-projection-replica-view-valid-evidence") {
    reasonCodes.push("projection_replica_view_validation_not_ready");
  }

  if (!nonEmptyString(evidenceRefs.viewId)) reasonCodes.push("projection_replica_view_id_missing");
  if (!nonEmptyString(evidenceRefs.sourceCoreKey) || !SOURCE_CORE_KEY.test(evidenceRefs.sourceCoreKey)) {
    reasonCodes.push("projection_replica_view_source_core_key_invalid");
  }
  if (stringArray(evidenceRefs.entryRefs).length === 0) reasonCodes.push("projection_replica_view_entry_refs_missing");
  if (stringArray(evidenceRefs.projectionEventRefs).length === 0) {
    reasonCodes.push("projection_replica_view_projection_event_refs_missing");
  }
  if (stringArray(evidenceRefs.sourceRefs).length === 0) reasonCodes.push("projection_replica_view_source_refs_missing");
  if (causalRefs.length === 0) reasonCodes.push("projection_replica_view_causal_refs_missing");
  if (allRefs(evidenceRefs).some(unsafeSeamRef)) reasonCodes.push("projection_replica_view_ref_contains_compat_or_path_seam");
  if (missingRequiredRefs.length > 0) reasonCodes.push("projection_replica_view_required_source_refs_missing");

  if (
    viewPosture.derivedFromReadOnlyReplica !== true ||
    viewPosture.replicatedProjectionViewCandidate !== true ||
    viewPosture.sourceCoreKeyRequired !== true ||
    viewPosture.sourceLocalStoreRootUsedAsSeam !== false ||
    viewPosture.localPathSeam !== false ||
    viewPosture.httpSeam !== false ||
    viewPosture.sshSeam !== false ||
    viewPosture.writesSourceStore !== false ||
    viewPosture.writesReplicaStore !== false ||
    viewPosture.writesDurableLocalLayerState !== false ||
    viewPosture.productionLocalLayerState !== false ||
    viewPosture.autobaseBackend !== false ||
    viewPosture.wallClockDefinesCausalOrder !== false ||
    viewPosture.collaborativeCausalOrderCandidate !== "autobase_or_equivalent_linearization"
  ) {
    reasonCodes.push("projection_replica_view_posture_overclaim");
  }

  if (
    continuityPosture.observerRelativeReplicaView !== true ||
    continuityPosture.sourceCoreKeyPresent !== true ||
    continuityPosture.projectionRecordsVisible !== true ||
    continuityPosture.semanticRefsPresent !== true ||
    continuityPosture.causalRefsPresent !== true ||
    continuityPosture.entryRefsPreserved !== true ||
    continuityPosture.readOnlyReplicaView !== true ||
    continuityPosture.acceptedAsCanonicalHistory !== false ||
    continuityPosture.acceptedAsDurableState !== false ||
    continuityPosture.acceptedAsRuntimeAuthority !== false ||
    continuityPosture.causalContinuityRole !== "projection-replica-view-continuity-evidence"
  ) {
    reasonCodes.push("projection_replica_view_continuity_overclaim");
  }

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.edgeRuntimeFetched !== false ||
    evidenceBoundary.edgeCalled !== false ||
    evidenceBoundary.edgeMutated !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensHyperDHT !== false ||
    evidenceBoundary.opensProtomux !== false ||
    evidenceBoundary.replaysProjectionLog !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsReplicatedState !== false ||
    evidenceBoundary.claimsDurableState !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.startsBackend !== false ||
    evidenceBoundary.publishesToMesh !== false
  ) {
    reasonCodes.push("projection_replica_view_boundary_overclaim");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES.REPLICA_VIEW_VISIBLE,
    reasonCodes: Object.freeze(["projection_replica_view_visible"])
  });
}

export function buildTestbedEdgeProjectionReplicaViewEvidence({
  evidenceArtifact = null,
  requiredSourceRefs = [],
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceRefs = refs(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const viewPosture = posture(evidenceArtifact);
  const continuityPosture = continuity(evidenceArtifact);
  const validationResult = validateEdgeProjectionReplicaView({ evidenceArtifact, requiredSourceRefs });

  return Object.freeze({
    artifactKind: "testbed_edge_projection_replica_view_evidence",
    schemaVersion: TESTBED_EDGE_PROJECTION_REPLICA_VIEW_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-projection-replica-view:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    edgeSourceArtifactKind: nonEmptyString(source(evidenceArtifact).sourceArtifactKind),
    edgeSourceSchema: nonEmptyString(source(evidenceArtifact).sourceSchema),
    viewId: nonEmptyString(evidenceRefs.viewId),
    sourceCoreKey: nonEmptyString(evidenceRefs.sourceCoreKey),
    entryRefCount: stringArray(evidenceRefs.entryRefs).length,
    projectionEventRefCount: stringArray(evidenceRefs.projectionEventRefs).length,
    sourceRefCount: stringArray(evidenceRefs.sourceRefs).length,
    transportRefCount: stringArray(evidenceRefs.transportRefs).length,
    happeningRefCount: stringArray(evidenceRefs.happeningRefs).length,
    branchRefCount: stringArray(evidenceRefs.branchRefs).length,
    segmentRefCount: stringArray(evidenceRefs.segmentRefs).length,
    observerRefCount: stringArray(evidenceRefs.observerRefs).length,
    presentPointRefCount: stringArray(evidenceRefs.presentPointRefs).length,
    requiredSourceRefs: Object.freeze(stringArray(requiredSourceRefs)),
    replicatedProjectionViewCandidate: viewPosture.replicatedProjectionViewCandidate === true,
    derivedFromReadOnlyReplica: viewPosture.derivedFromReadOnlyReplica === true,
    productionLocalLayerState: viewPosture.productionLocalLayerState === true,
    writesDurableLocalLayerState: viewPosture.writesDurableLocalLayerState === true,
    writesReplicaStore: viewPosture.writesReplicaStore === true,
    httpSeam: viewPosture.httpSeam === true,
    sshSeam: viewPosture.sshSeam === true,
    localPathSeam: viewPosture.localPathSeam === true,
    wallClockDefinesCausalOrder: viewPosture.wallClockDefinesCausalOrder === true,
    continuityRole: nonEmptyString(continuityPosture.causalContinuityRole),
    observerRelativeReplicaView: continuityPosture.observerRelativeReplicaView === true,
    acceptedAsCanonicalHistory: continuityPosture.acceptedAsCanonicalHistory === true,
    acceptedAsDurableState: continuityPosture.acceptedAsDurableState === true,
    acceptedAsRuntimeAuthority: continuityPosture.acceptedAsRuntimeAuthority === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledCausalSubstrate: false,
    testbedExecutedEdge: false,
    testbedOpenedCorestore: false,
    testbedOpenedAutobase: false,
    testbedOpenedHyperDHT: false,
    testbedOpenedProtomux: false,
    testbedReplayedProjectionLog: false,
    testbedWroteContinuityRecords: false,
    testbedAcceptedCanonicalHistory: false,
    testbedClaimedCausalTruth: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    authorityGranted: false,
    completionClaimed: false,
    meshTruthClaimed: false,
    causalEvidenceOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalEvidenceOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalEvidenceOpenedHyperDHT: evidenceBoundary.opensHyperDHT === true,
    causalEvidenceOpenedProtomux: evidenceBoundary.opensProtomux === true,
    causalEvidenceReplayedProjectionLog: evidenceBoundary.replaysProjectionLog === true,
    causalEvidenceWroteContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalEvidenceAcceptedCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    causalEvidenceClaimedReplicatedState: evidenceBoundary.claimsReplicatedState === true,
    causalEvidenceClaimedDurableState: evidenceBoundary.claimsDurableState === true,
    causalEvidenceClaimedTruth: evidenceBoundary.claimsCausalTruth === true
  });
}

export function listTestbedEdgeProjectionReplicaViewStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_PROJECTION_REPLICA_VIEW_STATUSES));
}
