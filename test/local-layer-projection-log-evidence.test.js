import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedLocalLayerProjectionLogEvidence,
  listTestbedLocalLayerProjectionLogStatuses,
  TESTBED_LOCAL_LAYER_PROJECTION_LOG_EVIDENCE_SCHEMA_VERSION,
  TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES
} from "../src/testbed/local-layer-projection-log-evidence.js";

const CREATED_AT = "2026-05-15T13:00:00.000Z";

function validProjectionEvent() {
  return {
    artifactKind: "mesh_ecology_local_layer_projection_event",
    schemaVersion: "mesh-ecology-spine/local-layer-projection-event/v0",
    eventId: "projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa",
    producerRepo: "mesh-ecology-edge",
    producerParticipantRef: "local-layer-participant:edge-operator",
    projectionKind: "operator_situation_view",
    projectionSchema: "edge_operator_situation_view_model.v1",
    projectionRef: "edge-operator-situation:op-status",
    sourceRefs: [
      "edge-operator-situation:op-status",
      "operation:op-status",
      `sha256:${"b".repeat(64)}`
    ],
    transportRefs: ["protomux-rpc:hyperdht_direct_peer"],
    payloadHash: `sha256:${"a".repeat(64)}`,
    payloadHashAlgorithm: "sha256-canonical-json",
    payloadEmbedded: false,
    derivedOnly: true,
    nonClaims: {
      truthClaimed: false,
      completionClaimed: false,
      authorityGranted: false,
      rendererOwnsAuthority: false,
      durableStateClaimed: false,
      replicatedStateClaimed: false
    },
    storagePosture: {
      currentDurability: "not_durable_state",
      currentExportOnly: true,
      intendedDurableLane: "autobase_compatible_local_layer_projection_log",
      producerLogCandidate: "hypercore_corestore",
      indexCandidate: "hyperbee_materialized_view"
    },
    validation: {
      sourceRefsPresent: true,
      payloadHashPresent: true,
      projectionIsDerivedOnly: true,
      cliJsonRenderingOnly: true,
      localFileTruth: false,
      durableState: false
    }
  };
}

function validLogEntry() {
  const event = validProjectionEvent();
  return {
    artifactKind: "edge_projection_event_log_entry",
    schemaVersion: "edge_projection_event_log_entry.v0",
    entryId: `projection-log-entry:${event.eventId}:0`,
    sequence: 0,
    projectionEventId: event.eventId,
    projectionEventSchema: event.schemaVersion,
    projectionRef: event.projectionRef,
    payloadHash: event.payloadHash,
    payloadHashAlgorithm: event.payloadHashAlgorithm,
    sourceRefs: [...event.sourceRefs],
    transportRefs: [...event.transportRefs],
    namespaceParts: [
      "mesh-ecology",
      "local-layer",
      "projection-event",
      "v0",
      "producer-mesh-ecology-edge",
      "projection-operator-situation-view"
    ],
    projectionEvent: event,
    logPosture: {
      singleWriterLocalCorestoreProof: true,
      replicatedLocalLayerState: false,
      autobaseBackend: false,
      hyperbeeIndex: false,
      httpSeam: false,
      sshSeam: false,
      localStoreRootIsIntegrationSeam: false,
      writesProjectionLog: true,
      proofOnly: true
    },
    nonClaims: {
      truthClaimed: false,
      completionClaimed: false,
      authorityGranted: false,
      replicatedStateClaimed: false,
      rendererOwnsAuthority: false
    }
  };
}

function build(logEntry = validLogEntry(), overrides = {}) {
  return buildTestbedLocalLayerProjectionLogEvidence({
    logEntry,
    createdAt: CREATED_AT,
    ...overrides
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedOwnsProjectionLogContract, false);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.storageBackendInstalled, false);
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("valid Edge projection log entry is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_local_layer_projection_log_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_LOCAL_LAYER_PROJECTION_LOG_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["projection_log_visible"]);
  assert.equal(evidence.sourceArtifactKind, "edge_projection_event_log_entry");
  assert.equal(evidence.sourceSchemaVersion, "edge_projection_event_log_entry.v0");
  assert.equal(evidence.sourceProjectionEventSchema, "mesh-ecology-spine/local-layer-projection-event/v0");
  assert.equal(evidence.sourceProducerRepo, "mesh-ecology-edge");
  assert.equal(evidence.sourceRefCount, 3);
  assert.equal(evidence.namespacePartCount, 6);
  assert.deepEqual(evidence.namespaceParts, evidence.expectedNamespacePrefix);
  assert.equal(evidence.singleWriterLocalCorestoreProof, true);
  assert.equal(evidence.writesProjectionLog, true);
  assert.equal(evidence.replicatedLocalLayerState, false);
  assert.equal(evidence.autobaseBackend, false);
  assert.equal(evidence.hyperbeeIndex, false);
  assert.equal(evidence.httpSeam, false);
  assert.equal(evidence.sshSeam, false);
  assert.equal(evidence.localStoreRootIsIntegrationSeam, false);
  assertPassiveEvidence(evidence);
});

