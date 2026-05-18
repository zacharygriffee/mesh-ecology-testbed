import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionEvidence,
  listTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionStatuses,
  TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES
} from "../src/testbed/edge-local-layer-operator-recorded-promotion-decision-evidence.js";

const CREATED_AT = "2026-05-17T21:20:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-operator-recorded-promotion-decision-evidence",
    schema: "causal-substrate/edge-local-layer-operator-recorded-promotion-decision-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-operator-recorded-promotion-decision-evidence:fixture",
    reviewStatus: "edge-local-layer-operator-recorded-promotion-decision-evidence-emitted",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_local_layer_operator_recorded_promotion_decision",
      sourceSchema: "edge_local_layer_operator_recorded_promotion_decision.v0"
    },
    refs: {
      decisionId: "edge-local-layer-operator-recorded-promotion-decision:aaaaaaaaaaaaaaaaaaaaaaaa",
      decisionHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      operatorRef: "operator:edge-operator",
      operatorDecisionRef: "operator-decision:record-local-layer-promotion-fields",
      decisionRecordRef: "operator-recorded-promotion-decision:record-local-layer-promotion-fields",
      sourceWriterAdmissionPacketRef: "edge-local-layer-writer-admission-v0:bbbbbbbbbbbbbbbbbbbbbbbb",
      sourceWriterAdmissionPacketHash: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      sourceLayerRef: "local-layer:operator-owned-devices",
      sourceLaneRef: "local-layer-continuity-lane:operator-owned-devices-lab",
      sourceRefs: [
        "edge-local-layer-writer-admission-v0:bbbbbbbbbbbbbbbbbbbbbbbb",
        "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "edge-continuity-lane-autobase-lab-review-chain:fixture",
        "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa",
        "continuity:edge-repo-work-packet:continuity-lane-lab",
        "causal-edge-local-layer-continuity-lane-autobase-lab-evidence:fixture"
      ],
      decisionNotesRefs: ["operator-note:promotion-fields-reviewed"],
      supersedesDecisionRefs: [],
      nextGate: "production_backend_wedge",
      finalGate: "production_local_layer_lane_promotion_decision"
    },
    candidateProductionLaneFields: {
      promotedSemanticInputKind: "mesh_ecology_local_layer_continuity_event",
      promotedSemanticInputSchema: "mesh-ecology-spine:local-layer-continuity-event:v0",
      storageEnvelopeKind: "mesh_ecology_local_layer_lane_entry",
      storageEnvelopeSchema: "mesh_ecology_local_layer_lane_entry.v0",
      storageLaneKind: "bounded_autobase_local_layer_continuity_lane",
      productionBackendKind: "autobase_candidate_not_started",
      namespacePolicy: "one-corestore-per-role-process-stable-local-layer-continuity-namespace",
      schemaPath: "json_contract_first_with_hyperschema_trigger",
      dispatchPath: "hyperdispatch_deferred_until_dispatch_pressure",
      rollbackPosture: "supersession_and_import_rollback_before_state_migration",
      writerPolicyRef: "writer-admission-policy:operator-owned-device-writer-admission-v0",
      readerPolicyRef: "reader-policy:operator-owned-local-layer-readers-by-explicit-refs",
      acceptanceRuleRef: "acceptance-rule:deterministic-apply-validates-admitted-writer-input",
      causalInterpretationRef: "causal-substrate:observer-relative-continuity-interpretation",
      testbedPressureRef: "testbed:fail-closed-promotion-pressure-required",
      promotedNow: false,
      productionBackendStarted: false,
      edgeStateMigrationAllowed: false
    },
    decisionStatus: {
      operatorDecisionRecorded: true,
      reversibleReviewArtifact: true,
      candidateProductionLaneFieldsNamed: true,
      productionLanePromoted: false,
      productionBackendStarted: false,
      productionExecutionAuthorized: false,
      edgeStateMigrationAllowed: false,
      writerAuthorityGranted: false,
      durableLocalLayerContinuityClaimed: false
    },
    writerPolicySummary: {
      policyKind: "operator_owned_device_writer_admission_v0",
      admittedWriterRefs: ["local-layer-writer:operator-laptop"],
      candidateAppenderRefs: ["local-layer-candidate-appender:operator-tablet"],
      operatorApproverRefs: ["operator-approver:primary-operator"],
      writerAuthorityGranted: false,
      writabilityIsAuthority: false
    },
    readerPolicySummary: {
      readerPolicyKind: "operator_owned_local_layer_readers_by_explicit_refs",
      observerRefs: ["local-layer-observer:operator-phone"],
      readerRefs: ["local-layer-reader:operator-laptop"],
      explicitKeyOrProofRequired: true,
      readAccessImpliesWriteAccess: false,
      readAccessImpliesAuthority: false,
      localPathReadSeam: false,
      httpReadSeam: false,
      sshReadSeam: false
    },
    acceptanceRule: {
      ruleKind: "operator_recorded_decision_names_promotion_fields_only",
      appendSuccessIsAcceptance: false,
      candidateAppendIsAcceptance: false,
      replicaVisibilityIsContinuity: false,
      linearizationIsTruth: false,
      operatorDecisionIsExecution: false,
      operatorDecisionIsTruth: false,
      testbedReviewIsReadiness: false,
      causalReviewIsTruth: false,
      productionPromotionRequiresSeparateGate: true
    },
    implementationRoute: {
      currentStage: "operator_recorded_promotion_decision",
      nextImplementationGate: "production_backend_wedge",
      finalPromotionGate: "production_local_layer_lane_promotion_decision",
      productionBackendAllowed: false,
      productionLanePromotionAllowed: false,
      edgeStateMigrationAllowed: false
    },
    causalInterpretation: {
      interpretationKind: "observer-relative-local-layer-operator-recorded-promotion-decision-evidence",
      decisionFieldEvidenceOnly: true,
      operatorDecisionIsExecution: false,
      productionLanePromoted: false,
      causalSubstrateOwnsBackend: false,
      causalSubstrateAcceptsTruth: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      acceptsProductionContinuity: false,
      grantsWriterAuthority: false,
      claimsCausalTruth: false,
      startsProductionBackend: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-operator-recorded-promotion-decision-valid-evidence",
      decisionRefsPresent: true,
      sourceRefsPresent: true,
      candidateFieldsPresent: true,
      decisionStatusSafe: true,
      writerPolicySafe: true,
      readerPolicySafe: true,
      acceptanceRuleSafe: true,
      implementationRouteSafe: true,
      refsSafe: true,
      noProductionOverclaim: true
    }
  };
}

