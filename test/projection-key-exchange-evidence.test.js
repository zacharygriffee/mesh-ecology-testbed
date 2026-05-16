import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedProjectionKeyExchangeEvidence,
  listTestbedProjectionKeyExchangeStatuses,
  TESTBED_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION,
  TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES
} from "../src/testbed/projection-key-exchange-evidence.js";

const CREATED_AT = "2026-05-16T12:00:00.000Z";
const SOURCE_CORE_KEY = "a".repeat(64);
const TRACE_REF = "causal-edge-self-work-trace-evidence:self-work-trace-fixture";
const TESTBED_REF = "testbed-edge-self-work-trace:self-work-trace-fixture";

function validProjectionKeyEvidence() {
  const capability = {
    capability: "projection-source-core-key.exchange",
    methodName: "projection.sourceCoreKey.get",
    dispatchCommand: "@edge-projection/source-core-key.get",
    protocolFamily: "edge-local-layer-projection-key-exchange",
    protocolSchema: "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0",
    ownerRepo: "mesh-ecology-edge",
    proofScope: "bounded_local_layer_projection_key_exchange",
    transportKind: "protomux-rpc",
    contactSeam: "hyperdht_direct_peer",
    localLayerDefault: true,
    meshLayerDefault: false,
    discoveryRequired: false,
    participantContact: true
  };

  return {
    proofId: "edge-projection-key-exchange:aaaaaaaaaaaaaaaa",
    payloadHashAlgorithm: "sha256-canonical-json",
    payloadHash: `sha256:${"b".repeat(64)}`,
    appendLogRefs: {
      entryId: "edge-projection-key-exchange-entry:aaaaaaaaaaaaaaaa",
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_projection_key_exchange_proof",
      sourceSchema: "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0",
      proofKind: "edge_projection_key_exchange_direct_peer_lab",
      requestRef: "edge-projection-key-request:a",
      responseRef: "edge-projection-key-response:a",
      capabilityAdvertisementRef: "edge-projection-capabilities-response:a",
      selectedTransportRef: "protomux-rpc:hyperdht_direct_peer",
      sourceCoreKeyRef: SOURCE_CORE_KEY,
      parentRefs: [TRACE_REF, TESTBED_REF],
      truthClaimed: false,
      completionClaimed: false
    },
    artifactKind: "edge_projection_key_exchange_proof",
    schema: "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0",
    protocolFamily: "edge-local-layer-projection-key-exchange",
    protocolSchema: "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0",
    dispatchCommand: "@edge-projection/source-core-key.get",
    capabilitiesDispatchCommand: "@edge-projection/capabilities.get",
    proofKind: "edge_projection_key_exchange_direct_peer_lab",
    transportKind: "protomux-rpc",
    contactSeam: "hyperdht_direct_peer",
    participantA: "edge-projection-key-host",
    participantB: "edge-projection-key-client",
    operation: "projection.sourceCoreKey.get",
    methodName: "projection.sourceCoreKey.get",
    requestId: "edge-projection-key-request:a",
    responseId: "edge-projection-key-response:a",
    hostPublicKey: "c".repeat(64),
    sourceCoreKey: SOURCE_CORE_KEY,
    sourceRefs: [TRACE_REF, TESTBED_REF],
    selectedTransport: {
      transportKind: "protomux-rpc",
      contactSeam: "hyperdht_direct_peer",
      transportRole: "proof_lane",
      scope: "isolated_local_hyperdht",
      scaffoldTransport: false,
      compatibilityAlias: false,
      productionPreferred: false,
      operatorSupplied: false,
      portExposureRequired: false,
      participantContact: true
    },
    readinessEvidence: {
      readinessScope: "direct_peer_projection_key_exchange",
      distributedReadinessClaimed: false,
      replicatedStateClaimed: false
    },
    capabilityDescriptor: capability,
    capabilityAdvertisement: {
      responseId: "edge-projection-capabilities-response:a",
      requestId: "edge-projection-capabilities-request:a",
      participant: "edge-projection-key-host",
      protocolFamily: "edge-local-layer-projection-key-exchange",
      protocolSchema: "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0",
      capabilities: [capability]
    },
    bootstrapNodes: ["127.0.0.1:12345"],
    contactAttempted: true,
    contactSucceeded: true,
    distributedReadinessClaimed: false,
    elapsedMs: 1,
    response: {
      responseId: "edge-projection-key-response:a",
      requestId: "edge-projection-key-request:a",
      participant: "edge-projection-key-host",
      sourceCoreKey: SOURCE_CORE_KEY,
      sourceRefs: [TRACE_REF, TESTBED_REF],
      ok: true
    },
    failureClass: null,
    failureMessage: null,
    nonClaims: {
      truthClaimed: false,
      completionClaimed: false,
      authorityGranted: false,
      replicatedStateClaimed: false,
      autobaseBackend: false,
      meshPublicationClaimed: false
    }
  };
}

