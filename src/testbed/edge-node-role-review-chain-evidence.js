export const TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_EVIDENCE_SCHEMA_VERSION =
  "testbed_edge_node_role_review_chain_evidence.v1";

export const TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES = Object.freeze({
  VISIBLE: "node_role_review_chain_visible",
  BLOCKED: "node_role_review_chain_blocked",
  MALFORMED: "node_role_review_chain_malformed",
  INCOMPLETE: "node_role_review_chain_incomplete"
});

const CAUSAL_EXPECTED_KIND = "causal-edge-local-layer-node-role-lab-evidence";
const CAUSAL_EXPECTED_SCHEMA = "causal-substrate/edge-local-layer-node-role-lab-evidence/v1";
const TESTBED_EXPECTED_KIND = "testbed_edge_local_layer_node_role_lab_evidence";
const TESTBED_EXPECTED_SCHEMA = "testbed_edge_local_layer_node_role_lab_evidence.v1";
const EDGE_STATUS_EXPECTED_KIND = "edge_local_layer_node_role_lab_review_status";

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

function validateChain({ causalEvidence, testbedReviewEvidence, edgeReviewStatus }) {
  const reasonCodes = [];

  if (!isPlainObject(causalEvidence)) reasonCodes.push("node_role_chain_causal_missing_or_malformed");
  if (!isPlainObject(testbedReviewEvidence)) reasonCodes.push("node_role_chain_testbed_missing_or_malformed");
  if (!isPlainObject(edgeReviewStatus)) reasonCodes.push("node_role_chain_edge_status_missing_or_malformed");

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  const causalRefs = refs(causalEvidence);
  const causalArtifactId = nonEmptyString(causalEvidence.artifactId);
  const storageCandidateRef = nonEmptyString(causalRefs.sourceStorageLaneCandidateRef);
  const projectionViewRef = nonEmptyString(causalRefs.projectionViewRef);
  const chainRefs = [
    causalArtifactId,
    storageCandidateRef,
    projectionViewRef,
    nonEmptyString(testbedReviewEvidence.evidenceId),
    nonEmptyString(edgeReviewStatus.viewId),
    ...stringArray(causalRefs.acceptedProjectionRecordRefs),
    ...stringArray(causalRefs.acceptedLogEntryRefs),
    ...stringArray(causalRefs.rejectedReviewRefs)
  ].filter(Boolean);

  if (causalEvidence.artifactKind !== CAUSAL_EXPECTED_KIND) reasonCodes.push("node_role_chain_causal_kind_mismatch");
  if (causalEvidence.schema !== CAUSAL_EXPECTED_SCHEMA) reasonCodes.push("node_role_chain_causal_schema_mismatch");
  if (causalEvidence.reviewStatus !== "edge-local-layer-node-role-lab-evidence-emitted") {
    reasonCodes.push("node_role_chain_causal_not_emitted");
  }
  if (!causalArtifactId) reasonCodes.push("node_role_chain_causal_artifact_ref_missing");
  if (!storageCandidateRef) reasonCodes.push("node_role_chain_storage_candidate_ref_missing");
  if (!projectionViewRef) reasonCodes.push("node_role_chain_projection_view_ref_missing");

  if (testbedReviewEvidence.artifactKind !== TESTBED_EXPECTED_KIND) reasonCodes.push("node_role_chain_testbed_kind_mismatch");
  if (testbedReviewEvidence.schemaVersion !== TESTBED_EXPECTED_SCHEMA) reasonCodes.push("node_role_chain_testbed_schema_mismatch");
  if (testbedReviewEvidence.reviewStatus !== "node_role_lab_visible") reasonCodes.push("node_role_chain_testbed_not_visible");
  if (testbedReviewEvidence.sourceArtifactId !== causalArtifactId) reasonCodes.push("node_role_chain_testbed_causal_ref_mismatch");
  if (testbedReviewEvidence.sourceStorageLaneCandidateRef !== storageCandidateRef) {
    reasonCodes.push("node_role_chain_testbed_storage_ref_mismatch");
  }
  if (testbedReviewEvidence.projectionViewRef !== projectionViewRef) {
    reasonCodes.push("node_role_chain_testbed_projection_ref_mismatch");
  }

  if (edgeReviewStatus.artifactKind !== EDGE_STATUS_EXPECTED_KIND) reasonCodes.push("node_role_chain_edge_status_kind_mismatch");
  if (edgeReviewStatus.ecosystemSeamId !== "testbed") reasonCodes.push("node_role_chain_edge_status_seam_mismatch");
  if (edgeReviewStatus.nodeRoleLabReviewState !== "local_layer_node_role_lab_review_available") {
    reasonCodes.push("node_role_chain_edge_status_not_available");
  }
  if (edgeReviewStatus.causalArtifactId !== causalArtifactId) reasonCodes.push("node_role_chain_edge_causal_ref_mismatch");
  if (edgeReviewStatus.testbedReviewEvidenceId !== testbedReviewEvidence.evidenceId) {
    reasonCodes.push("node_role_chain_edge_testbed_ref_mismatch");
  }
  if (edgeReviewStatus.sourceStorageLaneCandidateRef !== storageCandidateRef) {
    reasonCodes.push("node_role_chain_edge_storage_ref_mismatch");
  }
  if (edgeReviewStatus.projectionViewRef !== projectionViewRef) reasonCodes.push("node_role_chain_edge_projection_ref_mismatch");
  if (edgeReviewStatus.readyForOperatorReview !== true) reasonCodes.push("node_role_chain_edge_not_operator_review_ready");
  if (edgeReviewStatus.localLayerNodeRolesReviewed !== true) reasonCodes.push("node_role_chain_edge_roles_not_reviewed");
  if (edgeReviewStatus.readyForSelfWorkReadiness !== true) reasonCodes.push("node_role_chain_edge_self_work_readiness_missing");

  if (
    testbedReviewEvidence.observabilityIsAuthority !== false ||
    testbedReviewEvidence.observabilityIsWritability !== false ||
    testbedReviewEvidence.writabilityIsAuthority !== false ||
    testbedReviewEvidence.appendSuccessIsAcceptance !== false ||
    testbedReviewEvidence.observerAcceptedContinuityInput !== false ||
    testbedReviewEvidence.candidateAcceptedContinuityInput !== false ||
    testbedReviewEvidence.admittedAcceptedContinuityInput !== true
  ) {
    reasonCodes.push("node_role_chain_testbed_role_separation_overclaim");
  }

  if (
    edgeReviewStatus.writerAuthorityGranted === true ||
    edgeReviewStatus.readyForWriterAuthority === true ||
    edgeReviewStatus.readyForAppendAcceptance === true ||
    edgeReviewStatus.readyForAutobaseBackend === true ||
    edgeReviewStatus.readyForDurableLocalLayerState === true ||
    edgeReviewStatus.readyForReplicatedState === true ||
    edgeReviewStatus.durableStateClaimed === true ||
    edgeReviewStatus.replicatedStateClaimed === true ||
    edgeReviewStatus.causalTruthClaimed === true ||
    edgeReviewStatus.runtimeAuthorityClaimed === true
  ) {
    reasonCodes.push("node_role_chain_edge_status_overclaim");
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
    reasonCodes.push("node_role_chain_testbed_boundary_overclaim");
  }

  if (chainRefs.some(unsafeSeamRef)) reasonCodes.push("node_role_chain_ref_contains_compat_or_path_seam");

  if (reasonCodes.some((code) =>
    code.includes("mismatch") ||
    code.includes("overclaim") ||
    code.includes("unsafe") ||
    code.includes("compat") ||
    code.includes("path_seam") ||
    code.includes("not_available")
  )) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.INCOMPLETE,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES.VISIBLE,
    reasonCodes: Object.freeze(["node_role_review_chain_visible"])
  });
}

