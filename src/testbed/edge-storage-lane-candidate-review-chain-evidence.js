export const TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_storage_lane_candidate_review_chain_evidence.v1";

export const TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES = Object.freeze({
  VISIBLE: "storage_lane_candidate_review_chain_visible",
  BLOCKED: "storage_lane_candidate_review_chain_blocked",
  MALFORMED: "storage_lane_candidate_review_chain_malformed",
  INCOMPLETE: "storage_lane_candidate_review_chain_incomplete"
});

const CAUSAL_EXPECTED_KIND = "causal-edge-storage-lane-candidate-evidence";
const CAUSAL_EXPECTED_SCHEMA = "causal-substrate/edge-storage-lane-candidate-evidence/v1";
const TESTBED_EXPECTED_KIND = "testbed_edge_storage_lane_candidate_evidence";
const TESTBED_EXPECTED_SCHEMA = "testbed_edge_storage_lane_candidate_evidence.v1";
const EDGE_STATUS_EXPECTED_KIND = "edge_local_layer_storage_lane_candidate_review_status";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "")
    : [];
}

function unsafeSeamRef(ref) {
  return /:\/\/|\/|\\|localhost|127\.0\.0\.1|ssh|http/iu.test(ref);
}

function refs(artifact) {
  return isPlainObject(artifact?.refs) ? artifact.refs : {};
}

function writerAdmission(artifact) {
  return isPlainObject(artifact?.writerAdmission) ? artifact.writerAdmission : {};
}

function acceptanceRule(artifact) {
  return isPlainObject(artifact?.acceptanceRule) ? artifact.acceptanceRule : {};
}

function storageLanePosture(artifact) {
  return isPlainObject(artifact?.storageLanePosture) ? artifact.storageLanePosture : {};
}