function validReplicaInspection() {
  return {
    inspectionState: "projection_event_log_replica_visible",
    replicaStore: "/tmp/testbed-does-not-use-this-path",
    sourceCoreKey: SOURCE_CORE_KEY,
    entryCount: 1,
    wroteFiles: false,
    networkCalls: false,
    latestEntry: {
      entryId: "projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa:0",
      sourceRefs: [TRACE_REF, TESTBED_REF, "edge-operator-situation:op-status"],
      logPosture: {
        httpSeam: false,
        sshSeam: false,
        localStoreRootIsIntegrationSeam: false
      }
    }
  };
}

function build(projectionKeyEvidence = validProjectionKeyEvidence(), replicaInspection = null) {
  return buildTestbedProjectionKeyExchangeEvidence({
    projectionKeyEvidence,
    replicaInspection,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedOpenedHyperDHT, false);
  assert.equal(evidence.testbedOpenedProtomux, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedOwnsTransport, false);
  assert.equal(evidence.testbedOwnsProjectionLogContract, false);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.distributedReadinessProofClaimed, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.storageBackendInstalled, false);
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("valid Edge projection-key exchange proof is consumed as passive review evidence", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_projection_key_exchange_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["projection_key_exchange_visible"]);
  assert.equal(evidence.sourceRepo, "mesh-ecology-edge");
  assert.equal(evidence.sourceArtifactKind, "edge_projection_key_exchange_proof");
  assert.equal(evidence.sourceSchema, "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0");
  assert.equal(evidence.sourceProofKind, "edge_projection_key_exchange_direct_peer_lab");
  assert.equal(evidence.sourceCoreKey, SOURCE_CORE_KEY);
  assert.equal(evidence.sourceCoreKeyRef, SOURCE_CORE_KEY);
  assert.deepEqual(evidence.sourceRefs, [TRACE_REF, TESTBED_REF]);
  assert.equal(evidence.sourceRefCount, 2);
  assert.equal(evidence.selectedTransportRef, "protomux-rpc:hyperdht_direct_peer");
  assert.equal(evidence.transportKind, "protomux-rpc");
  assert.equal(evidence.contactSeam, "hyperdht_direct_peer");
  assert.equal(evidence.transportRole, "proof_lane");
  assert.equal(evidence.transportScope, "isolated_local_hyperdht");
  assert.equal(evidence.readinessScope, "direct_peer_projection_key_exchange");
  assert.equal(evidence.capability, "projection-source-core-key.exchange");
  assert.equal(evidence.capabilityOwnerRepo, "mesh-ecology-edge");
  assert.equal(evidence.capabilityLocalLayerDefault, true);
  assert.equal(evidence.capabilityMeshLayerDefault, false);
  assert.equal(evidence.capabilityDiscoveryRequired, false);
  assert.equal(evidence.contactAttempted, true);
  assert.equal(evidence.contactSucceeded, true);
  assert.equal(evidence.distributedReadinessClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.autobaseBackend, false);
  assert.equal(evidence.meshPublicationClaimed, false);
  assert.equal(evidence.replicaInspectionProvided, false);
  assertPassiveEvidence(evidence);
});

