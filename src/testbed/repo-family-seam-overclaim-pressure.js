export const TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION =
  "testbed_repo_family_seam_overclaim_pressure.v0";

export const TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES = Object.freeze({
  VISIBLE_NOT_ADMITTED: "repo_family_seam_overclaim_pressure_visible_not_admitted",
  BLOCKED: "repo_family_seam_overclaim_pressure_blocked",
  UNSUPPORTED: "repo_family_seam_overclaim_pressure_unsupported",
  MALFORMED: "repo_family_seam_overclaim_pressure_malformed"
});

export const REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES = Object.freeze([
  "studio_specific_layer_api_attempted",
  "virtualia_specific_layer_api_attempted",
  "virtualia_lift_canon_quorum_rbc_overclaim",
  "edge_review_treated_as_layer_authority",
  "visibility_treated_as_authority_admission_continuity",
  "local_discovery_treated_as_mesh_discovery",
  "bytes_payload_visibility_treated_as_payload_validity",
  "packs_verification_treated_as_accepted_layer_state",
  "platform_receipt_treated_as_accepted_continuity",
  "repo_agent_reported_commit_test_treated_as_truth",
  "storage_index_view_treated_as_truth",
  "studio_dispatch_treated_as_result_acceptance_application",
  "virtualia_review_treated_as_queue_action_or_authority",
  "bytes_dispatch_treated_as_payload_fetch_or_result_acceptance",
  "packs_dispatch_treated_as_runtime_activation_or_result_acceptance",
  "platform_queued_action_treated_as_dispatch_or_host_consequence",
  "bytes_result_intake_treated_as_payload_validity_or_acceptance",
  "packs_result_intake_treated_as_accepted_layer_state_or_acceptance",
  "result_intake_reported_refs_treated_as_truth",
  "result_intake_visibility_treated_as_authority_admission_continuity",
  "result_intake_edge_review_treated_as_authority",
  "bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity",
  "packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state",
  "bytes_accepted_result_treated_as_payload_validity",
  "bytes_accepted_result_treated_as_payload_fetch_materialization",
  "bytes_accepted_result_treated_as_application_merge",
  "bytes_accepted_result_treated_as_layer_truth_continuity",
  "bytes_accepted_result_treated_as_storage_write_authority"
]);

