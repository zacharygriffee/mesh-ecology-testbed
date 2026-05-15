import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { buildTestbedContactProofEvidence } from "../src/testbed/contact-proof-evidence.js";

const FIXTURE_PATH = path.join(
  "test",
  "fixtures",
  "cross-repo-contact-proof",
  "platform-edge-causal-testbed-handoff.json"
);

async function loadFixture() {
  return JSON.parse(await readFile(FIXTURE_PATH, "utf8"));
}

test("cross-repo contact proof fixture preserves one proof ref chain", async () => {
  const fixture = await loadFixture();
  const proof = fixture.producerProof;
  const edge = fixture.edgeReadinessReceipt;
  const causal = fixture.causalEvidenceArtifact;
  const testbed = fixture.testbedEvidence;
  const derivedTestbed = buildTestbedContactProofEvidence({
    contactProof: proof,
    createdAt: fixture.createdAt
  });

  assert.equal(fixture.artifactKind, "cross_repo_contact_proof_handoff_fixture");
  assert.deepEqual(fixture.handoffPath, [
    "mesh-ecology-platform:producer-proof",
    "mesh-ecology-edge:readiness-receipt",
    "causal-substrate:evidence-artifact",
    "mesh-ecology-testbed:review-evidence"
  ]);

  assert.equal(proof.proofId, edge.contactProofProofId);
  assert.equal(proof.proofId, causal.contactRefs.proofId);
  assert.equal(proof.proofId, testbed.proofId);
  assert.equal(proof.proofId, derivedTestbed.proofId);

  assert.equal(proof.payloadHash, edge.contactProofPayloadHash);
  assert.equal(proof.payloadHash, causal.contactRefs.payloadHash);
  assert.equal(proof.payloadHash, testbed.payloadHash);
  assert.equal(proof.payloadHash, derivedTestbed.payloadHash);

  assert.equal(proof.appendLogRefs.entryId, edge.contactProofAppendLogEntryId);
  assert.equal(proof.appendLogRefs.entryId, causal.contactRefs.appendLogEntryId);
  assert.equal(proof.appendLogRefs.entryId, testbed.appendLogEntryId);
  assert.equal(proof.appendLogRefs.entryId, derivedTestbed.appendLogEntryId);

  assert.equal(proof.appendLogRefs.capabilityAdvertisementRef, edge.contactProofCapabilityAdvertisementRef);
  assert.equal(proof.appendLogRefs.capabilityAdvertisementRef, causal.contactRefs.capabilityAdvertisementRef);
  assert.equal(proof.appendLogRefs.capabilityAdvertisementRef, testbed.capabilityAdvertisementRef);
  assert.equal(proof.appendLogRefs.capabilityAdvertisementRef, derivedTestbed.capabilityAdvertisementRef);

  assert.equal(proof.appendLogRefs.selectedTransportRef, edge.contactProofSelectedTransportRef);
  assert.equal(proof.appendLogRefs.selectedTransportRef, causal.contactRefs.selectedTransportRef);
  assert.equal(proof.appendLogRefs.selectedTransportRef, testbed.selectedTransportRef);
  assert.equal(proof.appendLogRefs.selectedTransportRef, derivedTestbed.selectedTransportRef);

  assert.equal(derivedTestbed.reviewStatus, "contact_proof_visible");
  assert.equal(derivedTestbed.sourceRepo, "mesh-ecology-platform");
  assert.equal(derivedTestbed.sourceProfile, "platform_local_service_contact");
  assert.equal(derivedTestbed.capabilityDescriptorSource, "capability_advertisement");
});

test("cross-repo contact proof fixture carries no seam authority or truth promotion", async () => {
  const fixture = await loadFixture();

  assert.equal(fixture.producerProof.distributedReadinessClaimed, false);
  assert.equal(fixture.producerProof.meshTruthClaimed, false);
  assert.equal(fixture.producerProof.completionClaimed, false);
  assert.equal(fixture.producerProof.appendLogRefs.truthClaimed, false);
  assert.equal(fixture.producerProof.appendLogRefs.completionClaimed, false);

  assert.equal(fixture.edgeReadinessReceipt.repoToRepoSeam, false);
  assert.equal(fixture.edgeReadinessReceipt.participantToParticipantSeam, false);
  assert.equal(fixture.edgeReadinessReceipt.truthClaimed, false);
  assert.equal(fixture.edgeReadinessReceipt.completionClaimed, false);

  assert.equal(fixture.causalEvidenceArtifact.boundary.evidenceOnly, true);
  assert.equal(fixture.causalEvidenceArtifact.boundary.performsContact, false);
  assert.equal(fixture.causalEvidenceArtifact.boundary.claimsCausalTruth, false);
  assert.equal(fixture.causalEvidenceArtifact.boundary.acceptsCanonicalBranch, false);
  assert.equal(fixture.causalEvidenceArtifact.boundary.claimsDistributedReadiness, false);

  assert.equal(fixture.testbedEvidence.testbedExecutedContact, false);
  assert.equal(fixture.testbedEvidence.testbedOwnsTransport, false);
  assert.equal(fixture.testbedEvidence.distributedReadinessProofClaimed, false);
  assert.equal(fixture.testbedEvidence.meshTruthClaimed, false);
  assert.equal(fixture.testbedEvidence.completionClaimed, false);
});
