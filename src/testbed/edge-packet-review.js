export const TESTBED_EDGE_PACKET_REVIEW_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_packet_review_evidence.v1";

export const TESTBED_EDGE_PACKET_REVIEW_STATUSES = Object.freeze({
  REVIEW_READY: "review_ready",
  REVIEW_BLOCKED: "review_blocked",
  PACKET_MALFORMED: "packet_malformed",
  PACKET_INCOMPLETE: "packet_incomplete",
  UNSUPPORTED_TARGET: "unsupported_target"
});

const TESTBED_TARGET_REPO = "mesh-ecology-testbed";
const TESTBED_SEAM_ID = "testbed";
const TESTBED_TARGET_SURFACE = "testbed_evidence_labels";

const PASSIVE_FLAGS = Object.freeze({
  callsAdjacentRepo: false,
  executesAction: false,
  schedulesWork: false,
  liveDiscoveryRequired: false,
  publishesToMesh: false,
  infersAdjacentTruth: false,
  infersMeshParticipation: false
});

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(values) {
  return Object.freeze(Array.isArray(values)
    ? values.filter((entry) => typeof entry === "string" && entry.trim() !== "")
    : []);
}

function objectArray(values) {
  return Object.freeze(Array.isArray(values) ? values.filter(isPlainObject) : []);
}

function fixturePacket(edgeFixture) {
  if (!isPlainObject(edgeFixture)) {
    return null;
  }

  if (isPlainObject(edgeFixture.packet)) {
    return edgeFixture.packet;
  }

  if (edgeFixture.artifactKind === "edge_ecosystem_adjacent_implementation_packet") {
    return edgeFixture;
  }

  return null;
}

function hasAnyTrue(value, fields) {
  return fields.some((field) => value?.[field] === true);
}

function hasRequiredRefs(packet) {
  return Boolean(
    nonEmptyString(packet.packetId) &&
    nonEmptyString(packet.sourceContractRef) &&
    nonEmptyString(packet.sourceLedgerRef) &&
    nonEmptyString(packet.sourceReadinessRollupRef) &&
    stringArray(packet.sourceEvidenceRefs).length > 0 &&
    stringArray(packet.sourceWorkPacketRefs).length > 0 &&
    stringArray(packet.sourceNextActionRefs).length > 0 &&
    stringArray(packet.sourceLedgerEventRefs).length > 0 &&
    stringArray(packet.sourceLedgerDeltaRefs).length > 0
  );
}

function hasContractMetadata(packet) {
  return Boolean(
    nonEmptyString(packet.expectedRequestArtifactKind) &&
    nonEmptyString(packet.expectedReceiptArtifactKind) &&
    stringArray(packet.expectedRequestRequiredFields).length > 0 &&
    stringArray(packet.expectedReceiptRequiredFields).length > 0 &&
    stringArray(packet.allowedReceiptStatuses).length > 0 &&
    stringArray(packet.correlationFields).length > 0 &&
    nonEmptyString(packet.edgeAuthorityBoundary) &&
    nonEmptyString(packet.adjacentAuthorityBoundary) &&
    isPlainObject(packet.acceptanceSemantics)
  );
}

function validateEdgePacket(packet) {
  const reasonCodes = [];

  if (!isPlainObject(packet)) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_MALFORMED,
      reasonCodes: Object.freeze(["edge_packet_missing_or_malformed"])
    });
  }

  if (packet.targetRepo !== TESTBED_TARGET_REPO) {
    reasonCodes.push("edge_packet_target_repo_mismatch");
  }

  if (packet.seamId !== TESTBED_SEAM_ID || packet.ecosystemSeamId !== TESTBED_SEAM_ID) {
    reasonCodes.push("edge_packet_seam_mismatch");
  }

  if (packet.targetSurface !== TESTBED_TARGET_SURFACE) {
    reasonCodes.push("edge_packet_target_surface_mismatch");
  }

  if (packet.adjacentAccepted !== false || packet.adjacentAcceptanceClaimed !== false) {
    reasonCodes.push("edge_packet_claims_adjacent_acceptance");
  }

  if (packet.packetIsEdgeDraftOnly !== true || packet.adjacentRepoOwnsAuthority !== true) {
    reasonCodes.push("edge_packet_missing_draft_authority_boundary");
  }

  if (hasAnyTrue(packet, Object.keys(PASSIVE_FLAGS))) {
    reasonCodes.push("edge_packet_implies_execution");
  }

  if (!hasRequiredRefs(packet)) {
    reasonCodes.push("edge_packet_missing_correlation_refs");
  }

  if (!nonEmptyString(packet.sourceContractRef)) {
    reasonCodes.push("edge_packet_missing_contract_ref");
  }

  if (!hasContractMetadata(packet)) {
    reasonCodes.push("edge_packet_contract_metadata_incomplete");
  }

  if (reasonCodes.includes("edge_packet_target_repo_mismatch") || reasonCodes.includes("edge_packet_seam_mismatch")) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.UNSUPPORTED_TARGET,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.includes("edge_packet_missing_correlation_refs") || reasonCodes.includes("edge_packet_contract_metadata_incomplete")) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.includes("edge_packet_claims_adjacent_acceptance") || reasonCodes.includes("edge_packet_implies_execution")) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_READY,
    reasonCodes: Object.freeze(["edge_packet_review_ready"])
  });
}

