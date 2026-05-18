import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeLocalLayerWriterAdmissionV0Evidence,
  listTestbedEdgeLocalLayerWriterAdmissionV0Statuses,
  TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES
} from "../src/testbed/edge-local-layer-writer-admission-v0-evidence.js";

const CREATED_AT = "2026-05-17T20:20:00.000Z";

function causalEvidence() {
  return {
    artifactKind: "causal-edge-local-layer-writer-admission-v0-evidence",
    schema: "causal-substrate/edge-local-layer-writer-admission-v0-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-local-layer-writer-admission-v0-evidence:fixture",
    reviewStatus: "edge-local-layer-writer-admission-v0-evidence-emitted",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_local_layer_writer_admission_v0_packet",
      sourceSchema: "edge_local_layer_writer_admission_v0_packet.v0"
    },
    refs: {
      packetId: "edge-local-layer-writer-admission-v0:aaaaaaaaaaaaaaaaaaaaaaaa",
      packetHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      layerRef: "local-layer:operator-owned-devices",
      laneRef: "local-layer-continuity-lane:operator-owned-devices-lab",
      operatorRef: "operator:edge-operator",
      sourceFixtureRef: "edge-continuity-lane-autobase-lab-review-chain:fixture",
      sourceLaneEntryRef: "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa",
      sourceSemanticEventRef: "continuity:edge-repo-work-packet:continuity-lane-lab",
      sourceRefs: [
        "edge-continuity-lane-autobase-lab-review-chain:fixture",
        "local-layer-continuity-lane-entry:aaaaaaaaaaaaaaaaaaaaaaaa",
        "continuity:edge-repo-work-packet:continuity-lane-lab",
        "causal-edge-local-layer-continuity-lane-autobase-lab-evidence:fixture",
        "testbed-edge-local-layer-continuity-lane-autobase-lab:fixture"
      ],
      observerRefs: ["local-layer-observer:operator-phone"],
      readerRefs: ["local-layer-reader:operator-laptop"],
      proposerRefs: ["local-layer-proposer:edge-self-work"],
      candidateAppenderRefs: ["local-layer-candidate-appender:operator-tablet"],
      admittedWriterRefs: ["local-layer-writer:operator-laptop"],
      operatorApproverRefs: ["operator-approver:primary-operator"],
      rejectedWriterRefs: ["local-layer-writer:unknown-device"],
      supersedesAdmissionRefs: [],
      nextGate: "operator_recorded_promotion_decision",
      finalGate: "production_local_layer_lane_promotion_decision"
    },
    roleSeparation: {
      observabilityIsAuthority: false,
      observabilityIsWritability: false,
      readabilityIsWritability: false,
      proposerIsWriter: false,
      candidateAppendIsWriterAdmission: false,
      candidateAppendIsAcceptedContinuity: false,
      writabilityIsAuthority: false,
      admittedWriterIsAuthority: false,
      operatorApprovalIsContinuityAcceptance: false,
      appendSuccessIsAcceptance: false,
      applyValidationOwnsAcceptance: true,
      operatorMediationRequired: true
    },
    writerAdmissionPolicy: {
      policyKind: "operator_owned_device_writer_admission_v0",
      writerPolicyVersion: 0,
      admittedWriterRefs: ["local-layer-writer:operator-laptop"],
      candidateAppenderRefs: ["local-layer-candidate-appender:operator-tablet"],
      rejectedWriterRefs: ["local-layer-writer:unknown-device"],
      operatorApproverRefs: ["operator-approver:primary-operator"],
      explicitOperatorApprovalRequiredForAdmission: true,
      writerAdmissionRequiredBeforeAcceptance: true,
      deterministicApplyRequired: true,
      candidateAppenderCanAppendProvisional: true,
      candidateAppendRequiresAcceptanceGate: true,
      candidateAppendMaterializesContinuity: false,
      generalWriterAuthorityGranted: false,
      writerAuthorityGranted: false,
      authorityGranted: false
    },
    readerPolicy: {
      readerPolicyKind: "operator_owned_local_layer_readers_by_explicit_refs",
      observerRefs: ["local-layer-observer:operator-phone"],
      readerRefs: ["local-layer-reader:operator-laptop"],
      explicitKeyOrProofRequired: true,
      readAccessImpliesWriteAccess: false,
      readAccessImpliesAuthority: false,
      publicRead: false,
      localPathReadSeam: false,
      httpReadSeam: false,
      sshReadSeam: false
    },
    acceptanceRule: {
      ruleKind: "deterministic_apply_validates_admitted_writer_input",
      appendSuccessIsAcceptance: false,
      candidateAppendIsAcceptance: false,
      replicaVisibilityIsContinuity: false,
      linearizationIsTruth: false,
      operatorApprovalIsTruth: false,
      testbedReviewIsReadiness: false,
      causalReviewIsTruth: false,
      requiresValidSchema: true,
      requiresSourceRefs: true,
      requiresCausalSubstrateInterpretation: true,
      requiresFailClosedTestbedPressure: true,
      requiresOperatorApprovalForAdmission: true,
      requiresAdmittedWriterForAcceptedContinuity: true,
      requiresDeterministicApplyValidation: true
    },
    implementationRoute: {
      currentStage: "writer_admission_v0",
      previousStage: "review_chain_fixture_reproducible",
      nextImplementationGate: "operator_recorded_promotion_decision",
      finalPromotionGate: "production_local_layer_lane_promotion_decision",
      productionCheckpointRequired: true,
      productionBackendAllowed: false,
      productionLanePromotionAllowed: false,
      edgeStateMigrationAllowed: false
    },
    causalInterpretation: {
      interpretationKind: "observer-relative-local-layer-writer-admission-policy-evidence",
      policyShapeOnly: true,
      observerRelative: true,
      branchRelative: true,
      sourceShareBoundaryPreserved: true,
      roleSeparationPreserved: true,
      writerAdmissionGrantsAuthority: false,
      candidateAppendIsContinuity: false,
      causalSubstrateOwnsBackend: false,
      causalSubstrateAcceptsTruth: false
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      callsEdge: false,
      writesContinuityRecords: false,
      acceptsProductionContinuity: false,
      grantsWriterAuthority: false,
      claimsCausalTruth: false,
      startsProductionBackend: false,
      migratesEdgeState: false
    },
    validation: {
      status: "edge-local-layer-writer-admission-v0-valid-evidence",
      expectedSourceSchemaPresent: true,
      packetRefsPresent: true,
      sourceRefsPresent: true,
      roleRefsPresent: true,
      roleSeparationPresent: true,
      writerPolicyPresent: true,
      readerPolicyPresent: true,
      acceptanceRulePresent: true,
      implementationRoutePresent: true,
      refsSafe: true,
      noProductionOverclaim: true
    }
  };
}

