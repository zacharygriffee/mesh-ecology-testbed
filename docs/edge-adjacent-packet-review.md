# Edge Adjacent Packet Review

## Purpose

`mesh-ecology-testbed` can review an Edge-draft adjacent packet fixture as a
static test input and emit a testbed-owned evidence artifact.

The fixture currently lives at:

`test/fixtures/edge-adjacent-packets/phase-109-testbed-adjacent-review-packet-fixture.json`

It is copied from Edge Phase 109 for hermetic tests only. Testbed does not fetch
it from Edge at runtime.

## What The Fixture Is

The fixture is an Edge-side draft review packet for the `testbed` ecosystem
seam. It carries correlation refs, handoff contract metadata, readiness context,
and ledger history refs that help testbed review whether it can emit evidence
back later.

## What The Fixture Is Not

The fixture is not:

- an accepted testbed schema
- a command
- a TODO file
- an execution instruction
- a runner or scheduler input
- a live discovery request
- a mesh publication request
- production proof
- mesh truth
- authority for Edge to mutate testbed or for testbed to mutate Edge

Packet presence alone does not mean adjacent acceptance.

## Response Artifact

Testbed emits a testbed-owned artifact:

`testbed_edge_packet_review_evidence`

Schema version:

`testbed_edge_packet_review_evidence.v1`

The artifact includes:

- `evidenceId`
- `packetRef`
- `sourceContractRef`
- `sourceLedgerRef`
- `sourceReadinessRollupRef`
- `sourceEvidenceRefs`
- `sourceWorkPacketRefs`
- `sourceNextActionRefs`
- `sourceLedgerEventRefs`
- `sourceLedgerDeltaRefs`
- `reviewStatus`
- `evidenceLabel`
- `correlationRefs`
- `reasonCodes`
- review/evidence-only doctrine flags

The response never grants Edge authority, claims production proof, claims mesh
truth, implies execution, accepts the Edge packet as schema, or treats the
packet as a command.

## Statuses

Testbed-owned statuses:

- `review_ready`
- `review_blocked`
- `packet_malformed`
- `packet_incomplete`
- `unsupported_target`

## Correlation Refs

The response preserves:

- `packetRef`
- `sourceContractRef`
- `sourceLedgerRef`
- `sourceReadinessRollupRef`
- `sourceEvidenceRefs`
- `sourceWorkPacketRefs`
- `sourceNextActionRefs`
- `sourceLedgerEventRefs`
- `sourceLedgerDeltaRefs`

## Rejection Behavior

Ordinary validation failures do not throw. Testbed emits a review-only evidence
artifact with a blocked, malformed, incomplete, or unsupported status and
reason codes.

Examples:

- `edge_packet_target_repo_mismatch`
- `edge_packet_seam_mismatch`
- `edge_packet_missing_contract_ref`
- `edge_packet_missing_correlation_refs`
- `edge_packet_claims_adjacent_acceptance`
- `edge_packet_implies_execution`
- `edge_packet_contract_metadata_incomplete`

## Boundary

This review path does not call Edge, mutate Edge, fetch live fixtures, run
testbed scenarios, schedule work, publish to mesh, claim production proof, or
claim mesh truth.
