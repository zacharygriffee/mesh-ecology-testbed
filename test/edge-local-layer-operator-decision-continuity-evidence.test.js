import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence,
  TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES
} from "../src/testbed/edge-local-layer-operator-decision-continuity-evidence.js";

const CREATED_AT = "2026-05-18T12:00:00.000Z";

function causalEvidence(overrides = {}) {
  const laneEntry = {
    artifactKind: "mesh_ecology_local_layer_lane_entry",
    schemaVersion: "mesh_ecology_local_layer_lane_entry.v0",
    entryId: "local-layer-continuity-lane-entry:operator-decision",
    entryHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    laneRef: "local-layer-continuity-lane:operator-owned-devices",
    namespaceRef: "local-layer/continuity",
    writerRef: "autobase-writer:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    writerAdmissionRef: "writer-admission:cccccccccccccccccccccccc",
    semanticEventKind: "mesh_ecology_local_layer_continuity_event",
    semanticEventRef: "local-layer-continuity-event:operator-decision:dddddddddddddddddddddddd",
    semanticEventEventKind: "operator_recorded_local_layer_decision",
    semanticPayloadHash: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    sourceRefs: [
      "local-layer-continuity-event:operator-decision:dddddddddddddddddddddddd",
      "operator-decision:approve-repo-work-packet:production-pressure",
      "operator-seat:edge-primary",
      "edge-work-packet:production-pressure",
      "edge-review:operator-decision-pressure",
      "operator-decision-scope:approve-repo-work-packet",
      "operator-decision-forbidden-scope:no-root-adjacent-expansion",
      "writer-admission:cccccccccccccccccccccccc"
    ],
    productionLaneEntry: true,
    storageEnvelope: true,
    semanticContinuityUnit: false,
    preservesSemanticContinuityEvent: true,
    acceptedContinuityInputBeforeApply: false,
    edgeStateMigration: false,
    appendSuccessIsAcceptance: false,
    linearizationIsTruth: false,
    replicaVisibilityIsContinuity: false,
    viewOutputIsSourceContinuity: false,
    localPathIsCanonicalSeam: false,
    httpOrSshIsCanonicalSeam: false,
    truthClaimed: false,
    authorityGranted: false,
    meshTruthClaimed: false,
    causalTruthClaimed: false,
    testbedReadinessClaimed: false
  };
  const decision = {
    eventKind: "operator_recorded_local_layer_decision",
    decisionKind: "approve_repo_work_packet",
    operatorDecisionRef: "operator-decision:approve-repo-work-packet:production-pressure",
    operatorSeatRef: "operator-seat:edge-primary",
    targetRef: "edge-work-packet:production-pressure",
    affectedArtifactRefs: ["edge-work-packet:production-pressure"],
    sourceWorkPacketRef: "edge-work-packet:production-pressure",
    sourceReviewRefs: ["edge-review:operator-decision-pressure"],
    approvedScopeRef: "operator-decision-scope:approve-repo-work-packet",
    approvedScopeSummary: "Approve the bounded repo work packet.",
    forbiddenScopeRef: "operator-decision-forbidden-scope:no-root-adjacent-expansion",
    forbiddenScopeSummary: "No writer admission, promotion, migration, schema promotion, or compatibility removal.",
    decisionValue: "approved",
    decisionReasonDigest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    issuedAt: CREATED_AT,
    provenanceRefs: [
      "operator-decision:approve-repo-work-packet:production-pressure",
      "operator-seat:edge-primary",
      "edge-work-packet:production-pressure",
      "edge-review:operator-decision-pressure",
      "operator-decision-scope:approve-repo-work-packet",
      "operator-decision-forbidden-scope:no-root-adjacent-expansion"
    ],
    defaultReadOnlyObserverVisibility: "filtered_decision_posture",
    fullDecisionReasonVisibleToReadOnlyObservers: false,
    fullDecisionReasonRequiresExplicitReaderPolicy: true,
    viewAccessIsAuthority: false,
    viewAccessIsApproval: false,
    rootAdjacentDecisionKind: false,
    decisionIsExecution: false,
    decisionIsGlobalAuthority: false,
    decisionIsReadiness: false,
    decisionIsWriterAdmission: false,
    decisionIsProductionPromotion: false,
    agentDraftIsOperatorApproval: false,
    edgeStatusIsApproval: false,
    causalReviewIsTruth: false,
    testbedReviewIsReadiness: false,
    truthClaimed: false,
    authorityGranted: false,
    globalAuthorityGranted: false,
    meshTruthClaimed: false,
    readinessClaimed: false,
    executionClaimed: false,
    writerAdmissionClaimed: false,
    productionPromotionClaimed: false,
    causalTruthClaimed: false,
    testbedReadinessClaimed: false,
    edgeStatusApprovalClaimed: false
  };
  const evidence = {
    artifactKind: "causal-edge-local-layer-operator-decision-continuity-evidence",
    schema: "causal-substrate/edge-local-layer-operator-decision-continuity-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-operator-decision-continuity-evidence:fixture",
    emittedAt: CREATED_AT,
    reviewStatus: "edge-local-layer-operator-decision-continuity-evidence-emitted",
    refs: {
      sourceResultRef: "edge-local-layer-production-continuity-lane:operator-decision",
      sourceResultHash: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      laneEntryRef: laneEntry.entryId,
      laneEntryHash: laneEntry.entryHash,
      semanticEventRef: laneEntry.semanticEventRef,
      writerRefs: [laneEntry.writerRef],
      headRefs: ["autobase-head:ffffffffffffffffffffffff"],
      linearizedEntryRefs: ["autobase-linearized-entry:local-layer-continuity-lane:0:111111111111111111111111"]
    },
    backend: {
      backendKind: "autobase",
      corestoreOpened: true,
      autobaseOpened: true,
      productionBackendStarted: true,
      storageRootIsCanonicalSeam: false,
      edgeStateMigration: false,
      laneRef: "local-layer-continuity-lane:operator-owned-devices",
      namespaceRef: "local-layer/continuity"
    },
    laneEntry,
    operatorDecision: decision,
    acceptedEventsView: {
      artifactKind: "edge_local_layer_production_accepted_events_view",
      schemaVersion: "edge_local_layer_production_accepted_events_view.v0",
      viewRef: "local-layer-continuity-accepted-events-view",
      acceptedEventCount: 1,
      acceptedOperatorDecisionCount: 1,
      acceptedDecisionKinds: ["approve_repo_work_packet"],
      acceptedEventRefs: [laneEntry.entryId],
      filteredReaderVisibility: true,
      fullDecisionReasonVisible: false,
      derivedOnly: true,
      reconstructableFromSourceLane: true,
      viewIsSourceContinuity: false,
      viewDeletionLosesSourceContinuity: false,
      rejectedEntriesAreAcceptedContinuity: false,
      truthClaimed: false,
      authorityGranted: false,
      sourceContinuityClaimed: false
    },
    readerObservation: {
      artifactKind: "edge_local_layer_production_reader_observation",
      schemaVersion: "edge_local_layer_production_reader_observation.v0",
      observationRef: "edge-local-layer-production-reader-observation:operator-decision",
      observerPath: "read-only-observer-view-replica-proof",
      realReplicaProof: true,
      readerRef: "local-layer-reader:operator-laptop",
      readerDeviceRef: "edge-device:operator-laptop",
      observedAcceptedEventRefs: [laneEntry.entryId],
      readOnlyObserverCanReadAllowedView: true,
      observerAppendBlocked: true,
      readOnlyObserverCannotWriteAcceptedContinuity: true,
      replicaVisibilityIsContinuity: false,
      viewOutputIsSourceContinuity: false,
      authorityGranted: false
    },
    productionPosture: {
      productionLanePromoted: true,
      productionLocalLayerContinuity: true,
      edgeStateMigration: false,
      defaultBackendSwitch: false,
      jsonCompatibilityRemoved: false,
      httpOrSshCanonicalSeam: false,
      causalSubstrateBackendOwner: false,
      testbedReadinessClaimed: false,
      edgeStatusIsPromotionApproval: false,
      truthClaimed: false,
      authorityGranted: false,
      meshTruthClaimed: false,
      causalTruthClaimed: false
    },
    causalInterpretation: {
      interpretationKind: "observer-relative-local-layer-operator-decision-continuity-evidence",
      interpretsOperatorDecisionAsContinuityEvidence: true,
      operatorDecisionIsTruth: false,
      operatorDecisionIsExecution: false,
      operatorDecisionIsGlobalAuthority: false,
      operatorDecisionIsMeshSettlement: false,
      operatorDecisionIsReadiness: false,
      observerRelativeContinuity: true,
      branchSettlementClaimed: false,
      lineageSettlementClaimed: false,
      causalTruthClaimed: false,
      causalSubstrateOwnsBackend: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      observesProductionLaneResult: true,
      opensAutobase: false,
      opensCorestore: false,
      writesContinuityRecords: false,
      executesOperatorDecision: false,
      grantsWriterAuthority: false,
      approvesProductionPromotion: false,
      claimsCausalTruth: false,
      claimsMeshTruth: false,
      claimsLineageSettlement: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-operator-decision-continuity-valid-evidence",
      refsPresent: true,
      backendSafe: true,
      laneEntrySafe: true,
      operatorDecisionSafe: true,
      acceptedEventsViewSafe: true,
      readerObservationSafe: true,
      productionPostureSafe: true,
      refsSafe: true,
      noAuthorityOrTruthOverclaim: true
    }
  };

  return {
    ...evidence,
    ...overrides
  };
}