export function buildTestbedEdgeNodeRoleReviewChainEvidence({
  causalEvidence = null,
  testbedReviewEvidence = null,
  edgeReviewStatus = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const result = validateChain({ causalEvidence, testbedReviewEvidence, edgeReviewStatus });
  const causalRefs = refs(causalEvidence);

  return Object.freeze({
    artifactKind: "testbed_edge_node_role_review_chain_evidence",
    schemaVersion: TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_EVIDENCE_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-edge-node-role-review-chain:${nonEmptyString(edgeReviewStatus?.viewId, "unknown")}:${createdAt}`),
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
    sourceEdgeReviewState: nonEmptyString(edgeReviewStatus?.nodeRoleLabReviewState),
    sourceStorageLaneCandidateRef: nonEmptyString(causalRefs.sourceStorageLaneCandidateRef),
    projectionViewRef: nonEmptyString(causalRefs.projectionViewRef),
    acceptedProjectionRecordRefCount: stringArray(causalRefs.acceptedProjectionRecordRefs).length,
    acceptedLogEntryRefCount: stringArray(causalRefs.acceptedLogEntryRefs).length,
    rejectedReviewRefCount: stringArray(causalRefs.rejectedReviewRefs).length,
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

export function listTestbedEdgeNodeRoleReviewChainStatuses() {
  return Object.freeze(Object.values(TESTBED_EDGE_NODE_ROLE_REVIEW_CHAIN_STATUSES));
}