test("consumes operator recorded promotion decision evidence as review-only pressure", () => {
  const review = buildTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_operator_recorded_promotion_decision_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.VISIBLE);
  assert.equal(review.nextGate, "production_backend_wedge");
  assert.equal(review.storageLaneKind, "bounded_autobase_local_layer_continuity_lane");
  assert.equal(review.productionBackendKind, "autobase_candidate_not_started");
  assert.equal(review.operatorDecisionRecorded, true);
  assert.equal(review.productionLanePromoted, false);
  assert.equal(review.productionBackendStarted, false);
  assert.equal(review.productionExecutionAuthorized, false);
  assert.equal(review.edgeStateMigrationAllowed, false);
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedWritesContinuityRecords, false);
  assert.equal(review.testbedClaimsCausalTruth, false);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
});

test("blocks operator decision execution and backend overclaims", () => {
  const evidence = causalEvidence();
  evidence.decisionStatus.productionExecutionAuthorized = true;
  evidence.boundary.opensAutobase = true;
  evidence.validation.noProductionOverclaim = false;
  const review = buildTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_recorded_promotion_decision_status_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_recorded_promotion_decision_boundary_overclaim"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_recorded_promotion_decision_validation_not_ready"), true);
});

test("blocks operator decision unsafe refs and route promotion", () => {
  const evidence = causalEvidence();
  evidence.refs.operatorDecisionRef = "http://127.0.0.1:8787/decision";
  evidence.implementationRoute.productionLanePromotionAllowed = true;
  const review = buildTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionEvidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_recorded_promotion_decision_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_recorded_promotion_decision_route_missing_or_unsafe"), true);
});

test("lists bounded operator recorded promotion decision statuses", () => {
  assert.deepEqual(
    listTestbedEdgeLocalLayerOperatorRecordedPromotionDecisionStatuses(),
    Object.values(TESTBED_EDGE_LOCAL_LAYER_OPERATOR_RECORDED_PROMOTION_DECISION_STATUSES)
  );
});
