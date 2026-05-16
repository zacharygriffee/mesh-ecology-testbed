import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedCausalProjectionKeyExchangeEvidence,
  listTestbedCausalProjectionKeyExchangeStatuses,
  TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION,
  TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES
} from "../src/testbed/causal-projection-key-exchange-evidence.js";

const CREATED_AT = "2026-05-16T15:00:00.000Z";
const SOURCE_CORE_KEY = "a".repeat(64);
const TRACE_REF = "edge-self-work-trace:projection-loop";
const TESTBED_REF = "testbed-review:projection-key-exchange";

function validCausalEvidence({ replicaReviewed = false } = {}) {
  return {
    artifactKind: "causal-edge-projection-key-exchange-evidence",
    schema: "causal-substrate/edge-projection-key-exchange-evidence/v1",
    schemaVersion: 1,
    artifactId: "causal-edge-projection-key-exchange-evidence:aaaaaaaaaaaaaaaa",
    emittedAt: "2026-05-16T14:00:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-edge",
      sourceArtifactKind: "edge_projection_key_exchange_proof",
      sourceSchema: "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0"
    },
    contactRefs: {
      proofId: "edge-projection-key-exchange:aaaaaaaaaaaaaaaa",
      payloadHash: `sha256:${"b".repeat(64)}`,
      sourceCoreKey: SOURCE_CORE_KEY,
      hostPublicKey: "c".repeat(64),
      requestRef: "edge-projection-key-request:a",
      responseRef: "edge-projection-key-response:a",
      capabilityAdvertisementRef: "edge-projection-capabilities-response:a",
      selectedTransportRef: "protomux-rpc:hyperdht_direct_peer",
      appendEntryRef: "edge-projection-key-exchange-entry:aaaaaaaaaaaaaaaa",
      semanticSourceRefs: [TRACE_REF, TESTBED_REF],
      replicaEntryRefs: replicaReviewed
        ? ["projection-log-entry:projection:mesh-ecology-edge:operator_situation_view:aaaaaaaaaaaaaaaa:0"]
        : [],
      replicaSourceRefs: replicaReviewed
        ? [TRACE_REF, TESTBED_REF, "edge-operator-situation:op-status"]
        : []
    },
    contactPosture: {
      transportKind: "protomux-rpc",
      contactSeam: "hyperdht_direct_peer",
      transportRole: "proof_lane",
      transportScope: "isolated_local_hyperdht",
      participantContact: true,
      scaffoldTransport: false,
      compatibilityAlias: false,
      contactAttempted: true,
      contactSucceeded: true,
      proofLane: "hyperdht-protomux-rpc-direct-peer",
      participantIdentityDependsOnHttp: false
    },
    continuityPosture: {
      sourceCoreKeyPresent: true,
      sourceCoreKeyMatchesReplica: replicaReviewed ? true : "not-reviewed",
      semanticRefsPresent: true,
      replicaRefsPreserved: replicaReviewed ? true : "not-reviewed",
      happeningRole: "projection-source-core-key-contact-proof",
      causalContinuityRole: "contact-evidence-for-projection-log-replica-continuity",
      acceptedAsCanonicalHistory: false,
      refinedByReplicaInspection: replicaReviewed
    },
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      opensHyperDht: false,
      opensProtomuxRpc: false,
      opensCorestore: false,
      opensAutobase: false,
      callsEdge: false,
      callsTestbed: false,
      replaysProjectionLog: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsDistributedReadiness: false,
      claimsReplicatedState: false,
      claimsMeshPublication: false,
      claimsCausalTruth: false,
      startsBackend: false
    },
    validation: {
      status: "edge-projection-key-exchange-valid-contact-evidence",
      parseableObject: true,
      expectedSourceSchemaPresent: true,
      sourceCoreKeyPresent: true,
      semanticRefsPresent: true,
      contactEvidencePresent: true,
      selectedTransportPosturePresent: true,
      replicaInspectionMatched: replicaReviewed ? true : "not-reviewed",
      unsafeSeamRefsBlocked: true,
      unsafeClaimsBlocked: true,
      issues: []
    },
    reviewStatus: "edge-projection-key-exchange-evidence-emitted",
    warnings: [],
    rejections: []
  };
}

