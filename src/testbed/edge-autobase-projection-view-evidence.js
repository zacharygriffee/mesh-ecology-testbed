export const TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_autobase_projection_view_evidence.v1";

export const TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES = Object.freeze({
  VISIBLE: "autobase_projection_view_visible",
  BLOCKED: "autobase_projection_view_blocked",
  MALFORMED: "autobase_projection_view_malformed",
  INCOMPLETE: "autobase_projection_view_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-autobase-projection-view-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-autobase-projection-view-evidence/v1";
const EXPECTED_EDGE_ARTIFACT_KIND = "edge_autobase_projection_view";
const EXPECTED_EDGE_SCHEMA = "edge_autobase_projection_view.v0";

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
  return isPlainObject(artifact?.projectionViewRefs) ? artifact.projectionViewRefs : {};
}

function boundary(artifact) {
  return isPlainObject(artifact?.boundary) ? artifact.boundary : {};
}

function validation(artifact) {
  return isPlainObject(artifact?.validation) ? artifact.validation : {};
}

function ordering(artifact) {
  return isPlainObject(artifact?.orderingEvidence) ? artifact.orderingEvidence : {};
}

function source(artifact) {
  return isPlainObject(artifact?.source) ? artifact.source : {};
}

function allRefs(evidenceRefs) {
  return Object.values(evidenceRefs).flat().filter((entry) => typeof entry === "string" && entry.trim() !== "");
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+|(^|[.-])\.\.($|[.-])|ssh|http/iu.test(ref);
}

function validateAutobaseProjectionViewEvidence({ evidenceArtifact } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(evidenceArtifact)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["autobase_projection_view_missing_or_malformed"])
    });
  }

  const evidenceRefs = refs(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const evidenceValidation = validation(evidenceArtifact);
  const orderingEvidence = ordering(evidenceArtifact);
  const evidenceSource = source(evidenceArtifact);

  if (evidenceArtifact.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("autobase_projection_view_artifact_kind_mismatch");
  if (evidenceArtifact.schema !== EXPECTED_SCHEMA) reasonCodes.push("autobase_projection_view_schema_mismatch");
  if (evidenceArtifact.schemaVersion !== 1) reasonCodes.push("autobase_projection_view_schema_version_mismatch");
  if (evidenceArtifact.reviewStatus !== "edge-autobase-projection-view-evidence-emitted") {
    reasonCodes.push("autobase_projection_view_not_emitted");
  }
  if (!nonEmptyString(evidenceArtifact.artifactId)) reasonCodes.push("autobase_projection_view_artifact_id_missing");
  if (evidenceSource.sourceRepo !== "mesh-ecology-edge") reasonCodes.push("autobase_projection_view_source_repo_mismatch");
  if (evidenceSource.sourceArtifactKind !== EXPECTED_EDGE_ARTIFACT_KIND) {
    reasonCodes.push("autobase_projection_view_edge_source_kind_mismatch");
  }
  if (evidenceSource.sourceSchema !== EXPECTED_EDGE_SCHEMA) reasonCodes.push("autobase_projection_view_edge_source_schema_mismatch");
  if (evidenceValidation.status !== "edge-autobase-projection-view-valid-evidence") {
    reasonCodes.push("autobase_projection_view_validation_not_ready");
  }

  if (!nonEmptyString(evidenceRefs.viewId)) reasonCodes.push("autobase_projection_view_id_missing");
  if (!nonEmptyString(evidenceRefs.sourceFrontierCandidateId)) {
    reasonCodes.push("autobase_projection_view_frontier_ref_missing");
  }
  if (stringArray(evidenceRefs.writerRefs).length < 2) reasonCodes.push("autobase_projection_view_writer_refs_missing");
  if (stringArray(evidenceRefs.headRefs).length < 2) reasonCodes.push("autobase_projection_view_head_refs_missing");
  if (stringArray(evidenceRefs.linearizedEntryRefs).length === 0) {
    reasonCodes.push("autobase_projection_view_linearized_refs_missing");
  }
  if (stringArray(evidenceRefs.causalFrontierRefs).length === 0) reasonCodes.push("autobase_projection_view_causal_frontier_refs_missing");
  if (
    stringArray(evidenceRefs.sourceProjectionEventRefs).length === 0 ||
    stringArray(evidenceRefs.sourceEntryRefs).length === 0 ||
    stringArray(evidenceRefs.sourceHappeningRefs).length === 0
  ) {
    reasonCodes.push("autobase_projection_view_source_refs_missing");
  }
  if (allRefs(evidenceRefs).some(unsafeSeamRef)) reasonCodes.push("autobase_projection_view_ref_contains_compat_or_path_seam");

  if (
    orderingEvidence.orderingSource !== "autobase_linearization" ||
    orderingEvidence.derivedFromAutobaseView !== true ||
    orderingEvidence.collaborativeProjectionViewCandidate !== true ||
    orderingEvidence.wallClockDefinesCausalOrder !== false ||
    orderingEvidence.appendSuccessIsAcceptance !== false
  ) {
    reasonCodes.push("autobase_projection_view_ordering_posture_overclaim");
  }

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.callsEdge !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.claimsDurableState !== false ||
    evidenceBoundary.claimsReplicatedState !== false ||
    evidenceBoundary.claimsRuntimeAuthority !== false ||
    evidenceBoundary.startsBackend !== false ||
    evidenceBoundary.publishesToMesh !== false
  ) {
    reasonCodes.push("autobase_projection_view_boundary_overclaim");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("path_seam")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["autobase_projection_view_visible"])
  });
}

