import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence,
  TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES
} from "../src/testbed/edge-local-layer-production-continuity-lane-evidence.js";

const CREATED_AT = "2026-05-18T12:00:00.000Z";

function causalEvidence(overrides = {}) {
  const laneEntry = {
    artifactKind: "mesh_ecology_local_layer_lane_entry",
    schemaVersion: "mesh_ecology_local_layer_lane_entry.v0",
    entryId: "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa",
    entryHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    laneRef: "local-layer-continuity-lane:operator-owned-devices",
    namespaceRef: "local-layer/continuity",
    writerRef: "autobase-writer:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    writerAdmissionRef: "writer-admission:cccccccccccccccccccccccc",
    semanticEventKind: "mesh_ecology_local_layer_continuity_event",
    semanticEventRef: "local-layer-continuity-event:repo-work-packet:dddddddddddddddddddddddd",
    semanticEventEventKind: "repo_work_packet_continuity_event",
    semanticPayloadHash: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    sourceRefs: [
      "local-layer-continuity-event:repo-work-packet:dddddddddddddddddddddddd",
      "edge-operation:event:eeeeeeeeeeeeeeeeeeeeeeee",
      "edge-operation:ffffffffffffffffffffffff",
      "origin:operator-seat:edge-primary",
      "source:edge-self-work-review:production-continuity-lane",
      "membrane-crossing:repo-work-packet-continuity:edge-self-work",
      "writer-admission:cccccccccccccccccccccccc",
      "operator-approval:minimal-production-local-layer-lane-implementation-v0:2026-05-18",
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

  const evidence = {
    artifactKind: "causal-edge-local-layer-production-continuity-lane-evidence",
    schema: "causal-substrate/edge-local-layer-production-continuity-lane-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-production-continuity-lane-evidence:fixture",
    emittedAt: CREATED_AT,
    reviewStatus: "edge-local-layer-production-continuity-lane-evidence-emitted",
    refs: {
      sourceResultRef: "edge-local-layer-production-continuity-lane:eeeeeeeeeeeeeeeeeeeeeeee",
      sourceResultHash: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      laneEntryRef: laneEntry.entryId,
      laneEntryHash: laneEntry.entryHash,
      semanticEventRef: laneEntry.semanticEventRef,
      writerRefs: [laneEntry.writerRef],
      headRefs: ["autobase-head:ffffffffffffffffffffffff"],
      linearizedEntryRefs: ["autobase-linearized-entry:local-layer-continuity-lane:0:111111111111111111111111"],
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
    acceptedEventsView: {
      artifactKind: "edge_local_layer_production_accepted_events_view",
      schemaVersion: "edge_local_layer_production_accepted_events_view.v0",
      viewRef: "local-layer-continuity-accepted-events-view",
      acceptedEventCount: 1,
      acceptedEventRefs: [laneEntry.entryId],
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
      observationRef: "edge-local-layer-production-reader-observation:9999999999999999",
      observerPath: "read-only-observer-view-replica-proof",
      realReplicaProof: true,
      readerRef: "local-layer-reader:operator-laptop",
      readerDeviceRef: "edge-device:operator-laptop",
      sourceViewKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      observerViewKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      observedResultCount: 1,
      observedAcceptedEventCount: 1,
      observedAcceptedEventRefs: [laneEntry.entryId],
      observedRejectedDiagnosticCount: 0,
      readOnlyObserverCanReadAllowedView: true,
      observerAppendBlocked: true,
      readOnlyObserverCannotWriteAcceptedContinuity: true,
      replicaVisibilityIsContinuity: false,
      viewOutputIsSourceContinuity: false,
      authorityGranted: false,
      transportPosture: {
        transportKind: "corestore-protocol-stream",
        proofScope: "in_process_second_device_shape",
        readOnlyReplica: true,
        liveDiscoveryRequired: false,
        hyperswarmRequired: false,
        httpSeam: false,
        sshSeam: false,
        localPathIsCanonicalSeam: false
      },
      nonClaims: {
        truthClaimed: false,
        authorityGranted: false,
        writerGranted: false,
        continuityAcceptanceClaimed: false,
        sourceContinuityClaimed: false,
        readinessClaimed: false
      }
    },
    productionPosture: {
      productionLanePromoted: true,
      productionLocalLayerContinuity: true,
      acceptedContinuityInputs: 1,
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
      interpretsProductionLaneResultAsEvidence: true,
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
      grantsWriterAuthority: false,
      claimsCausalTruth: false,
      claimsMeshTruth: false,
      claimsLineageSettlement: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-production-continuity-lane-valid-evidence",
      refsPresent: true,
      backendSafe: true,
      laneEntrySafe: true,
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

test("safe causal production lane evidence is visible as Testbed pressure only", () => {
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_production_continuity_lane_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.VISIBLE);
  assert.equal(review.sourceResultRef, "edge-local-layer-production-continuity-lane:eeeeeeeeeeeeeeeeeeeeeeee");
  assert.equal(review.eventKind, "repo_work_packet_continuity_event");
  assert.equal(review.readOnlyObserverReplicaProof, true);
  assert.equal(review.readOnlyObserverCanReadAllowedView, true);
  assert.equal(review.readOnlyObserverCannotWriteAcceptedContinuity, true);
  assert.equal(review.readerObservationIsContinuityAcceptance, false);
  assert.equal(review.productionLanePromoted, true);
  assert.equal(review.testbedReviewIsReadiness, false);
  assert.equal(review.causalReviewIsTruth, false);
  assert.equal(review.testbedWritesContinuityRecords, false);
});

test("Testbed blocks unsafe production lane event kind", () => {
  const artifact = causalEvidence({
    laneEntry: {
      ...causalEvidence().laneEntry,
      semanticEventEventKind: "repo_work_packet_proposed"
    }
  });
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: artifact,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_entry_missing_or_unsafe"), true);
});

test("Testbed blocks causal truth or readiness overclaims", () => {
  const artifact = causalEvidence({
    causalInterpretation: {
      ...causalEvidence().causalInterpretation,
      causalTruthClaimed: true
    },
    productionPosture: {
      ...causalEvidence().productionPosture,
      testbedReadinessClaimed: true
    }
  });
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: artifact,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_posture_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_causal_interpretation_missing_or_unsafe"), true);
});

test("Testbed blocks local path or HTTP seams and view-as-source claims", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: {
      ...base,
      laneEntry: {
        ...base.laneEntry,
        sourceRefs: [...base.laneEntry.sourceRefs, "http://127.0.0.1:8787/status"]
      },
      acceptedEventsView: {
        ...base.acceptedEventsView,
        viewIsSourceContinuity: true
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_view_missing_or_unsafe"), true);
});

test("Testbed blocks unsafe read-only observer replica proof", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: {
      ...base,
      readerObservation: {
        ...base.readerObservation,
        observerAppendBlocked: false,
        readOnlyObserverCannotWriteAcceptedContinuity: false,
        authorityGranted: true
      },
      validation: {
        ...base.validation,
        readerObservationSafe: false
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_reader_observation_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_validation_not_ready"), true);
});

test("Testbed blocks reader observation claiming replica visibility as continuity", () => {
  const base = causalEvidence();
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: {
      ...base,
      readerObservation: {
        ...base.readerObservation,
        replicaVisibilityIsContinuity: true,
        nonClaims: {
          ...base.readerObservation.nonClaims,
          continuityAcceptanceClaimed: true
        }
      }
    },
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_production_continuity_lane_reader_observation_missing_or_unsafe"), true);
});

test("Testbed malformed production lane evidence fails closed", () => {
  const review = buildTestbedEdgeLocalLayerProductionContinuityLaneEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_PRODUCTION_CONTINUITY_LANE_STATUSES.MALFORMED);
});