const REQUIRED_CASES = Object.freeze([
  Object.freeze({
    caseId: "studio_specific_layer_api_attempted",
    sourceFamily: "studio",
    attemptedOverclaim: "Studio-specific Layer API treated as callable Layer authority",
    reasonCode: "blocked_case:studio_specific_layer_api_attempted"
  }),
  Object.freeze({
    caseId: "virtualia_specific_layer_api_attempted",
    sourceFamily: "virtualia",
    attemptedOverclaim: "Virtualia-specific Layer API treated as callable Layer authority",
    reasonCode: "blocked_case:virtualia_specific_layer_api_attempted"
  }),
  Object.freeze({
    caseId: "virtualia_lift_canon_quorum_rbc_overclaim",
    sourceFamily: "virtualia",
    attemptedOverclaim: "Virtualia lift, canon, quorum, or RBC evidence treated as Layer truth",
    reasonCode: "blocked_case:virtualia_lift_canon_quorum_rbc_overclaim"
  }),
  Object.freeze({
    caseId: "edge_review_treated_as_layer_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Edge review status treated as Layer authority",
    reasonCode: "blocked_case:edge_review_treated_as_layer_authority"
  }),
  Object.freeze({
    caseId: "visibility_treated_as_authority_admission_continuity",
    sourceFamily: "repo_family",
    attemptedOverclaim: "Visibility treated as authority, admission, or continuity",
    reasonCode: "blocked_case:visibility_treated_as_authority_admission_continuity"
  }),
  Object.freeze({
    caseId: "local_discovery_treated_as_mesh_discovery",
    sourceFamily: "testbed",
    attemptedOverclaim: "Local discovery treated as mesh discovery",
    reasonCode: "blocked_case:local_discovery_treated_as_mesh_discovery"
  }),
  Object.freeze({
    caseId: "bytes_payload_visibility_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes payload visibility treated as payload validity",
    reasonCode: "blocked_case:bytes_payload_visibility_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "packs_verification_treated_as_accepted_layer_state",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs verification treated as accepted Layer state",
    reasonCode: "blocked_case:packs_verification_treated_as_accepted_layer_state"
  }),
  Object.freeze({
    caseId: "platform_receipt_treated_as_accepted_continuity",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform receipt treated as accepted continuity",
    reasonCode: "blocked_case:platform_receipt_treated_as_accepted_continuity"
  }),
  Object.freeze({
    caseId: "repo_agent_reported_commit_test_treated_as_truth",
    sourceFamily: "repo_agent",
    attemptedOverclaim: "Repo-agent reported commit or test result treated as truth",
    reasonCode: "blocked_case:repo_agent_reported_commit_test_treated_as_truth"
  }),
  Object.freeze({
    caseId: "storage_index_view_treated_as_truth",
    sourceFamily: "testbed",
    attemptedOverclaim: "Storage, index, or view treated as truth",
    reasonCode: "blocked_case:storage_index_view_treated_as_truth"
  }),
  Object.freeze({
    caseId: "studio_dispatch_treated_as_result_acceptance_application",
    sourceFamily: "studio",
    attemptedOverclaim: "Studio dispatch observation treated as result acceptance, application, merge, or work success",
    reasonCode: "blocked_case:studio_dispatch_treated_as_result_acceptance_application"
  }),
  Object.freeze({
    caseId: "virtualia_review_treated_as_queue_action_or_authority",
    sourceFamily: "virtualia",
    attemptedOverclaim: "Virtualia pressure review treated as queue action, authority, or repo-agent dispatch approval",
    reasonCode: "blocked_case:virtualia_review_treated_as_queue_action_or_authority"
  }),
  Object.freeze({
    caseId: "bytes_dispatch_treated_as_payload_fetch_or_result_acceptance",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes pressure dispatch observation treated as payload fetch, materialization, or result acceptance",
    reasonCode: "blocked_case:bytes_dispatch_treated_as_payload_fetch_or_result_acceptance"
  }),
  Object.freeze({
    caseId: "packs_dispatch_treated_as_runtime_activation_or_result_acceptance",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs pressure dispatch observation treated as runtime activation, deployment authority, or result acceptance",
    reasonCode: "blocked_case:packs_dispatch_treated_as_runtime_activation_or_result_acceptance"
  }),
  Object.freeze({
    caseId: "platform_queued_action_treated_as_dispatch_or_host_consequence",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform pressure queued action treated as dispatch approval, host-local consequence, or deployment ownership",
    reasonCode: "blocked_case:platform_queued_action_treated_as_dispatch_or_host_consequence"
  }),
  Object.freeze({
    caseId: "bytes_result_intake_treated_as_payload_validity_or_acceptance",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes pressure result intake treated as payload validity, payload materialization, or result acceptance",
    reasonCode: "blocked_case:bytes_result_intake_treated_as_payload_validity_or_acceptance"
  }),
  Object.freeze({
    caseId: "packs_result_intake_treated_as_accepted_layer_state_or_acceptance",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs pressure result intake treated as accepted Layer state, runtime activation, deployment authority, or result acceptance",
    reasonCode: "blocked_case:packs_result_intake_treated_as_accepted_layer_state_or_acceptance"
  }),
  Object.freeze({
    caseId: "result_intake_reported_refs_treated_as_truth",
    sourceFamily: "repo_agent",
    attemptedOverclaim: "Repo-agent reported commit, test, or status refs from result intake treated as truth",
    reasonCode: "blocked_case:result_intake_reported_refs_treated_as_truth"
  }),
  Object.freeze({
    caseId: "result_intake_visibility_treated_as_authority_admission_continuity",
    sourceFamily: "repo_family",
    attemptedOverclaim: "Result-intake visibility treated as authority, admission, or continuity",
    reasonCode: "blocked_case:result_intake_visibility_treated_as_authority_admission_continuity"
  }),
  Object.freeze({
    caseId: "result_intake_edge_review_treated_as_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Edge result-intake review treated as authority",
    reasonCode: "blocked_case:result_intake_edge_review_treated_as_authority"
  }),
  Object.freeze({
    caseId: "bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes result-acceptance candidate treated as acceptance, payload validity, payload fetch, or materialization",
    reasonCode: "blocked_case:bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity"
  }),
  Object.freeze({
    caseId: "packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs result-acceptance candidate treated as acceptance, accepted Layer state, runtime activation, or deployment authority",
    reasonCode: "blocked_case:packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as payload validity",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_payload_fetch_materialization",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as payload fetch or materialization",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_payload_fetch_materialization"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_application_merge",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as result application or merge",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_application_merge"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_layer_truth_continuity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as Layer truth or continuity",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_layer_truth_continuity"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_storage_write_authority",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as storage write or authority",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_storage_write_authority"
  })
]);