test("projection-key evidence can be cross-checked against replica inspection", () => {
  const evidence = build(validProjectionKeyEvidence(), validReplicaInspection());

  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["projection_key_exchange_visible"]);
  assert.equal(evidence.replicaInspectionProvided, true);
  assert.equal(evidence.replicaInspectionState, "projection_event_log_replica_visible");
  assert.equal(evidence.replicaSourceCoreKey, SOURCE_CORE_KEY);
  assert.equal(evidence.replicaEntryCount, 1);
  assert.equal(evidence.replicaLatestEntryId, "projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa:0");
  assertPassiveEvidence(evidence);
});

test("projection-key evidence blocks HTTP path and endpoint source refs", () => {
  const proof = validProjectionKeyEvidence();
  proof.sourceRefs = ["http://127.0.0.1:8787/key"];
  proof.appendLogRefs.parentRefs = [...proof.sourceRefs];
  proof.response.sourceRefs = [...proof.sourceRefs];

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_key_source_refs_contain_scaffold"), true);
  assertPassiveEvidence(evidence);
});

test("projection-key evidence blocks distributed readiness and backend overclaims", () => {
  const proof = validProjectionKeyEvidence();
  proof.distributedReadinessClaimed = true;
  proof.readinessEvidence.distributedReadinessClaimed = true;
  proof.readinessEvidence.replicatedStateClaimed = true;
  proof.nonClaims.autobaseBackend = true;
  proof.nonClaims.meshPublicationClaimed = true;

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_key_distributed_readiness_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_key_replicated_state_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_key_non_claim_overclaim"), true);
  assert.equal(evidence.distributedReadinessClaimed, true);
  assert.equal(evidence.replicatedStateClaimed, true);
  assert.equal(evidence.autobaseBackend, true);
  assert.equal(evidence.meshPublicationClaimed, true);
  assertPassiveEvidence(evidence);
});

test("projection-key evidence blocks unsafe transport and capability posture", () => {
  const proof = validProjectionKeyEvidence();
  proof.selectedTransport.transportKind = "http";
  proof.selectedTransport.contactSeam = "loopback_http_scaffold";
  proof.selectedTransport.portExposureRequired = true;
  proof.capabilityDescriptor.meshLayerDefault = true;
  proof.capabilityDescriptor.discoveryRequired = true;

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_key_transport_posture_missing_or_unsafe"), true);
  assert.equal(evidence.reasonCodes.includes("projection_key_capability_posture_missing_or_unsafe"), true);
  assertPassiveEvidence(evidence);
});

test("projection-key evidence reports missing source refs as incomplete", () => {
  const proof = validProjectionKeyEvidence();
  proof.sourceRefs = [];
  proof.appendLogRefs.parentRefs = [];
  proof.response.sourceRefs = [];

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_key_source_refs_missing"), true);
  assert.equal(evidence.sourceRefCount, 0);
  assertPassiveEvidence(evidence);
});

test("projection-key evidence blocks replica inspection mismatches", () => {
  const replicaInspection = validReplicaInspection();
  replicaInspection.sourceCoreKey = "b".repeat(64);
  replicaInspection.latestEntry.sourceRefs = ["edge-operator-situation:op-status"];

  const evidence = build(validProjectionKeyEvidence(), replicaInspection);

  assert.equal(evidence.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_key_replica_source_core_key_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("projection_key_replica_missing_source_ref"), true);
  assertPassiveEvidence(evidence);
});

test("projection-key evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedProjectionKeyExchangeEvidence({
    projectionKeyEvidence: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_PROJECTION_KEY_EXCHANGE_STATUSES.PROJECTION_KEY_EXCHANGE_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["projection_key_exchange_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedProjectionKeyExchangeStatuses(), [
    "projection_key_exchange_visible",
    "projection_key_exchange_blocked",
    "projection_key_exchange_malformed",
    "projection_key_exchange_incomplete"
  ]);
});