test("consumes Edge writer admission v0 causal evidence as policy pressure", () => {
  const review = buildTestbedEdgeLocalLayerWriterAdmissionV0Evidence({
    evidenceArtifact: causalEvidence(),
    createdAt: CREATED_AT
  });

  assert.equal(review.artifactKind, "testbed_edge_local_layer_writer_admission_v0_evidence");
  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.VISIBLE);
  assert.equal(review.packetId, "edge-local-layer-writer-admission-v0:aaaaaaaaaaaaaaaaaaaaaaaa");
  assert.equal(review.nextGate, "operator_recorded_promotion_decision");
  assert.equal(review.finalPromotionGate, "production_local_layer_lane_promotion_decision");
  assert.equal(review.observerRefCount, 1);
  assert.equal(review.readerRefCount, 1);
  assert.equal(review.candidateAppenderRefCount, 1);
  assert.equal(review.admittedWriterRefCount, 1);
  assert.equal(review.operatorApproverRefCount, 1);
  assert.equal(review.observabilityIsWritability, false);
  assert.equal(review.readabilityIsWritability, false);
  assert.equal(review.writabilityIsAuthority, false);
  assert.equal(review.candidateAppendMaterializesContinuity, false);
  assert.equal(review.writerAuthorityGranted, false);
  assert.equal(review.productionLanePromotionAllowed, false);
  assert.equal(review.edgeStateMigrationAllowed, false);
  assert.equal(review.testbedOpenedAutobase, false);
  assert.equal(review.testbedWritesContinuityRecords, false);
  assert.equal(review.testbedClaimsCausalTruth, false);
  assert.equal(review.reviewOnly, true);
  assert.equal(review.evidenceOnly, true);
});

test("blocks writer admission v0 causal evidence with authority overclaims", () => {
  const evidence = causalEvidence();
  evidence.writerAdmissionPolicy.writerAuthorityGranted = true;
  evidence.boundary.grantsWriterAuthority = true;
  evidence.validation.noProductionOverclaim = false;
  const review = buildTestbedEdgeLocalLayerWriterAdmissionV0Evidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_writer_admission_v0_writer_policy_missing_or_unsafe"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_writer_admission_v0_boundary_overclaim"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_writer_admission_v0_validation_not_ready"), true);
});

test("blocks writer admission v0 unsafe refs and route overclaims", () => {
  const evidence = causalEvidence();
  evidence.refs.admittedWriterRefs.push("http://127.0.0.1:8787/writer");
  evidence.implementationRoute.productionLanePromotionAllowed = true;
  const review = buildTestbedEdgeLocalLayerWriterAdmissionV0Evidence({
    evidenceArtifact: evidence,
    createdAt: CREATED_AT
  });

  assert.equal(review.reviewStatus, TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES.BLOCKED);
  assert.equal(review.reasonCodes.includes("edge_local_layer_writer_admission_v0_ref_contains_compat_or_path_seam"), true);
  assert.equal(review.reasonCodes.includes("edge_local_layer_writer_admission_v0_route_missing_or_unsafe"), true);
});

test("lists bounded writer admission v0 statuses", () => {
  assert.deepEqual(
    listTestbedEdgeLocalLayerWriterAdmissionV0Statuses(),
    Object.values(TESTBED_EDGE_LOCAL_LAYER_WRITER_ADMISSION_V0_STATUSES)
  );
});
