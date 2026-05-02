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

function fixtureWithPacket(packet = {}) {
  return {
    ...FIXTURE,
    packet: {
      ...FIXTURE.packet,
      ...packet
    }
  };
}

function build(packet = {}, fixture = {}) {
  return buildTestbedEdgePacketReviewEvidence({
    edgeFixture: {
      ...fixtureWithPacket(packet),
      ...fixture
    },
    createdAt: CREATED_AT
  });
}

function buildFromFixture(edgeFixture) {
  return buildTestbedEdgePacketReviewEvidence({
    edgeFixture,
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

function assertStatusAndReason(evidence, reviewStatus, reasonCode) {
  assert.equal(evidence.reviewStatus, reviewStatus);
  assert.equal(evidence.reasonCodes.includes(reasonCode), true);
  assertPassiveEvidence(evidence);
}

test("valid Edge Phase 109 testbed packet fixture matches golden testbed review evidence expectations", () => {
  const evidence = build();
  const golden = {
    artifactKind: "testbed_edge_packet_review_evidence",
    schemaVersion: TESTBED_EDGE_PACKET_REVIEW_EVIDENCE_SCHEMA_VERSION,
    reviewStatus: TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_READY,
    packetRef: FIXTURE.packet.packetId,
    sourceContractRef: FIXTURE.packet.sourceContractRef,
    sourceLedgerRef: FIXTURE.packet.sourceLedgerRef,
    sourceReadinessRollupRef: FIXTURE.packet.sourceReadinessRollupRef,
    sourceEvidenceRefs: FIXTURE.packet.sourceEvidenceRefs,
    sourceWorkPacketRefs: FIXTURE.packet.sourceWorkPacketRefs,
    sourceNextActionRefs: FIXTURE.packet.sourceNextActionRefs,
    sourceLedgerEventRefs: FIXTURE.packet.sourceLedgerEventRefs,
    sourceLedgerDeltaRefs: FIXTURE.packet.sourceLedgerDeltaRefs,
    evidenceLabel: {
      evidenceKind: "fixture_proof",
      outcome: "passed",
      scenarioId: "phase-109-testbed-adjacent-packet"
    },
    reasonCodes: ["edge_packet_review_ready"],
    reviewOnly: true,
    evidenceOnly: true,
    productionProofClaimed: false,
    meshTruthClaimed: false,
    edgeAuthorityGranted: false,
    executionImplied: false,
    packetAcceptedAsSchema: false,
    packetAcceptedAsCommand: false
  };

  assert.deepEqual({
    artifactKind: evidence.artifactKind,
    schemaVersion: evidence.schemaVersion,
    reviewStatus: evidence.reviewStatus,
    packetRef: evidence.packetRef,
    sourceContractRef: evidence.sourceContractRef,
    sourceLedgerRef: evidence.sourceLedgerRef,
    sourceReadinessRollupRef: evidence.sourceReadinessRollupRef,
    sourceEvidenceRefs: evidence.sourceEvidenceRefs,
    sourceWorkPacketRefs: evidence.sourceWorkPacketRefs,
    sourceNextActionRefs: evidence.sourceNextActionRefs,
    sourceLedgerEventRefs: evidence.sourceLedgerEventRefs,
    sourceLedgerDeltaRefs: evidence.sourceLedgerDeltaRefs,
    evidenceLabel: evidence.evidenceLabel,
    reasonCodes: evidence.reasonCodes,
    reviewOnly: evidence.reviewOnly,
    evidenceOnly: evidence.evidenceOnly,
    productionProofClaimed: evidence.productionProofClaimed,
    meshTruthClaimed: evidence.meshTruthClaimed,
    edgeAuthorityGranted: evidence.edgeAuthorityGranted,
    executionImplied: evidence.executionImplied,
    packetAcceptedAsSchema: evidence.packetAcceptedAsSchema,
    packetAcceptedAsCommand: evidence.packetAcceptedAsCommand
  }, golden);

  assert.equal(evidence.correlationRefs.packetRef, FIXTURE.packet.packetId);
  assert.equal(evidence.correlationRefs.sourceContractRef, FIXTURE.packet.sourceContractRef);
  assert.equal(evidence.correlationRefs.sourceLedgerRef, FIXTURE.packet.sourceLedgerRef);
  assert.equal(evidence.correlationRefs.sourceReadinessRollupRef, FIXTURE.packet.sourceReadinessRollupRef);
  assert.deepEqual(evidence.correlationRefs.sourceEvidenceRefs, FIXTURE.packet.sourceEvidenceRefs);
  assert.deepEqual(evidence.correlationRefs.sourceWorkPacketRefs, FIXTURE.packet.sourceWorkPacketRefs);
  assert.deepEqual(evidence.correlationRefs.sourceNextActionRefs, FIXTURE.packet.sourceNextActionRefs);
  assert.deepEqual(evidence.correlationRefs.sourceLedgerEventRefs, FIXTURE.packet.sourceLedgerEventRefs);
  assert.deepEqual(evidence.correlationRefs.sourceLedgerDeltaRefs, FIXTURE.packet.sourceLedgerDeltaRefs);
  assertPassiveEvidence(evidence);
});

test("direct packet object without fixture wrapper is supported as review input", () => {
  const evidence = buildFromFixture(FIXTURE.packet);

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_READY);
  assert.deepEqual(evidence.reasonCodes, ["edge_packet_review_ready"]);
  assert.equal(evidence.packetRef, FIXTURE.packet.packetId);
  assert.equal(evidence.sourceContractRef, FIXTURE.packet.sourceContractRef);
  assert.deepEqual(evidence.evidenceLabel, {
    evidenceKind: "fixture_proof",
    outcome: "unknown",
    scenarioId: "edge-adjacent-packet-review"
  });
  assertPassiveEvidence(evidence);
});

test("malformed Edge packet fixtures produce packet_malformed evidence", async (t) => {
  const cases = [
    ["missing packet", {}],
    ["packet is non-object", { ...FIXTURE, packet: "not an object" }],
    ["fixture is null", null]
  ];

  for (const [name, edgeFixture] of cases) {
    await t.test(name, () => {
      const evidence = buildFromFixture(edgeFixture);

      assertStatusAndReason(
        evidence,
        TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_MALFORMED,
        "edge_packet_missing_or_malformed"
      );
    });
  }
});

test("incomplete Edge packet fixture mutations produce packet_incomplete evidence", async (t) => {
  const cases = [
    ["missing packetId", { packetId: null }, "edge_packet_missing_correlation_refs"],
    ["missing sourceContractRef", { sourceContractRef: null }, "edge_packet_missing_contract_ref"],
    ["missing sourceLedgerRef", { sourceLedgerRef: null }, "edge_packet_missing_correlation_refs"],
    ["missing sourceReadinessRollupRef", { sourceReadinessRollupRef: null }, "edge_packet_missing_correlation_refs"],
    ["empty sourceEvidenceRefs", { sourceEvidenceRefs: [] }, "edge_packet_missing_correlation_refs"],
    ["absent sourceEvidenceRefs", { sourceEvidenceRefs: undefined }, "edge_packet_missing_correlation_refs"],
    ["empty sourceWorkPacketRefs", { sourceWorkPacketRefs: [] }, "edge_packet_missing_correlation_refs"],
    ["absent sourceWorkPacketRefs", { sourceWorkPacketRefs: undefined }, "edge_packet_missing_correlation_refs"],
    ["empty sourceNextActionRefs", { sourceNextActionRefs: [] }, "edge_packet_missing_correlation_refs"],
    ["absent sourceNextActionRefs", { sourceNextActionRefs: undefined }, "edge_packet_missing_correlation_refs"],
    ["empty sourceLedgerEventRefs", { sourceLedgerEventRefs: [] }, "edge_packet_missing_correlation_refs"],
    ["absent sourceLedgerEventRefs", { sourceLedgerEventRefs: undefined }, "edge_packet_missing_correlation_refs"],
    ["empty sourceLedgerDeltaRefs", { sourceLedgerDeltaRefs: [] }, "edge_packet_missing_correlation_refs"],
    ["absent sourceLedgerDeltaRefs", { sourceLedgerDeltaRefs: undefined }, "edge_packet_missing_correlation_refs"],
    [
      "incomplete contract metadata",
      {
        expectedRequestArtifactKind: null,
        expectedRequestRequiredFields: [],
        expectedReceiptArtifactKind: null,
        expectedReceiptRequiredFields: [],
        allowedReceiptStatuses: [],
        correlationFields: []
      },
      "edge_packet_contract_metadata_incomplete"
    ],
    ["missing acceptanceSemantics", { acceptanceSemantics: null }, "edge_packet_contract_metadata_incomplete"]
  ];

  for (const [name, packet, reasonCode] of cases) {
    await t.test(name, () => {
      const evidence = build(packet);

      assertStatusAndReason(
        evidence,
        TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE,
        reasonCode
      );
    });
  }
});

test("blocked Edge packet fixture mutations produce review_blocked evidence", async (t) => {
  const cases = [
    ["wrong targetSurface", { targetSurface: "testbed_runtime_commands" }, "edge_packet_target_surface_mismatch"],
    [
      "packet claims adjacent acceptance",
      { adjacentAccepted: true, adjacentAcceptanceClaimed: true },
      "edge_packet_claims_adjacent_acceptance"
    ],
    [
      "packet is missing draft authority boundary",
      { packetIsEdgeDraftOnly: false, adjacentRepoOwnsAuthority: false },
      "edge_packet_missing_draft_authority_boundary"
    ],
    ["packet implies execution", { executesAction: true }, "edge_packet_implies_execution"],
    ["packet implies scheduling", { schedulesWork: true }, "edge_packet_implies_execution"],
    ["packet implies live discovery", { liveDiscoveryRequired: true }, "edge_packet_implies_execution"],
    ["packet implies mesh publication", { publishesToMesh: true }, "edge_packet_implies_execution"]
  ];

  for (const [name, packet, reasonCode] of cases) {
    await t.test(name, () => {
      const evidence = build(packet);

      assertStatusAndReason(
        evidence,
        TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
        reasonCode
      );
    });
  }
});

test("unsupported target mutations produce unsupported_target evidence", async (t) => {
  const cases = [
    ["wrong targetRepo", { targetRepo: "mesh-ecology-platform" }, "edge_packet_target_repo_mismatch"],
    ["wrong seamId", { seamId: "platform" }, "edge_packet_seam_mismatch"],
    ["wrong ecosystemSeamId", { ecosystemSeamId: "platform" }, "edge_packet_seam_mismatch"]
  ];

  for (const [name, packet, reasonCode] of cases) {
    await t.test(name, () => {
      const evidence = build(packet);

      assertStatusAndReason(
        evidence,
        TESTBED_EDGE_PACKET_REVIEW_STATUSES.UNSUPPORTED_TARGET,
        reasonCode
      );
    });
  }
});

test("reason code coverage maps each reason to its expected review status", async (t) => {
  const matrix = [
    ["edge_packet_review_ready", TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_READY, fixtureWithPacket()],
    [
      "edge_packet_missing_or_malformed",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_MALFORMED,
      null
    ],
    [
      "edge_packet_target_repo_mismatch",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.UNSUPPORTED_TARGET,
      fixtureWithPacket({ targetRepo: "mesh-ecology-platform" })
    ],
    [
      "edge_packet_seam_mismatch",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.UNSUPPORTED_TARGET,
      fixtureWithPacket({ seamId: "platform" })
    ],
    [
      "edge_packet_target_surface_mismatch",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
      fixtureWithPacket({ targetSurface: "testbed_runtime_commands" })
    ],
    [
      "edge_packet_claims_adjacent_acceptance",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
      fixtureWithPacket({ adjacentAccepted: true })
    ],
    [
      "edge_packet_missing_draft_authority_boundary",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
      fixtureWithPacket({ packetIsEdgeDraftOnly: false })
    ],
    [
      "edge_packet_implies_execution",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.REVIEW_BLOCKED,
      fixtureWithPacket({ executesAction: true })
    ],
    [
      "edge_packet_missing_correlation_refs",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE,
      fixtureWithPacket({ sourceEvidenceRefs: [] })
    ],
    [
      "edge_packet_missing_contract_ref",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE,
      fixtureWithPacket({ sourceContractRef: null })
    ],
    [
      "edge_packet_contract_metadata_incomplete",
      TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE,
      fixtureWithPacket({ acceptanceSemantics: null })
    ]
  ];

  for (const [reasonCode, reviewStatus, edgeFixture] of matrix) {
    await t.test(reasonCode, () => {
      const evidence = edgeFixture === null ? buildFromFixture(null) : buildFromFixture(edgeFixture);

      assertStatusAndReason(evidence, reviewStatus, reasonCode);
    });
  }
});

test("reason code precedence keeps unsupported target ahead of incomplete or blocked review", () => {
  const evidence = build({
    targetRepo: "mesh-ecology-platform",
    sourceEvidenceRefs: [],
    executesAction: true
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.UNSUPPORTED_TARGET);
  assert.equal(evidence.reasonCodes.includes("edge_packet_target_repo_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("edge_packet_missing_correlation_refs"), true);
  assert.equal(evidence.reasonCodes.includes("edge_packet_implies_execution"), true);
  assertPassiveEvidence(evidence);
});

test("reason code precedence keeps incomplete packets ahead of ordinary blocked review", () => {
  const evidence = build({
    sourceEvidenceRefs: [],
    targetSurface: "testbed_runtime_commands",
    executesAction: true
  });

  assert.equal(evidence.reviewStatus, TESTBED_EDGE_PACKET_REVIEW_STATUSES.PACKET_INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("edge_packet_missing_correlation_refs"), true);
  assert.equal(evidence.reasonCodes.includes("edge_packet_target_surface_mismatch"), true);
  assert.equal(evidence.reasonCodes.includes("edge_packet_implies_execution"), true);
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

test("review status vocabulary is testbed-owned and bounded", () => {
  assert.deepEqual(listTestbedEdgePacketReviewStatuses(), [
    "review_ready",
    "review_blocked",
    "packet_malformed",
    "packet_incomplete",
    "unsupported_target"
  ]);
});