function validateChain({ causalEvidence, testbedReviewEvidence, edgeReviewStatus }) {
  const reasonCodes = [];

  if (!isPlainObject(causalEvidence)) reasonCodes.push("storage_lane_chain_causal_missing_or_malformed");
  if (!isPlainObject(testbedReviewEvidence)) reasonCodes.push("storage_lane_chain_testbed_missing_or_malformed");
  if (!isPlainObject(edgeReviewStatus)) reasonCodes.push("storage_lane_chain_edge_status_missing_or_malformed");

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  const causalRefs = refs(causalEvidence);
  const writer = writerAdmission(causalEvidence);
  const acceptance = acceptanceRule(causalEvidence);
  const storage = storageLanePosture(causalEvidence);
  const causalArtifactId = nonEmptyString(causalEvidence.artifactId);
  const candidateId = nonEmptyString(causalRefs.candidateId);
  const chainRefs = [
    causalArtifactId,
    candidateId,
    nonEmptyString(causalRefs.layerRef),
    nonEmptyString(causalRefs.projectionLaneRef),
    nonEmptyString(causalRefs.observerRef),
    nonEmptyString(testbedReviewEvidence.evidenceId),
    nonEmptyString(edgeReviewStatus.viewId),
    ...stringArray(causalRefs.sourceProjectionEventRefs),
    ...stringArray(causalRefs.sourceEntryRefs),
    ...stringArray(causalRefs.sourceIdentityHashes),
    ...stringArray(causalRefs.sourceRefs),
    ...stringArray(writer.admittedWriterRefs),
    ...stringArray(writer.candidateWriterRefs),
    ...stringArray(writer.rejectedWriterRefs)
  ].filter(Boolean);

  if (causalEvidence.artifactKind !== CAUSAL_EXPECTED_KIND) reasonCodes.push("storage_lane_chain_causal_kind_mismatch");
  if (causalEvidence.schema !== CAUSAL_EXPECTED_SCHEMA) reasonCodes.push("storage_lane_chain_causal_schema_mismatch");
  if (causalEvidence.reviewStatus !== "edge-storage-lane-candidate-evidence-emitted") {
    reasonCodes.push("storage_lane_chain_causal_not_emitted");
  }
  if (!causalArtifactId) reasonCodes.push("storage_lane_chain_causal_artifact_ref_missing");
  if (!candidateId) reasonCodes.push("storage_lane_chain_candidate_ref_missing");
  if (stringArray(causalRefs.sourceProjectionEventRefs).length === 0) {
    reasonCodes.push("storage_lane_chain_projection_event_refs_missing");
  }
  if (stringArray(causalRefs.sourceEntryRefs).length === 0) reasonCodes.push("storage_lane_chain_entry_refs_missing");
  if (stringArray(causalRefs.sourceRefs).length === 0) reasonCodes.push("storage_lane_chain_source_refs_missing");

  if (testbedReviewEvidence.artifactKind !== TESTBED_EXPECTED_KIND) {
    reasonCodes.push("storage_lane_chain_testbed_kind_mismatch");
  }
  if (testbedReviewEvidence.schemaVersion !== TESTBED_EXPECTED_SCHEMA) {
    reasonCodes.push("storage_lane_chain_testbed_schema_mismatch");
  }
  if (testbedReviewEvidence.reviewStatus !== "storage_lane_candidate_visible") {
    reasonCodes.push("storage_lane_chain_testbed_not_visible");
  }
  if (testbedReviewEvidence.sourceArtifactId !== causalArtifactId) {
    reasonCodes.push("storage_lane_chain_testbed_causal_ref_mismatch");
  }
  if (testbedReviewEvidence.candidateId !== candidateId) {
    reasonCodes.push("storage_lane_chain_testbed_candidate_ref_mismatch");
  }

  if (edgeReviewStatus.artifactKind !== EDGE_STATUS_EXPECTED_KIND) {
    reasonCodes.push("storage_lane_chain_edge_status_kind_mismatch");
  }
  if (edgeReviewStatus.ecosystemSeamId !== "testbed") reasonCodes.push("storage_lane_chain_edge_status_seam_mismatch");
  if (edgeReviewStatus.storageLaneCandidateReviewState !== "local_layer_storage_lane_candidate_review_available") {
    reasonCodes.push("storage_lane_chain_edge_status_not_available");
  }
  if (edgeReviewStatus.causalArtifactId !== causalArtifactId) reasonCodes.push("storage_lane_chain_edge_causal_ref_mismatch");
  if (edgeReviewStatus.testbedReviewEvidenceId !== testbedReviewEvidence.evidenceId) {
    reasonCodes.push("storage_lane_chain_edge_testbed_ref_mismatch");
  }
  if (edgeReviewStatus.candidateId !== candidateId) reasonCodes.push("storage_lane_chain_edge_candidate_ref_mismatch");
  if (edgeReviewStatus.readyForOperatorReview !== true) reasonCodes.push("storage_lane_chain_edge_not_operator_review_ready");
  if (edgeReviewStatus.localLayerStorageLaneCandidateReviewed !== true) {
    reasonCodes.push("storage_lane_chain_edge_candidate_not_reviewed");
  }
  if (edgeReviewStatus.readyForSelfWorkReadiness !== true) {
    reasonCodes.push("storage_lane_chain_edge_self_work_readiness_missing");
  }

  if (
    writer.policyKind !== "operator_owned_local_layer_explicit_writer_admission" ||
    stringArray(writer.admittedWriterRefs).length === 0 ||
    writer.generalWriterAuthorityGranted !== false ||
    writer.writerAdmissionRequiredBeforeAcceptance !== true ||
    writer.operatorMediationRequired !== true ||
    writer.optimisticAppendRequiresAcceptanceGate !== true
  ) {
    reasonCodes.push("storage_lane_chain_writer_admission_overclaim");
  }

  if (
    acceptance.ruleKind !== "apply_validation_accepts_projection_lane_entry" ||
    acceptance.appendSuccessIsAcceptance !== false ||
    acceptance.replicaVisibilityIsContinuity !== false ||
    acceptance.linearizationIsTruth !== false ||
    acceptance.requiresWriterAdmission !== true ||
    acceptance.requiresCausalSubstrateInterpretation !== true ||
    acceptance.requiresFailClosedTestbedPressure !== true
  ) {
    reasonCodes.push("storage_lane_chain_acceptance_rule_overclaim");
  }

  if (
    storage.intendedStorageLane !== "bounded_autobase_equivalent_projection_lane" ||
    storage.storageDirection !== "bounded_autobase_equivalent_linearization" ||
    storage.promotedSemanticUnit !== "mesh_ecology_local_layer_projection_event" ||
    storage.productionBackendPromoted !== false ||
    storage.productionAutobaseStarted !== false ||
    storage.edgeStateMigration !== false ||
    storage.appendSuccessIsAcceptance !== false ||
    storage.linearizationIsTruth !== false ||
    storage.replicaVisibilityIsContinuity !== false
  ) {
    reasonCodes.push("storage_lane_chain_storage_posture_overclaim");
  }

  if (
    edgeReviewStatus.writerAuthorityGranted === true ||
    edgeReviewStatus.readyForWriterAuthority === true ||
    edgeReviewStatus.readyForAppendAcceptance === true ||
    edgeReviewStatus.readyForAutobaseBackend === true ||
    edgeReviewStatus.readyForDurableLocalLayerState === true ||
    edgeReviewStatus.readyForReplicatedState === true ||
    edgeReviewStatus.appendSuccessIsAcceptance === true ||
    edgeReviewStatus.replicaVisibilityIsContinuity === true ||
    edgeReviewStatus.linearizationIsTruth === true ||
    edgeReviewStatus.productionAutobaseStarted === true ||
    edgeReviewStatus.productionBackendPromoted === true ||
    edgeReviewStatus.durableStateClaimed === true ||
    edgeReviewStatus.replicatedStateClaimed === true ||
    edgeReviewStatus.causalTruthClaimed === true ||
    edgeReviewStatus.runtimeAuthorityClaimed === true
  ) {
    reasonCodes.push("storage_lane_chain_edge_status_overclaim");
  }

  if (
    testbedReviewEvidence.testbedOpenedAutobase === true ||
    testbedReviewEvidence.testbedOpenedCorestore === true ||
    testbedReviewEvidence.testbedWritesContinuityRecords === true ||
    testbedReviewEvidence.testbedAcceptsCanonicalHistory === true ||
    testbedReviewEvidence.testbedClaimsCausalTruth === true ||
    testbedReviewEvidence.authorityGranted === true ||
    testbedReviewEvidence.productionProofClaimed === true ||
    testbedReviewEvidence.durableStateClaimed === true ||
    testbedReviewEvidence.replicatedStateClaimed === true
  ) {
    reasonCodes.push("storage_lane_chain_testbed_boundary_overclaim");
  }

  if (chainRefs.some(unsafeSeamRef)) reasonCodes.push("storage_lane_chain_ref_contains_compat_or_path_seam");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("compat") ||
    code.includes("path_seam") ||
    code.includes("not_available")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["storage_lane_candidate_review_chain_visible"])
  });
}