function correlationRefsFromPacket(packet) {
  return Object.freeze({
    packetRef: nonEmptyString(packet?.packetId),
    sourceContractRef: nonEmptyString(packet?.sourceContractRef),
    sourceLedgerRef: nonEmptyString(packet?.sourceLedgerRef),
    sourceReadinessRollupRef: nonEmptyString(packet?.sourceReadinessRollupRef),
    sourceEvidenceRefs: stringArray(packet?.sourceEvidenceRefs),
    sourceWorkPacketRefs: stringArray(packet?.sourceWorkPacketRefs),
    sourceNextActionRefs: stringArray(packet?.sourceNextActionRefs),
    sourceLedgerEventRefs: stringArray(packet?.sourceLedgerEventRefs),
    sourceLedgerDeltaRefs: stringArray(packet?.sourceLedgerDeltaRefs)
  });
}

function evidenceLabelFromFixture(edgeFixture) {
  const expected = edgeFixture?.expectedTestbedEvidenceResponseShape?.evidenceLabel;

  return Object.freeze({
    evidenceKind: nonEmptyString(expected?.evidenceKind, "fixture_proof"),
    outcome: nonEmptyString(expected?.outcome, "unknown"),
    scenarioId: nonEmptyString(expected?.scenarioId, "edge-adjacent-packet-review")
  });
}

export function buildTestbedEdgePacketReviewEvidence({
  edgeFixture = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const packet = fixturePacket(edgeFixture);
  const validation = validateEdgePacket(packet);
  const correlationRefs = correlationRefsFromPacket(packet);
  const sourceEvidenceRefs = correlationRefs.sourceEvidenceRefs;

  return Object.freeze({
    artifactKind: "testbed_edge_packet_review_evidence",
    schemaVersion: TESTBED_EDGE_PACKET_REVIEW_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-packet-review:${correlationRefs.packetRef ?? "malformed"}:${createdAt}`),
    createdAt,
    packetRef: correlationRefs.packetRef,
    sourceContractRef: correlationRefs.sourceContractRef,
    sourceLedgerRef: correlationRefs.sourceLedgerRef,
    sourceReadinessRollupRef: correlationRefs.sourceReadinessRollupRef,
    sourceEvidenceRefs,
    sourceWorkPacketRefs: correlationRefs.sourceWorkPacketRefs,
    sourceNextActionRefs: correlationRefs.sourceNextActionRefs,
    sourceLedgerEventRefs: correlationRefs.sourceLedgerEventRefs,
    sourceLedgerDeltaRefs: correlationRefs.sourceLedgerDeltaRefs,
    reviewStatus: validation.reviewStatus,
    evidenceLabel: evidenceLabelFromFixture(edgeFixture),
    correlationRefs,
    reasonCodes: validation.reasonCodes,
    reviewOnly: true,
    evidenceOnly: true,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    edgeAuthorityGranted: false,
    executionImplied: false,
    packetAcceptedAsSchema: false,
    packetAcceptedAsCommand: false,
    packetAcceptedAsTodo: false,
    edgeMutationPerformed: false,
    edgeCallbackRequired: false,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedEdgePacketReviewStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_PACKET_REVIEW_STATUSES));
}