function build(causalEvidence = validCausalEvidence()) {
  return buildTestbedCausalProjectionKeyExchangeEvidence({
    causalEvidence,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedCausalSubstrate, false);
  assert.equal(evidence.testbedExecutedEdge, false);
  assert.equal(evidence.testbedOpenedHyperDHT, false);
  assert.equal(evidence.testbedOpenedProtomux, false);
  assert.equal(evidence.testbedOpenedCorestore, false);
  assert.equal(evidence.testbedOpenedAutobase, false);
  assert.equal(evidence.testbedWroteContinuityRecords, false);
  assert.equal(evidence.testbedAcceptedCanonicalHistory, false);
}

test("valid causal projection-key exchange evidence is passively reviewed as visible", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_causal_projection_key_exchange_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["causal_projection_key_evidence_visible"]);
  assert.equal(evidence.sourceRepo, "mesh-ecology-edge");
  assert.equal(evidence.sourceArtifactKind, "edge_projection_key_exchange_proof");
  assert.equal(evidence.sourceSchema, "mesh-ecology-edge/projection-key-exchange/hyperdht-protomux-rpc/v0");
  assert.equal(evidence.causalArtifactKind, "causal-edge-projection-key-exchange-evidence");
  assert.equal(evidence.causalSchema, "causal-substrate/edge-projection-key-exchange-evidence/v1");
  assert.equal(evidence.sourceCoreKey, SOURCE_CORE_KEY);
  assert.deepEqual(evidence.sourceRefs, [TRACE_REF, TESTBED_REF]);
  assert.equal(evidence.transportKind, "protomux-rpc");
  assert.equal(evidence.contactSeam, "hyperdht_direct_peer");
  assert.equal(evidence.transportRole, "proof_lane");
  assert.equal(evidence.transportScope, "isolated_local_hyperdht");
  assert.equal(evidence.contactAttempted, true);
  assert.equal(evidence.contactSucceeded, true);
  assert.equal(evidence.sourceCoreKeyMatchesReplica, "not-reviewed");
  assert.equal(evidence.replicaRefsPreserved, "not-reviewed");
  assert.equal(evidence.refinedByReplicaInspection, false);
  assertPassiveEvidence(evidence);
});

test("valid causal projection-key evidence can include replica refinement", () => {
  const evidence = build(validCausalEvidence({ replicaReviewed: true }));

  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_VISIBLE);
  assert.equal(evidence.sourceCoreKeyMatchesReplica, true);
  assert.equal(evidence.replicaRefsPreserved, true);
  assert.equal(evidence.refinedByReplicaInspection, true);
  assert.equal(evidence.replicaEntryRefs.length, 1);
  assert.deepEqual(evidence.replicaSourceRefs, [TRACE_REF, TESTBED_REF, "edge-operator-situation:op-status"]);
  assertPassiveEvidence(evidence);
});

test("causal projection-key evidence blocks runtime backend and truth overclaims", () => {
  const causalEvidence = validCausalEvidence();
  causalEvidence.boundary.opensHyperDht = true;
  causalEvidence.boundary.opensCorestore = true;
  causalEvidence.boundary.claimsCausalTruth = true;

  const evidence = build(causalEvidence);

  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("causal_projection_key_boundary_overclaim"), true);
  assert.equal(evidence.causalEvidenceOpenedHyperDHT, true);
  assert.equal(evidence.causalEvidenceOpenedCorestore, true);
  assert.equal(evidence.causalEvidenceClaimedTruth, true);
  assertPassiveEvidence(evidence);
});

test("causal projection-key evidence blocks scaffold source refs", () => {
  const causalEvidence = validCausalEvidence();
  causalEvidence.contactRefs.semanticSourceRefs = ["http://127.0.0.1:8787/projection"];

  const evidence = build(causalEvidence);

  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("causal_projection_key_refs_contain_scaffold"), true);
  assertPassiveEvidence(evidence);
});

test("causal projection-key evidence blocks contact posture drift", () => {
  const causalEvidence = validCausalEvidence();
  causalEvidence.contactPosture.contactSeam = "loopback_http_scaffold";
  causalEvidence.contactPosture.compatibilityAlias = true;

  const evidence = build(causalEvidence);

  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("causal_projection_key_contact_posture_missing_or_unsafe"), true);
  assertPassiveEvidence(evidence);
});

test("causal projection-key evidence blocks replica refinement mismatch", () => {
  const causalEvidence = validCausalEvidence({ replicaReviewed: true });
  causalEvidence.continuityPosture.sourceCoreKeyMatchesReplica = false;
  causalEvidence.validation.replicaInspectionMatched = false;

  const evidence = build(causalEvidence);

  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("causal_projection_key_replica_refinement_mismatch"), true);
  assertPassiveEvidence(evidence);
});

test("causal projection-key evidence reports missing source refs as incomplete", () => {
  const causalEvidence = validCausalEvidence();
  causalEvidence.contactRefs.semanticSourceRefs = [];

  const evidence = build(causalEvidence);

  assert.equal(evidence.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("causal_projection_key_semantic_refs_missing"), true);
  assert.equal(evidence.sourceRefCount, 0);
  assertPassiveEvidence(evidence);
});

test("causal projection-key evidence handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedCausalProjectionKeyExchangeEvidence({
    causalEvidence: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_CAUSAL_PROJECTION_KEY_EXCHANGE_STATUSES.CAUSAL_PROJECTION_KEY_EVIDENCE_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["causal_projection_key_evidence_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedCausalProjectionKeyExchangeStatuses(), [
    "causal_projection_key_evidence_visible",
    "causal_projection_key_evidence_blocked",
    "causal_projection_key_evidence_malformed",
    "causal_projection_key_evidence_incomplete"
  ]);
});