export function buildTestbedEdgeStorageLaneCandidateReviewChainEvidence({
  causalEvidence = null,
  testbedReviewEvidence = null,
  edgeReviewStatus = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validateChain({ causalEvidence, testbedReviewEvidence, edgeReviewStatus });
  const causalRefs = refs(causalEvidence);
  const writer = writerAdmission(causalEvidence);
  const acceptance = acceptanceRule(causalEvidence);
  const storage = storageLanePosture(causalEvidence);

  return Object.freeze({
    artifactKind: "testbed_edge_storage_lane_candidate_review_chain_evidence",
    schemaVersion: TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-storage-lane-candidate-review-chain:${nonEmptyString(edgeReviewStatus?.viewId, "unknown")}:${createdAt}`),
    createdAt,
    reviewStatus: result.reviewStatus,
    reasonCodes: result.reasonCodes,
    sourceCausalArtifactKind: nonEmptyString(causalEvidence?.artifactKind),
    sourceCausalArtifactId: nonEmptyString(causalEvidence?.artifactId),
    sourceCausalSchema: nonEmptyString(causalEvidence?.schema),
    sourceTestbedArtifactKind: nonEmptyString(testbedReviewEvidence?.artifactKind),
    sourceTestbedEvidenceId: nonEmptyString(testbedReviewEvidence?.evidenceId),
    sourceTestbedReviewStatus: nonEmptyString(testbedReviewEvidence?.reviewStatus),
    sourceEdgeStatusArtifactKind: nonEmptyString(edgeReviewStatus?.artifactKind),
    sourceEdgeStatusViewId: nonEmptyString(edgeReviewStatus?.viewId),
    sourceEdgeReviewState: nonEmptyString(edgeReviewStatus?.storageLaneCandidateReviewState),
    sourceStorageLaneCandidateRef: nonEmptyString(causalRefs.candidateId),
    sourceProjectionEventRefCount: stringArray(causalRefs.sourceProjectionEventRefs).length,
    sourceEntryRefCount: stringArray(causalRefs.sourceEntryRefs).length,
    sourceIdentityHashCount: stringArray(causalRefs.sourceIdentityHashes).length,
    sourceRefCount: stringArray(causalRefs.sourceRefs).length,
    admittedWriterRefCount: stringArray(writer.admittedWriterRefs).length,
    candidateWriterRefCount: stringArray(writer.candidateWriterRefs).length,
    rejectedWriterRefCount: stringArray(writer.rejectedWriterRefs).length,
    writerAdmissionRequiredBeforeAcceptance: writer.writerAdmissionRequiredBeforeAcceptance === true,
    operatorMediationRequired: writer.operatorMediationRequired === true,
    appendSuccessIsAcceptance: acceptance.appendSuccessIsAcceptance === true,
    replicaVisibilityIsContinuity: acceptance.replicaVisibilityIsContinuity === true,
    linearizationIsTruth: acceptance.linearizationIsTruth === true,
    intendedStorageLane: nonEmptyString(storage.intendedStorageLane),
    storageDirection: nonEmptyString(storage.storageDirection),
    promotedSemanticUnit: nonEmptyString(storage.promotedSemanticUnit),
    productionAutobaseStarted: storage.productionAutobaseStarted === true,
    productionBackendPromoted: storage.productionBackendPromoted === true,
    edgeStateMigration: storage.edgeStateMigration === true,
    edgeReadyForOperatorReview: edgeReviewStatus?.readyForOperatorReview === true,
    edgeReadyForSelfWorkReadiness: edgeReviewStatus?.readyForSelfWorkReadiness === true,
    edgeWriterAuthorityGranted: edgeReviewStatus?.writerAuthorityGranted === true,
    edgeReadyForAutobaseBackend: edgeReviewStatus?.readyForAutobaseBackend === true,
    edgeDurableStateClaimed: edgeReviewStatus?.durableStateClaimed === true,
    edgeReplicatedStateClaimed: edgeReviewStatus?.replicatedStateClaimed === true,
    edgeCausalTruthClaimed: edgeReviewStatus?.causalTruthClaimed === true,
    testbedReviewOnly: testbedReviewEvidence?.reviewOnly === true,
    testbedEvidenceOnly: testbedReviewEvidence?.evidenceOnly === true,
    testbedOpenedAutobase: testbedReviewEvidence?.testbedOpenedAutobase === true,
    testbedOpenedCorestore: testbedReviewEvidence?.testbedOpenedCorestore === true,
    testbedWritesContinuityRecords: testbedReviewEvidence?.testbedWritesContinuityRecords === true,
    testbedAcceptsCanonicalHistory: testbedReviewEvidence?.testbedAcceptsCanonicalHistory === true,
    testbedClaimsCausalTruth: testbedReviewEvidence?.testbedClaimsCausalTruth === true,
    reviewOnly: true,
    evidenceOnly: true,
    testbedExecutedEdge: false,
    testbedCalledEdge: false,
    testbedMutatedEdge: false,
    testbedOpenedEdgeStorage: false,
    testbedStartedAutobaseBackend: false,
    productionProofClaimed: false,
    durableStateClaimed: false,
    replicatedStateClaimed: false,
    authorityGranted: false,
    meshTruthClaimed: false,
    completionClaimed: false
  });
}

export function listTestbedEdgeStorageLaneCandidateReviewChainStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_STORAGE_LANE_CANDIDATE_REVIEW_CHAIN_STATUSES));
}