test("safe causal operator decision continuity evidence is visible as Testbed pressure only", () => {
  const review = buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_operator_decision_continuity_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.VISIBLE);
  assert.equal(review.eventKind, "operator_recorded_local_layer_decision");
  assert.equal(review.decisionKind, "approve_repo_work_packet");
  assert.equal(review.readerDecisionVisibility, "filtered_decision_posture");
  assert.equal(review.fullDecisionReasonVisibleToReadOnlyObservers, false);
  assert.equal(review.operatorDecisionIsExecution, false);
  assert.equal(review.operatorDecisionIsTruth, false);
  assert.equal(review.operatorDecisionIsAuthority, false);
  assert.equal(review.testbedWritesContinuityRecords, false);
});

test("Testbed blocks root-adjacent operator decision kinds", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
    evidenceArtifact: {
      ...base,
      operatorDecision: {
        ...base.operatorDecision,
        decisionKind: "approve_writer_admission",
        decisionIsWriterAdmission: true
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_decision_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_decision_overclaim"), true);
});

test("Testbed blocks full decision reason visibility to read-only observers", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
    evidenceArtifact: {
      ...base,
      operatorDecision: {
        ...base.operatorDecision,
        fullDecisionReasonVisibleToReadOnlyObservers: true
      },
      acceptedEventsView: {
        ...base.acceptedEventsView,
        fullDecisionReasonVisible: true
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_decision_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_view_missing_or_unsafe"), true);
});

test("Testbed blocks Edge status approval and causal truth overclaims", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
    evidenceArtifact: {
      ...base,
      operatorDecision: {
        ...base.operatorDecision,
        edgeStatusIsApproval: true,
        causalReviewIsTruth: true
      },
      causalInterpretation: {
        ...base.causalInterpretation,
        causalTruthClaimed: true
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_decision_overclaim"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_causal_interpretation_missing_or_unsafe"), true);
});

test("Testbed blocks local path HTTP or SSH seams", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
    evidenceArtifact: {
      ...base,
      laneEntry: {
        ...base.laneEntry,
        sourceRefs: [...base.laneEntry.sourceRefs, "http://127.0.0.1:8787/status"]
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_operator_decision_continuity_ref_contains_compat_or_path_seam"), true);
});

test("Testbed malformed operator decision continuity evidence fails closed", () => {
  const review = buildTestbedEdgeLocalLayerOperatorDecisionContinuityEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_OPERATOR_DECISION_CONTINUITY_STATUSES.MALFORMED);
});
