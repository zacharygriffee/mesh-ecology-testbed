import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedRepoFamilySeamOverclaimPressureReport,
  listTestbedRepoFamilySeamOverclaimPressureCases,
  listTestbedRepoFamilySeamOverclaimPressureStatuses,
  REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES,
  TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_PACKET,
  TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION,
  TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES
} from "../src/testbed/repo-family-seam-overclaim-pressure.js";

const CREATED_AT = "2026-05-26T12:00:00.000Z";

function packetFixture(overrides = {}) {
  return {
    ...structuredClone(TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_PACKET),
    ...overrides
  };
}

function build(pressurePacket = packetFixture()) {
  return buildTestbedRepoFamilySeamOverclaimPressureReport({
    pressurePacket,
    createdAt: CREATED_AT
  });
}

test("Lane D repo-family seam pressure declares every required fail-closed case", () => {
  const report = build();

  assert.equal(report.artifactKind, "testbed_repo_family_seam_overclaim_pressure_report");
  assert.equal(report.schemaVersion, TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION);
  assert.equal(report.reviewStatus, TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.VISIBLE_NOT_ADMITTED);
  assert.deepEqual(report.requiredCaseIds, REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES);
  assert.deepEqual(report.observedCaseIds, REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES);
  assert.deepEqual(report.blockedCaseIds, REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES);
  assert.deepEqual(report.unsupportedCaseIds, []);
  assert.deepEqual(report.visibleNotAdmittedCaseIds, []);
  assert.equal(report.admittedCaseCount, 0);
  assert.equal(report.reviewOnly, true);
  assert.equal(report.evidenceOnly, true);
  assert.equal(report.visibleNotAdmitted, true);
});

test("Lane D static packet keeps all required overclaims blocked and evidence-only", () => {
  const packet = packetFixture();

  for (const pressureCase of packet.cases) {
    assert.equal(pressureCase.stopStatus, "blocked", pressureCase.caseId);
    assert.equal(pressureCase.evidencePosture, "evidence_only", pressureCase.caseId);
    assert.equal(pressureCase.admitted, false, pressureCase.caseId);
    assert.equal(pressureCase.reasonCode, `blocked_case:${pressureCase.caseId}`, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsLayer, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsEdge, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsStudio, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsVirtualia, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsBytes, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsPacks, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.callsPlatform, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.dispatchesRepoAgents, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.autoExecutes, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.executesBehavior, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.mutatesLayer, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.mutatesSourceRepo, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.writesProductionStorage, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.createsAuthority, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.acceptsAdmission, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.acceptsContinuity, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.acceptsLayerState, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.claimsSourceSemantics, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.claimsPayloadValidity, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.claimsMeshDiscovery, false, pressureCase.caseId);
    assert.equal(pressureCase.boundary.claimsTruth, false, pressureCase.caseId);
  }
});

test("Lane D report never creates authority, executes adjacent behavior, or writes production storage", () => {
  const report = build();

  assert.equal(report.testbedMutatedLayer, false);
  assert.equal(report.testbedMutatedSourceRepo, false);
  assert.equal(report.testbedCalledLayer, false);
  assert.equal(report.testbedCalledEdge, false);
  assert.equal(report.testbedCalledStudio, false);
  assert.equal(report.testbedCalledVirtualia, false);
  assert.equal(report.testbedCalledBytes, false);
  assert.equal(report.testbedCalledPacks, false);
  assert.equal(report.testbedCalledPlatform, false);
  assert.equal(report.testbedExecutedPlatformBehavior, false);
  assert.equal(report.testbedExecutedPacksBehavior, false);
  assert.equal(report.testbedExecutedBytesBehavior, false);
  assert.equal(report.testbedDispatchedRepoAgents, false);
  assert.equal(report.testbedAutoExecuted, false);
  assert.equal(report.testbedWroteProductionStorage, false);
  assert.equal(report.authorityCreated, false);
  assert.equal(report.layerAuthorityCreated, false);
  assert.equal(report.layerStateAccepted, false);
  assert.equal(report.continuityAccepted, false);
  assert.equal(report.meshDiscoveryClaimed, false);
  assert.equal(report.payloadValidityClaimed, false);
  assert.equal(report.sourceSemanticsClaimed, false);
  assert.equal(report.storageIndexViewIsTruth, false);
  assert.equal(report.repoAgentReportIsTruth, false);
});

test("Lane D keeps Studio dispatch and Virtualia review boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const studioDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "studio_dispatch_treated_as_result_acceptance_application"
  );
  const virtualiaReviewCase = packet.cases.find((entry) =>
    entry.caseId === "virtualia_review_treated_as_queue_action_or_authority"
  );

  assert.equal(report.blockedCaseIds.includes("studio_dispatch_treated_as_result_acceptance_application"), true);
  assert.equal(report.blockedCaseIds.includes("virtualia_review_treated_as_queue_action_or_authority"), true);
  assert.equal(studioDispatchCase.stopStatus, "blocked");
  assert.equal(studioDispatchCase.admitted, false);
  assert.equal(studioDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(studioDispatchCase.boundary.mutatesSourceRepo, false);
  assert.equal(studioDispatchCase.boundary.claimsTruth, false);
  assert.equal(virtualiaReviewCase.stopStatus, "blocked");
  assert.equal(virtualiaReviewCase.admitted, false);
  assert.equal(virtualiaReviewCase.boundary.callsVirtualia, false);
  assert.equal(virtualiaReviewCase.boundary.dispatchesRepoAgents, false);
  assert.equal(virtualiaReviewCase.boundary.createsAuthority, false);
  assert.equal(virtualiaReviewCase.boundary.claimsSourceSemantics, false);
});

test("Lane D keeps Bytes/Packs dispatch and Platform queue boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const bytesDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_dispatch_treated_as_payload_fetch_or_result_acceptance"
  );
  const packsDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "packs_dispatch_treated_as_runtime_activation_or_result_acceptance"
  );
  const platformQueueCase = packet.cases.find((entry) =>
    entry.caseId === "platform_queued_action_treated_as_dispatch_or_host_consequence"
  );

  assert.equal(report.blockedCaseIds.includes("bytes_dispatch_treated_as_payload_fetch_or_result_acceptance"), true);
  assert.equal(report.blockedCaseIds.includes("packs_dispatch_treated_as_runtime_activation_or_result_acceptance"), true);
  assert.equal(report.blockedCaseIds.includes("platform_queued_action_treated_as_dispatch_or_host_consequence"), true);
  assert.equal(bytesDispatchCase.stopStatus, "blocked");
  assert.equal(bytesDispatchCase.admitted, false);
  assert.equal(bytesDispatchCase.boundary.callsBytes, false);
  assert.equal(bytesDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(bytesDispatchCase.boundary.claimsPayloadValidity, false);
  assert.equal(bytesDispatchCase.boundary.claimsTruth, false);
  assert.equal(packsDispatchCase.stopStatus, "blocked");
  assert.equal(packsDispatchCase.admitted, false);
  assert.equal(packsDispatchCase.boundary.callsPacks, false);
  assert.equal(packsDispatchCase.boundary.executesBehavior, false);
  assert.equal(packsDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(packsDispatchCase.boundary.claimsTruth, false);
  assert.equal(platformQueueCase.stopStatus, "blocked");
  assert.equal(platformQueueCase.admitted, false);
  assert.equal(platformQueueCase.boundary.callsPlatform, false);
  assert.equal(platformQueueCase.boundary.executesBehavior, false);
  assert.equal(platformQueueCase.boundary.dispatchesRepoAgents, false);
  assert.equal(platformQueueCase.boundary.mutatesSourceRepo, false);
  assert.equal(platformQueueCase.boundary.createsAuthority, false);
});

test("Lane D keeps Bytes/Packs result-intake evidence boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const bytesResultIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_result_intake_treated_as_payload_validity_or_acceptance"
  );
  const packsResultIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "packs_result_intake_treated_as_accepted_layer_state_or_acceptance"
  );
  const reportedRefsCase = packet.cases.find((entry) =>
    entry.caseId === "result_intake_reported_refs_treated_as_truth"
  );
  const visibilityCase = packet.cases.find((entry) =>
    entry.caseId === "result_intake_visibility_treated_as_authority_admission_continuity"
  );
  const edgeReviewCase = packet.cases.find((entry) =>
    entry.caseId === "result_intake_edge_review_treated_as_authority"
  );

  assert.equal(
    report.blockedCaseIds.includes("bytes_result_intake_treated_as_payload_validity_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("packs_result_intake_treated_as_accepted_layer_state_or_acceptance"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("result_intake_reported_refs_treated_as_truth"), true);
  assert.equal(
    report.blockedCaseIds.includes("result_intake_visibility_treated_as_authority_admission_continuity"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("result_intake_edge_review_treated_as_authority"), true);
  assert.equal(bytesResultIntakeCase.stopStatus, "blocked");
  assert.equal(bytesResultIntakeCase.admitted, false);
  assert.equal(bytesResultIntakeCase.boundary.callsBytes, false);
  assert.equal(bytesResultIntakeCase.boundary.claimsPayloadValidity, false);
  assert.equal(bytesResultIntakeCase.boundary.claimsTruth, false);
  assert.equal(bytesResultIntakeCase.boundary.mutatesSourceRepo, false);
  assert.equal(packsResultIntakeCase.stopStatus, "blocked");
  assert.equal(packsResultIntakeCase.admitted, false);
  assert.equal(packsResultIntakeCase.boundary.callsPacks, false);
  assert.equal(packsResultIntakeCase.boundary.acceptsLayerState, false);
  assert.equal(packsResultIntakeCase.boundary.claimsTruth, false);
  assert.equal(packsResultIntakeCase.boundary.executesBehavior, false);
  assert.equal(reportedRefsCase.stopStatus, "blocked");
  assert.equal(reportedRefsCase.boundary.claimsTruth, false);
  assert.equal(reportedRefsCase.boundary.dispatchesRepoAgents, false);
  assert.equal(reportedRefsCase.boundary.createsAuthority, false);
  assert.equal(visibilityCase.stopStatus, "blocked");
  assert.equal(visibilityCase.boundary.acceptsAdmission, false);
  assert.equal(visibilityCase.boundary.acceptsContinuity, false);
  assert.equal(visibilityCase.boundary.createsAuthority, false);
  assert.equal(edgeReviewCase.stopStatus, "blocked");
  assert.equal(edgeReviewCase.boundary.callsEdge, false);
  assert.equal(edgeReviewCase.boundary.createsAuthority, false);
  assert.equal(edgeReviewCase.boundary.claimsTruth, false);
});

test("Lane D keeps Bytes/Packs result-acceptance candidate boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const bytesAcceptanceCandidateCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity"
  );
  const packsAcceptanceCandidateCase = packet.cases.find((entry) =>
    entry.caseId === "packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state"
  );

  assert.equal(
    report.blockedCaseIds.includes("bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state"),
    true
  );
  assert.equal(bytesAcceptanceCandidateCase.stopStatus, "blocked");
  assert.equal(bytesAcceptanceCandidateCase.admitted, false);
  assert.equal(bytesAcceptanceCandidateCase.boundary.callsBytes, false);
  assert.equal(bytesAcceptanceCandidateCase.boundary.claimsPayloadValidity, false);
  assert.equal(bytesAcceptanceCandidateCase.boundary.claimsTruth, false);
  assert.equal(bytesAcceptanceCandidateCase.boundary.mutatesSourceRepo, false);
  assert.equal(bytesAcceptanceCandidateCase.boundary.createsAuthority, false);
  assert.equal(packsAcceptanceCandidateCase.stopStatus, "blocked");
  assert.equal(packsAcceptanceCandidateCase.admitted, false);
  assert.equal(packsAcceptanceCandidateCase.boundary.callsPacks, false);
  assert.equal(packsAcceptanceCandidateCase.boundary.acceptsLayerState, false);
  assert.equal(packsAcceptanceCandidateCase.boundary.executesBehavior, false);
  assert.equal(packsAcceptanceCandidateCase.boundary.mutatesSourceRepo, false);
  assert.equal(packsAcceptanceCandidateCase.boundary.createsAuthority, false);
});

test("Lane D keeps Bytes accepted-result evidence boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const payloadValidityCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_accepted_result_treated_as_payload_validity"
  );
  const payloadFetchCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_accepted_result_treated_as_payload_fetch_materialization"
  );
  const applicationMergeCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_accepted_result_treated_as_application_merge"
  );
  const layerTruthCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_accepted_result_treated_as_layer_truth_continuity"
  );
  const storageAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "bytes_accepted_result_treated_as_storage_write_authority"
  );

  assert.equal(report.blockedCaseIds.includes("bytes_accepted_result_treated_as_payload_validity"), true);
  assert.equal(
    report.blockedCaseIds.includes("bytes_accepted_result_treated_as_payload_fetch_materialization"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("bytes_accepted_result_treated_as_application_merge"), true);
  assert.equal(report.blockedCaseIds.includes("bytes_accepted_result_treated_as_layer_truth_continuity"), true);
  assert.equal(report.blockedCaseIds.includes("bytes_accepted_result_treated_as_storage_write_authority"), true);
  assert.equal(payloadValidityCase.stopStatus, "blocked");
  assert.equal(payloadValidityCase.admitted, false);
  assert.equal(payloadValidityCase.boundary.callsBytes, false);
  assert.equal(payloadValidityCase.boundary.claimsPayloadValidity, false);
  assert.equal(payloadFetchCase.stopStatus, "blocked");
  assert.equal(payloadFetchCase.admitted, false);
  assert.equal(payloadFetchCase.boundary.callsBytes, false);
  assert.equal(payloadFetchCase.boundary.executesBehavior, false);
  assert.equal(payloadFetchCase.boundary.mutatesSourceRepo, false);
  assert.equal(applicationMergeCase.stopStatus, "blocked");
  assert.equal(applicationMergeCase.admitted, false);
  assert.equal(applicationMergeCase.boundary.executesBehavior, false);
  assert.equal(applicationMergeCase.boundary.mutatesSourceRepo, false);
  assert.equal(applicationMergeCase.boundary.claimsTruth, false);
  assert.equal(layerTruthCase.stopStatus, "blocked");
  assert.equal(layerTruthCase.admitted, false);
  assert.equal(layerTruthCase.boundary.mutatesLayer, false);
  assert.equal(layerTruthCase.boundary.acceptsContinuity, false);
  assert.equal(layerTruthCase.boundary.claimsTruth, false);
  assert.equal(storageAuthorityCase.stopStatus, "blocked");
  assert.equal(storageAuthorityCase.admitted, false);
  assert.equal(storageAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(storageAuthorityCase.boundary.createsAuthority, false);
});

