export const TESTBED_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION =
  "testbed_projection_key_exchange_evidence.v1";

export const TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES = Object.freeze({
  PROJECTION_KEY_EXCHANGE_VISIBLE: "projection_key_exchange_visible",
  PROJECTION_KEY_EXCHANGE_BLOCKED: "projection_key_exchange_blocked",
  PROJECTION_KEY_EXCHANGE_MALFORMED: "projection_key_exchange_malformed",
  PROJECTION_KEY_EXCHANGE_INCOMPLETE: "projection_key_exchange_incomplete"
});

const EXPECTED_ARTIFACT_KIND = "edge_projection_key_exchange_proof";
const EXPECTED_SCHEMA = "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0";
const EXPECTED_PROOF_KIND = "edge_projection_key_exchange_direct_peer_lab";
const EXPECTED_TRANSPORT_KIND = "protomux-rpc";
const EXPECTED_CONTACT_SEAM = "hyperdht_direct_peer";
const EXPECTED_CAPABILITY = "projection-source-core-key.exchange";
const EXPECTED_METHOD = "projection.sourceCoreKey.get";
const EXPECTED_CAPABILITY_SCOPE = "bounded_local_layer_projection_key_exchange";
const EXPECTED_OWNER_REPO = "mesh-ecology-edge";
const HEX_64 = /^[a-f0-9]{64}$/iu;
const SHA256_REF = /^sha256:[a-f0-9]{64}$/u;

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

function selectedTransport(proof) {
  return isPlainObject(proof?.selectedTransport) ? proof.selectedTransport : {};
}

function readinessEvidence(proof) {
  return isPlainObject(proof?.readinessEvidence) ? proof.readinessEvidence : {};
}

function capabilityDescriptor(proof) {
  return isPlainObject(proof?.capabilityDescriptor) ? proof.capabilityDescriptor : {};
}

function capabilityAdvertisement(proof) {
  return isPlainObject(proof?.capabilityAdvertisement) ? proof.capabilityAdvertisement : {};
}

function advertisedCapabilities(proof) {
  const advertisement = capabilityAdvertisement(proof);
  return Array.isArray(advertisement.capabilities)
    ? advertisement.capabilities.filter(isPlainObject)
    : [];
}

function appendLogRefs(proof) {
  return isPlainObject(proof?.appendLogRefs) ? proof.appendLogRefs : {};
}

function nonClaims(proof) {
  return isPlainObject(proof?.nonClaims) ? proof.nonClaims : {};
}

function response(proof) {
  return isPlainObject(proof?.response) ? proof.response : {};
}

function semanticRefDrift(refs) {
  return refs.some((ref) => /:\/\/|\/|\\|localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+/iu.test(ref));
}

function hasSameStringMembers(left, right) {
  const a = stringArray(left);
  const b = stringArray(right);
  return a.length === b.length && a.every((entry) => b.includes(entry));
}

function validateReplicaInspection({ replicaInspection, projectionKeyEvidence }) {
  const reasonCodes = [];
  if (replicaInspection === null || replicaInspection === undefined) return reasonCodes;
  if (!isPlainObject(replicaInspection)) return ["projection_key_replica_inspection_malformed"];

  if (replicaInspection.inspectionState !== "projection_event_log_replica_visible") {
    reasonCodes.push("projection_key_replica_inspection_not_visible");
  }
  if (replicaInspection.sourceCoreKey !== projectionKeyEvidence.sourceCoreKey) {
    reasonCodes.push("projection_key_replica_source_core_key_mismatch");
  }
  if (replicaInspection.wroteFiles === true || replicaInspection.networkCalls === true) {
    reasonCodes.push("projection_key_replica_inspection_side_effect_overclaim");
  }
  if (replicaInspection.latestEntry?.logPosture?.localStoreRootIsIntegrationSeam === true) {
    reasonCodes.push("projection_key_replica_local_store_seam_overclaim");
  }
  if (
    replicaInspection.latestEntry?.logPosture?.httpSeam === true ||
    replicaInspection.latestEntry?.logPosture?.sshSeam === true
  ) {
    reasonCodes.push("projection_key_replica_transport_seam_overclaim");
  }
  for (const ref of stringArray(projectionKeyEvidence.sourceRefs)) {
    if (!stringArray(replicaInspection.latestEntry?.sourceRefs).includes(ref)) {
      reasonCodes.push("projection_key_replica_missing_source_ref");
      break;
    }
  }

  return reasonCodes;
}