test("projection log evidence blocks namespace scaffold path endpoint and prefix drift", () => {
  const entry = validLogEntry();
  entry.namespaceParts = [
    "mesh-ecology",
    "local-layer",
    "projection-event",
    "v0",
    "producer-http://127.0.0.1:8787",
    "../projection-operator-situation-view"
  ];

  const evidence = build(entry);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_log_namespace_prefix_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("projection_log_namespace_contains_scaffold_or_path"), true);
  assertPassiveEvidence(evidence);
});

test("projection log evidence blocks storage transport and local-store seam overclaims", () => {
  const entry = validLogEntry();
  entry.logPosture.replicatedLocalLayerState = true;
  entry.logPosture.autobaseBackend = true;
  entry.logPosture.hyperbeeIndex = true;
  entry.logPosture.httpSeam = true;
  entry.logPosture.sshSeam = true;
  entry.logPosture.localStoreRootIsIntegrationSeam = true;

  const evidence = build(entry);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_log_storage_transport_or_store_seam_overclaim"), true);
  assert.equal(evidence.replicatedLocalLayerState, true);
  assert.equal(evidence.autobaseBackend, true);
  assert.equal(evidence.hyperbeeIndex, true);
  assert.equal(evidence.httpSeam, true);
  assert.equal(evidence.sshSeam, true);
  assert.equal(evidence.localStoreRootIsIntegrationSeam, true);
  assertPassiveEvidence(evidence);
});

test("projection log evidence blocks event ref mismatches and embedded payloads", () => {
  const entry = validLogEntry();
  entry.projectionEventId = "projection:mesh-ecology-edge:operator_situation_view:bbbbbbbbbbbbbbbb";
  entry.payloadHash = `sha256:${"c".repeat(64)}`;
  entry.projectionEvent.payloadEmbedded = true;

  const evidence = build(entry);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_log_event_id_ref_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("projection_log_payload_hash_ref_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("projection_log_event_embeds_payload"), true);
  assertPassiveEvidence(evidence);
});

test("projection log evidence reports missing source refs as incomplete", () => {
  const entry = validLogEntry();
  entry.sourceRefs = [];
  entry.projectionEvent.sourceRefs = [];

  const evidence = build(entry);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_log_source_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("projection_log_event_source_refs_missing"), true);
  assert.equal(evidence.sourceRefCount, 0);
  assertPassiveEvidence(evidence);
});

test("projection log evidence reports reviewer-required missing source refs", () => {
  const evidence = build(validLogEntry(), {
    requiredSourceRefs: ["operation:op-status", "contact-proof:missing"]
  });

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_log_required_source_refs_missing"), true);
  assert.deepEqual(evidence.requiredSourceRefs, ["operation:op-status", "contact-proof:missing"]);
  assertPassiveEvidence(evidence);
});

test("projection log evidence blocks HTTP or SSH compatibility refs as transport proof", () => {
  const entry = validLogEntry();
  entry.transportRefs = ["ssh://edge-device", "http://127.0.0.1:8787"];

  const evidence = build(entry);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_log_transport_ref_contains_compat_scaffold"), true);
  assertPassiveEvidence(evidence);
});

test("projection log evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedLocalLayerProjectionLogEvidence({
    logEntry: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_LOG_STATUSES.PROJECTION_LOG_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["projection_log_entry_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedLocalLayerProjectionLogStatuses(), [
    "projection_log_visible",
    "projection_log_blocked",
    "projection_log_malformed",
    "projection_log_incomplete"
  ]);
});
