export const TESTBED_CONTACT_PROOF_EVIDENCE_SCHEMA_VERSION =
  "testbed_contact_proof_evidence.v1";

export const TESTBED_CONTACT_PROOF_STATUSES = Object.freeze({
  CONTACT_PROOF_VISIBLE: "contact_proof_visible",
  CONTACT_PROOF_BLOCKED: "contact_proof_blocked",
  CONTACT_PROOF_MALFORMED: "contact_proof_malformed",
  CONTACT_PROOF_INCOMPLETE: "contact_proof_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "mesh_contact_proof_evidence";
const EXPECTED_SCHEMA = "mesh-v0-2/contact-proof/direct-peer/v1";
const EXPECTED_PROOF_KIND = "mesh_contact_direct_peer_lab";
const PLATFORM_EXPECTED_ARTIFACT_KIND = "platform_local_service_contact_proof_evidence";
const PLATFORM_EXPECTED_SCHEMA = "mesh-ecology-platform/local-service-contact-proof/direct-peer/v1";
const PLATFORM_EXPECTED_PROOF_KIND = "platform_local_service_contact_direct_peer_lab";
const EXPECTED_TRANSPORT_KIND = "protomux-rpc";
const EXPECTED_CONTACT_SEAM = "hyperdht_direct_peer";
const EXPECTED_CAPABILITY = "contact-proof";
const EXPECTED_CAPABILITY_METHOD = "capability.echo";
const EXPECTED_CAPABILITY_OWNER = "mesh-v0-2";
const EXPECTED_CAPABILITY_SCOPE = "bounded_direct_participant_contact";
const PLATFORM_EXPECTED_CAPABILITY = "platform-local-service-contact-proof";
const PLATFORM_EXPECTED_CAPABILITY_METHOD = "platform.localService.capabilityEcho";
const PLATFORM_EXPECTED_CAPABILITY_OWNER = "mesh-ecology-platform";
const PLATFORM_EXPECTED_CAPABILITY_SCOPE = "bounded_platform_local_service_contact";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function selectedTransport(proof) {
  return isPlainObject(proof?.selectedTransport) ? proof.selectedTransport : null;
}

function readinessEvidence(proof) {
  return isPlainObject(proof?.readinessEvidence) ? proof.readinessEvidence : null;
}

function capabilityAdvertisement(proof) {
  return isPlainObject(proof?.capabilityAdvertisement) ? proof.capabilityAdvertisement : null;
}

function appendLogRefs(proof) {
  return isPlainObject(proof?.appendLogRefs) ? proof.appendLogRefs : null;
}

function advertisedCapabilities(proof) {
  const advertisement = capabilityAdvertisement(proof);
  return Array.isArray(advertisement?.capabilities)
    ? advertisement.capabilities.filter(isPlainObject)
    : [];
}

function contactProofSourceProfile(proof) {
  if (proof?.artifactKind === EXPECTED_ARTIFACT_KIND && proof.schema === EXPECTED_SCHEMA) {
    return Object.freeze({
      sourceRepo: "mesh-v0-2",
      sourceProfile: "mesh_direct_peer_contact",
      expectedArtifactKind: EXPECTED_ARTIFACT_KIND,
      expectedSchema: EXPECTED_SCHEMA,
      expectedProofKind: EXPECTED_PROOF_KIND,
      expectedCapability: EXPECTED_CAPABILITY,
      expectedCapabilityMethod: EXPECTED_CAPABILITY_METHOD,
      expectedCapabilityOwner: EXPECTED_CAPABILITY_OWNER,
      expectedCapabilityScope: EXPECTED_CAPABILITY_SCOPE
    });
  }
  if (proof?.artifactKind === PLATFORM_EXPECTED_ARTIFACT_KIND && proof.schema === PLATFORM_EXPECTED_SCHEMA) {
    return Object.freeze({
      sourceRepo: "mesh-ecology-platform",
      sourceProfile: "platform_local_service_contact",
      expectedArtifactKind: PLATFORM_EXPECTED_ARTIFACT_KIND,
      expectedSchema: PLATFORM_EXPECTED_SCHEMA,
      expectedProofKind: PLATFORM_EXPECTED_PROOF_KIND,
      expectedCapability: PLATFORM_EXPECTED_CAPABILITY,
      expectedCapabilityMethod: PLATFORM_EXPECTED_CAPABILITY_METHOD,
      expectedCapabilityOwner: PLATFORM_EXPECTED_CAPABILITY_OWNER,
      expectedCapabilityScope: PLATFORM_EXPECTED_CAPABILITY_SCOPE
    });
  }
  return Object.freeze({
    sourceRepo: "unknown",
    sourceProfile: "unknown",
    expectedArtifactKind: EXPECTED_ARTIFACT_KIND,
    expectedSchema: EXPECTED_SCHEMA,
    expectedProofKind: EXPECTED_PROOF_KIND,
    expectedCapability: EXPECTED_CAPABILITY,
    expectedCapabilityMethod: EXPECTED_CAPABILITY_METHOD,
    expectedCapabilityOwner: EXPECTED_CAPABILITY_OWNER,
    expectedCapabilityScope: EXPECTED_CAPABILITY_SCOPE
  });
}

function capabilityDescriptor(proof) {
  const profile = contactProofSourceProfile(proof);
  return advertisedCapabilities(proof).find((capability) =>
    capability.capability === profile.expectedCapability &&
    capability.proofScope === profile.expectedCapabilityScope
  ) ?? advertisedCapabilities(proof)[0] ?? (isPlainObject(proof?.capabilityDescriptor) ? proof.capabilityDescriptor : null);
}

function validateContactProof(proof) {
  const reasonCodes = [];
  if (!isPlainObject(proof)) {
    return Object.freeze({
      reviewStatus: TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_MALFORMED,
      reasonCodes: Object.freeze(["contact_proof_missing_or_malformed"])
    });
  }

  const transport = selectedTransport(proof);
  const readiness = readinessEvidence(proof);
  const capability = capabilityDescriptor(proof);
  const sourceProfile = contactProofSourceProfile(proof);

  if (sourceProfile.sourceProfile === "unknown") reasonCodes.push("contact_proof_source_profile_mismatch");
  if (proof.artifactKind !== sourceProfile.expectedArtifactKind) reasonCodes.push("contact_proof_artifact_kind_mismatch");
  if (proof.schema !== sourceProfile.expectedSchema) reasonCodes.push("contact_proof_schema_mismatch");
  if (proof.proofKind !== sourceProfile.expectedProofKind) reasonCodes.push("contact_proof_kind_mismatch");
  if (!nonEmptyString(proof.participantA)) reasonCodes.push("contact_proof_participant_a_missing");
  if (!nonEmptyString(proof.participantB)) reasonCodes.push("contact_proof_participant_b_missing");
  if (!nonEmptyString(proof.operation)) reasonCodes.push("contact_proof_operation_missing");
  if (!nonEmptyString(proof.requestId)) reasonCodes.push("contact_proof_request_missing");
  if (!nonEmptyString(proof.responseId)) reasonCodes.push("contact_proof_response_missing");
  if (!transport) reasonCodes.push("contact_proof_transport_missing");
  if (!readiness) reasonCodes.push("contact_proof_readiness_missing");

  if (transport && (
    transport.transportKind !== EXPECTED_TRANSPORT_KIND ||
    transport.contactSeam !== EXPECTED_CONTACT_SEAM
  )) {
    reasonCodes.push("contact_proof_direct_seam_mismatch");
  }

  if (proof.distributedReadinessClaimed === true || readiness?.distributedReadinessClaimed === true) {
    reasonCodes.push("contact_proof_claims_distributed_readiness");
  }

  if (capability) {
    if (capability.capability !== sourceProfile.expectedCapability) reasonCodes.push("contact_proof_capability_mismatch");
    if (capability.methodName !== sourceProfile.expectedCapabilityMethod) reasonCodes.push("contact_proof_capability_method_mismatch");
    if (capability.ownerRepo !== sourceProfile.expectedCapabilityOwner) reasonCodes.push("contact_proof_capability_owner_mismatch");
    if (capability.proofScope !== sourceProfile.expectedCapabilityScope) reasonCodes.push("contact_proof_capability_scope_mismatch");
    if (capability.transportKind !== EXPECTED_TRANSPORT_KIND) reasonCodes.push("contact_proof_capability_transport_mismatch");
    if (capability.contactSeam !== EXPECTED_CONTACT_SEAM) reasonCodes.push("contact_proof_capability_seam_mismatch");
    if (capability.localLayerDefault !== true) reasonCodes.push("contact_proof_capability_local_layer_missing");
    if (capability.meshLayerDefault === true) reasonCodes.push("contact_proof_capability_mesh_layer_overclaim");
    if (capability.discoveryRequired === true) reasonCodes.push("contact_proof_capability_discovery_overclaim");
    if (capability.participantContact !== true) reasonCodes.push("contact_proof_capability_participant_contact_missing");
  }

  if (proof.meshTruthClaimed === true || proof.completionClaimed === true || proof.claimsCausalTruth === true) {
    reasonCodes.push("contact_proof_claims_truth_or_completion");
  }

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("distributed_readiness") ||
    code.includes("truth_or_completion")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (proof.contactAttempted !== true || proof.contactSucceeded !== true) {
    return Object.freeze({
      reviewStatus: TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_BLOCKED,
      reasonCodes: Object.freeze(["contact_proof_source_contact_failed"])
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_VISIBLE,
    reasonCodes: Object.freeze(["contact_proof_visible"])
  });
}

export function buildTestbedContactProofEvidence({
  contactProof = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const validation = validateContactProof(contactProof);
  const transport = selectedTransport(contactProof);
  const readiness = readinessEvidence(contactProof);
  const capability = capabilityDescriptor(contactProof);
  const sourceProfile = contactProofSourceProfile(contactProof);
  const advertisement = capabilityAdvertisement(contactProof);
  const appendRefs = appendLogRefs(contactProof);
  const advertised = advertisedCapabilities(contactProof);

  return Object.freeze({
    artifactKind: "testbed_contact_proof_evidence",
    schemaVersion: TESTBED_CONTACT_PROOF_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-contact-proof:${nonEmptyString(contactProof?.requestId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    sourceRepo: sourceProfile.sourceRepo,
    sourceProfile: sourceProfile.sourceProfile,
    sourceArtifactKind: nonEmptyString(contactProof?.artifactKind),
    sourceSchema: nonEmptyString(contactProof?.schema),
    sourceProofKind: nonEmptyString(contactProof?.proofKind),
    proofId: nonEmptyString(contactProof?.proofId),
    payloadHash: nonEmptyString(contactProof?.payloadHash),
    payloadHashAlgorithm: nonEmptyString(contactProof?.payloadHashAlgorithm),
    appendLogEntryId: nonEmptyString(appendRefs?.entryId),
    capabilityAdvertisementRef: nonEmptyString(appendRefs?.capabilityAdvertisementRef),
    selectedTransportRef: nonEmptyString(appendRefs?.selectedTransportRef),
    participantA: nonEmptyString(contactProof?.participantA),
    participantB: nonEmptyString(contactProof?.participantB),
    operation: nonEmptyString(contactProof?.operation),
    capability: nonEmptyString(capability?.capability),
    capabilityMethodName: nonEmptyString(capability?.methodName),
    capabilityOwnerRepo: nonEmptyString(capability?.ownerRepo),
    capabilityProofScope: nonEmptyString(capability?.proofScope),
    capabilityTransportKind: nonEmptyString(capability?.transportKind),
    capabilityContactSeam: nonEmptyString(capability?.contactSeam),
    capabilityLocalLayerDefault: capability?.localLayerDefault === true,
    capabilityMeshLayerDefault: capability?.meshLayerDefault === true,
    capabilityDiscoveryRequired: capability?.discoveryRequired === true,
    capabilityParticipantContact: capability?.participantContact === true,
    hasCapabilityDescriptor: capability !== null,
    capabilityDescriptorSource: advertised.includes(capability)
      ? "capability_advertisement"
      : capability !== null
        ? "inline_descriptor"
        : "none",
    hasCapabilityAdvertisement: advertisement !== null,
    capabilityAdvertisementParticipant: nonEmptyString(advertisement?.participant),
    capabilityAdvertisementCapabilityCount: advertised.length,
    requestId: nonEmptyString(contactProof?.requestId),
    responseId: nonEmptyString(contactProof?.responseId),
    transportKind: nonEmptyString(transport?.transportKind),
    contactSeam: nonEmptyString(transport?.contactSeam),
    transportRole: nonEmptyString(transport?.transportRole),
    transportScope: nonEmptyString(transport?.scope),
    readinessScope: nonEmptyString(readiness?.readinessScope),
    contactAttempted: contactProof?.contactAttempted === true,
    contactSucceeded: contactProof?.contactSucceeded === true,
    distributedReadinessClaimed: contactProof?.distributedReadinessClaimed === true ||
      readiness?.distributedReadinessClaimed === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedContact: false,
    testbedOwnsTransport: false,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    distributedReadinessProofClaimed: false,
    edgeAuthorityGranted: false,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedContactProofStatuses() {
  return Object.freeze(Object.values(TESTBED_CONTACT_PROOF_STATUSES));
}