function validateProjectionKeyExchange({ projectionKeyEvidence, replicaInspection = null } = {}) {
  const reasonCodes = [];
  if (!isPlainObject(projectionKeyEvidence)) {
    return Object.freeze({
      reviewStatus: TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_MALFORMED,
      reasonCodes: Object.freeze(["projection_key_exchange_missing_or_malformed"])
    });
  }

  const transport = selectedTransport(projectionKeyEvidence);
  const readiness = readinessEvidence(projectionKeyEvidence);
  const capability = capabilityDescriptor(projectionKeyEvidence);
  const advertised = advertisedCapabilities(projectionKeyEvidence);
  const appendRefs = appendLogRefs(projectionKeyEvidence);
  const claims = nonClaims(projectionKeyEvidence);
  const proofResponse = response(projectionKeyEvidence);
  const sourceRefs = stringArray(projectionKeyEvidence.sourceRefs);

  if (projectionKeyEvidence.artifactKind !== EXPECTED_ARTIFACT_KIND) reasonCodes.push("projection_key_artifact_kind_mismatch");
  if (projectionKeyEvidence.schema !== EXPECTED_SCHEMA) reasonCodes.push("projection_key_schema_mismatch");
  if (projectionKeyEvidence.proofKind !== EXPECTED_PROOF_KIND) reasonCodes.push("projection_key_proof_kind_mismatch");
  if (!nonEmptyString(projectionKeyEvidence.proofId)) reasonCodes.push("projection_key_proof_id_missing");
  if (!nonEmptyString(projectionKeyEvidence.payloadHash) || !SHA256_REF.test(projectionKeyEvidence.payloadHash)) {
    reasonCodes.push("projection_key_payload_hash_invalid");
  }
  if (projectionKeyEvidence.payloadHashAlgorithm !== "sha256-canonical-json") {
    reasonCodes.push("projection_key_payload_hash_algorithm_mismatch");
  }
  if (!nonEmptyString(projectionKeyEvidence.requestId)) reasonCodes.push("projection_key_request_missing");
  if (!nonEmptyString(projectionKeyEvidence.responseId)) reasonCodes.push("projection_key_response_missing");
  if (!nonEmptyString(projectionKeyEvidence.sourceCoreKey) || !HEX_64.test(projectionKeyEvidence.sourceCoreKey)) {
    reasonCodes.push("projection_key_source_core_key_invalid");
  }
  if (sourceRefs.length === 0) reasonCodes.push("projection_key_source_refs_missing");
  if (semanticRefDrift(sourceRefs)) reasonCodes.push("projection_key_source_refs_contain_scaffold");

  if (projectionKeyEvidence.transportKind !== EXPECTED_TRANSPORT_KIND || projectionKeyEvidence.contactSeam !== EXPECTED_CONTACT_SEAM) {
    reasonCodes.push("projection_key_direct_seam_mismatch");
  }
  if (
    transport.transportKind !== EXPECTED_TRANSPORT_KIND ||
    transport.contactSeam !== EXPECTED_CONTACT_SEAM ||
    transport.transportRole !== "proof_lane" ||
    transport.scope !== "isolated_local_hyperdht" ||
    transport.scaffoldTransport === true ||
    transport.compatibilityAlias === true ||
    transport.portExposureRequired === true ||
    transport.participantContact !== true
  ) {
    reasonCodes.push("projection_key_transport_posture_missing_or_unsafe");
  }
  if (readiness.readinessScope !== "direct_peer_projection_key_exchange") {
    reasonCodes.push("projection_key_readiness_scope_mismatch");
  }
  if (projectionKeyEvidence.distributedReadinessClaimed === true || readiness.distributedReadinessClaimed === true) {
    reasonCodes.push("projection_key_distributed_readiness_overclaim");
  }
  if (readiness.replicatedStateClaimed === true) reasonCodes.push("projection_key_replicated_state_overclaim");

  if (
    capability.capability !== EXPECTED_CAPABILITY ||
    capability.methodName !== EXPECTED_METHOD ||
    capability.ownerRepo !== EXPECTED_OWNER_REPO ||
    capability.proofScope !== EXPECTED_CAPABILITY_SCOPE ||
    capability.transportKind !== EXPECTED_TRANSPORT_KIND ||
    capability.contactSeam !== EXPECTED_CONTACT_SEAM ||
    capability.localLayerDefault !== true ||
    capability.meshLayerDefault === true ||
    capability.discoveryRequired === true ||
    capability.participantContact !== true
  ) {
    reasonCodes.push("projection_key_capability_posture_missing_or_unsafe");
  }
  if (!advertised.some((item) => item.capability === EXPECTED_CAPABILITY && item.methodName === EXPECTED_METHOD)) {
    reasonCodes.push("projection_key_capability_advertisement_missing");
  }

  if (
    !nonEmptyString(appendRefs.entryId) ||
    appendRefs.sourceRepo !== EXPECTED_OWNER_REPO ||
    appendRefs.sourceArtifactKind !== EXPECTED_ARTIFACT_KIND ||
    appendRefs.sourceSchema !== EXPECTED_SCHEMA ||
    appendRefs.selectedTransportRef !== `${EXPECTED_TRANSPORT_KIND}:${EXPECTED_CONTACT_SEAM}` ||
    appendRefs.sourceCoreKeyRef !== projectionKeyEvidence.sourceCoreKey
  ) {
    reasonCodes.push("projection_key_append_log_refs_missing_or_mismatched");
  }
  if (!hasSameStringMembers(appendRefs.parentRefs, sourceRefs)) {
    reasonCodes.push("projection_key_append_log_parent_refs_mismatch");
  }
  if (appendRefs.truthClaimed === true || appendRefs.completionClaimed === true) {
    reasonCodes.push("projection_key_append_log_refs_claim_truth_or_completion");
  }

  if (
    proofResponse.sourceCoreKey !== projectionKeyEvidence.sourceCoreKey ||
    !hasSameStringMembers(proofResponse.sourceRefs, sourceRefs)
  ) {
    reasonCodes.push("projection_key_response_refs_mismatch");
  }
  if (projectionKeyEvidence.contactAttempted !== true || projectionKeyEvidence.contactSucceeded !== true) {
    reasonCodes.push("projection_key_contact_failed");
  }
  if (
    claims.truthClaimed === true ||
    claims.completionClaimed === true ||
    claims.authorityGranted === true ||
    claims.replicatedStateClaimed === true ||
    claims.autobaseBackend === true ||
    claims.meshPublicationClaimed === true
  ) {
    reasonCodes.push("projection_key_non_claim_overclaim");
  }

  reasonCodes.push(...validateReplicaInspection({ replicaInspection, projectionKeyEvidence }));

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("scaffold") ||
    code.includes("failed") ||
    code.includes("truth_or_completion")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_VISIBLE,
    reasonCodes: Object.freeze(["projection_key_exchange_visible"])
  });
}

