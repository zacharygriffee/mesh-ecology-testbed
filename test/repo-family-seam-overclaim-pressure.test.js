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