export function buildTestbedEdgeAutobaseProjectionViewEvidence({
  evidenceArtifact = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const evidenceRefs = refs(evidenceArtifact);
  const evidenceBoundary = boundary(evidenceArtifact);
  const orderingEvidence = ordering(evidenceArtifact);
  const validationResult = validateAutobaseProjectionViewEvidence({ evidenceArtifact });

  return Object.freeze({
    artifactKind: "testbed_edge_autobase_projection_view_evidence",
    schemaVersion: TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-autobase-projection-view:${nonEmptyString(evidenceArtifact?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validationResult.reviewStatus,
    reasonCodes: validationResult.reasonCodes,
    sourceArtifactKind: nonEmptyString(evidenceArtifact?.artifactKind),
    sourceSchema: nonEmptyString(evidenceArtifact?.schema),
    sourceSchemaVersion: Number.isInteger(evidenceArtifact?.schemaVersion) ? evidenceArtifact.schemaVersion : null,
    sourceArtifactId: nonEmptyString(evidenceArtifact?.artifactId),
    sourceReviewStatus: nonEmptyString(evidenceArtifact?.reviewStatus),
    viewId: nonEmptyString(evidenceRefs.viewId),
    sourceFrontierCandidateId: nonEmptyString(evidenceRefs.sourceFrontierCandidateId),
    writerRefCount: stringArray(evidenceRefs.writerRefs).length,
    headRefCount: stringArray(evidenceRefs.headRefs).length,
    linearizedEntryRefCount: stringArray(evidenceRefs.linearizedEntryRefs).length,
    causalFrontierRefCount: stringArray(evidenceRefs.causalFrontierRefs).length,
    sourceProjectionEventRefCount: stringArray(evidenceRefs.sourceProjectionEventRefs).length,
    sourceEntryRefCount: stringArray(evidenceRefs.sourceEntryRefs).length,
    sourceHappeningRefCount: stringArray(evidenceRefs.sourceHappeningRefs).length,
    orderingSource: nonEmptyString(orderingEvidence.orderingSource),
    wallClockDefinesCausalOrder: orderingEvidence.wallClockDefinesCausalOrder === true,
    appendSuccessIsAcceptance: orderingEvidence.appendSuccessIsAcceptance === true,
    derivedFromAutobaseView: orderingEvidence.derivedFromAutobaseView === true,
    collaborativeProjectionViewCandidate: orderingEvidence.collaborativeProjectionViewCandidate === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedCalledCausalSubstrate: false,
    testbedOpenedAutobase: false,
    testbedOpenedCorestore: false,
    testbedWritesContinuityRecords: false,
    testbedAcceptsCanonicalHistory: false,
    testbedClaimsCausalTruth: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    canonicalHistoryClaimed: false,
    runtimeAuthorityClaimed: false,
    authorityGranted: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    causalEvidenceOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalEvidenceOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalEvidenceWroteContinuityRecords: evidenceBoundary.writesContinuityRecords === true,
    causalEvidenceAcceptedCanonicalHistory: evidenceBoundary.acceptsCanonicalHistory === true,
    causalEvidenceClaimedCausalTruth: evidenceBoundary.claimsCausalTruth === true,
    causalEvidenceClaimedDurableState: evidenceBoundary.claimsDurableState === true,
    causalEvidenceClaimedReplicatedState: evidenceBoundary.claimsReplicatedState === true,
    causalEvidenceClaimedRuntimeAuthority: evidenceBoundary.claimsRuntimeAuthority === true
  });
}

export function listTestbedEdgeAutobaseProjectionViewStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_AUTOBASE_PROJECTION_VIEW_STATUSES));
}
