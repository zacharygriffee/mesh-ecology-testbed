import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTestbedPlatformAppendLogHappeningEvidence,
  listTestbedPlatformAppendLogHappeningStatuses,
  TESTBED_PLATFORM_APPEND_LOG_HAPPENING_EVIDENCE_SCHEMA_VERSION,
  TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES
} from "../src/testbed/platform-append-log-happening-evidence.js";

const CREATED_AT = "2026-05-16T20:30:00.000Z";

function validCausalEvidenceArtifact() {
  return {
    artifactKind: "causal-append-log-happening-map",
    schema: "causal-substrate/append-log-happening-map/v1",
    schemaVersion: 1,
    artifactId: "causal-append-log-happening-map:fixture",
    emittedAt: "2026-05-16T20:20:00.000Z",
    source: {
      sourceRepo: "mesh-ecology-platform",
      sourceSchema: "mesh-ecology-platform/dock-append-log-view/v1",
      sourceArtifactKind: "platform_append_log_view"
    },
    sourceViewRef: "a".repeat(64),
    sourceViewHashRef: `sha256:${"a".repeat(64)}`,
    appendLogRefs: {
      entryRefs: [
        "platform-append-log-entry:platform:append-log-entry:bundle-intake:000000:r-1:abc",
        "platform-append-log-entry:platform:append-log-entry:artifact-stage:000001:r-2:def"
      ],
      entryHashRefs: [`sha256:${"b".repeat(64)}`, `sha256:${"d".repeat(64)}`],
      sourceReceiptRefs: ["platform-receipt:r-1", "platform-receipt:r-2"],
      payloadRefs: [`sha256:${"c".repeat(64)}`, `sha256:${"e".repeat(64)}`],
      artifactRefs: ["platform-artifact:artifact-1"]
    },
    happeningRefs: [
      {
        happeningId: "causal-append-log-happening:aaaaaaaaaaaaaaaa",
        happeningLabel: "bundle-intake",
        sourceEntryRef: "platform-append-log-entry:platform:append-log-entry:bundle-intake:000000:r-1:abc",
        sourceEntryId: "platform:append-log-entry:bundle-intake:000000:r-1:abc",
        sourceEntryHash: "b".repeat(64),
        sourceEntryHashRef: `sha256:${"b".repeat(64)}`,
        payloadSha256: "c".repeat(64),
        payloadRef: `sha256:${"c".repeat(64)}`,
        sourceReceiptRef: "platform-receipt:r-1",
        sourceArtifactRef: "platform-artifact:artifact-1",
        sourceRefs: {
          receiptId: "r-1",
          receiptRef: "platform-receipt:r-1",
          artifactId: "artifact-1",
          artifactRef: "platform-artifact:artifact-1",
          sourcePathScaffold: true,
          sourcePathIsSubstrate: false
        },
        parentEntryRefs: [],
        parentEntryHashRefs: [],
        causalRole: "append-log-entry-as-happening-reference",
        acceptedAsCanonicalHistory: false
      },
      {
        happeningId: "causal-append-log-happening:bbbbbbbbbbbbbbbb",
        happeningLabel: "artifact-stage",
        sourceEntryRef: "platform-append-log-entry:platform:append-log-entry:artifact-stage:000001:r-2:def",
        sourceEntryId: "platform:append-log-entry:artifact-stage:000001:r-2:def",
        sourceEntryHash: "d".repeat(64),
        sourceEntryHashRef: `sha256:${"d".repeat(64)}`,
        payloadSha256: "e".repeat(64),
        payloadRef: `sha256:${"e".repeat(64)}`,
        sourceReceiptRef: "platform-receipt:r-2",
        sourceArtifactRef: "platform-artifact:artifact-1",
        sourceRefs: {
          receiptId: "r-2",
          receiptRef: "platform-receipt:r-2",
          artifactId: "artifact-1",
          artifactRef: "platform-artifact:artifact-1",
          previousReceiptRef: "platform-receipt:r-1",
          sourcePathScaffold: true,
          sourcePathIsSubstrate: false
        },
        parentEntryRefs: ["platform-append-log-entry:platform:append-log-entry:bundle-intake:000000:r-1:abc"],
        parentEntryHashRefs: [`sha256:${"b".repeat(64)}`],
        causalRole: "append-log-entry-as-happening-reference",
        acceptedAsCanonicalHistory: false
      }
    ],
    boundary: {
      reviewOnly: true,
      evidenceOnly: true,
      sourceRuntimeFetched: false,
      sourceRepoCalled: false,
      sourceRepoMutated: false,
      replaysAppendLog: false,
      writesContinuityRecords: false,
      acceptsCanonicalHistory: false,
      claimsCausalTruth: false,
      startsBackend: false,
      requiresAutobase: false,
      publishesToMesh: false
    },
    validation: {
      status: "append-log-view-valid",
      platformRefSemanticsPresent: true
    },
    reviewStatus: "append-log-happening-map-emitted"
  };
}