test("Lane D keeps Packs accepted-result evidence boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const acceptedLayerStateCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_accepted_layer_state"
  );
  const runtimeActivationCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_runtime_activation"
  );
  const deploymentAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_deployment_authority"
  );
  const applicationMergeCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_application_merge"
  );
  const reportedTruthCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_reported_truth"
  );
  const platformMutationCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_platform_mutation"
  );
  const storageAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "packs_accepted_result_treated_as_storage_write_authority"
  );

  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_accepted_layer_state"), true);
  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_runtime_activation"), true);
  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_deployment_authority"), true);
  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_application_merge"), true);
  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_reported_truth"), true);
  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_platform_mutation"), true);
  assert.equal(report.blockedCaseIds.includes("packs_accepted_result_treated_as_storage_write_authority"), true);
  assert.equal(acceptedLayerStateCase.stopStatus, "blocked");
  assert.equal(acceptedLayerStateCase.admitted, false);
  assert.equal(acceptedLayerStateCase.boundary.acceptsLayerState, false);
  assert.equal(acceptedLayerStateCase.boundary.mutatesLayer, false);
  assert.equal(runtimeActivationCase.stopStatus, "blocked");
  assert.equal(runtimeActivationCase.admitted, false);
  assert.equal(runtimeActivationCase.boundary.callsPacks, false);
  assert.equal(runtimeActivationCase.boundary.executesBehavior, false);
  assert.equal(deploymentAuthorityCase.stopStatus, "blocked");
  assert.equal(deploymentAuthorityCase.admitted, false);
  assert.equal(deploymentAuthorityCase.boundary.createsAuthority, false);
  assert.equal(applicationMergeCase.stopStatus, "blocked");
  assert.equal(applicationMergeCase.admitted, false);
  assert.equal(applicationMergeCase.boundary.executesBehavior, false);
  assert.equal(applicationMergeCase.boundary.mutatesSourceRepo, false);
  assert.equal(reportedTruthCase.stopStatus, "blocked");
  assert.equal(reportedTruthCase.admitted, false);
  assert.equal(reportedTruthCase.boundary.claimsTruth, false);
  assert.equal(platformMutationCase.stopStatus, "blocked");
  assert.equal(platformMutationCase.admitted, false);
  assert.equal(platformMutationCase.boundary.callsPlatform, false);
  assert.equal(platformMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(storageAuthorityCase.stopStatus, "blocked");
  assert.equal(storageAuthorityCase.admitted, false);
  assert.equal(storageAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(storageAuthorityCase.boundary.createsAuthority, false);
});

test("Lane D keeps Platform dispatch-candidate boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const dispatchApprovalCase = packet.cases.find((entry) =>
    entry.caseId === "platform_dispatch_candidate_treated_as_dispatch_approval"
  );
  const hostActivationCase = packet.cases.find((entry) =>
    entry.caseId === "platform_dispatch_candidate_treated_as_host_local_activation"
  );
  const platformMutationCase = packet.cases.find((entry) =>
    entry.caseId === "platform_dispatch_candidate_treated_as_platform_mutation"
  );
  const layerContinuityCase = packet.cases.find((entry) =>
    entry.caseId === "platform_dispatch_candidate_treated_as_layer_continuity_truth"
  );
  const storageAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "platform_dispatch_candidate_treated_as_storage_write_authority"
  );
  const deploymentOwnershipCase = packet.cases.find((entry) =>
    entry.caseId === "platform_dispatch_candidate_treated_as_deployment_ownership"
  );

  assert.equal(report.blockedCaseIds.includes("platform_dispatch_candidate_treated_as_dispatch_approval"), true);
  assert.equal(report.blockedCaseIds.includes("platform_dispatch_candidate_treated_as_host_local_activation"), true);
  assert.equal(report.blockedCaseIds.includes("platform_dispatch_candidate_treated_as_platform_mutation"), true);
  assert.equal(report.blockedCaseIds.includes("platform_dispatch_candidate_treated_as_layer_continuity_truth"), true);
  assert.equal(report.blockedCaseIds.includes("platform_dispatch_candidate_treated_as_storage_write_authority"), true);
  assert.equal(report.blockedCaseIds.includes("platform_dispatch_candidate_treated_as_deployment_ownership"), true);
  assert.equal(dispatchApprovalCase.stopStatus, "blocked");
  assert.equal(dispatchApprovalCase.admitted, false);
  assert.equal(dispatchApprovalCase.boundary.dispatchesRepoAgents, false);
  assert.equal(dispatchApprovalCase.boundary.createsAuthority, false);
  assert.equal(hostActivationCase.stopStatus, "blocked");
  assert.equal(hostActivationCase.admitted, false);
  assert.equal(hostActivationCase.boundary.callsPlatform, false);
  assert.equal(hostActivationCase.boundary.executesBehavior, false);
  assert.equal(platformMutationCase.stopStatus, "blocked");
  assert.equal(platformMutationCase.admitted, false);
  assert.equal(platformMutationCase.boundary.callsPlatform, false);
  assert.equal(platformMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(layerContinuityCase.stopStatus, "blocked");
  assert.equal(layerContinuityCase.admitted, false);
  assert.equal(layerContinuityCase.boundary.acceptsContinuity, false);
  assert.equal(layerContinuityCase.boundary.claimsTruth, false);
  assert.equal(layerContinuityCase.boundary.mutatesLayer, false);
  assert.equal(storageAuthorityCase.stopStatus, "blocked");
  assert.equal(storageAuthorityCase.admitted, false);
  assert.equal(storageAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(storageAuthorityCase.boundary.createsAuthority, false);
  assert.equal(deploymentOwnershipCase.stopStatus, "blocked");
  assert.equal(deploymentOwnershipCase.admitted, false);
  assert.equal(deploymentOwnershipCase.boundary.callsPlatform, false);
  assert.equal(deploymentOwnershipCase.boundary.createsAuthority, false);
});

