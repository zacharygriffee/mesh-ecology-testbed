import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  buildTestbedEdgePacketReviewEvidence,
  listTestbedEdgePacketReviewStatuses,
  TESTBED_EDGE_PACKET_REVIEW_EVIDENCE_SCHEMA_VERSION,
  TESTBED_EDGE_PACKET_REVIEW_STATUSES
} from "../src/testbed/edge-packet-review.js";

const FIXTURE = JSON.parse(readFileSync(
  new URL("./fixtures/edge-adjacent-packets/phase-109-testbed-adjacent-review-packet-fixture.json", import.meta.url),
  "utf8"
));
const CREATED_AT = "2026-05-02T10:00:00.000Z";

function build(overrides = {}) {
  return buildTestbedEdgePacketReviewEvidence({
    edgeFixture: {
      ...FIXTURE,
      packet: {
        ...FIXTURE.packet,
        ...(overrides.packet ?? {})
      },
      ...(overrides.fixture ?? {})
    },
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.edgeAuthorityGranted, false);
  assert.equal(evidence.executionImplied, false);
  assert.equal(evidence.packetAcceptedAsSchema, false);
  assert.equal(evidence.packetAcceptedAsCommand, false);
  assert.equal(evidence.packetAcceptedAsTodo, false);
  assert.equal(evidence.edgeMutationPerformed, false);
  assert.equal(evidence.edgeCallbackRequired, false);
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
}

test("valid Edge Phase 109 testbed packet fixture produces testbed review evidence", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_edge_packet_review_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_EDGE_PACKET_REVIEW_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_READY);
  assert.equal(evidence.packetRef, FIXTURE.packet.packetId);
  assert.equal(evidence.sourceContractRef, FIXTURE.packet.sourceContractRef);
  assert.equal(evidence.sourceLedgerRef, FIXTURE.packet.sourceLedgerRef);
  assert.equal(evidence.sourceReadinessRollupRef, FIXTURE.packet.sourceReadinessRollupRef);
  assert.deepEqual(evidence.sourceEvidenceRefs, FIXTURE.packet.sourceEvidenceRefs);
  assert.deepEqual(evidence.sourceWorkPacketRefs, FIXTURE.packet.sourceWorkPacketRefs);
  assert.deepEqual(evidence.sourceNextActionRefs, FIXTURE.packet.sourceNextActionRefs);
  assert.deepEqual(evidence.sourceLedgerEventRefs, FIXTURE.packet.sourceLedgerEventRefs);
  assert.deepEqual(evidence.sourceLedgerDeltaRefs, FIXTURE.packet.sourceLedgerDeltaRefs);
  assert.equal(evidence.correlationRefs.packetRef, FIXTURE.packet.packetId);
  assert.deepEqual(evidence.correlationRefs.sourceEvidenceRefs, FIXTURE.packet.sourceEvidenceRefs);
  assert.deepEqual(evidence.evidenceLabel, {
    evidenceKind: "fixture_proof",
    outcome: "passed",
    scenarioId: "phase-109-testbed-adjacent-packet"
  });
  assert.deepEqual(evidence.reasonCodes, ["edge_packet_review_ready"]);
  assertPassiveEvidence(evidence);
});

test("Edge packet fixture is not treated as accepted schema command todo or execution", () => {
  const evidence = build();

  assert.equal(evidence.packetAcceptedAsSchema, false);
  assert.equal(evidence.packetAcceptedAsCommand, false);
  assert.equal(evidence.packetAcceptedAsTodo, false);
  assert.equal(evidence.executionImplied, false);
  assert.equal(evidence.edgeAuthorityGranted, false);
  assert.equal(evidence.meshPublicationImplied, false);
});

test("missing or malformed Edge packet produces packet_malformed evidence", () => {
  const missing = buildTestbedEdgePacketReviewEvidence({
    edgeFixture: {},
    createdAt: CREATED_AT
  });
  const malformed = buildTestbedEdgePacketReviewEvidence({
    edgeFixture: null,
    createdAt: CREATED_AT
  });

  assert.equal(missing.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_MALFORMED);
  assert.equal(missing.reasonCodes.includes("edge_packet_missing_or_malformed"), true);
  assert.equal(malformed.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_MALFORMED);
  assertPassiveEvidence(missing);
  assertPassiveEvidence(malformed);
});

test("wrong target repo produces unsupported_target evidence", () => {
  const evidence = build({
    packet: {
      targetRepo: "mesh-ecology-platform"
    }
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.UNSUPPORTED_TARGET);
  assert.equal(evidence.reasonCodes.includes("edge_packet_target_repo_mismatch"), true);
  assertPassiveEvidence(evidence);
});

test("missing contract metadata produces packet_incomplete evidence", () => {
  const evidence = build({
    packet: {
      expectedRequestArtifactKind: null,
      expectedRequestRequiredFields: [],
      expectedReceiptArtifactKind: null,
      expectedReceiptRequiredFields: [],
      allowedReceiptStatuses: [],
      correlationFields: [],
      acceptanceSemantics: null
    }
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("edge_packet_contract_metadata_incomplete"), true);
  assertPassiveEvidence(evidence);
});

test("packet claiming adjacent acceptance is blocked instead of accepted", () => {
  const evidence = build({
    packet: {
      adjacentAccepted: true,
      adjacentAcceptanceClaimed: true
    }
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("edge_packet_claims_adjacent_acceptance"), true);
  assert.equal(evidence.packetAcceptedAsSchema, false);
  assertPassiveEvidence(evidence);
});

test("packet implying execution is blocked without runner scheduler or mesh publication", () => {
  const evidence = build({
    packet: {
      executesAction: true,
      schedulesWork: true,
      publishesToMesh: true
    }
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED);
  assert.equal(evidence.reasonCodes.includes("edge_packet_implies_execution"), true);
  assert.equal(evidence.runnerRequired, false);
  assert.equal(evidence.schedulerRequired, false);
  assert.equal(evidence.liveDiscoveryRequired, false);
  assert.equal(evidence.meshPublicationImplied, false);
  assertPassiveEvidence(evidence);
});

test("review status vocabulary is testbed-owned and bounded", () => {
  assert.deepEqual(listTestbedEdgePacketReviewStatuses(), [
    "review_ready",
    "review_blocked",
    "packet_malformed",
    "packet_incomplete",
    "unsupported_target"
  ]);
});