const BOUNDARY_FALSE_FLAGS = Object.freeze([
  "callsLayer",
  "callsEdge",
  "callsStudio",
  "callsVirtualia",
  "callsBytes",
  "callsPacks",
  "callsPlatform",
  "dispatchesRepoAgents",
  "autoExecutes",
  "executesBehavior",
  "mutatesLayer",
  "mutatesSourceRepo",
  "writesProductionStorage",
  "createsAuthority",
  "acceptsAdmission",
  "acceptsContinuity",
  "acceptsLayerState",
  "claimsSourceSemantics",
  "claimsPayloadValidity",
  "claimsMeshDiscovery",
  "claimsTruth"
]);

const CASE_STOP_STATUSES = Object.freeze({
  BLOCKED: "blocked",
  UNSUPPORTED: "unsupported",
  VISIBLE_NOT_ADMITTED: "visible_not_admitted"
});

const TARGET_OWNER_REPO = "mesh-ecology-testbed";
const TARGET_LANE_ID = "lane-d";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "").map((entry) => entry.trim())
    : [];
}

function caseBoundary(pressureCase) {
  return isPlainObject(pressureCase?.boundary) ? pressureCase.boundary : {};
}

function staticPressureCase(requiredCase) {
  return Object.freeze({
    ...requiredCase,
    stopStatus: CASE_STOP_STATUSES.BLOCKED,
    evidencePosture: "evidence_only",
    admitted: false,
    boundary: Object.freeze(Object.fromEntries(BOUNDARY_FALSE_FLAGS.map((flag) => [flag, false])))
  });
}

export const TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_PACKET = Object.freeze({
  artifactKind: "testbed_repo_family_seam_overclaim_pressure_packet",
  schemaVersion: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION,
  packetId: "testbed:lane-d:repo-family-seam-overclaim-pressure:v0",
  laneId: TARGET_LANE_ID,
  ownerRepo: TARGET_OWNER_REPO,
  pressureKind: "fail_closed_repo_family_seam_pressure",
  evidencePosture: "evidence_only",
  reportOnly: true,
  createsAuthority: false,
  dispatchesRepoAgents: false,
  autoExecutes: false,
  writesProductionStorage: false,
  claimsSourceSemantics: false,
  cases: Object.freeze(REQUIRED_CASES.map(staticPressureCase))
});

function pressureCases(packet) {
  return Array.isArray(packet?.cases) ? packet.cases.filter(isPlainObject) : [];
}

