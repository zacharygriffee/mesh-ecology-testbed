import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedLocalLayerProjectionEventEvidence,
  listTestbedLocalLayerProjectionEventStatuses,
  TESTBED_LOCAL_LAYER_PROJECTION_EVENT_EVIDENCE_SCHEMA_VERSION,
  TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES
} from "../src/testbed/local-layer-projection-event-evidence.js";

const CREATED_AT = "2026-05-15T12:00:00.000Z";

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
    causalRefs: {
      branchRefs: [],
      segmentRefs: [],
      happeningRefs: [],
      presentPointRef: null,
      observerRef: null
    },
    transportRefs: [
      "protomux-rpc:hyperdht_direct_peer"
    ],
    viewRefs: [
      "packs:evidence-panel",
      "packs:action-console",
      "packs:topology-view"
    ],
    payloadHash: `sha256:${"a".repeat(64)}`,
    payloadHashAlgorithm: "sha256-canonical-json",
    payloadEmbedded: false,
    derivedOnly: true,
    promotionPosture: {
      promotedMaterial: true,
      promotionRole: "semantic_continuity_input",
      decisionRef: "mesh-ecology-spine/docs/edge-state-promotion-decision-packet.md",
      storageRecordPromoted: false,
      backendPromoted: false,
      derivedViewPromoted: false,
      reviewStatusPromoted: false,
      replicatedLocalLayerContinuityClaimed: false
    },
    writerPolicy: {
      writerKind: "edge_producer_operator_owned_local_layer_participant",
      writerRepo: "mesh-ecology-edge",
      producerParticipantRef: "local-layer-participant:edge-operator",
      boundedMultiwriterDeferred: true,
      autobaseWriterPolicyPromoted: false
    },
    readerPolicy: {
      readerKind: "operator_owned_local_layer_readers_by_explicit_refs",
      explicitKeyOrProofRequired: true,
      publicRead: false,
      localPathReadSeam: false,
      httpReadSeam: false,
      sshReadSeam: false
    },
    singleWriterProof: {
      proofOnly: true,
      writerRepo: "mesh-ecology-edge",
      writesProjectionLog: false,
      backend: "none",
      hypercoreCorestoreCandidate: true
    },
    nonClaims: {
      truthClaimed: false,
      completionClaimed: false,
      authorityGranted: false,
      rendererOwnsAuthority: false,
      durableStateClaimed: false,
      replicatedStateClaimed: false
    },
    storagePosture: {
      currentRenderingsAllowed: ["cli_json", "cli_text", "mermaid", "dag", "browser"],
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
      promotedSemanticInput: true,
      sourceRefsSemantic: true,
      localFileTruth: false,
      durableState: false
    }
  };
}

function build(projectionEvent = validProjectionEvent(), overrides = {}) {
  return buildTestbedLocalLayerProjectionEventEvidence({
    projectionEvent,
    createdAt: CREATED_AT,
    ...overrides
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedProjection, false);
  assert.equal(evidence.testbedOwnsProjectionContract, false);
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

test("valid Edge local-layer projection event is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_local_layer_projection_event_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["projection_event_visible"]);
  assert.equal(evidence.sourceArtifactKind, "mesh_ecology_local_layer_projection_event");
  assert.equal(evidence.sourceSchemaVersion, "mesh-ecology-spine/local-layer-projection-event/v0");
  assert.equal(evidence.sourceProducerRepo, "mesh-ecology-edge");
  assert.equal(evidence.projectionKind, "operator_situation_view");
  assert.equal(evidence.projectionSchema, "edge_operator_situation_view_model.v1");
  assert.equal(evidence.projectionRef, "edge-operator-situation:op-status");
  assert.equal(evidence.payloadHash, `sha256:${"a".repeat(64)}`);
  assert.equal(evidence.payloadHashAlgorithm, "sha256-canonical-json");
  assert.equal(evidence.sourceRefCount, 3);
  assert.equal(evidence.transportRefCount, 1);
  assert.equal(evidence.currentDurability, "not_durable_state");
  assert.equal(evidence.currentExportOnly, true);
  assert.equal(evidence.intendedDurableLane, "autobase_compatible_local_layer_projection_log");
  assert.equal(evidence.singleWriterProofOnly, true);
  assert.equal(evidence.writesProjectionLog, false);
  assert.equal(evidence.backend, "none");
  assert.equal(evidence.promotedMaterial, true);
  assert.equal(evidence.promotionRole, "semantic_continuity_input");
  assert.equal(evidence.storageRecordPromoted, false);
  assert.equal(evidence.backendPromoted, false);
  assert.equal(evidence.writerPolicyKind, "edge_producer_operator_owned_local_layer_participant");
  assert.equal(evidence.readerPolicyKind, "operator_owned_local_layer_readers_by_explicit_refs");
  assert.equal(evidence.explicitKeyOrProofRequired, true);
  assertPassiveEvidence(evidence);
});

test("projection event evidence requires explicit source refs", () => {
  const event = validProjectionEvent();
  event.sourceRefs = [];

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_event_source_refs_missing"), true);
  assert.equal(evidence.sourceRefCount, 0);
  assertPassiveEvidence(evidence);
});

test("projection event evidence blocks stale required source refs", () => {
  const evidence = build(validProjectionEvent(), {
    requiredSourceRefs: ["operation:op-status"],
    staleSourceRefs: ["operation:op-status"]
  });

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_event_stale_source_ref"), true);
  assert.deepEqual(evidence.requiredSourceRefs, ["operation:op-status"]);
  assert.deepEqual(evidence.staleSourceRefs, ["operation:op-status"]);
  assertPassiveEvidence(evidence);
});

test("projection event evidence reports missing required source refs as incomplete", () => {
  const evidence = build(validProjectionEvent(), {
    requiredSourceRefs: ["operation:op-status", "contact-proof:missing"]
  });

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("projection_event_required_source_refs_missing"), true);
  assertPassiveEvidence(evidence);
});