test("Lane D keeps operator-burden visibility and candidate boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const attentionQueueCase = packet.cases.find((entry) =>
    entry.caseId === "attention_queue_projection_treated_as_scheduler"
  );
  const workCellCandidateCase = packet.cases.find((entry) =>
    entry.caseId === "work_cell_candidate_treated_as_work_cell_creation"
  );
  const workCellOperatorDecisionCase = packet.cases.find((entry) =>
    entry.caseId === "work_cell_operator_decision_treated_as_scheduling_or_execution"
  );
  const workCellCreationCase = packet.cases.find((entry) =>
    entry.caseId === "work_cell_creation_treated_as_execution"
  );
  const dispatchDecisionRequestCase = packet.cases.find((entry) =>
    entry.caseId === "dispatch_decision_request_treated_as_dispatch_approval"
  );
  const dispatchDecisionRequestObservationCase = packet.cases.find((entry) =>
    entry.caseId === "dispatch_decision_request_observation_treated_as_platform_call"
  );
  const workCellDispatchCandidateCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_dispatch_candidate_treated_as_dispatch"
  );
  const workCellDispatchObservationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_dispatch_observation_treated_as_execution_or_success"
  );
  const workCellResultIntakeTruthCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_intake_treated_as_acceptance_truth"
  );
  const workCellResultIntakePayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_intake_treated_as_payload_or_mutation"
  );
  const workCellSidecarAcceptanceDecisionCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_sidecar_treated_as_acceptance_or_decision"
  );
  const workCellSidecarApplicationMutationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_sidecar_treated_as_application_merge_mutation"
  );
  const workCellSidecarPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_sidecar_treated_as_payload_validity_materialization"
  );
  const workCellAcceptanceCandidateDecisionCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_candidate_treated_as_decision_or_acceptance"
  );
  const workCellAcceptanceCandidateApplicationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_candidate_treated_as_application_merge_mutation"
  );
  const workCellAcceptanceCandidateAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_candidate_treated_as_layer_storage_authority"
  );
  const workCellAcceptanceDecisionApplicationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_decision_treated_as_application_merge_mutation"
  );
  const workCellAcceptanceDecisionAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_decision_treated_as_layer_storage_authority"
  );
  const workCellAcceptanceDecisionPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_decision_treated_as_payload_validity"
  );
  const workCellAcceptanceDecisionDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_decision_treated_as_dispatch_execution_platform"
  );
  const workCellAcceptanceDecisionAutoCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_decision_treated_as_event_family_auto_execute"
  );
  const workCellAcceptanceObservationApplicationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_observation_treated_as_application_merge_mutation"
  );
  const workCellAcceptanceObservationPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_observation_treated_as_payload_validity"
  );
  const workCellAcceptanceObservationAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_observation_treated_as_layer_storage_authority"
  );
  const workCellAcceptanceObservationDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_result_acceptance_observation_treated_as_dispatch_execution_auto_execute"
  );
  const workCellLoopSummaryApplicationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_summary_treated_as_application_merge_mutation"
  );
  const workCellLoopSummaryPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_summary_treated_as_payload_validity"
  );
  const workCellLoopSummaryAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_summary_treated_as_authority_or_next_approval"
  );
  const workCellLoopSummaryTuiCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_summary_tui_treated_as_action_surface"
  );
  const workCellLoopFieldTrialAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_field_trial_treated_as_general_enclosure_or_authority"
  );
  const workCellLoopFieldTrialApplicationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_field_trial_treated_as_application_merge_mutation"
  );
  const workCellLoopFieldTrialPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_field_trial_treated_as_payload_or_storage"
  );
  const workCellLoopFieldTrialTuiCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_field_trial_tui_treated_as_action_surface"
  );
  const workCellLoopRepetitionWallClockCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_repetition_batch_treated_as_wall_clock_or_general_enclosure"
  );
  const workCellLoopRepetitionDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_repetition_batch_treated_as_scheduling_dispatch_execution"
  );
  const workCellLoopRepetitionApplicationCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_repetition_batch_treated_as_application_merge_mutation"
  );
  const workCellLoopRepetitionPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_repetition_batch_treated_as_payload_storage_authority"
  );
  const workCellLoopRepetitionTuiCase = packet.cases.find((entry) =>
    entry.caseId === "review_only_work_cell_loop_repetition_batch_tui_treated_as_action_surface"
  );
  const tuiVisibilityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_visibility_treated_as_authority"
  );

  assert.equal(report.blockedCaseIds.includes("attention_queue_projection_treated_as_scheduler"), true);
  assert.equal(report.blockedCaseIds.includes("work_cell_candidate_treated_as_work_cell_creation"), true);
  assert.equal(
    report.blockedCaseIds.includes("work_cell_operator_decision_treated_as_scheduling_or_execution"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("work_cell_creation_treated_as_execution"), true);
  assert.equal(report.blockedCaseIds.includes("dispatch_decision_request_treated_as_dispatch_approval"), true);
  assert.equal(
    report.blockedCaseIds.includes("dispatch_decision_request_observation_treated_as_platform_call"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_dispatch_candidate_treated_as_dispatch"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_dispatch_observation_treated_as_execution_or_success"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_intake_treated_as_acceptance_truth"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_intake_treated_as_payload_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_sidecar_treated_as_acceptance_or_decision"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_sidecar_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_sidecar_treated_as_payload_validity_materialization"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_candidate_treated_as_decision_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_candidate_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_candidate_treated_as_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_decision_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_decision_treated_as_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_decision_treated_as_payload_validity"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_decision_treated_as_dispatch_execution_platform"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_decision_treated_as_event_family_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_observation_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_observation_treated_as_payload_validity"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_observation_treated_as_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_result_acceptance_observation_treated_as_dispatch_execution_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_summary_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_summary_treated_as_payload_validity"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_summary_treated_as_authority_or_next_approval"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_summary_tui_treated_as_action_surface"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_field_trial_treated_as_general_enclosure_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_field_trial_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_field_trial_treated_as_payload_or_storage"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_field_trial_tui_treated_as_action_surface"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_repetition_batch_treated_as_wall_clock_or_general_enclosure"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_repetition_batch_treated_as_scheduling_dispatch_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_repetition_batch_treated_as_application_merge_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_repetition_batch_treated_as_payload_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("review_only_work_cell_loop_repetition_batch_tui_treated_as_action_surface"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("tui_visibility_treated_as_authority"), true);
  assert.equal(attentionQueueCase.stopStatus, "blocked");
  assert.equal(attentionQueueCase.boundary.dispatchesRepoAgents, false);
  assert.equal(attentionQueueCase.boundary.executesBehavior, false);
  assert.equal(attentionQueueCase.boundary.createsAuthority, false);
  assert.equal(workCellCandidateCase.stopStatus, "blocked");
  assert.equal(workCellCandidateCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellCandidateCase.boundary.executesBehavior, false);
  assert.equal(workCellCandidateCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellOperatorDecisionCase.stopStatus, "blocked");
  assert.equal(workCellOperatorDecisionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellOperatorDecisionCase.boundary.executesBehavior, false);
  assert.equal(workCellOperatorDecisionCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellOperatorDecisionCase.boundary.createsAuthority, false);
  assert.equal(workCellCreationCase.stopStatus, "blocked");
  assert.equal(workCellCreationCase.boundary.executesBehavior, false);
  assert.equal(workCellCreationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellCreationCase.boundary.claimsTruth, false);
  assert.equal(dispatchDecisionRequestCase.stopStatus, "blocked");
  assert.equal(dispatchDecisionRequestCase.boundary.dispatchesRepoAgents, false);
  assert.equal(dispatchDecisionRequestCase.boundary.callsPlatform, false);
  assert.equal(dispatchDecisionRequestCase.boundary.executesBehavior, false);
  assert.equal(dispatchDecisionRequestCase.boundary.createsAuthority, false);
  assert.equal(dispatchDecisionRequestObservationCase.stopStatus, "blocked");
  assert.equal(dispatchDecisionRequestObservationCase.boundary.dispatchesRepoAgents, false);
  assert.equal(dispatchDecisionRequestObservationCase.boundary.callsPlatform, false);
  assert.equal(dispatchDecisionRequestObservationCase.boundary.executesBehavior, false);
  assert.equal(dispatchDecisionRequestObservationCase.boundary.mutatesSourceRepo, false);
  assert.equal(dispatchDecisionRequestObservationCase.boundary.createsAuthority, false);
  assert.equal(workCellDispatchCandidateCase.stopStatus, "blocked");
  assert.equal(workCellDispatchCandidateCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellDispatchCandidateCase.boundary.executesBehavior, false);
  assert.equal(workCellDispatchCandidateCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellDispatchCandidateCase.boundary.createsAuthority, false);
  assert.equal(workCellDispatchObservationCase.stopStatus, "blocked");
  assert.equal(workCellDispatchObservationCase.boundary.executesBehavior, false);
  assert.equal(workCellDispatchObservationCase.boundary.claimsTruth, false);
  assert.equal(workCellDispatchObservationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellDispatchObservationCase.boundary.createsAuthority, false);
  assert.equal(workCellResultIntakeTruthCase.stopStatus, "blocked");
  assert.equal(workCellResultIntakeTruthCase.boundary.claimsTruth, false);
  assert.equal(workCellResultIntakeTruthCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellResultIntakeTruthCase.boundary.createsAuthority, false);
  assert.equal(workCellResultIntakePayloadCase.stopStatus, "blocked");
  assert.equal(workCellResultIntakePayloadCase.boundary.callsBytes, false);
  assert.equal(workCellResultIntakePayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellResultIntakePayloadCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellResultIntakePayloadCase.boundary.mutatesLayer, false);
  assert.equal(workCellResultIntakePayloadCase.boundary.writesProductionStorage, false);
  assert.equal(workCellSidecarAcceptanceDecisionCase.stopStatus, "blocked");
  assert.equal(workCellSidecarAcceptanceDecisionCase.boundary.callsEdge, false);
  assert.equal(workCellSidecarAcceptanceDecisionCase.boundary.createsAuthority, false);
  assert.equal(workCellSidecarAcceptanceDecisionCase.boundary.claimsTruth, false);
  assert.equal(workCellSidecarApplicationMutationCase.stopStatus, "blocked");
  assert.equal(workCellSidecarApplicationMutationCase.boundary.executesBehavior, false);
  assert.equal(workCellSidecarApplicationMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellSidecarApplicationMutationCase.boundary.mutatesLayer, false);
  assert.equal(workCellSidecarApplicationMutationCase.boundary.writesProductionStorage, false);
  assert.equal(workCellSidecarPayloadCase.stopStatus, "blocked");
  assert.equal(workCellSidecarPayloadCase.boundary.callsBytes, false);
  assert.equal(workCellSidecarPayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellAcceptanceCandidateDecisionCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceCandidateDecisionCase.boundary.callsEdge, false);
  assert.equal(workCellAcceptanceCandidateDecisionCase.boundary.createsAuthority, false);
  assert.equal(workCellAcceptanceCandidateDecisionCase.boundary.claimsTruth, false);
  assert.equal(workCellAcceptanceCandidateApplicationCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceCandidateApplicationCase.boundary.executesBehavior, false);
  assert.equal(workCellAcceptanceCandidateApplicationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellAcceptanceCandidateApplicationCase.boundary.mutatesLayer, false);
  assert.equal(workCellAcceptanceCandidateApplicationCase.boundary.autoExecutes, false);
  assert.equal(workCellAcceptanceCandidateAuthorityCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceCandidateAuthorityCase.boundary.acceptsContinuity, false);
  assert.equal(workCellAcceptanceCandidateAuthorityCase.boundary.claimsTruth, false);
  assert.equal(workCellAcceptanceCandidateAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(workCellAcceptanceCandidateAuthorityCase.boundary.createsAuthority, false);
  assert.equal(workCellAcceptanceCandidateAuthorityCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellAcceptanceDecisionApplicationCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceDecisionApplicationCase.boundary.executesBehavior, false);
  assert.equal(workCellAcceptanceDecisionApplicationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellAcceptanceDecisionApplicationCase.boundary.mutatesLayer, false);
  assert.equal(workCellAcceptanceDecisionAuthorityCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceDecisionAuthorityCase.boundary.acceptsContinuity, false);
  assert.equal(workCellAcceptanceDecisionAuthorityCase.boundary.claimsTruth, false);
  assert.equal(workCellAcceptanceDecisionAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(workCellAcceptanceDecisionAuthorityCase.boundary.createsAuthority, false);
  assert.equal(workCellAcceptanceDecisionPayloadCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceDecisionPayloadCase.boundary.callsBytes, false);
  assert.equal(workCellAcceptanceDecisionPayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellAcceptanceDecisionDispatchCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceDecisionDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellAcceptanceDecisionDispatchCase.boundary.executesBehavior, false);
  assert.equal(workCellAcceptanceDecisionDispatchCase.boundary.callsPlatform, false);
  assert.equal(workCellAcceptanceDecisionAutoCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceDecisionAutoCase.boundary.autoExecutes, false);
  assert.equal(workCellAcceptanceDecisionAutoCase.boundary.createsAuthority, false);
  assert.equal(workCellAcceptanceObservationApplicationCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceObservationApplicationCase.boundary.executesBehavior, false);
  assert.equal(workCellAcceptanceObservationApplicationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellAcceptanceObservationApplicationCase.boundary.mutatesLayer, false);
  assert.equal(workCellAcceptanceObservationPayloadCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceObservationPayloadCase.boundary.callsBytes, false);
  assert.equal(workCellAcceptanceObservationPayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellAcceptanceObservationAuthorityCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceObservationAuthorityCase.boundary.acceptsContinuity, false);
  assert.equal(workCellAcceptanceObservationAuthorityCase.boundary.claimsTruth, false);
  assert.equal(workCellAcceptanceObservationAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(workCellAcceptanceObservationAuthorityCase.boundary.createsAuthority, false);
  assert.equal(workCellAcceptanceObservationDispatchCase.stopStatus, "blocked");
  assert.equal(workCellAcceptanceObservationDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellAcceptanceObservationDispatchCase.boundary.executesBehavior, false);
  assert.equal(workCellAcceptanceObservationDispatchCase.boundary.callsPlatform, false);
  assert.equal(workCellAcceptanceObservationDispatchCase.boundary.autoExecutes, false);
  assert.equal(workCellLoopSummaryApplicationCase.stopStatus, "blocked");
  assert.equal(workCellLoopSummaryApplicationCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopSummaryApplicationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellLoopSummaryApplicationCase.boundary.mutatesLayer, false);
  assert.equal(workCellLoopSummaryPayloadCase.stopStatus, "blocked");
  assert.equal(workCellLoopSummaryPayloadCase.boundary.callsBytes, false);
  assert.equal(workCellLoopSummaryPayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellLoopSummaryAuthorityCase.stopStatus, "blocked");
  assert.equal(workCellLoopSummaryAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(workCellLoopSummaryAuthorityCase.boundary.createsAuthority, false);
  assert.equal(workCellLoopSummaryAuthorityCase.boundary.acceptsContinuity, false);
  assert.equal(workCellLoopSummaryAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellLoopSummaryTuiCase.stopStatus, "blocked");
  assert.equal(workCellLoopSummaryTuiCase.boundary.callsEdge, false);
  assert.equal(workCellLoopSummaryTuiCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopSummaryTuiCase.boundary.autoExecutes, false);
  assert.equal(workCellLoopFieldTrialAuthorityCase.stopStatus, "blocked");
  assert.equal(workCellLoopFieldTrialAuthorityCase.boundary.createsAuthority, false);
  assert.equal(workCellLoopFieldTrialAuthorityCase.boundary.claimsTruth, false);
  assert.equal(workCellLoopFieldTrialAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellLoopFieldTrialApplicationCase.stopStatus, "blocked");
  assert.equal(workCellLoopFieldTrialApplicationCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopFieldTrialApplicationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellLoopFieldTrialApplicationCase.boundary.mutatesLayer, false);
  assert.equal(workCellLoopFieldTrialPayloadCase.stopStatus, "blocked");
  assert.equal(workCellLoopFieldTrialPayloadCase.boundary.callsBytes, false);
  assert.equal(workCellLoopFieldTrialPayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellLoopFieldTrialPayloadCase.boundary.writesProductionStorage, false);
  assert.equal(workCellLoopFieldTrialPayloadCase.boundary.acceptsContinuity, false);
  assert.equal(workCellLoopFieldTrialTuiCase.stopStatus, "blocked");
  assert.equal(workCellLoopFieldTrialTuiCase.boundary.callsEdge, false);
  assert.equal(workCellLoopFieldTrialTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellLoopFieldTrialTuiCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopFieldTrialTuiCase.boundary.autoExecutes, false);
  assert.equal(workCellLoopRepetitionWallClockCase.stopStatus, "blocked");
  assert.equal(workCellLoopRepetitionWallClockCase.boundary.createsAuthority, false);
  assert.equal(workCellLoopRepetitionWallClockCase.boundary.claimsTruth, false);
  assert.equal(workCellLoopRepetitionWallClockCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellLoopRepetitionDispatchCase.stopStatus, "blocked");
  assert.equal(workCellLoopRepetitionDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellLoopRepetitionDispatchCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopRepetitionDispatchCase.boundary.callsPlatform, false);
  assert.equal(workCellLoopRepetitionDispatchCase.boundary.autoExecutes, false);
  assert.equal(workCellLoopRepetitionApplicationCase.stopStatus, "blocked");
  assert.equal(workCellLoopRepetitionApplicationCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopRepetitionApplicationCase.boundary.mutatesSourceRepo, false);
  assert.equal(workCellLoopRepetitionApplicationCase.boundary.mutatesLayer, false);
  assert.equal(workCellLoopRepetitionPayloadCase.stopStatus, "blocked");
  assert.equal(workCellLoopRepetitionPayloadCase.boundary.callsBytes, false);
  assert.equal(workCellLoopRepetitionPayloadCase.boundary.claimsPayloadValidity, false);
  assert.equal(workCellLoopRepetitionPayloadCase.boundary.writesProductionStorage, false);
  assert.equal(workCellLoopRepetitionPayloadCase.boundary.acceptsContinuity, false);
  assert.equal(workCellLoopRepetitionPayloadCase.boundary.createsAuthority, false);
  assert.equal(workCellLoopRepetitionTuiCase.stopStatus, "blocked");
  assert.equal(workCellLoopRepetitionTuiCase.boundary.callsEdge, false);
  assert.equal(workCellLoopRepetitionTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(workCellLoopRepetitionTuiCase.boundary.executesBehavior, false);
  assert.equal(workCellLoopRepetitionTuiCase.boundary.autoExecutes, false);
  assert.equal(tuiVisibilityCase.stopStatus, "blocked");
  assert.equal(tuiVisibilityCase.boundary.callsEdge, false);
  assert.equal(tuiVisibilityCase.boundary.createsAuthority, false);
  assert.equal(tuiVisibilityCase.boundary.claimsTruth, false);
});

test("Lane D keeps candidate export and copy-ready text boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const candidateExportWorkCellCase = packet.cases.find((entry) =>
    entry.caseId === "candidate_export_treated_as_work_cell_creation"
  );
  const candidateExportDispatchRequestCase = packet.cases.find((entry) =>
    entry.caseId === "candidate_export_treated_as_dispatch_decision_request_creation"
  );
  const copyReadyAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "copy_ready_text_treated_as_authority"
  );
  const repoAgentPromptCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_prompt_treated_as_repo_mutation_approval"
  );
  const operatorDecisionTextCase = packet.cases.find((entry) =>
    entry.caseId === "operator_decision_text_treated_as_decision_capture"
  );

  assert.equal(report.blockedCaseIds.includes("candidate_export_treated_as_work_cell_creation"), true);
  assert.equal(
    report.blockedCaseIds.includes("candidate_export_treated_as_dispatch_decision_request_creation"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("copy_ready_text_treated_as_authority"), true);
  assert.equal(report.blockedCaseIds.includes("repo_agent_prompt_treated_as_repo_mutation_approval"), true);
  assert.equal(report.blockedCaseIds.includes("operator_decision_text_treated_as_decision_capture"), true);
  assert.equal(candidateExportWorkCellCase.stopStatus, "blocked");
  assert.equal(candidateExportWorkCellCase.boundary.executesBehavior, false);
  assert.equal(candidateExportWorkCellCase.boundary.mutatesSourceRepo, false);
  assert.equal(candidateExportWorkCellCase.boundary.createsAuthority, false);
  assert.equal(candidateExportDispatchRequestCase.stopStatus, "blocked");
  assert.equal(candidateExportDispatchRequestCase.boundary.dispatchesRepoAgents, false);
  assert.equal(candidateExportDispatchRequestCase.boundary.callsPlatform, false);
  assert.equal(candidateExportDispatchRequestCase.boundary.createsAuthority, false);
  assert.equal(copyReadyAuthorityCase.stopStatus, "blocked");
  assert.equal(copyReadyAuthorityCase.boundary.createsAuthority, false);
  assert.equal(copyReadyAuthorityCase.boundary.claimsTruth, false);
  assert.equal(copyReadyAuthorityCase.boundary.acceptsContinuity, false);
  assert.equal(repoAgentPromptCase.stopStatus, "blocked");
  assert.equal(repoAgentPromptCase.boundary.mutatesSourceRepo, false);
  assert.equal(repoAgentPromptCase.boundary.dispatchesRepoAgents, false);
  assert.equal(repoAgentPromptCase.boundary.createsAuthority, false);
  assert.equal(operatorDecisionTextCase.stopStatus, "blocked");
  assert.equal(operatorDecisionTextCase.boundary.callsEdge, false);
  assert.equal(operatorDecisionTextCase.boundary.createsAuthority, false);
  assert.equal(operatorDecisionTextCase.boundary.executesBehavior, false);
});

test("Lane D keeps repo-agent seat descriptor readiness and TUI cards fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const descriptorCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_descriptor_treated_as_identity_or_admission"
  );
  const readinessDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_readiness_treated_as_scheduling_dispatch_execution"
  );
  const readinessTruthCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_readiness_treated_as_result_truth_or_acceptance"
  );
  const readinessAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_readiness_treated_as_repo_layer_storage_authority"
  );
  const tuiCardCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_tui_card_treated_as_action_surface"
  );

  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_descriptor_treated_as_identity_or_admission"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_readiness_treated_as_scheduling_dispatch_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_readiness_treated_as_result_truth_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_readiness_treated_as_repo_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_tui_card_treated_as_action_surface"),
    true
  );
  assert.equal(descriptorCase.stopStatus, "blocked");
  assert.equal(descriptorCase.boundary.createsAuthority, false);
  assert.equal(descriptorCase.boundary.mutatesSourceRepo, false);
  assert.equal(descriptorCase.boundary.mutatesLayer, false);
  assert.equal(readinessDispatchCase.stopStatus, "blocked");
  assert.equal(readinessDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(readinessDispatchCase.boundary.executesBehavior, false);
  assert.equal(readinessDispatchCase.boundary.autoExecutes, false);
  assert.equal(readinessTruthCase.stopStatus, "blocked");
  assert.equal(readinessTruthCase.boundary.claimsTruth, false);
  assert.equal(readinessTruthCase.boundary.executesBehavior, false);
  assert.equal(readinessTruthCase.boundary.mutatesSourceRepo, false);
  assert.equal(readinessAuthorityCase.stopStatus, "blocked");
  assert.equal(readinessAuthorityCase.boundary.mutatesSourceRepo, false);
  assert.equal(readinessAuthorityCase.boundary.mutatesLayer, false);
  assert.equal(readinessAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(readinessAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiCardCase.stopStatus, "blocked");
  assert.equal(tuiCardCase.boundary.callsEdge, false);
  assert.equal(tuiCardCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiCardCase.boundary.executesBehavior, false);
  assert.equal(tuiCardCase.boundary.autoExecutes, false);
});

