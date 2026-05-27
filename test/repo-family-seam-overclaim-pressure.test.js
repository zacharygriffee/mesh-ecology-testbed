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