function build(evidenceArtifact = validCausalEvidenceArtifact()) {
  return buildTestbedPlatformAppendLogHappeningEvidence({
    evidenceArtifact,
    createdAt: CREATED_AT
  });
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedCalledCausalSubstrate, false);
  assert.equal(evidence.testbedCalledPlatform, false);
  assert.equal(evidence.testbedReplayedAppendLog, false);
  assert.equal(evidence.testbedWritesContinuityRecords, false);
  assert.equal(evidence.testbedAcceptsCanonicalHistory, false);
  assert.equal(evidence.testbedClaimsCausalTruth, false);
  assert.equal(evidence.durableStateClaimed, false);
  assert.equal(evidence.replicatedStateClaimed, false);
  assert.equal(evidence.canonicalHistoryClaimed, false);
  assert.equal(evidence.runtimeAuthorityClaimed, false);
  assert.equal(evidence.platformAuthorityClaimed, false);
  assert.equal(evidence.edgeAuthorityGranted, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
}

test("valid Platform append-log happening map is consumed as review evidence only", () => {
  const evidence = build();

  assert.equal(evidence.artifactKind, "testbed_platform_append_log_happening_evidence");
  assert.equal(evidence.schemaVersion, TESTBED_PLATFORM_APPEND_LOG_HAPPENING_EVIDENCE_SCHEMA_VERSION);
  assert.equal(evidence.reviewStatus, TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.VISIBLE);
  assert.deepEqual(evidence.reasonCodes, ["platform_append_log_happening_visible"]);
  assert.equal(evidence.sourceArtifactKind, "causal-append-log-happening-map");
  assert.equal(evidence.sourceSchema, "causal-substrate/append-log-happening-map/v1");
  assert.equal(evidence.sourceReviewStatus, "append-log-happening-map-emitted");
  assert.equal(evidence.sourceRepo, "mesh-ecology-platform");
  assert.equal(evidence.sourcePlatformSchema, "mesh-ecology-platform/dock-append-log-view/v1");
  assert.equal(evidence.sourceViewHashRef, `sha256:${"a".repeat(64)}`);
  assert.equal(evidence.happeningRefCount, 2);
  assert.equal(evidence.entryRefCount, 2);
  assert.equal(evidence.entryHashRefCount, 2);
  assert.equal(evidence.sourceReceiptRefCount, 2);
  assert.equal(evidence.payloadRefCount, 2);
  assert.equal(evidence.artifactRefCount, 1);
  assert.equal(evidence.firstSourceReceiptRef, "platform-receipt:r-1");
  assert.equal(evidence.firstSourceArtifactRef, "platform-artifact:artifact-1");
  assertPassiveEvidence(evidence);
});

test("Platform append-log happening review blocks causal backend and authority overclaims", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.boundary.replaysAppendLog = true;
  artifact.boundary.claimsCausalTruth = true;
  artifact.boundary.startsBackend = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("platform_append_log_happening_boundary_overclaim"), true);
  assert.equal(evidence.causalEvidenceReplayedAppendLog, true);
  assert.equal(evidence.causalEvidenceClaimedCausalTruth, true);
  assert.equal(evidence.causalEvidenceStartedBackend, true);
  assertPassiveEvidence(evidence);
});

test("Platform append-log happening review rejects unsafe refs and canonical history claims", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.happeningRefs[0].sourceEntryRef = "../dock/state/receipts/r-1.json";
  artifact.happeningRefs[1].acceptedAsCanonicalHistory = true;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.BLOCKED);
  assert.equal(evidence.reasonCodes.includes("platform_append_log_happening_ref_contains_compat_or_path_seam"), true);
  assert.equal(evidence.reasonCodes.includes("platform_append_log_happening_canonical_history_overclaim"), true);
  assertPassiveEvidence(evidence);
});

test("Platform append-log happening review reports missing ref semantics as incomplete", () => {
  const artifact = validCausalEvidenceArtifact();
  artifact.validation.platformRefSemanticsPresent = false;
  artifact.appendLogRefs.entryHashRefs = [];
  delete artifact.sourceViewHashRef;

  const evidence = build(artifact);

  assert.equal(evidence.reviewStatus, TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.INCOMPLETE);
  assert.equal(evidence.reasonCodes.includes("platform_append_log_happening_ref_semantics_missing"), true);
  assert.equal(evidence.reasonCodes.includes("platform_append_log_happening_append_log_refs_missing"), true);
  assert.equal(evidence.reasonCodes.includes("platform_append_log_happening_view_hash_ref_missing"), true);
  assertPassiveEvidence(evidence);
});

test("Platform append-log happening review handles malformed inputs and bounded statuses", () => {
  const malformed = buildTestbedPlatformAppendLogHappeningEvidence({
    evidenceArtifact: null,
    createdAt: CREATED_AT
  });

  assert.equal(malformed.reviewStatus, TESTBED_PLATFORM_APPEND_LOG_HAPPENING_STATUSES.MALFORMED);
  assert.deepEqual(malformed.reasonCodes, ["platform_append_log_happening_missing_or_malformed"]);
  assertPassiveEvidence(malformed);
  assert.deepEqual(listTestbedPlatformAppendLogHappeningStatuses(), [
    "platform_append_log_happening_visible",
    "platform_append_log_happening_blocked",
    "platform_append_log_happening_malformed",
    "platform_append_log_happening_incomplete"
  ]);
});