test("Lane D keeps repo-agent operational board fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const schedulingCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_treated_as_scheduling_dispatch_execution"
  );
  const decisionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_treated_as_decision_capture_or_approval"
  );
  const resultCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_treated_as_result_acceptance_truth_application"
  );
  const authorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_treated_as_repo_layer_storage_authority"
  );
  const tuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_tui_treated_as_action_surface"
  );

  assert.equal(
    report.blockedCaseIds.includes("repo_agent_operational_board_treated_as_scheduling_dispatch_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_operational_board_treated_as_decision_capture_or_approval"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_operational_board_treated_as_result_acceptance_truth_application"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_operational_board_treated_as_repo_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_operational_board_tui_treated_as_action_surface"),
    true
  );
  assert.equal(schedulingCase.stopStatus, "blocked");
  assert.equal(schedulingCase.boundary.dispatchesRepoAgents, false);
  assert.equal(schedulingCase.boundary.executesBehavior, false);
  assert.equal(schedulingCase.boundary.autoExecutes, false);
  assert.equal(decisionCase.stopStatus, "blocked");
  assert.equal(decisionCase.boundary.callsEdge, false);
  assert.equal(decisionCase.boundary.createsAuthority, false);
  assert.equal(resultCase.stopStatus, "blocked");
  assert.equal(resultCase.boundary.claimsTruth, false);
  assert.equal(resultCase.boundary.mutatesSourceRepo, false);
  assert.equal(resultCase.boundary.acceptsContinuity, false);
  assert.equal(authorityCase.stopStatus, "blocked");
  assert.equal(authorityCase.boundary.mutatesSourceRepo, false);
  assert.equal(authorityCase.boundary.mutatesLayer, false);
  assert.equal(authorityCase.boundary.writesProductionStorage, false);
  assert.equal(authorityCase.boundary.createsAuthority, false);
  assert.equal(tuiCase.stopStatus, "blocked");
  assert.equal(tuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiCase.boundary.executesBehavior, false);
  assert.equal(tuiCase.boundary.autoExecutes, false);
});

test("Lane D keeps repo-agent operational board field-use report fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const schedulingCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_field_use_report_treated_as_scheduling_dispatch_execution"
  );
  const decisionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_field_use_report_treated_as_decision_or_authority"
  );
  const resultCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_field_use_report_treated_as_result_truth_or_mutation"
  );
  const enclosureCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_field_use_report_treated_as_general_enclosure_or_auto_execute"
  );

  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_field_use_report_treated_as_scheduling_dispatch_execution"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_field_use_report_treated_as_decision_or_authority"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_field_use_report_treated_as_result_truth_or_mutation"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_field_use_report_treated_as_general_enclosure_or_auto_execute"
    ),
    true
  );
  assert.equal(schedulingCase.stopStatus, "blocked");
  assert.equal(schedulingCase.boundary.dispatchesRepoAgents, false);
  assert.equal(schedulingCase.boundary.executesBehavior, false);
  assert.equal(schedulingCase.boundary.autoExecutes, false);
  assert.equal(decisionCase.stopStatus, "blocked");
  assert.equal(decisionCase.boundary.callsEdge, false);
  assert.equal(decisionCase.boundary.createsAuthority, false);
  assert.equal(decisionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(resultCase.stopStatus, "blocked");
  assert.equal(resultCase.boundary.claimsTruth, false);
  assert.equal(resultCase.boundary.mutatesSourceRepo, false);
  assert.equal(resultCase.boundary.mutatesLayer, false);
  assert.equal(resultCase.boundary.acceptsContinuity, false);
  assert.equal(enclosureCase.stopStatus, "blocked");
  assert.equal(enclosureCase.boundary.writesProductionStorage, false);
  assert.equal(enclosureCase.boundary.createsAuthority, false);
  assert.equal(enclosureCase.boundary.acceptsContinuity, false);
  assert.equal(enclosureCase.boundary.autoExecutes, false);
});

test("Lane D keeps hardened board field-use measurement fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const schedulingCase = packet.cases.find((entry) =>
    entry.caseId ===
      "repo_agent_operational_board_hardened_field_measurement_treated_as_scheduling_dispatch_execution"
  );
  const decisionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_operational_board_hardened_field_measurement_treated_as_decision_or_authority"
  );
  const resultCase = packet.cases.find((entry) =>
    entry.caseId ===
      "repo_agent_operational_board_hardened_field_measurement_treated_as_result_truth_mutation_or_auto_execute"
  );

  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_hardened_field_measurement_treated_as_scheduling_dispatch_execution"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_hardened_field_measurement_treated_as_decision_or_authority"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_hardened_field_measurement_treated_as_result_truth_mutation_or_auto_execute"
    ),
    true
  );
  assert.equal(schedulingCase.stopStatus, "blocked");
  assert.equal(schedulingCase.boundary.dispatchesRepoAgents, false);
  assert.equal(schedulingCase.boundary.executesBehavior, false);
  assert.equal(schedulingCase.boundary.autoExecutes, false);
  assert.equal(decisionCase.stopStatus, "blocked");
  assert.equal(decisionCase.boundary.callsEdge, false);
  assert.equal(decisionCase.boundary.createsAuthority, false);
  assert.equal(resultCase.stopStatus, "blocked");
  assert.equal(resultCase.boundary.claimsTruth, false);
  assert.equal(resultCase.boundary.mutatesSourceRepo, false);
  assert.equal(resultCase.boundary.mutatesLayer, false);
  assert.equal(resultCase.boundary.writesProductionStorage, false);
  assert.equal(resultCase.boundary.autoExecutes, false);
});

test("Lane D keeps operational board prompt candidates fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const promptDispatchCase = packet.cases.find((entry) =>
    entry.caseId ===
      "repo_agent_operational_board_prompt_candidate_treated_as_prompt_delivery_or_dispatch"
  );
  const decisionCase = packet.cases.find((entry) =>
    entry.caseId ===
      "repo_agent_operational_board_prompt_candidate_treated_as_decision_or_authority"
  );
  const resultCase = packet.cases.find((entry) =>
    entry.caseId ===
      "repo_agent_operational_board_prompt_candidate_treated_as_result_truth_mutation_or_auto_execute"
  );

  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_prompt_candidate_treated_as_prompt_delivery_or_dispatch"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_prompt_candidate_treated_as_decision_or_authority"
    ),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes(
      "repo_agent_operational_board_prompt_candidate_treated_as_result_truth_mutation_or_auto_execute"
    ),
    true
  );
  assert.equal(promptDispatchCase.stopStatus, "blocked");
  assert.equal(promptDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(promptDispatchCase.boundary.executesBehavior, false);
  assert.equal(promptDispatchCase.boundary.autoExecutes, false);
  assert.equal(decisionCase.stopStatus, "blocked");
  assert.equal(decisionCase.boundary.callsEdge, false);
  assert.equal(decisionCase.boundary.createsAuthority, false);
  assert.equal(resultCase.stopStatus, "blocked");
  assert.equal(resultCase.boundary.claimsTruth, false);
  assert.equal(resultCase.boundary.mutatesSourceRepo, false);
  assert.equal(resultCase.boundary.mutatesLayer, false);
  assert.equal(resultCase.boundary.writesProductionStorage, false);
  assert.equal(resultCase.boundary.autoExecutes, false);
});

test("Lane D keeps export result intake candidate boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const resultIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_candidate_treated_as_result_intake"
  );
  const decisionCaptureCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_candidate_treated_as_operator_decision_capture"
  );
  const acceptanceTruthCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_candidate_treated_as_acceptance_truth"
  );
  const executionMutationCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_candidate_treated_as_execution_or_mutation"
  );

  assert.equal(report.blockedCaseIds.includes("export_result_intake_candidate_treated_as_result_intake"), true);
  assert.equal(
    report.blockedCaseIds.includes("export_result_intake_candidate_treated_as_operator_decision_capture"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("export_result_intake_candidate_treated_as_acceptance_truth"), true);
  assert.equal(report.blockedCaseIds.includes("export_result_intake_candidate_treated_as_execution_or_mutation"), true);
  assert.equal(resultIntakeCase.stopStatus, "blocked");
  assert.equal(resultIntakeCase.boundary.dispatchesRepoAgents, false);
  assert.equal(resultIntakeCase.boundary.executesBehavior, false);
  assert.equal(resultIntakeCase.boundary.createsAuthority, false);
  assert.equal(decisionCaptureCase.stopStatus, "blocked");
  assert.equal(decisionCaptureCase.boundary.callsEdge, false);
  assert.equal(decisionCaptureCase.boundary.createsAuthority, false);
  assert.equal(decisionCaptureCase.boundary.claimsTruth, false);
  assert.equal(acceptanceTruthCase.stopStatus, "blocked");
  assert.equal(acceptanceTruthCase.boundary.claimsTruth, false);
  assert.equal(acceptanceTruthCase.boundary.acceptsContinuity, false);
  assert.equal(acceptanceTruthCase.boundary.createsAuthority, false);
  assert.equal(executionMutationCase.stopStatus, "blocked");
  assert.equal(executionMutationCase.boundary.executesBehavior, false);
  assert.equal(executionMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(executionMutationCase.boundary.mutatesLayer, false);
  assert.equal(executionMutationCase.boundary.writesProductionStorage, false);
});