test("projection event evidence blocks truth authority and durable state claims", () => {
  const event = validProjectionEvent();
  event.nonClaims.truthClaimed = true;
  event.nonClaims.authorityGranted = true;
  event.nonClaims.durableStateClaimed = true;
  event.validation.localFileTruth = true;

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_event_claims_truth_completion_authority_or_state"), true);
  assert.equal(evidence.reasonCodes.includes("projection_event_validation_claims_local_file_or_durable_state"), true);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.durableStateClaimed, false);
  assertPassiveEvidence(evidence);
});

test("projection event evidence blocks storage backend overclaims before a real log proof", () => {
  const event = validProjectionEvent();
  event.singleWriterProof.writesProjectionLog = true;
  event.singleWriterProof.backend = "hypercore";
  event.storagePosture.currentDurability = "durable_local_layer_state";
  event.storagePosture.currentExportOnly = false;

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_event_storage_backend_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_event_current_durability_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_event_export_only_missing"), true);
  assert.equal(evidence.storageBackendInstalled, false);
  assertPassiveEvidence(evidence);
});

test("projection event evidence blocks HTTP or SSH compatibility refs as transport proof", () => {
  const event = validProjectionEvent();
  event.transportRefs = ["http://127.0.0.1:8787"];

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_event_transport_ref_contains_compat_scaffold"), true);
  assertPassiveEvidence(evidence);
});

test("projection event evidence blocks local path source refs for selected promotion input", () => {
  const event = validProjectionEvent();
  event.sourceRefs = ["/tmp/edge-status.json"];

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_event_source_ref_contains_compat_or_path_seam"), true);
  assertPassiveEvidence(evidence);
});

test("projection event evidence requires causal writer and reader posture", () => {
  const missing = validProjectionEvent();
  delete missing.causalRefs;
  delete missing.writerPolicy;
  delete missing.readerPolicy;

  const incomplete = build(missing);

  assert.equal(incomplete.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(incomplete.reasonCodes.includes("projection_event_causal_refs_missing"), true);
  assert.equal(incomplete.reasonCodes.includes("projection_event_writer_policy_missing_or_unsafe"), true);
  assert.equal(incomplete.reasonCodes.includes("projection_event_reader_policy_missing_or_unsafe"), true);
  assertPassiveEvidence(incomplete);
});

test("projection event evidence blocks promotion posture overclaims", () => {
  const event = validProjectionEvent();
  event.promotionPosture.storageRecordPromoted = true;
  event.promotionPosture.backendPromoted = true;
  event.readerPolicy.localPathReadSeam = true;

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("projection_event_promotion_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("projection_event_reader_policy_missing_or_unsafe"), true);
  assert.equal(evidence.storageRecordPromoted, true);
  assert.equal(evidence.backendPromoted, true);
  assertPassiveEvidence(evidence);
});

test("projection event evidence handles malformed and shape-mismatch inputs", () => {
  const malformed = buildTestbedLocalLayerProjectionEventEvidence({
    projectionEvent: null,
    createdAt: CREATED_AT
  });
  const mismatch = build({
    ...validProjectionEvent(),
    artifactKind: "local_json_status_export",
    payloadHashAlgorithm: "sha256"
  });

  assert.equal(malformed.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["projection_event_missing_or_malformed"]);
  assert.equal(mismatch.reviewStatus, TESTBED_LOCAL_LAYER_PROJECTION_EVENT_STATUSES.PROJECTION_EVENT_BLOCKED);
  assert.equal(mismatch.reasonCodes.includes("projection_event_artifact_kind_mismatch"), true);
  assert.equal(mismatch.reasonCodes.includes("projection_event_payload_hash_algorithm_mismatch"), true);
  assertPassiveEvidence(malformed);
  assertPassiveEvidence(mismatch);
});

test("projection event status vocabulary is testbed-owned and bounded", () => {
  assert.deepEqual(listTestbedLocalLayerProjectionEventStatuses(), [
    "projection_event_visible",
    "projection_event_blocked",
    "projection_event_malformed",
    "projection_event_incomplete"
  ]);
});
