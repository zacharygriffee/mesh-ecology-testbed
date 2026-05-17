import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerContinuityEventEvidence,
  listTestbedEdgeLocalLayerContinuityEventStatuses,
  TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES
} from "../src/testbed/edge-local-layer-continuity-event-evidence.js";

const CREATED_AT = "2026-05-17T15:30:00.000Z";

function validContinuityEvent() {
  return {
    artifactKind: "mesh_ecology_local_layer_continuity_event",
    schemaVersion: "mesh-ecology-edge/local-layer-continuity-event-draft/v0",
    draft: true,
    promotedContinuity: false,
    continuityRole: "edge_operation_event_scaffold",
    continuityCategory: "operation_event",
    eventId: "continuity:edge-operation-event:op-1:operator_decision_attached",
    sourceEventRef: "edge-operation-event:op-1:operator_decision_attached",
    operationRef: "edge-operation:op-1",
    eventKind: "operator_decision_attached",
    occurredAt: "2026-05-17T15:29:00.000Z",
    producerRepo: "mesh-ecology-edge",
    origin: {
      originRef: "edge-operation:op-1",
      sourceRef: "edge-operation-event:op-1:operator_decision_attached",
      operatorSeatRef: "operator-seat:local",
      deviceRef: "local-layer-device:operator-laptop",
      repoRef: "repo:mesh-ecology-edge",
      parentEventRefs: ["edge-operation-event:op-1:opened"]
    },
    provenanceRefs: [
      "edge-operation:op-1",
      "edge-operation-event:op-1:operator_decision_attached",
      "edge-operation-event:op-1:opened",
      "work-packet:edge-continuity-event-scaffold"
    ],
    participantRefs: ["local-layer-participant:edge-operator"],
    evidenceRefs: ["work-packet:edge-continuity-event-scaffold"],
    receiptRefs: ["receipt:operator-review:accepted"],
    membraneCrossing: {
      crossingKind: "operator_decision",
      crossingRef: "membrane-crossing:operator_decision:edge-operation-event:op-1:operator_decision_attached",
      sourceDomain: "edge_operator_loop",
      targetDomain: "local_layer_continuity_draft",
      validationRequired: true
    },
    storagePosture: {
      storageKind: "local_json_operation_trail",
      storageRole: "compatibility_scaffold",
      scaffoldStorage: true,
      localFileStorage: true,
      sourceIsSubstrate: false,
      localLayerSubstrate: false,
      durableLocalLayerState: false,
      decentralizedState: false,
      canonicalMaterializedHistory: false,
      replaceableLayout: true,
      autobaseBackend: false,
      hypercoreCorestoreBackend: false,
      hyperbeeIndex: false
    },
    acceptancePosture: {
      acceptedContinuity: false,
      deterministicApplyRequired: true,
      appendSuccessIsAcceptance: false,
      writeSuccessIsAcceptance: false,
      storageVisibilityIsContinuity: false,
      operatorApprovalMayBeRequired: true
    },
    nonClaims: {
      truthClaimed: false,
      completionClaimed: false,
      authorityGranted: false,
      storageIsSubstrate: false,
      appendSuccessIsAcceptance: false,
      writeSuccessIsAcceptance: false,
      materializedStateClaimed: false,
      durableStateClaimed: false,
      replicatedStateClaimed: false,
      canonicalHistoryClaimed: false,
      causalTruthClaimed: false,
      meshTruthClaimed: false,
      runtimeAuthorityClaimed: false,
      rendererAuthorityClaimed: false
    }
  };
}

function build(continuityEvent = validContinuityEvent(), overrides = {}) {
  return buildTestbedEdgeLocalLayerContinuityEventEvidence({
    continuityEvent,
    createdAt: CREATED_AT,
    ...overrides
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedCalledEdge, false);
  assert.equal(evidence.testbedMutatedEdge, false);
  assert.equal(evidence.testbedOpenedEdgeStorage, false);
  assert.equal(evidence.testbedStartedAutobaseBackend, false);
  assert.equal(evidence.truthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.storageIsSubstrate, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.canonicalHistoryClaimed, false);
  assert.equal(evidence.causalTruthClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.runtimeAuthorityClaimed, false);
  assert.equal(evidence.rendererAuthorityClaimed, false);
}

test("valid Edge continuity-event scaffold is review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_local_layer_continuity_event_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["continuity_event_visible"]);
  assert.equal(evidence.sourceArtifactKind, "mesh_ecology_local_layer_continuity_event");
  assert.equal(evidence.sourceSchemaVersion, "mesh-ecology-edge/local-layer-continuity-event-draft/v0");
  assert.equal(evidence.continuityRole, "edge_operation_event_scaffold");
  assert.equal(evidence.draft, true);
  assert.equal(evidence.promotedContinuity, false);
  assert.equal(evidence.originRef, "edge-operation:op-1");
  assert.equal(evidence.operatorSeatRef, "operator-seat:local");
  assert.equal(evidence.membraneCrossingKind, "operator_decision");
  assert.equal(evidence.provenanceRefCount, 4);
  assert.equal(evidence.evidenceRefCount, 1);
  assert.equal(evidence.receiptRefCount, 1);
  assert.equal(evidence.storageKind, "local_json_operation_trail");
  assert.equal(evidence.storageRole, "compatibility_scaffold");
  assert.equal(evidence.scaffoldStorage, true);
  assert.equal(evidence.localFileStorage, true);
  assert.equal(evidence.sourceIsSubstrate, false);
  assert.equal(evidence.localLayerSubstrate, false);
  assert.equal(evidence.durableLocalLayerState, false);
  assert.equal(evidence.decentralizedState, false);
  assert.equal(evidence.autobaseBackend, false);
  assert.equal(evidence.hypercoreCorestoreBackend, false);
  assert.equal(evidence.hyperbeeIndex, false);
  assert.equal(evidence.acceptedContinuity, false);
  assert.equal(evidence.deterministicApplyRequired, true);
  assert.equal(evidence.appendSuccessIsAcceptance, false);
  assert.equal(evidence.writeSuccessIsAcceptance, false);
  assert.equal(evidence.storageVisibilityIsContinuity, false);
  assertPassiveEvidence(evidence);
});

