import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedEdgeSelfWorkTraceEvidence,
  listTestbedEdgeSelfWorkTraceStatuses,
  TESTBED_EDGE_SELF_WORK_TRACE_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_SELF_WORK_TRACE_STATUSES
} from "../src/testbed/edge-self-work-trace-evidence.js";

const CREATED_AT = "2026-05-16T12:15:00.000Z";

function completeArtifact() {
  return {
    artifactKind: "causal-edge-self-work-trace-evidence",
    schema: "causal-substrate/edge-self-work-trace-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-self-work-trace-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-16T12:00:00.000Z",
    refs: {
      operatorIntentRefs: ["edge-operator-intent:self-work-goal-point"],
      workPacketRefs: ["edge-cross-project-work-packet:self-work-goal-point"],
      operatorDecisionRefs: ["edge-operator-decision:self-work-goal-point"],
      proposalRefs: ["edge-self-work-patch-proposal:self-work-goal-point"],
      approvalRefs: ["edge-self-work-patch-approval:self-work-goal-point"],
      executorReceiptRefs: ["edge-self-work-patch-executor-receipt:self-work-goal-point"],
      verificationRefs: ["npm-test:mesh-ecology-edge:self-work-goal-point"],
      causalHappeningRefs: ["happening:edge-self-work-cycle:self-work-goal-point"],
      causalFrontierRefs: ["causal-frontier:edge-self-work:self-work-goal-point"],
      operatorReturnSurfaceRefs: ["edge-operator-return-surface:self-work-goal-point"],
      sourceRepoRefs: ["repo:mesh-ecology-edge"]
    },
    progress: {
      observationPresent: true,
      workPacketPresent: true,
      operatorMediationPresent: true,
      executionReceiptPresent: true,
      verificationPresent: true,
      causalInterpretationPresent: true,
      testbedPressureExpected: true,
      operatorReturnPresent: true
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensAutobase: false,
      opensCorestore: false,
      callsEdge: false,
      callsPlatform: false,
      callsMesh: false,
      executesWork: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      claimsCompletion: false,
      claimsRuntimeAuthority: false,
      startsBackend: false
    },
    validation: {
      status: "edge-self-work-trace-complete",
      parseableObject: true,
      requiredLoopRefsPresent: true,
      causalRefsPresent: true,
      verificationRefsPresent: true,
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true,
      issues: []
    },
    reviewStatus: "edge-self-work-trace-evidence-emitted",
    warnings: [],
    rejections: []
  };
}

function build(evidenceArtifact = completeArtifact()) {
  return buildTestbedEdgeSelfWorkTraceEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedCalledCausalSubstrate, false);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.testbedAcceptsCanonicalHistory, false);
  assert.equal(evidence.testbedClaimsCausalTruth, false);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.authorityGranted, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("complete Edge self-work trace is visible as passive review evidence", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_self_work_trace_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_SELF_WORK_TRACE_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.COMPLETE);
  assert.deepEqual(evidence.reasonCodes, ["edge_self_work_trace_complete"]);
  assert.equal(evidence.sourceArtifactKind, "causal-edge-self-work-trace-evidence");
  assert.equal(evidence.sourceSchema, "causal-substrate/edge-self-work-trace-evidence/v1");
  assert.equal(evidence.workPacketRefCount, 1);
  assert.equal(evidence.executorReceiptRefCount, 1);
  assert.equal(evidence.verificationRefCount, 1);
  assert.equal(evidence.causalHappeningRefCount, 1);
  assert.equal(evidence.operatorReturnSurfaceRefCount, 1);
  assertPassiveEvidence(evidence);
});

test("self-work trace missing causal and verification refs is incomplete", () => {
  const artifact = completeArtifact();
  artifact.refs.causalHappeningRefs = [];
  artifact.refs.causalFrontierRefs = [];
  artifact.refs.verificationRefs = [];
  artifact.validation.status = "edge-self-work-trace-incomplete";
  artifact.validation.causalRefsPresent = false;
  artifact.validation.verificationRefsPresent = false;
  artifact.reviewStatus = "edge-self-work-trace-incomplete";

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("edge_self_work_trace_not_emitted"), true);
  assert.equal(evidence.reasonCodes.includes("edge_self_work_trace_verification_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("edge_self_work_trace_causal_refs_missing"), true);
  assertPassiveEvidence(evidence);
});

test("self-work trace blocks causal-substrate execution and authority overclaims", () => {
  const artifact = completeArtifact();
  artifact.boundary.callsEdge = true;
  artifact.boundary.executesWork = true;
  artifact.boundary.claimsCompletion = true;
  artifact.boundary.claimsCausalTruth = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("edge_self_work_trace_boundary_overclaim"), true);
  assert.equal(evidence.causalSubstrateCallsEdge, true);
  assert.equal(evidence.causalSubstrateExecutesWork, true);
  assert.equal(evidence.causalSubstrateClaimsCompletion, true);
  assert.equal(evidence.causalSubstrateClaimsCausalTruth, true);
  assertPassiveEvidence(evidence);
});

test("self-work trace blocks HTTP SSH and local path refs", () => {
  const artifact = completeArtifact();
  artifact.refs.executorReceiptRefs = ["http://127.0.0.1:8787/receipt.json"];

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("edge_self_work_trace_ref_contains_compat_or_path_seam"), true);
  assertPassiveEvidence(evidence);
});

test("malformed self-work trace evidence remains passive and bounded", () => {
  const evidence = buildTestbedEdgeSelfWorkTraceEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_SELF_WORK_TRACE_STATUSES.MALFORMED);
  assert.deepEqual(evidence.reasonCodes, ["edge_self_work_trace_missing_or_malformed"]);
  assertPassiveEvidence(evidence);
  assert.deepEqual(listTestbedEdgeSelfWorkTraceStatuses(), [
    "edge_self_work_trace_complete",
    "edge_self_work_trace_incomplete",
    "edge_self_work_trace_blocked",
    "edge_self_work_trace_malformed"
  ]);
});