test("Lane D keeps export result intake decision observation and board boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const operatorDecisionCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_operator_decision_treated_as_acceptance_or_execution"
  );
  const observationCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_observation_treated_as_acceptance_truth_mutation"
  );
  const boardCase = packet.cases.find((entry) =>
    entry.caseId === "export_result_intake_board_projection_treated_as_authority_or_action"
  );
  const platformReviewCase = packet.cases.find((entry) =>
    entry.caseId === "platform_returned_operator_review_treated_as_dispatch_approval"
  );

  assert.equal(
    report.blockedCaseIds.includes("export_result_intake_operator_decision_treated_as_acceptance_or_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("export_result_intake_observation_treated_as_acceptance_truth_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("export_result_intake_board_projection_treated_as_authority_or_action"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("platform_returned_operator_review_treated_as_dispatch_approval"), true);
  assert.equal(operatorDecisionCase.stopStatus, "blocked");
  assert.equal(operatorDecisionCase.boundary.executesBehavior, false);
  assert.equal(operatorDecisionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(operatorDecisionCase.boundary.mutatesSourceRepo, false);
  assert.equal(operatorDecisionCase.boundary.createsAuthority, false);
  assert.equal(observationCase.stopStatus, "blocked");
  assert.equal(observationCase.boundary.claimsTruth, false);
  assert.equal(observationCase.boundary.mutatesSourceRepo, false);
  assert.equal(observationCase.boundary.mutatesLayer, false);
  assert.equal(observationCase.boundary.writesProductionStorage, false);
  assert.equal(boardCase.stopStatus, "blocked");
  assert.equal(boardCase.boundary.callsEdge, false);
  assert.equal(boardCase.boundary.dispatchesRepoAgents, false);
  assert.equal(boardCase.boundary.executesBehavior, false);
  assert.equal(boardCase.boundary.createsAuthority, false);
  assert.equal(platformReviewCase.stopStatus, "blocked");
  assert.equal(platformReviewCase.boundary.callsPlatform, false);
  assert.equal(platformReviewCase.boundary.executesBehavior, false);
  assert.equal(platformReviewCase.boundary.mutatesSourceRepo, false);
  assert.equal(platformReviewCase.boundary.createsAuthority, false);
});

test("Lane D keeps repo-agent seat exchange convention boundaries fail-closed", () => {
  const report = build();
  const packet = packetFixture();
  const conventionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_convention_treated_as_transport_scheduler_or_authority"
  );
  const inboxCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_packet_candidate_treated_as_delivery_invocation_or_work_cell"
  );
  const outboxCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_report_candidate_treated_as_import_acceptance_truth_or_mutation"
  );
  const handoffAttemptCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_decision_treated_as_handoff_attempt"
  );
  const handoffDeliveryCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_decision_treated_as_delivery_dispatch_execution"
  );
  const handoffResultCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_decision_treated_as_result_import_acceptance_truth"
  );
  const handoffAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_decision_treated_as_repo_layer_storage_authority"
  );
  const handoffObservationPathCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_observation_treated_as_implicit_path_or_repo_discovery"
  );
  const handoffObservationTransportCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_observation_treated_as_shell_network_or_agent_invocation"
  );
  const handoffObservationDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_observation_treated_as_dispatch_execution_or_work_cell"
  );
  const handoffObservationResultCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_observation_treated_as_result_import_acceptance_truth"
  );
  const handoffObservationAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_observation_treated_as_repo_layer_storage_authority"
  );
  const outboxImportDecisionImportCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_decision_treated_as_import_or_result_intake"
  );
  const outboxImportDecisionAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_decision_treated_as_acceptance_truth_or_payload"
  );
  const outboxImportDecisionMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_decision_treated_as_application_merge_or_mutation"
  );
  const outboxImportDecisionDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_decision_treated_as_dispatch_execution_or_platform"
  );
  const outboxImportDecisionAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_decision_treated_as_authority_event_or_auto_execute"
  );
  const handoffReceiptProofCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_inbox_handoff_receipt_treated_as_delivery_read_or_execution_proof"
  );
  const outboxImportObservationPathCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_observation_treated_as_implicit_path_or_repo_discovery"
  );
  const outboxImportObservationTransportCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_observation_treated_as_shell_network_or_agent_invocation"
  );
  const outboxImportObservationIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_observation_treated_as_result_intake_acceptance_truth"
  );
  const outboxImportObservationPayloadCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_observation_treated_as_payload_validity_or_materialization"
  );
  const outboxImportObservationMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_observation_treated_as_application_merge_or_mutation"
  );
  const outboxImportObservationAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_import_observation_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const outboxResultIntakeCandidateIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_candidate_treated_as_result_intake_or_decision"
  );
  const outboxResultIntakeCandidateAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_candidate_treated_as_acceptance_truth_or_payload"
  );
  const outboxResultIntakeCandidateMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_candidate_treated_as_application_merge_or_mutation"
  );
  const outboxResultIntakeCandidateAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_candidate_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const outboxResultIntakeDecisionIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_decision_treated_as_intake_or_observation"
  );
  const outboxResultIntakeDecisionAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_decision_treated_as_acceptance_truth_or_payload"
  );
  const outboxResultIntakeDecisionMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_decision_treated_as_application_merge_or_mutation"
  );
  const outboxResultIntakeDecisionAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_decision_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const outboxResultIntakeObservationAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_observation_treated_as_acceptance_truth_or_payload"
  );
  const outboxResultIntakeObservationMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_observation_treated_as_application_merge_or_mutation"
  );
  const outboxResultIntakeObservationAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_outbox_result_intake_observation_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const exchangeLoopSummaryProofCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_summary_treated_as_delivery_read_or_execution_proof"
  );
  const exchangeLoopSummaryAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_summary_treated_as_acceptance_truth_or_payload"
  );
  const exchangeLoopSummaryMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_summary_treated_as_application_merge_or_mutation"
  );
  const exchangeLoopSummaryAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_summary_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const exchangeLoopBoardTuiBurdenCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_board_tui_burden_treated_as_action_authority"
  );
  const exchangeLoopBurdenMechanicCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_burden_measurement_treated_as_handoff_import_or_intake"
  );
  const exchangeLoopBurdenAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_burden_measurement_treated_as_acceptance_truth_or_payload"
  );
  const exchangeLoopBurdenMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_burden_measurement_treated_as_application_merge_or_mutation"
  );
  const exchangeLoopBurdenAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const exchangeLoopBurdenProofCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  );
  const exchangeLoopBurdenTuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_loop_burden_measurement_tui_treated_as_action_authority"
  );
  const mediationBundleSchedulerCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_treated_as_scheduler_runner_or_workflow"
  );
  const mediationBundleDecisionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_treated_as_decision_or_handoff"
  );
  const mediationBundleImportCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_treated_as_import_intake_or_acceptance"
  );
  const mediationBundleMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_treated_as_payload_or_mutation"
  );
  const mediationBundleAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const mediationBundlePointProofCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_points_treated_as_approval_or_proof"
  );
  const mediationBundleTuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_bundle_tui_treated_as_action_authority"
  );
  const mediationDecisionProjectionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_decision_projection_treated_as_operator_decision"
  );
  const mediationDecisionProjectionActionCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_decision_projection_treated_as_handoff_import_or_intake"
  );
  const mediationDecisionProjectionAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_mediation_decision_projection_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const tuiInboxDecisionCaptureHandoffCase = packet.cases.find((entry) =>
    entry.caseId === "tui_inbox_handoff_decision_capture_treated_as_handoff_attempt"
  );
  const tuiInboxDecisionCaptureDeliveryCase = packet.cases.find((entry) =>
    entry.caseId === "tui_inbox_handoff_decision_capture_treated_as_delivery_or_execution"
  );
  const tuiInboxDecisionCaptureImportCase = packet.cases.find((entry) =>
    entry.caseId === "tui_inbox_handoff_decision_capture_treated_as_import_intake_or_acceptance"
  );
  const tuiInboxDecisionCaptureMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_inbox_handoff_decision_capture_treated_as_payload_application_or_mutation"
  );
  const tuiInboxDecisionCaptureAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_inbox_handoff_decision_capture_treated_as_authority_event_or_auto_execute"
  );
  const tuiInboxDecisionCaptureVisibilityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_inbox_handoff_decision_capture_visibility_treated_as_action_authority"
  );
  const tuiOutboxImportDecisionCaptureImportCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_import_decision_capture_treated_as_outbox_import"
  );
  const tuiOutboxImportDecisionCaptureIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_import_decision_capture_treated_as_result_intake_or_acceptance"
  );
  const tuiOutboxImportDecisionCaptureMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_import_decision_capture_treated_as_payload_application_or_mutation"
  );
  const tuiOutboxImportDecisionCaptureAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_import_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const tuiOutboxImportDecisionCaptureProofCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_import_decision_capture_receipt_treated_as_delivery_read_or_execution_proof"
  );
  const tuiOutboxImportDecisionCaptureVisibilityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_import_decision_capture_visibility_treated_as_action_authority"
  );
  const tuiOutboxResultIntakeDecisionCaptureIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_result_intake_decision_capture_treated_as_result_intake"
  );
  const tuiOutboxResultIntakeDecisionCaptureAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_result_intake_decision_capture_treated_as_acceptance_truth_or_payload"
  );
  const tuiOutboxResultIntakeDecisionCaptureMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_result_intake_decision_capture_treated_as_application_merge_or_mutation"
  );
  const tuiOutboxResultIntakeDecisionCaptureAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_result_intake_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const tuiOutboxResultIntakeDecisionCaptureVisibilityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_outbox_result_intake_decision_capture_visibility_treated_as_action_authority"
  );
  const tuiMediatedMeasurementMechanicCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_treated_as_handoff_import_or_intake"
  );
  const tuiMediatedMeasurementAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_treated_as_acceptance_truth_or_payload"
  );
  const tuiMediatedMeasurementMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_treated_as_application_merge_or_mutation"
  );
  const tuiMediatedMeasurementAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute"
  );
  const tuiMediatedMeasurementProofCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  );
  const tuiMediatedMeasurementActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_decision_capture_treated_as_action_execution"
  );
  const tuiMediatedMeasurementVisibilityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_burden_measurement_tui_treated_as_action_authority"
  );
  const remainingBurdenAnalysisActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_remaining_burden_analysis_treated_as_decision_or_action"
  );
  const remainingBurdenAnalysisAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_remaining_burden_analysis_treated_as_acceptance_mutation_or_authority"
  );
  const remainingBurdenAnalysisRecommendationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_seat_loop_remaining_burden_analysis_recommendation_treated_as_approval"
  );
  const receiptVisibilityMechanicCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_visibility_hardening_treated_as_handoff_import_or_intake"
  );
  const receiptVisibilityAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_visibility_hardening_treated_as_acceptance_truth_or_payload"
  );
  const receiptVisibilityActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_visibility_hardening_treated_as_action_authority_or_proof"
  );
  const receiptNextPostureDecisionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_visibility_next_posture_panel_treated_as_decision_or_action"
  );
  const receiptNextPostureMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_visibility_next_posture_panel_treated_as_acceptance_truth_or_mutation"
  );
  const receiptNextPostureAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_visibility_next_posture_panel_treated_as_approval_authority_or_proof"
  );
  const receiptActionProjectionActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_action_candidate_projection_treated_as_action_or_receipt"
  );
  const receiptActionProjectionMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_action_candidate_projection_treated_as_acceptance_truth_or_mutation"
  );
  const receiptActionProjectionAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "tui_receipt_action_candidate_projection_treated_as_approval_authority_or_auto_execute"
  );
  const tuiTriggeredReceiptActionExecutionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_treated_as_scheduler_dispatch_or_agent_execution"
  );
  const tuiTriggeredReceiptActionAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_treated_as_acceptance_truth_or_payload"
  );
  const tuiTriggeredReceiptActionMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_treated_as_application_merge_mutation_or_authority"
  );
  const tuiTriggeredReceiptMeasurementActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_burden_measurement_treated_as_action_or_receipt"
  );
  const tuiTriggeredReceiptMeasurementAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_burden_measurement_treated_as_acceptance_truth_or_payload"
  );
  const tuiTriggeredReceiptMeasurementMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_burden_measurement_treated_as_application_merge_mutation_or_authority"
  );
  const tuiTriggeredReceiptMeasurementProofCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  );
  const tuiTriggeredReceiptMeasurementTuiCase = packet.cases.find((entry) =>
    entry.caseId === "tui_triggered_receipt_action_burden_measurement_tui_treated_as_action_authority"
  );
  const tuiReceiptLoopSummaryActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_treated_as_action_or_receipt"
  );
  const tuiReceiptLoopSummaryAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_treated_as_acceptance_truth_or_payload"
  );
  const tuiReceiptLoopSummaryMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_treated_as_application_merge_mutation_or_authority"
  );
  const tuiReceiptLoopSummaryProofCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_treated_as_delivery_read_execution_or_enclosure_proof"
  );
  const tuiReceiptLoopSummaryTuiCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_tui_treated_as_action_authority"
  );
  const tuiReceiptLoopSummaryMeasurementActionCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_action_or_receipt"
  );
  const tuiReceiptLoopSummaryMeasurementAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_acceptance_truth_or_payload"
  );
  const tuiReceiptLoopSummaryMeasurementMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_application_merge_mutation_or_authority"
  );
  const tuiReceiptLoopSummaryMeasurementProofCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  );
  const tuiReceiptLoopSummaryMeasurementTuiCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_receipt_action_loop_summary_burden_measurement_tui_treated_as_action_authority"
  );
  const tuiLocalSeatReadinessProofCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_local_seat_loop_operational_readiness_treated_as_enclosure_or_autonomy_proof"
  );
  const tuiLocalSeatReadinessDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_local_seat_loop_operational_readiness_treated_as_dispatch_execution_or_delivery_proof"
  );
  const tuiLocalSeatReadinessAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_local_seat_loop_operational_readiness_treated_as_acceptance_truth_or_payload"
  );
  const tuiLocalSeatReadinessMutationCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_local_seat_loop_operational_readiness_treated_as_application_merge_mutation_or_authority"
  );
  const tuiLocalSeatReadinessTuiCase = packet.cases.find((entry) =>
    entry.caseId === "tui_mediated_local_seat_loop_operational_readiness_tui_treated_as_action_authority"
  );
  const outboxExpectationInvocationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_profile_treated_as_agent_invocation_scheduler_or_dispatch"
  );
  const outboxExpectationImportCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_profile_treated_as_report_import_or_result_intake"
  );
  const outboxExpectationAcceptanceCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_profile_treated_as_acceptance_truth_or_payload"
  );
  const outboxExpectationMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_profile_treated_as_application_merge_mutation_or_storage"
  );
  const outboxExpectationAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_profile_treated_as_platform_authority_event_or_auto_execute"
  );
  const outboxExpectationTuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_profile_tui_treated_as_action_authority"
  );
  const outboxExpectationSidecarIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_result_intake_or_acceptance"
  );
  const outboxExpectationSidecarTruthCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_report_truth_or_payload"
  );
  const outboxExpectationSidecarMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_application_merge_mutation_or_storage"
  );
  const outboxExpectationSidecarDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_dispatch_execution_agent_or_platform"
  );
  const outboxExpectationSidecarAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_authority_event_auto_execute_or_enclosure"
  );
  const outboxExpectationSidecarTuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_expectation_sidecar_review_profile_tui_treated_as_action_authority"
  );
  const outboxComplianceBoardIntakeCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_compliance_board_projection_treated_as_result_intake_or_acceptance"
  );
  const outboxComplianceBoardTruthCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_compliance_board_projection_treated_as_report_truth_or_payload"
  );
  const outboxComplianceBoardMutationCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_compliance_board_projection_treated_as_application_merge_mutation_or_storage"
  );
  const outboxComplianceBoardDispatchCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_compliance_board_projection_treated_as_dispatch_execution_agent_or_platform"
  );
  const outboxComplianceBoardAuthorityCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_compliance_board_projection_treated_as_authority_event_auto_execute_or_enclosure"
  );
  const outboxComplianceBoardTuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_outbox_report_compliance_board_projection_tui_treated_as_action_authority"
  );
  const tuiCase = packet.cases.find((entry) =>
    entry.caseId === "repo_agent_seat_exchange_tui_treated_as_action_authority"
  );

  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_convention_treated_as_transport_scheduler_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_packet_candidate_treated_as_delivery_invocation_or_work_cell"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_report_candidate_treated_as_import_acceptance_truth_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_decision_treated_as_handoff_attempt"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_decision_treated_as_delivery_dispatch_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_decision_treated_as_result_import_acceptance_truth"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_decision_treated_as_repo_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_observation_treated_as_implicit_path_or_repo_discovery"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_observation_treated_as_shell_network_or_agent_invocation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_observation_treated_as_dispatch_execution_or_work_cell"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_observation_treated_as_result_import_acceptance_truth"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_observation_treated_as_repo_layer_storage_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_decision_treated_as_import_or_result_intake"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_decision_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_decision_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_decision_treated_as_dispatch_execution_or_platform"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_decision_treated_as_authority_event_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_inbox_handoff_receipt_treated_as_delivery_read_or_execution_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_observation_treated_as_implicit_path_or_repo_discovery"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_observation_treated_as_shell_network_or_agent_invocation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_observation_treated_as_result_intake_acceptance_truth"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_observation_treated_as_payload_validity_or_materialization"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_observation_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_import_observation_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_candidate_treated_as_result_intake_or_decision"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_candidate_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_candidate_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_candidate_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_decision_treated_as_intake_or_observation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_decision_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_decision_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_decision_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_observation_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_observation_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_outbox_result_intake_observation_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_summary_treated_as_delivery_read_or_execution_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_summary_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_summary_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_summary_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_board_tui_burden_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_burden_measurement_treated_as_handoff_import_or_intake"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_burden_measurement_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_burden_measurement_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_loop_burden_measurement_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_treated_as_scheduler_runner_or_workflow"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_treated_as_decision_or_handoff"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_treated_as_import_intake_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_treated_as_payload_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_points_treated_as_approval_or_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_bundle_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_decision_projection_treated_as_operator_decision"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_decision_projection_treated_as_handoff_import_or_intake"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_decision_projection_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_decision_projection_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_decision_projection_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_seat_exchange_mediation_decision_projection_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_inbox_handoff_decision_capture_treated_as_handoff_attempt"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_inbox_handoff_decision_capture_treated_as_delivery_or_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_inbox_handoff_decision_capture_treated_as_import_intake_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_inbox_handoff_decision_capture_treated_as_payload_application_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_inbox_handoff_decision_capture_treated_as_authority_event_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_inbox_handoff_decision_capture_visibility_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_import_decision_capture_treated_as_outbox_import"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_import_decision_capture_treated_as_result_intake_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_import_decision_capture_treated_as_payload_application_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_import_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_import_decision_capture_receipt_treated_as_delivery_read_or_execution_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_import_decision_capture_visibility_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_result_intake_decision_capture_treated_as_result_intake"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_result_intake_decision_capture_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_result_intake_decision_capture_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_result_intake_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_outbox_result_intake_decision_capture_visibility_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_treated_as_handoff_import_or_intake"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_treated_as_application_merge_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_decision_capture_treated_as_action_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_burden_measurement_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_remaining_burden_analysis_treated_as_decision_or_action"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_remaining_burden_analysis_treated_as_acceptance_mutation_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_seat_loop_remaining_burden_analysis_recommendation_treated_as_approval"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_receipt_visibility_next_posture_panel_treated_as_decision_or_action"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_receipt_visibility_next_posture_panel_treated_as_acceptance_truth_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_receipt_visibility_next_posture_panel_treated_as_approval_authority_or_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_receipt_action_candidate_projection_treated_as_action_or_receipt"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_receipt_action_candidate_projection_treated_as_acceptance_truth_or_mutation"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_receipt_action_candidate_projection_treated_as_approval_authority_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_treated_as_scheduler_dispatch_or_agent_execution"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_treated_as_application_merge_mutation_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_burden_measurement_treated_as_action_or_receipt"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_burden_measurement_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_burden_measurement_treated_as_application_merge_mutation_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_triggered_receipt_action_burden_measurement_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_treated_as_action_or_receipt"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_treated_as_application_merge_mutation_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_treated_as_delivery_read_execution_or_enclosure_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_action_or_receipt"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_application_merge_mutation_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_receipt_action_loop_summary_burden_measurement_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_local_seat_loop_operational_readiness_treated_as_enclosure_or_autonomy_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_local_seat_loop_operational_readiness_treated_as_dispatch_execution_or_delivery_proof"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_local_seat_loop_operational_readiness_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_local_seat_loop_operational_readiness_treated_as_application_merge_mutation_or_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("tui_mediated_local_seat_loop_operational_readiness_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_profile_treated_as_agent_invocation_scheduler_or_dispatch"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_profile_treated_as_report_import_or_result_intake"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_profile_treated_as_acceptance_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_profile_treated_as_application_merge_mutation_or_storage"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_profile_treated_as_platform_authority_event_or_auto_execute"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_profile_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_result_intake_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_report_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_application_merge_mutation_or_storage"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_dispatch_execution_agent_or_platform"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_authority_event_auto_execute_or_enclosure"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_expectation_sidecar_review_profile_tui_treated_as_action_authority"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_compliance_board_projection_treated_as_result_intake_or_acceptance"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_compliance_board_projection_treated_as_report_truth_or_payload"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_compliance_board_projection_treated_as_application_merge_mutation_or_storage"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_compliance_board_projection_treated_as_dispatch_execution_agent_or_platform"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_compliance_board_projection_treated_as_authority_event_auto_execute_or_enclosure"),
    true
  );
  assert.equal(
    report.blockedCaseIds.includes("repo_agent_outbox_report_compliance_board_projection_tui_treated_as_action_authority"),
    true
  );
  assert.equal(report.blockedCaseIds.includes("repo_agent_seat_exchange_tui_treated_as_action_authority"), true);
  assert.equal(conventionCase.stopStatus, "blocked");
  assert.equal(conventionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(conventionCase.boundary.executesBehavior, false);
  assert.equal(conventionCase.boundary.createsAuthority, false);
  assert.equal(inboxCase.stopStatus, "blocked");
  assert.equal(inboxCase.boundary.callsEdge, false);
  assert.equal(inboxCase.boundary.dispatchesRepoAgents, false);
  assert.equal(inboxCase.boundary.executesBehavior, false);
  assert.equal(inboxCase.boundary.createsAuthority, false);
  assert.equal(outboxCase.stopStatus, "blocked");
  assert.equal(outboxCase.boundary.claimsTruth, false);
  assert.equal(outboxCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxCase.boundary.mutatesLayer, false);
  assert.equal(outboxCase.boundary.writesProductionStorage, false);
  assert.equal(handoffAttemptCase.stopStatus, "blocked");
  assert.equal(handoffAttemptCase.boundary.callsEdge, false);
  assert.equal(handoffAttemptCase.boundary.dispatchesRepoAgents, false);
  assert.equal(handoffAttemptCase.boundary.executesBehavior, false);
  assert.equal(handoffDeliveryCase.stopStatus, "blocked");
  assert.equal(handoffDeliveryCase.boundary.dispatchesRepoAgents, false);
  assert.equal(handoffDeliveryCase.boundary.executesBehavior, false);
  assert.equal(handoffDeliveryCase.boundary.mutatesSourceRepo, false);
  assert.equal(handoffResultCase.stopStatus, "blocked");
  assert.equal(handoffResultCase.boundary.claimsTruth, false);
  assert.equal(handoffResultCase.boundary.mutatesSourceRepo, false);
  assert.equal(handoffResultCase.boundary.mutatesLayer, false);
  assert.equal(handoffAuthorityCase.stopStatus, "blocked");
  assert.equal(handoffAuthorityCase.boundary.createsAuthority, false);
  assert.equal(handoffAuthorityCase.boundary.mutatesLayer, false);
  assert.equal(handoffAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(handoffObservationPathCase.stopStatus, "blocked");
  assert.equal(handoffObservationPathCase.boundary.mutatesSourceRepo, false);
  assert.equal(handoffObservationPathCase.boundary.createsAuthority, false);
  assert.equal(handoffObservationTransportCase.stopStatus, "blocked");
  assert.equal(handoffObservationTransportCase.boundary.dispatchesRepoAgents, false);
  assert.equal(handoffObservationTransportCase.boundary.executesBehavior, false);
  assert.equal(handoffObservationTransportCase.boundary.createsAuthority, false);
  assert.equal(handoffObservationDispatchCase.stopStatus, "blocked");
  assert.equal(handoffObservationDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(handoffObservationDispatchCase.boundary.executesBehavior, false);
  assert.equal(handoffObservationDispatchCase.boundary.mutatesSourceRepo, false);
  assert.equal(handoffObservationResultCase.stopStatus, "blocked");
  assert.equal(handoffObservationResultCase.boundary.claimsTruth, false);
  assert.equal(handoffObservationResultCase.boundary.mutatesSourceRepo, false);
  assert.equal(handoffObservationResultCase.boundary.mutatesLayer, false);
  assert.equal(handoffObservationAuthorityCase.stopStatus, "blocked");
  assert.equal(handoffObservationAuthorityCase.boundary.createsAuthority, false);
  assert.equal(handoffObservationAuthorityCase.boundary.mutatesLayer, false);
  assert.equal(handoffObservationAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementActionCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryMeasurementActionCase.boundary.callsEdge, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementActionCase.boundary.executesBehavior, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryMeasurementAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementAcceptanceCase.boundary.mutatesLayer, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementMutationCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryMeasurementMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementMutationCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementProofCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryMeasurementProofCase.boundary.claimsTruth, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementProofCase.boundary.executesBehavior, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementProofCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementTuiCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryMeasurementTuiCase.boundary.callsEdge, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiReceiptLoopSummaryMeasurementTuiCase.boundary.createsAuthority, false);
  assert.equal(tuiLocalSeatReadinessProofCase.stopStatus, "blocked");
  assert.equal(tuiLocalSeatReadinessProofCase.boundary.claimsTruth, false);
  assert.equal(tuiLocalSeatReadinessProofCase.boundary.executesBehavior, false);
  assert.equal(tuiLocalSeatReadinessProofCase.boundary.createsAuthority, false);
  assert.equal(tuiLocalSeatReadinessDispatchCase.stopStatus, "blocked");
  assert.equal(tuiLocalSeatReadinessDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiLocalSeatReadinessDispatchCase.boundary.executesBehavior, false);
  assert.equal(tuiLocalSeatReadinessDispatchCase.boundary.callsPlatform, false);
  assert.equal(tuiLocalSeatReadinessAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiLocalSeatReadinessAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiLocalSeatReadinessAcceptanceCase.boundary.mutatesLayer, false);
  assert.equal(tuiLocalSeatReadinessAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(tuiLocalSeatReadinessMutationCase.stopStatus, "blocked");
  assert.equal(tuiLocalSeatReadinessMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiLocalSeatReadinessMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiLocalSeatReadinessMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiLocalSeatReadinessMutationCase.boundary.createsAuthority, false);
  assert.equal(tuiLocalSeatReadinessTuiCase.stopStatus, "blocked");
  assert.equal(tuiLocalSeatReadinessTuiCase.boundary.callsEdge, false);
  assert.equal(tuiLocalSeatReadinessTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiLocalSeatReadinessTuiCase.boundary.createsAuthority, false);
  assert.equal(outboxExpectationInvocationCase.stopStatus, "blocked");
  assert.equal(outboxExpectationInvocationCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxExpectationInvocationCase.boundary.executesBehavior, false);
  assert.equal(outboxExpectationInvocationCase.boundary.callsEdge, false);
  assert.equal(outboxExpectationImportCase.stopStatus, "blocked");
  assert.equal(outboxExpectationImportCase.boundary.callsEdge, false);
  assert.equal(outboxExpectationImportCase.boundary.claimsTruth, false);
  assert.equal(outboxExpectationImportCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxExpectationAcceptanceCase.stopStatus, "blocked");
  assert.equal(outboxExpectationAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(outboxExpectationAcceptanceCase.boundary.mutatesLayer, false);
  assert.equal(outboxExpectationAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(outboxExpectationMutationCase.stopStatus, "blocked");
  assert.equal(outboxExpectationMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxExpectationMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxExpectationMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxExpectationAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxExpectationAuthorityCase.boundary.callsPlatform, false);
  assert.equal(outboxExpectationAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxExpectationAuthorityCase.boundary.autoExecutes, false);
  assert.equal(outboxExpectationTuiCase.stopStatus, "blocked");
  assert.equal(outboxExpectationTuiCase.boundary.callsEdge, false);
  assert.equal(outboxExpectationTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxExpectationTuiCase.boundary.createsAuthority, false);
  assert.equal(outboxExpectationSidecarIntakeCase.stopStatus, "blocked");
  assert.equal(outboxExpectationSidecarIntakeCase.boundary.callsEdge, false);
  assert.equal(outboxExpectationSidecarIntakeCase.boundary.claimsTruth, false);
  assert.equal(outboxExpectationSidecarIntakeCase.boundary.createsAuthority, false);
  assert.equal(outboxExpectationSidecarTruthCase.stopStatus, "blocked");
  assert.equal(outboxExpectationSidecarTruthCase.boundary.claimsTruth, false);
  assert.equal(outboxExpectationSidecarTruthCase.boundary.claimsPayloadValidity, false);
  assert.equal(outboxExpectationSidecarTruthCase.boundary.mutatesLayer, false);
  assert.equal(outboxExpectationSidecarMutationCase.stopStatus, "blocked");
  assert.equal(outboxExpectationSidecarMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxExpectationSidecarMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxExpectationSidecarMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxExpectationSidecarDispatchCase.stopStatus, "blocked");
  assert.equal(outboxExpectationSidecarDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxExpectationSidecarDispatchCase.boundary.executesBehavior, false);
  assert.equal(outboxExpectationSidecarDispatchCase.boundary.callsPlatform, false);
  assert.equal(outboxExpectationSidecarAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxExpectationSidecarAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxExpectationSidecarAuthorityCase.boundary.autoExecutes, false);
  assert.equal(outboxExpectationSidecarTuiCase.stopStatus, "blocked");
  assert.equal(outboxExpectationSidecarTuiCase.boundary.callsEdge, false);
  assert.equal(outboxExpectationSidecarTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxExpectationSidecarTuiCase.boundary.createsAuthority, false);
  assert.equal(outboxComplianceBoardIntakeCase.stopStatus, "blocked");
  assert.equal(outboxComplianceBoardIntakeCase.boundary.callsEdge, false);
  assert.equal(outboxComplianceBoardIntakeCase.boundary.claimsTruth, false);
  assert.equal(outboxComplianceBoardIntakeCase.boundary.createsAuthority, false);
  assert.equal(outboxComplianceBoardTruthCase.stopStatus, "blocked");
  assert.equal(outboxComplianceBoardTruthCase.boundary.claimsTruth, false);
  assert.equal(outboxComplianceBoardTruthCase.boundary.claimsPayloadValidity, false);
  assert.equal(outboxComplianceBoardTruthCase.boundary.mutatesLayer, false);
  assert.equal(outboxComplianceBoardMutationCase.stopStatus, "blocked");
  assert.equal(outboxComplianceBoardMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxComplianceBoardMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxComplianceBoardMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxComplianceBoardDispatchCase.stopStatus, "blocked");
  assert.equal(outboxComplianceBoardDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxComplianceBoardDispatchCase.boundary.executesBehavior, false);
  assert.equal(outboxComplianceBoardDispatchCase.boundary.callsPlatform, false);
  assert.equal(outboxComplianceBoardAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxComplianceBoardAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxComplianceBoardAuthorityCase.boundary.autoExecutes, false);
  assert.equal(outboxComplianceBoardTuiCase.stopStatus, "blocked");
  assert.equal(outboxComplianceBoardTuiCase.boundary.callsEdge, false);
  assert.equal(outboxComplianceBoardTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxComplianceBoardTuiCase.boundary.createsAuthority, false);
  assert.equal(outboxImportDecisionImportCase.stopStatus, "blocked");
  assert.equal(outboxImportDecisionImportCase.boundary.callsEdge, false);
  assert.equal(outboxImportDecisionImportCase.boundary.claimsTruth, false);
  assert.equal(outboxImportDecisionImportCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportDecisionAcceptanceCase.stopStatus, "blocked");
  assert.equal(outboxImportDecisionAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(outboxImportDecisionAcceptanceCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportDecisionAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(outboxImportDecisionMutationCase.stopStatus, "blocked");
  assert.equal(outboxImportDecisionMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportDecisionMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxImportDecisionMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxImportDecisionDispatchCase.stopStatus, "blocked");
  assert.equal(outboxImportDecisionDispatchCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxImportDecisionDispatchCase.boundary.executesBehavior, false);
  assert.equal(outboxImportDecisionDispatchCase.boundary.callsPlatform, false);
  assert.equal(outboxImportDecisionAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxImportDecisionAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxImportDecisionAuthorityCase.boundary.executesBehavior, false);
  assert.equal(handoffReceiptProofCase.stopStatus, "blocked");
  assert.equal(handoffReceiptProofCase.boundary.claimsTruth, false);
  assert.equal(handoffReceiptProofCase.boundary.executesBehavior, false);
  assert.equal(handoffReceiptProofCase.boundary.createsAuthority, false);
  assert.equal(outboxImportObservationPathCase.stopStatus, "blocked");
  assert.equal(outboxImportObservationPathCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportObservationPathCase.boundary.createsAuthority, false);
  assert.equal(outboxImportObservationTransportCase.stopStatus, "blocked");
  assert.equal(outboxImportObservationTransportCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxImportObservationTransportCase.boundary.executesBehavior, false);
  assert.equal(outboxImportObservationTransportCase.boundary.createsAuthority, false);
  assert.equal(outboxImportObservationIntakeCase.stopStatus, "blocked");
  assert.equal(outboxImportObservationIntakeCase.boundary.claimsTruth, false);
  assert.equal(outboxImportObservationIntakeCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportObservationPayloadCase.stopStatus, "blocked");
  assert.equal(outboxImportObservationPayloadCase.boundary.claimsTruth, false);
  assert.equal(outboxImportObservationPayloadCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportObservationMutationCase.stopStatus, "blocked");
  assert.equal(outboxImportObservationMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxImportObservationMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxImportObservationMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxImportObservationAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxImportObservationAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxImportObservationAuthorityCase.boundary.executesBehavior, false);
  assert.equal(outboxImportObservationAuthorityCase.boundary.callsPlatform, false);
  assert.equal(outboxImportObservationAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeCandidateIntakeCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeCandidateIntakeCase.boundary.callsEdge, false);
  assert.equal(outboxResultIntakeCandidateIntakeCase.boundary.claimsTruth, false);
  assert.equal(outboxResultIntakeCandidateIntakeCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeCandidateAcceptanceCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeCandidateAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(outboxResultIntakeCandidateAcceptanceCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxResultIntakeCandidateAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeCandidateMutationCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeCandidateMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxResultIntakeCandidateMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxResultIntakeCandidateMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxResultIntakeCandidateAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeCandidateAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxResultIntakeCandidateAuthorityCase.boundary.executesBehavior, false);
  assert.equal(outboxResultIntakeCandidateAuthorityCase.boundary.callsPlatform, false);
  assert.equal(outboxResultIntakeCandidateAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeDecisionIntakeCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeDecisionIntakeCase.boundary.callsEdge, false);
  assert.equal(outboxResultIntakeDecisionIntakeCase.boundary.claimsTruth, false);
  assert.equal(outboxResultIntakeDecisionIntakeCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeDecisionAcceptanceCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeDecisionAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(outboxResultIntakeDecisionAcceptanceCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxResultIntakeDecisionAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeDecisionMutationCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeDecisionMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxResultIntakeDecisionMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxResultIntakeDecisionMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxResultIntakeDecisionAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeDecisionAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxResultIntakeDecisionAuthorityCase.boundary.executesBehavior, false);
  assert.equal(outboxResultIntakeDecisionAuthorityCase.boundary.callsPlatform, false);
  assert.equal(outboxResultIntakeDecisionAuthorityCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeObservationAcceptanceCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeObservationAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(outboxResultIntakeObservationAcceptanceCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxResultIntakeObservationAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(outboxResultIntakeObservationMutationCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeObservationMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(outboxResultIntakeObservationMutationCase.boundary.mutatesLayer, false);
  assert.equal(outboxResultIntakeObservationMutationCase.boundary.writesProductionStorage, false);
  assert.equal(outboxResultIntakeObservationAuthorityCase.stopStatus, "blocked");
  assert.equal(outboxResultIntakeObservationAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(outboxResultIntakeObservationAuthorityCase.boundary.executesBehavior, false);
  assert.equal(outboxResultIntakeObservationAuthorityCase.boundary.callsPlatform, false);
  assert.equal(outboxResultIntakeObservationAuthorityCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopSummaryProofCase.stopStatus, "blocked");
  assert.equal(exchangeLoopSummaryProofCase.boundary.claimsTruth, false);
  assert.equal(exchangeLoopSummaryProofCase.boundary.executesBehavior, false);
  assert.equal(exchangeLoopSummaryProofCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopSummaryAcceptanceCase.stopStatus, "blocked");
  assert.equal(exchangeLoopSummaryAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(exchangeLoopSummaryAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(exchangeLoopSummaryAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopSummaryMutationCase.stopStatus, "blocked");
  assert.equal(exchangeLoopSummaryMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(exchangeLoopSummaryMutationCase.boundary.mutatesLayer, false);
  assert.equal(exchangeLoopSummaryMutationCase.boundary.writesProductionStorage, false);
  assert.equal(exchangeLoopSummaryAuthorityCase.stopStatus, "blocked");
  assert.equal(exchangeLoopSummaryAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(exchangeLoopSummaryAuthorityCase.boundary.executesBehavior, false);
  assert.equal(exchangeLoopSummaryAuthorityCase.boundary.callsPlatform, false);
  assert.equal(exchangeLoopSummaryAuthorityCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopBoardTuiBurdenCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBoardTuiBurdenCase.boundary.callsEdge, false);
  assert.equal(exchangeLoopBoardTuiBurdenCase.boundary.dispatchesRepoAgents, false);
  assert.equal(exchangeLoopBoardTuiBurdenCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopBurdenMechanicCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBurdenMechanicCase.boundary.callsEdge, false);
  assert.equal(exchangeLoopBurdenMechanicCase.boundary.dispatchesRepoAgents, false);
  assert.equal(exchangeLoopBurdenMechanicCase.boundary.executesBehavior, false);
  assert.equal(exchangeLoopBurdenAcceptanceCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBurdenAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(exchangeLoopBurdenAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(exchangeLoopBurdenAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopBurdenMutationCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBurdenMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(exchangeLoopBurdenMutationCase.boundary.mutatesLayer, false);
  assert.equal(exchangeLoopBurdenMutationCase.boundary.writesProductionStorage, false);
  assert.equal(exchangeLoopBurdenAuthorityCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBurdenAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(exchangeLoopBurdenAuthorityCase.boundary.executesBehavior, false);
  assert.equal(exchangeLoopBurdenAuthorityCase.boundary.callsPlatform, false);
  assert.equal(exchangeLoopBurdenAuthorityCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopBurdenProofCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBurdenProofCase.boundary.claimsTruth, false);
  assert.equal(exchangeLoopBurdenProofCase.boundary.executesBehavior, false);
  assert.equal(exchangeLoopBurdenProofCase.boundary.createsAuthority, false);
  assert.equal(exchangeLoopBurdenTuiCase.stopStatus, "blocked");
  assert.equal(exchangeLoopBurdenTuiCase.boundary.callsEdge, false);
  assert.equal(exchangeLoopBurdenTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(exchangeLoopBurdenTuiCase.boundary.createsAuthority, false);
  assert.equal(mediationBundleSchedulerCase.stopStatus, "blocked");
  assert.equal(mediationBundleSchedulerCase.boundary.dispatchesRepoAgents, false);
  assert.equal(mediationBundleSchedulerCase.boundary.executesBehavior, false);
  assert.equal(mediationBundleSchedulerCase.boundary.createsAuthority, false);
  assert.equal(mediationBundleDecisionCase.stopStatus, "blocked");
  assert.equal(mediationBundleDecisionCase.boundary.callsEdge, false);
  assert.equal(mediationBundleDecisionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(mediationBundleDecisionCase.boundary.executesBehavior, false);
  assert.equal(mediationBundleImportCase.stopStatus, "blocked");
  assert.equal(mediationBundleImportCase.boundary.claimsTruth, false);
  assert.equal(mediationBundleImportCase.boundary.mutatesSourceRepo, false);
  assert.equal(mediationBundleImportCase.boundary.createsAuthority, false);
  assert.equal(mediationBundleMutationCase.stopStatus, "blocked");
  assert.equal(mediationBundleMutationCase.boundary.claimsPayloadValidity, false);
  assert.equal(mediationBundleMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(mediationBundleMutationCase.boundary.mutatesLayer, false);
  assert.equal(mediationBundleMutationCase.boundary.writesProductionStorage, false);
  assert.equal(mediationBundleAuthorityCase.stopStatus, "blocked");
  assert.equal(mediationBundleAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(mediationBundleAuthorityCase.boundary.executesBehavior, false);
  assert.equal(mediationBundleAuthorityCase.boundary.callsPlatform, false);
  assert.equal(mediationBundleAuthorityCase.boundary.createsAuthority, false);
  assert.equal(mediationBundlePointProofCase.stopStatus, "blocked");
  assert.equal(mediationBundlePointProofCase.boundary.claimsTruth, false);
  assert.equal(mediationBundlePointProofCase.boundary.executesBehavior, false);
  assert.equal(mediationBundlePointProofCase.boundary.createsAuthority, false);
  assert.equal(mediationBundleTuiCase.stopStatus, "blocked");
  assert.equal(mediationBundleTuiCase.boundary.callsEdge, false);
  assert.equal(mediationBundleTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(mediationBundleTuiCase.boundary.createsAuthority, false);
  assert.equal(mediationDecisionProjectionCase.stopStatus, "blocked");
  assert.equal(mediationDecisionProjectionCase.boundary.callsEdge, false);
  assert.equal(mediationDecisionProjectionCase.boundary.executesBehavior, false);
  assert.equal(mediationDecisionProjectionActionCase.stopStatus, "blocked");
  assert.equal(mediationDecisionProjectionActionCase.boundary.callsEdge, false);
  assert.equal(mediationDecisionProjectionActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(mediationDecisionProjectionActionCase.boundary.executesBehavior, false);
  assert.equal(mediationDecisionProjectionAuthorityCase.stopStatus, "blocked");
  assert.equal(mediationDecisionProjectionAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(mediationDecisionProjectionAuthorityCase.boundary.executesBehavior, false);
  assert.equal(mediationDecisionProjectionAuthorityCase.boundary.callsPlatform, false);
  assert.equal(mediationDecisionProjectionAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiInboxDecisionCaptureHandoffCase.stopStatus, "blocked");
  assert.equal(tuiInboxDecisionCaptureHandoffCase.boundary.callsEdge, false);
  assert.equal(tuiInboxDecisionCaptureHandoffCase.boundary.executesBehavior, false);
  assert.equal(tuiInboxDecisionCaptureDeliveryCase.stopStatus, "blocked");
  assert.equal(tuiInboxDecisionCaptureDeliveryCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiInboxDecisionCaptureDeliveryCase.boundary.executesBehavior, false);
  assert.equal(tuiInboxDecisionCaptureImportCase.stopStatus, "blocked");
  assert.equal(tuiInboxDecisionCaptureImportCase.boundary.claimsTruth, false);
  assert.equal(tuiInboxDecisionCaptureImportCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiInboxDecisionCaptureMutationCase.stopStatus, "blocked");
  assert.equal(tuiInboxDecisionCaptureMutationCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiInboxDecisionCaptureMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiInboxDecisionCaptureMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiInboxDecisionCaptureMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiInboxDecisionCaptureAuthorityCase.stopStatus, "blocked");
  assert.equal(tuiInboxDecisionCaptureAuthorityCase.boundary.callsPlatform, false);
  assert.equal(tuiInboxDecisionCaptureAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiInboxDecisionCaptureAuthorityCase.boundary.autoExecutes, false);
  assert.equal(tuiInboxDecisionCaptureVisibilityCase.stopStatus, "blocked");
  assert.equal(tuiInboxDecisionCaptureVisibilityCase.boundary.callsEdge, false);
  assert.equal(tuiInboxDecisionCaptureVisibilityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiInboxDecisionCaptureVisibilityCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxImportDecisionCaptureImportCase.stopStatus, "blocked");
  assert.equal(tuiOutboxImportDecisionCaptureImportCase.boundary.callsEdge, false);
  assert.equal(tuiOutboxImportDecisionCaptureImportCase.boundary.claimsTruth, false);
  assert.equal(tuiOutboxImportDecisionCaptureIntakeCase.stopStatus, "blocked");
  assert.equal(tuiOutboxImportDecisionCaptureIntakeCase.boundary.claimsTruth, false);
  assert.equal(tuiOutboxImportDecisionCaptureIntakeCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiOutboxImportDecisionCaptureMutationCase.stopStatus, "blocked");
  assert.equal(tuiOutboxImportDecisionCaptureMutationCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiOutboxImportDecisionCaptureMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiOutboxImportDecisionCaptureMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiOutboxImportDecisionCaptureMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiOutboxImportDecisionCaptureAuthorityCase.stopStatus, "blocked");
  assert.equal(tuiOutboxImportDecisionCaptureAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiOutboxImportDecisionCaptureAuthorityCase.boundary.executesBehavior, false);
  assert.equal(tuiOutboxImportDecisionCaptureAuthorityCase.boundary.callsPlatform, false);
  assert.equal(tuiOutboxImportDecisionCaptureAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxImportDecisionCaptureProofCase.stopStatus, "blocked");
  assert.equal(tuiOutboxImportDecisionCaptureProofCase.boundary.claimsTruth, false);
  assert.equal(tuiOutboxImportDecisionCaptureProofCase.boundary.executesBehavior, false);
  assert.equal(tuiOutboxImportDecisionCaptureProofCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxImportDecisionCaptureVisibilityCase.stopStatus, "blocked");
  assert.equal(tuiOutboxImportDecisionCaptureVisibilityCase.boundary.callsEdge, false);
  assert.equal(tuiOutboxImportDecisionCaptureVisibilityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiOutboxImportDecisionCaptureVisibilityCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureIntakeCase.stopStatus, "blocked");
  assert.equal(tuiOutboxResultIntakeDecisionCaptureIntakeCase.boundary.callsEdge, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureIntakeCase.boundary.claimsTruth, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureIntakeCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureMutationCase.stopStatus, "blocked");
  assert.equal(tuiOutboxResultIntakeDecisionCaptureMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAuthorityCase.stopStatus, "blocked");
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAuthorityCase.boundary.executesBehavior, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAuthorityCase.boundary.callsPlatform, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureVisibilityCase.stopStatus, "blocked");
  assert.equal(tuiOutboxResultIntakeDecisionCaptureVisibilityCase.boundary.callsEdge, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureVisibilityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiOutboxResultIntakeDecisionCaptureVisibilityCase.boundary.createsAuthority, false);
  assert.equal(tuiMediatedMeasurementMechanicCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementMechanicCase.boundary.callsEdge, false);
  assert.equal(tuiMediatedMeasurementMechanicCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiMediatedMeasurementMechanicCase.boundary.executesBehavior, false);
  assert.equal(tuiMediatedMeasurementAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiMediatedMeasurementAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiMediatedMeasurementAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(tuiMediatedMeasurementMutationCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiMediatedMeasurementMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiMediatedMeasurementMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiMediatedMeasurementAuthorityCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementAuthorityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiMediatedMeasurementAuthorityCase.boundary.executesBehavior, false);
  assert.equal(tuiMediatedMeasurementAuthorityCase.boundary.callsPlatform, false);
  assert.equal(tuiMediatedMeasurementAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiMediatedMeasurementProofCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementProofCase.boundary.claimsTruth, false);
  assert.equal(tuiMediatedMeasurementProofCase.boundary.createsAuthority, false);
  assert.equal(tuiMediatedMeasurementActionCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementActionCase.boundary.callsEdge, false);
  assert.equal(tuiMediatedMeasurementActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiMediatedMeasurementActionCase.boundary.executesBehavior, false);
  assert.equal(tuiMediatedMeasurementVisibilityCase.stopStatus, "blocked");
  assert.equal(tuiMediatedMeasurementVisibilityCase.boundary.callsEdge, false);
  assert.equal(tuiMediatedMeasurementVisibilityCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiMediatedMeasurementVisibilityCase.boundary.createsAuthority, false);
  assert.equal(remainingBurdenAnalysisActionCase.stopStatus, "blocked");
  assert.equal(remainingBurdenAnalysisActionCase.boundary.callsEdge, false);
  assert.equal(remainingBurdenAnalysisActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(remainingBurdenAnalysisActionCase.boundary.executesBehavior, false);
  assert.equal(remainingBurdenAnalysisAuthorityCase.stopStatus, "blocked");
  assert.equal(remainingBurdenAnalysisAuthorityCase.boundary.claimsPayloadValidity, false);
  assert.equal(remainingBurdenAnalysisAuthorityCase.boundary.claimsTruth, false);
  assert.equal(remainingBurdenAnalysisAuthorityCase.boundary.mutatesSourceRepo, false);
  assert.equal(remainingBurdenAnalysisAuthorityCase.boundary.mutatesLayer, false);
  assert.equal(remainingBurdenAnalysisAuthorityCase.boundary.writesProductionStorage, false);
  assert.equal(remainingBurdenAnalysisAuthorityCase.boundary.createsAuthority, false);
  assert.equal(remainingBurdenAnalysisRecommendationCase.stopStatus, "blocked");
  assert.equal(remainingBurdenAnalysisRecommendationCase.boundary.callsEdge, false);
  assert.equal(remainingBurdenAnalysisRecommendationCase.boundary.executesBehavior, false);
  assert.equal(remainingBurdenAnalysisRecommendationCase.boundary.createsAuthority, false);
  assert.equal(receiptVisibilityMechanicCase.stopStatus, "blocked");
  assert.equal(receiptVisibilityMechanicCase.boundary.callsEdge, false);
  assert.equal(receiptVisibilityMechanicCase.boundary.dispatchesRepoAgents, false);
  assert.equal(receiptVisibilityMechanicCase.boundary.executesBehavior, false);
  assert.equal(receiptVisibilityAcceptanceCase.stopStatus, "blocked");
  assert.equal(receiptVisibilityAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(receiptVisibilityAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(receiptVisibilityAcceptanceCase.boundary.mutatesSourceRepo, false);
  assert.equal(receiptVisibilityAcceptanceCase.boundary.mutatesLayer, false);
  assert.equal(receiptVisibilityAcceptanceCase.boundary.writesProductionStorage, false);
  assert.equal(receiptVisibilityAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(receiptVisibilityActionCase.stopStatus, "blocked");
  assert.equal(receiptVisibilityActionCase.boundary.callsEdge, false);
  assert.equal(receiptVisibilityActionCase.boundary.executesBehavior, false);
  assert.equal(receiptVisibilityActionCase.boundary.claimsTruth, false);
  assert.equal(receiptVisibilityActionCase.boundary.createsAuthority, false);
  assert.equal(receiptNextPostureDecisionCase.stopStatus, "blocked");
  assert.equal(receiptNextPostureDecisionCase.boundary.callsEdge, false);
  assert.equal(receiptNextPostureDecisionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(receiptNextPostureDecisionCase.boundary.executesBehavior, false);
  assert.equal(receiptNextPostureMutationCase.stopStatus, "blocked");
  assert.equal(receiptNextPostureMutationCase.boundary.claimsPayloadValidity, false);
  assert.equal(receiptNextPostureMutationCase.boundary.claimsTruth, false);
  assert.equal(receiptNextPostureMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(receiptNextPostureMutationCase.boundary.mutatesLayer, false);
  assert.equal(receiptNextPostureMutationCase.boundary.writesProductionStorage, false);
  assert.equal(receiptNextPostureAuthorityCase.stopStatus, "blocked");
  assert.equal(receiptNextPostureAuthorityCase.boundary.callsEdge, false);
  assert.equal(receiptNextPostureAuthorityCase.boundary.executesBehavior, false);
  assert.equal(receiptNextPostureAuthorityCase.boundary.claimsTruth, false);
  assert.equal(receiptNextPostureAuthorityCase.boundary.createsAuthority, false);
  assert.equal(receiptActionProjectionActionCase.stopStatus, "blocked");
  assert.equal(receiptActionProjectionActionCase.boundary.callsEdge, false);
  assert.equal(receiptActionProjectionActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(receiptActionProjectionActionCase.boundary.executesBehavior, false);
  assert.equal(receiptActionProjectionMutationCase.stopStatus, "blocked");
  assert.equal(receiptActionProjectionMutationCase.boundary.claimsPayloadValidity, false);
  assert.equal(receiptActionProjectionMutationCase.boundary.claimsTruth, false);
  assert.equal(receiptActionProjectionMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(receiptActionProjectionMutationCase.boundary.mutatesLayer, false);
  assert.equal(receiptActionProjectionMutationCase.boundary.writesProductionStorage, false);
  assert.equal(receiptActionProjectionAuthorityCase.stopStatus, "blocked");
  assert.equal(receiptActionProjectionAuthorityCase.boundary.callsPlatform, false);
  assert.equal(receiptActionProjectionAuthorityCase.boundary.executesBehavior, false);
  assert.equal(receiptActionProjectionAuthorityCase.boundary.createsAuthority, false);
  assert.equal(tuiTriggeredReceiptActionExecutionCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptActionExecutionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiTriggeredReceiptActionExecutionCase.boundary.executesBehavior, false);
  assert.equal(tuiTriggeredReceiptActionExecutionCase.boundary.callsPlatform, false);
  assert.equal(tuiTriggeredReceiptActionAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptActionAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiTriggeredReceiptActionAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiTriggeredReceiptActionAcceptanceCase.boundary.acceptsLayerState, false);
  assert.equal(tuiTriggeredReceiptActionMutationCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptActionMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiTriggeredReceiptActionMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiTriggeredReceiptActionMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiTriggeredReceiptActionMutationCase.boundary.createsAuthority, false);
  assert.equal(tuiTriggeredReceiptMeasurementActionCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptMeasurementActionCase.boundary.callsEdge, false);
  assert.equal(tuiTriggeredReceiptMeasurementActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiTriggeredReceiptMeasurementActionCase.boundary.executesBehavior, false);
  assert.equal(tuiTriggeredReceiptMeasurementAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptMeasurementAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiTriggeredReceiptMeasurementAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiTriggeredReceiptMeasurementAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(tuiTriggeredReceiptMeasurementMutationCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptMeasurementMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiTriggeredReceiptMeasurementMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiTriggeredReceiptMeasurementMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiTriggeredReceiptMeasurementMutationCase.boundary.createsAuthority, false);
  assert.equal(tuiTriggeredReceiptMeasurementProofCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptMeasurementProofCase.boundary.claimsTruth, false);
  assert.equal(tuiTriggeredReceiptMeasurementProofCase.boundary.executesBehavior, false);
  assert.equal(tuiTriggeredReceiptMeasurementProofCase.boundary.createsAuthority, false);
  assert.equal(tuiTriggeredReceiptMeasurementTuiCase.stopStatus, "blocked");
  assert.equal(tuiTriggeredReceiptMeasurementTuiCase.boundary.callsEdge, false);
  assert.equal(tuiTriggeredReceiptMeasurementTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiTriggeredReceiptMeasurementTuiCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryActionCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryActionCase.boundary.callsEdge, false);
  assert.equal(tuiReceiptLoopSummaryActionCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiReceiptLoopSummaryActionCase.boundary.executesBehavior, false);
  assert.equal(tuiReceiptLoopSummaryAcceptanceCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryAcceptanceCase.boundary.claimsPayloadValidity, false);
  assert.equal(tuiReceiptLoopSummaryAcceptanceCase.boundary.claimsTruth, false);
  assert.equal(tuiReceiptLoopSummaryAcceptanceCase.boundary.acceptsContinuity, false);
  assert.equal(tuiReceiptLoopSummaryAcceptanceCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryMutationCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryMutationCase.boundary.mutatesSourceRepo, false);
  assert.equal(tuiReceiptLoopSummaryMutationCase.boundary.mutatesLayer, false);
  assert.equal(tuiReceiptLoopSummaryMutationCase.boundary.writesProductionStorage, false);
  assert.equal(tuiReceiptLoopSummaryMutationCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryProofCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryProofCase.boundary.claimsTruth, false);
  assert.equal(tuiReceiptLoopSummaryProofCase.boundary.executesBehavior, false);
  assert.equal(tuiReceiptLoopSummaryProofCase.boundary.createsAuthority, false);
  assert.equal(tuiReceiptLoopSummaryTuiCase.stopStatus, "blocked");
  assert.equal(tuiReceiptLoopSummaryTuiCase.boundary.callsEdge, false);
  assert.equal(tuiReceiptLoopSummaryTuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiReceiptLoopSummaryTuiCase.boundary.createsAuthority, false);
  assert.equal(tuiCase.stopStatus, "blocked");
  assert.equal(tuiCase.boundary.callsEdge, false);
  assert.equal(tuiCase.boundary.dispatchesRepoAgents, false);
  assert.equal(tuiCase.boundary.createsAuthority, false);
});

test("Lane D fails closed when a required blocked case is missing", () => {
  const packet = packetFixture({
    cases: packetFixture().cases.filter((pressureCase) =>
      pressureCase.caseId !== "repo_agent_reported_commit_test_treated_as_truth"
    )
  });
  const report = build(packet);

  assert.equal(report.reviewStatus, TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.BLOCKED);
  assert.equal(
    report.reasonCodes.includes("missing_pressure_case:repo_agent_reported_commit_test_treated_as_truth"),
    true
  );
  assert.equal(
    report.reasonCodes.includes("failed_pressure_case:repo_agent_reported_commit_test_treated_as_truth"),
    true
  );
  assert.equal(report.repoAgentReportIsTruth, false);
});

test("Lane D blocks any pressure case that tries to become admitted authority", () => {
  const packet = packetFixture();
  const pressureCase = packet.cases.find((entry) =>
    entry.caseId === "visibility_treated_as_authority_admission_continuity"
  );
  pressureCase.stopStatus = "visible_not_admitted";
  pressureCase.admitted = true;
  pressureCase.boundary.createsAuthority = true;
  pressureCase.boundary.acceptsAdmission = true;
  pressureCase.boundary.acceptsContinuity = true;

  const report = build(packet);

  assert.equal(report.reviewStatus, TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.BLOCKED);
  assert.equal(
    report.reasonCodes.includes("failed_pressure_case:visibility_treated_as_authority_admission_continuity"),
    true
  );
  assert.equal(report.reasonCodes.includes("boundary_overclaim:visibility_treated_as_authority_admission_continuity"), true);
  assert.equal(report.authorityCreated, false);
  assert.equal(report.layerStateAccepted, false);
  assert.equal(report.continuityAccepted, false);
});

test("Lane D unsupported and malformed packets stop at bounded evidence statuses", () => {
  const unsupported = build(packetFixture({ ownerRepo: "mesh-ecology-edge" }));
  const malformed = buildTestbedRepoFamilySeamOverclaimPressureReport({
    pressurePacket: null,
    createdAt: CREATED_AT
  });

  assert.equal(unsupported.reviewStatus, TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.UNSUPPORTED);
  assert.deepEqual(unsupported.reasonCodes, ["repo_family_seam_overclaim_pressure_unsupported_target"]);
  assert.equal(unsupported.testbedCalledEdge, false);
  assert.equal(unsupported.authorityCreated, false);
  assert.equal(malformed.reviewStatus, TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["repo_family_seam_overclaim_pressure_packet_missing_or_malformed"]);
  assert.deepEqual(listTestbedRepoFamilySeamOverclaimPressureCases(), REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES);
  assert.deepEqual(listTestbedRepoFamilySeamOverclaimPressureStatuses(), [
    "repo_family_seam_overclaim_pressure_visible_not_admitted",
    "repo_family_seam_overclaim_pressure_blocked",
    "repo_family_seam_overclaim_pressure_unsupported",
    "repo_family_seam_overclaim_pressure_malformed"
  ]);
});