function validateCase(pressureCase, expected) {
  const reasonCodes = [];
  const boundary = caseBoundary(pressureCase);

  if (!isPlainObject(pressureCase)) {
    return Object.freeze([`failed_pressure_case:${expected.caseId}`]);
  }

  if (pressureCase.caseId !== expected.caseId) {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (pressureCase.reasonCode !== expected.reasonCode) {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (pressureCase.stopStatus !== CASE_STOP_STATUSES.BLOCKED || pressureCase.admitted !== false) {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (pressureCase.evidencePosture !== "evidence_only") {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (BOUNDARY_FALSE_FLAGS.some((flag) => boundary[flag] !== false)) {
    reasonCodes.push(`boundary_overclaim:${expected.caseId}`);
  }

  return Object.freeze(reasonCodes);
}

function validatePacket(packet) {
  const reasonCodes = [];

  if (!isPlainObject(packet)) {
    return Object.freeze({
      reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["repo_family_seam_overclaim_pressure_packet_missing_or_malformed"])
    });
  }

  if (packet.ownerRepo !== TARGET_OWNER_REPO || packet.laneId !== TARGET_LANE_ID) {
    return Object.freeze({
      reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.UNSUPPORTED,
      reasonCodes: Object.freeze(["repo_family_seam_overclaim_pressure_unsupported_target"])
    });
  }

  if (packet.artifactKind !== "testbed_repo_family_seam_overclaim_pressure_packet") {
    reasonCodes.push("repo_family_seam_overclaim_pressure_artifact_kind_mismatch");
  }
  if (packet.schemaVersion !== TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION) {
    reasonCodes.push("repo_family_seam_overclaim_pressure_schema_mismatch");
  }
  if (
    packet.evidencePosture !== "evidence_only" ||
    packet.reportOnly !== true ||
    packet.createsAuthority !== false ||
    packet.dispatchesRepoAgents !== false ||
    packet.autoExecutes !== false ||
    packet.writesProductionStorage !== false ||
    packet.claimsSourceSemantics !== false
  ) {
    reasonCodes.push("repo_family_seam_overclaim_pressure_packet_boundary_overclaim");
  }

  const cases = pressureCases(packet);
  const casesById = new Map(cases.map((pressureCase) => [pressureCase.caseId, pressureCase]));

  for (const caseId of REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES) {
    if (!casesById.has(caseId)) {
      reasonCodes.push(`missing_pressure_case:${caseId}`);
    }
  }

  for (const expected of REQUIRED_CASES) {
    const pressureCase = casesById.get(expected.caseId);
    reasonCodes.push(...validateCase(pressureCase, expected));
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.VISIBLE_NOT_ADMITTED,
    reasonCodes: Object.freeze(["repo_family_seam_overclaim_pressure_visible_not_admitted"])
  });
}

export function buildTestbedRepoFamilySeamOverclaimPressureReport({
  pressurePacket = TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_PACKET,
  createdAt = new Date().toISOString(),
  reportId = null
} = {}) {
  const validation = validatePacket(pressurePacket);
  const cases = pressureCases(pressurePacket);
  const blockedCases = cases.filter((pressureCase) => pressureCase.stopStatus === CASE_STOP_STATUSES.BLOCKED);
  const unsupportedCases = cases.filter((pressureCase) => pressureCase.stopStatus === CASE_STOP_STATUSES.UNSUPPORTED);
  const visibleNotAdmittedCases = cases.filter(
    (pressureCase) => pressureCase.stopStatus === CASE_STOP_STATUSES.VISIBLE_NOT_ADMITTED
  );

  return Object.freeze({
    artifactKind: "testbed_repo_family_seam_overclaim_pressure_report",
    schemaVersion: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION,
    reportId: nonEmptyString(
      reportId,
      `testbed-repo-family-seam-overclaim-pressure:${nonEmptyString(pressurePacket?.packetId, "unknown")}:${createdAt}`
    ),
    createdAt,
    laneId: nonEmptyString(pressurePacket?.laneId),
    ownerRepo: nonEmptyString(pressurePacket?.ownerRepo),
    sourcePacketId: nonEmptyString(pressurePacket?.packetId),
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    requiredCaseIds: Object.freeze([...REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES]),
    observedCaseIds: Object.freeze(stringArray(cases.map((pressureCase) => pressureCase.caseId))),
    blockedCaseIds: Object.freeze(stringArray(blockedCases.map((pressureCase) => pressureCase.caseId))),
    unsupportedCaseIds: Object.freeze(stringArray(unsupportedCases.map((pressureCase) => pressureCase.caseId))),
    visibleNotAdmittedCaseIds: Object.freeze(stringArray(visibleNotAdmittedCases.map((pressureCase) => pressureCase.caseId))),
    admittedCaseCount: cases.filter((pressureCase) => pressureCase.admitted === true).length,
    reviewOnly: true,
    evidenceOnly: true,
    visibleNotAdmitted: true,
    testbedMutatedLayer: false,
    testbedMutatedSourceRepo: false,
    testbedCalledLayer: false,
    testbedCalledEdge: false,
    testbedCalledStudio: false,
    testbedCalledVirtualia: false,
    testbedCalledBytes: false,
    testbedCalledPacks: false,
    testbedCalledPlatform: false,
    testbedExecutedPlatformBehavior: false,
    testbedExecutedPacksBehavior: false,
    testbedExecutedBytesBehavior: false,
    testbedDispatchedRepoAgents: false,
    testbedAutoExecuted: false,
    testbedWroteProductionStorage: false,
    authorityCreated: false,
    layerAuthorityCreated: false,
    layerStateAccepted: false,
    continuityAccepted: false,
    meshDiscoveryClaimed: false,
    payloadValidityClaimed: false,
    sourceSemanticsClaimed: false,
    storageIndexViewIsTruth: false,
    repoAgentReportIsTruth: false
  });
}

export function listTestbedRepoFamilySeamOverclaimPressureCases() {
  return Object.freeze([...REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES]);
}

export function listTestbedRepoFamilySeamOverclaimPressureStatuses() {
  return Object.freeze(Object.values(TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES));
}
