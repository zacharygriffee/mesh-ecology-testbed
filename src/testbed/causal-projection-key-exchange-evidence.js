export const TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION =
  "testbed_causal_projection_key_exchange_evidence.v1";

export const TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES = Object.freeze({
  CAUSAL_PROJECTION_KEY_EVIDENCE_VISIBLE: "causal_projection_key_evidence_visible",
  CAUSAL_PROJECTION_KEY_EVIDENCE_BLOCKED: "causal_projection_key_evidence_blocked",
  CAUSAL_PROJECTION_KEY_EVIDENCE_MALFORMED: "causal_projection_key_evidence_malformed",
  CAUSAL_PROJECTION_KEY_EVIDENCE_INCOMPLETE: "causal_projection_key_evidence_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "causal-edge-projection-key-exchange-evidence";
const EXPECTED_SCHEMA = "causal-substrate/edge-projection-key-exchange-evidence/v1";
const EXPECTED_SOURCE_REPO = "mesh-ecology-edge";
const EXPECTED_EDGE_ARTIFACT_KIND = "edge_projection_key_exchange_proof";
const EXPECTED_EDGE_SCHEMA = "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0";
const HEX_64 = /^[a-f0-9]{64}$/iu;

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

function unsafeRef(ref) {
  return /https?:\/\/|ssh:\/\/|\/|\\|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+/iu.test(ref);
}

function boundary(causalEvidence) {
  return isPlainObject(causalEvidence?.boundary) ? causalEvidence.boundary : {};
}

function contactRefs(causalEvidence) {
  return isPlainObject(causalEvidence?.contactRefs) ? causalEvidence.contactRefs : {};
}

function contactPosture(causalEvidence) {
  return isPlainObject(causalEvidence?.contactPosture) ? causalEvidence.contactPosture : {};
}

function continuityPosture(causalEvidence) {
  return isPlainObject(causalEvidence?.continuityPosture) ? causalEvidence.continuityPosture : {};
}

function validation(causalEvidence) {
  return isPlainObject(causalEvidence?.validation) ? causalEvidence.validation : {};
}

function source(causalEvidence) {
  return isPlainObject(causalEvidence?.source) ? causalEvidence.source : {};
}

function validateCausalProjectionKeyEvidence(causalEvidence) {
  const reasonCodes = [];
  if (!isPlainObject(causalEvidence)) {
    return Object.freeze({
      reviewStatus: TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_MALFORMED,
      reasonCodes: Object.freeze(["causal_projection_key_evidence_missing_or_malformed"])
    });
  }

  const sourceShape = source(causalEvidence);
  const refs = contactRefs(causalEvidence);
  const posture = contactPosture(causalEvidence);
  const continuity = continuityPosture(causalEvidence);
  const evidenceBoundary = boundary(causalEvidence);
  const evidenceValidation = validation(causalEvidence);
  const semanticRefs = stringArray(refs.semanticSourceRefs);
  const replicaSourceRefs = stringArray(refs.replicaSourceRefs);
  const allRefs = [
    refs.proofId,
    refs.sourceCoreKey,
    refs.hostPublicKey,
    refs.requestRef,
    refs.responseRef,
    refs.capabilityAdvertisementRef,
    refs.selectedTransportRef,
    refs.appendEntryRef,
    ...semanticRefs,
    ...stringArray(refs.replicaEntryRefs),
    ...replicaSourceRefs
  ].filter(Boolean);

  if (causalEvidence.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("causal_projection_key_artifact_kind_mismatch");
  if (causalEvidence.schema !== EXPECTED_SCHEMA) reasonCodes.push("causal_projection_key_schema_mismatch");
  if (causalEvidence.schemaVersion !== 1) reasonCodes.push("causal_projection_key_schema_version_mismatch");
  if (sourceShape.sourceRepo !== EXPECTED_SOURCE_REPO) reasonCodes.push("causal_projection_key_source_repo_mismatch");
  if (sourceShape.sourceArtifactKind !== EXPECTED_EDGE_ARTIFACT_KIND) reasonCodes.push("causal_projection_key_source_artifact_kind_mismatch");
  if (sourceShape.sourceSchema !== EXPECTED_EDGE_SCHEMA) reasonCodes.push("causal_projection_key_source_schema_mismatch");

  if (!nonEmptyString(refs.proofId)) reasonCodes.push("causal_projection_key_proof_id_missing");
  if (!nonEmptyString(refs.sourceCoreKey) || !HEX_64.test(refs.sourceCoreKey)) {
    reasonCodes.push("causal_projection_key_source_core_key_invalid");
  }
  if (semanticRefs.length === 0) reasonCodes.push("causal_projection_key_semantic_refs_missing");
  if (allRefs.some(unsafeRef)) reasonCodes.push("causal_projection_key_refs_contain_scaffold");

  if (
    posture.transportKind !== "protomux-rpc" ||
    posture.contactSeam !== "hyperdht_direct_peer" ||
    posture.transportRole !== "proof_lane" ||
    posture.transportScope !== "isolated_local_hyperdht" ||
    posture.scaffoldTransport === true ||
    posture.compatibilityAlias === true ||
    posture.contactAttempted !== true ||
    posture.contactSucceeded !== true ||
    posture.participantIdentityDependsOnHttp !== false
  ) {
    reasonCodes.push("causal_projection_key_contact_posture_missing_or_unsafe");
  }

  if (
    continuity.sourceCoreKeyPresent !== true ||
    continuity.semanticRefsPresent !== true ||
    continuity.acceptedAsCanonicalHistory !== false ||
    continuity.happeningRole !== "projection-source-core-key-contact-proof" ||
    continuity.causalContinuityRole !== "contact-evidence-for-projection-log-replica-continuity"
  ) {
    reasonCodes.push("causal_projection_key_continuity_posture_missing_or_unsafe");
  }
  if (
    continuity.sourceCoreKeyMatchesReplica === false ||
    continuity.replicaRefsPreserved === false ||
    evidenceValidation.replicaInspectionMatched === false
  ) {
    reasonCodes.push("causal_projection_key_replica_refinement_mismatch");
  }

  if (
    evidenceBoundary.reviewOnly !== true ||
    evidenceBoundary.evidenceOnly !== true ||
    evidenceBoundary.opensHyperDht !== false ||
    evidenceBoundary.opensProtomuxRpc !== false ||
    evidenceBoundary.opensCorestore !== false ||
    evidenceBoundary.opensAutobase !== false ||
    evidenceBoundary.callsEdge !== false ||
    evidenceBoundary.callsTestbed !== false ||
    evidenceBoundary.replaysProjectionLog !== false ||
    evidenceBoundary.writesContinuityRecords !== false ||
    evidenceBoundary.acceptsCanonicalHistory !== false ||
    evidenceBoundary.claimsDistributedReadiness !== false ||
    evidenceBoundary.claimsReplicatedState !== false ||
    evidenceBoundary.claimsMeshPublication !== false ||
    evidenceBoundary.claimsCausalTruth !== false ||
    evidenceBoundary.startsBackend !== false
  ) {
    reasonCodes.push("causal_projection_key_boundary_overclaim");
  }

  if (
    evidenceValidation.status !== "edge-projection-key-exchange-valid-contact-evidence" ||
    causalEvidence.reviewStatus !== "edge-projection-key-exchange-evidence-emitted" ||
    evidenceValidation.unsafeSeamRefsBlocked !== true ||
    evidenceValidation.unsafeClaimsBlocked !== true
  ) {
    reasonCodes.push("causal_projection_key_validation_not_visible");
  }
  for (const issue of stringArray(evidenceValidation.issues)) {
    reasonCodes.push(`causal_projection_key_source_issue:${issue}`);
  }

  if (reasonCodes.some((code) =>
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("scaffold") ||
    code.includes("mismatch") ||
    code.includes("source_issue")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_VISIBLE,
    reasonCodes: Object.freeze(["causal_projection_key_evidence_visible"])
  });
}

export function buildTestbedCausalProjectionKeyExchangeEvidence({
  causalEvidence = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const review = validateCausalProjectionKeyEvidence(causalEvidence);
  const refs = contactRefs(causalEvidence);
  const posture = contactPosture(causalEvidence);
  const continuity = continuityPosture(causalEvidence);
  const evidenceBoundary = boundary(causalEvidence);
  const sourceShape = source(causalEvidence);

  return Object.freeze({
    artifactKind: "testbed_causal_projection_key_exchange_evidence",
    schemaVersion: TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-causal-projection-key:${nonEmptyString(causalEvidence?.artifactId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: review.reviewStatus,
    reasonCodes: review.reasonCodes,
    sourceRepo: sourceShape.sourceRepo ?? null,
    sourceArtifactKind: sourceShape.sourceArtifactKind ?? null,
    sourceSchema: sourceShape.sourceSchema ?? null,
    causalArtifactKind: nonEmptyString(causalEvidence?.artifactKind),
    causalSchema: nonEmptyString(causalEvidence?.schema),
    causalReviewStatus: nonEmptyString(causalEvidence?.reviewStatus),
    proofId: nonEmptyString(refs.proofId),
    sourceCoreKey: nonEmptyString(refs.sourceCoreKey),
    sourceRefs: Object.freeze(stringArray(refs.semanticSourceRefs)),
    sourceRefCount: stringArray(refs.semanticSourceRefs).length,
    replicaEntryRefs: Object.freeze(stringArray(refs.replicaEntryRefs)),
    replicaSourceRefs: Object.freeze(stringArray(refs.replicaSourceRefs)),
    transportKind: nonEmptyString(posture.transportKind),
    contactSeam: nonEmptyString(posture.contactSeam),
    transportRole: nonEmptyString(posture.transportRole),
    transportScope: nonEmptyString(posture.transportScope),
    contactAttempted: posture.contactAttempted === true,
    contactSucceeded: posture.contactSucceeded === true,
    sourceCoreKeyMatchesReplica: continuity.sourceCoreKeyMatchesReplica ?? null,
    replicaRefsPreserved: continuity.replicaRefsPreserved ?? null,
    refinedByReplicaInspection: continuity.refinedByReplicaInspection === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedCausalSubstrate: false,
    testbedExecutedEdge: false,
    testbedOpenedHyperDHT: false,
    testbedOpenedProtomux: false,
    testbedOpenedCorestore: false,
    testbedOpenedAutobase: false,
    testbedWroteContinuityRecords: false,
    testbedAcceptedCanonicalHistory: false,
    causalEvidenceOpenedHyperDHT: evidenceBoundary.opensHyperDht === true,
    causalEvidenceOpenedProtomux: evidenceBoundary.opensProtomuxRpc === true,
    causalEvidenceOpenedCorestore: evidenceBoundary.opensCorestore === true,
    causalEvidenceOpenedAutobase: evidenceBoundary.opensAutobase === true,
    causalEvidenceClaimedDistributedReadiness: evidenceBoundary.claimsDistributedReadiness === true,
    causalEvidenceClaimedReplicatedState: evidenceBoundary.claimsReplicatedState === true,
    causalEvidenceClaimedMeshPublication: evidenceBoundary.claimsMeshPublication === true,
    causalEvidenceClaimedTruth: evidenceBoundary.claimsCausalTruth === true
  });
}

export function listTestbedCausalProjectionKeyExchangeStatuses() {
  return Object.freeze(Object.values(TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES));
}
