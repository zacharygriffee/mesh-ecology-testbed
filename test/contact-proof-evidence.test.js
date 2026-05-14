import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedContactProofEvidence,
  listTestbedContactProofStatuses,
  TESTBED_CONTACT_PROOF_EVIDENCE_SCHEMA_VERSION,
  TESTBED_CONTACT_PROOF_STATUSES
} from "../src/testbed/contact-proof-evidence.js";

const CREATED_AT = "2026-05-14T12:00:00.000Z";

function validContactProof() {
  return {
    artifactKind: "mesh_contact_proof_evidence",
    schema: "mesh-v0-2/contact-proof/direct-peer/v1",
    proofKind: "mesh_contact_direct_peer_lab",
    transportKind: "protomux-rpc",
    contactSeam: "hyperdht_direct_peer",
    participantA: "mesh-contact-host",
    participantB: "mesh-contact-client",
    operation: "capability.echo",
    requestId: "mesh-contact-request:a",
    responseId: "mesh-contact-response:a",
    selectedTransport: {
      transportKind: "protomux-rpc",
      contactSeam: "hyperdht_direct_peer",
      transportRole: "proof_lane",
      scope: "isolated_local_hyperdht",
      scaffoldTransport: false,
      compatibilityAlias: false,
      productionPreferred: false
    },
    readinessEvidence: {
      readinessScope: "direct_peer_contact",
      distributedReadinessClaimed: false
    },
    contactAttempted: true,
    contactSucceeded: true,
    distributedReadinessClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false
  };
}

function build(contactProof = validContactProof()) {
  return buildTestbedContactProofEvidence({
    contactProof,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedExecutedContact, false);
  assert.equal(evidence.testbedOwnsTransport, false);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
  assert.equal(evidence.distributedReadinessProofClaimed, false);
  assert.equal(evidence.edgeAuthorityGranted, false);
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("valid mesh-v0-2 contact proof is consumed as upstream evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_contact_proof_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_CONTACT_PROOF_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["contact_proof_visible"]);
  assert.equal(evidence.sourceArtifactKind, "mesh_contact_proof_evidence");
  assert.equal(evidence.sourceSchema, "mesh-v0-2/contact-proof/direct-peer/v1");
  assert.equal(evidence.sourceProofKind, "mesh_contact_direct_peer_lab");
  assert.equal(evidence.transportKind, "protomux-rpc");
  assert.equal(evidence.contactSeam, "hyperdht_direct_peer");
  assert.equal(evidence.transportScope, "isolated_local_hyperdht");
  assert.equal(evidence.readinessScope, "direct_peer_contact");
  assert.equal(evidence.contactAttempted, true);
  assert.equal(evidence.contactSucceeded, true);
  assert.equal(evidence.distributedReadinessClaimed, false);
  assertPassiveEvidence(evidence);
});

test("contact proof consumer blocks distributed readiness and truth claims", () => {
  const proof = validContactProof();
  proof.readinessEvidence.distributedReadinessClaimed = true;
  proof.meshTruthClaimed = true;

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("contact_proof_claims_distributed_readiness"), true);
  assert.equal(evidence.reasonCodes.includes("contact_proof_claims_truth_or_completion"), true);
  assertPassiveEvidence(evidence);
});

test("contact proof consumer blocks non-direct or wrong transport seams", () => {
  const proof = validContactProof();
  proof.selectedTransport.transportKind = "http";
  proof.selectedTransport.contactSeam = "lan_http_scaffold";

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("contact_proof_direct_seam_mismatch"), true);
  assertPassiveEvidence(evidence);
});

test("contact proof consumer preserves failed source contact as blocked evidence", () => {
  const proof = validContactProof();
  proof.contactSucceeded = false;

  const evidence = build(proof);

  assert.equal(evidence.reviewStatus, TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_BLOCKED);
  assert.deepEqual(evidence.reasonCodes, ["contact_proof_source_contact_failed"]);
  assert.equal(evidence.contactAttempted, true);
  assert.equal(evidence.contactSucceeded, false);
  assertPassiveEvidence(evidence);
});

test("contact proof consumer handles malformed and incomplete proof inputs", () => {
  const malformed = buildTestbedContactProofEvidence({
    contactProof: null,
    createdAt: CREATED_AT
  });
  const incomplete = build({
    ...validContactProof(),
    requestId: null
  });

  assert.equal(malformed.reviewStatus, TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["contact_proof_missing_or_malformed"]);
  assert.equal(incomplete.reviewStatus, TESTBED_CONTACT_PROOF_STATUSES.CONTACT_PROOF_INCOMPLETE);
  assert.equal(incomplete.reasonCodes.includes("contact_proof_request_missing"), true);
  assertPassiveEvidence(malformed);
  assertPassiveEvidence(incomplete);
});

test("contact proof status vocabulary is testbed-owned and bounded", () => {
  assert.deepEqual(listTestbedContactProofStatuses(), [
    "contact_proof_visible",
    "contact_proof_blocked",
    "contact_proof_malformed",
    "contact_proof_incomplete"
  ]);
});