test("continuity-event evidence can be extracted from an Edge operation event wrapper", () => {
  const sourceOperationEvent = {
    artifactKind: "edge_operation_event",
    localLayerContinuityEvent: validContinuityEvent()
  };

  const evidence = buildTestbedEdgeLocalLayerContinuityEventEvidence({
    sourceOperationEvent,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_VISIBLE);
  assert.equal(evidence.sourceOperationEventKind, "edge_operation_event");
  assert.equal(evidence.sourceOperationEventValid, true);
  assertPassiveEvidence(evidence);
});

test("continuity-event evidence blocks append storage and substrate overclaims", () => {
  const event = validContinuityEvent();
  event.storagePosture.sourceIsSubstrate = true;
  event.storagePosture.localLayerSubstrate = true;
  event.storagePosture.durableLocalLayerState = true;
  event.storagePosture.autobaseBackend = true;
  event.acceptancePosture.acceptedContinuity = true;
  event.acceptancePosture.appendSuccessIsAcceptance = true;

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("continuity_event_storage_overclaim"), true);
  assert.equal(evidence.reasonCodes.includes("continuity_event_acceptance_overclaim"), true);
  assert.equal(evidence.sourceIsSubstrate, true);
  assert.equal(evidence.autobaseBackend, true);
  assert.equal(evidence.acceptedContinuity, true);
  assertPassiveEvidence(evidence);
});

test("continuity-event evidence blocks truth authority state and renderer overclaims", () => {
  const event = validContinuityEvent();
  event.nonClaims.truthClaimed = true;
  event.nonClaims.authorityGranted = true;
  event.nonClaims.replicatedStateClaimed = true;
  event.nonClaims.rendererAuthorityClaimed = true;

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("continuity_event_truth_authority_state_or_substrate_overclaim"), true);
  assertPassiveEvidence(evidence);
});

test("continuity-event evidence blocks HTTP SSH localhost and local path refs", () => {
  const event = validContinuityEvent();
  event.provenanceRefs.push("http://127.0.0.1:8787/status");
  event.evidenceRefs.push("/tmp/edge-state/operations/op-1.json");
  event.receiptRefs.push("ssh://operator-node");

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("continuity_event_ref_contains_transport_or_local_path_seam"), true);
  assertPassiveEvidence(evidence);
});

test("continuity-event evidence reports incomplete origin provenance and membrane posture", () => {
  const event = validContinuityEvent();
  event.origin.originRef = "";
  event.provenanceRefs = [];
  event.membraneCrossing.validationRequired = false;

  const evidence = build(event);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("continuity_event_origin_ref_missing"), true);
  assert.equal(evidence.reasonCodes.includes("continuity_event_provenance_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("continuity_event_crossing_validation_missing"), true);
  assertPassiveEvidence(evidence);
});

test("continuity-event evidence handles malformed and shape-mismatch inputs", () => {
  const malformed = buildTestbedEdgeLocalLayerContinuityEventEvidence({
    continuityEvent: null,
    createdAt: CREATED_AT
  });
  const mismatch = build({
    ...validContinuityEvent(),
    artifactKind: "local_json_operation_trail",
    promotedContinuity: true
  });

  assert.equal(malformed.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["continuity_event_missing_or_malformed"]);
  assert.equal(mismatch.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_CONTINUITY_EVENT_STATUSES.CONTINUITY_EVENT_BLOCKED);
  assert.equal(mismatch.reasonCodes.includes("continuity_event_artifact_kind_mismatch"), true);
  assert.equal(mismatch.reasonCodes.includes("continuity_event_promotion_overclaim"), true);
  assertPassiveEvidence(malformed);
  assertPassiveEvidence(mismatch);
});

test("continuity-event status vocabulary is testbed-owned and bounded", () => {
  assert.deepEqual(listTestbedEdgeLocalLayerContinuityEventStatuses(), [
    "continuity_event_visible",
    "continuity_event_blocked",
    "continuity_event_malformed",
    "continuity_event_incomplete"
  ]);
});