export function buildTestbedProjectionKeyExchangeEvidence({
  projectionKeyEvidence = null,
  replicaInspection = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const validation = validateProjectionKeyExchange({ projectionKeyEvidence, replicaInspection });
  const transport = selectedTransport(projectionKeyEvidence);
  const readiness = readinessEvidence(projectionKeyEvidence);
  const capability = capabilityDescriptor(projectionKeyEvidence);
  const appendRefs = appendLogRefs(projectionKeyEvidence);
  const sourceRefs = stringArray(projectionKeyEvidence?.sourceRefs);

  return Object.freeze({
    artifactKind: "testbed_projection_key_exchange_evidence",
    schemaVersion: TESTBED_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-projection-key-exchange:${nonEmptyString(projectionKeyEvidence?.proofId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    sourceRepo: EXPECTED_OWNER_REPO,
    sourceArtifactKind: nonEmptyString(projectionKeyEvidence?.artifactKind),
    sourceSchema: nonEmptyString(projectionKeyEvidence?.schema),
    sourceProofKind: nonEmptyString(projectionKeyEvidence?.proofKind),
    proofId: nonEmptyString(projectionKeyEvidence?.proofId),
    payloadHash: nonEmptyString(projectionKeyEvidence?.payloadHash),
    payloadHashAlgorithm: nonEmptyString(projectionKeyEvidence?.payloadHashAlgorithm),
    appendLogEntryId: nonEmptyString(appendRefs.entryId),
    selectedTransportRef: nonEmptyString(appendRefs.selectedTransportRef),
    sourceCoreKey: nonEmptyString(projectionKeyEvidence?.sourceCoreKey),
    sourceCoreKeyRef: nonEmptyString(appendRefs.sourceCoreKeyRef),
    sourceRefs: Object.freeze(sourceRefs),
    sourceRefCount: sourceRefs.length,
    replicaInspectionProvided: isPlainObject(replicaInspection),
    replicaInspectionState: nonEmptyString(replicaInspection?.inspectionState),
    replicaSourceCoreKey: nonEmptyString(replicaInspection?.sourceCoreKey),
    replicaEntryCount: Number.isInteger(replicaInspection?.entryCount) ? replicaInspection.entryCount : 0,
    replicaLatestEntryId: nonEmptyString(replicaInspection?.latestEntry?.entryId),
    transportKind: nonEmptyString(transport.transportKind),
    contactSeam: nonEmptyString(transport.contactSeam),
    transportRole: nonEmptyString(transport.transportRole),
    transportScope: nonEmptyString(transport.scope),
    readinessScope: nonEmptyString(readiness.readinessScope),
    capability: nonEmptyString(capability.capability),
    capabilityMethodName: nonEmptyString(capability.methodName),
    capabilityOwnerRepo: nonEmptyString(capability.ownerRepo),
    capabilityProofScope: nonEmptyString(capability.proofScope),
    capabilityLocalLayerDefault: capability.localLayerDefault === true,
    capabilityMeshLayerDefault: capability.meshLayerDefault === true,
    capabilityDiscoveryRequired: capability.discoveryRequired === true,
    contactAttempted: projectionKeyEvidence?.contactAttempted === true,
    contactSucceeded: projectionKeyEvidence?.contactSucceeded === true,
    distributedReadinessClaimed: projectionKeyEvidence?.distributedReadinessClaimed === true ||
      readiness.distributedReadinessClaimed === true,
    replicatedStateClaimed: readiness.replicatedStateClaimed === true ||
      nonClaims(projectionKeyEvidence).replicatedStateClaimed === true,
    autobaseBackend: nonClaims(projectionKeyEvidence).autobaseBackend === true,
    meshPublicationClaimed: nonClaims(projectionKeyEvidence).meshPublicationClaimed === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedOpenedHyperDHT: false,
    testbedOpenedProtomux: false,
    testbedOpenedCorestore: false,
    testbedOwnsTransport: false,
    testbedOwnsProjectionLogContract: false,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false,
    authorityGranted: false,
    distributedReadinessProofClaimed: false,
    durableStateClaimed: false,
    storageBackendInstalled: false,
    runnerRequired: false,
    schedulerRequired: false,
    liveDiscoveryRequired: false,
    meshPublicationImplied: false
  });
}

export function listTestbedProjectionKeyExchangeStatuses() {
  return Object.freeze(Object.values(TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES));
}
