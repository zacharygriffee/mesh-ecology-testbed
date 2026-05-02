# Edge Adjacent Packet Review

## Purpose

`mesh-ecology-testbed` can review an Edge-draft adjacent packet fixture as a
static test input and emit a testbed-owned evidence artifact.

The fixture currently lives at:

`test/fixtures/edge-adjacent-packets/phase-109-testbed-adjacent-review-packet-fixture.json`

It is copied from Edge Phase 109 for hermetic tests only. Testbed does not fetch
it from Edge at runtime.

## Fixture Naming

Static copied fixtures should stay under:

`test/fixtures/edge-adjacent-packets/`

Use phase-specific names when a fixture is copied from an Edge review loop:

`phase-<number>-<short-purpose>-fixture.json`

Malformed and incomplete review cases should usually be table-driven mutations
inside testbed tests instead of many static JSON files. The valid Phase 109
fixture remains static so the golden review expectation has one stable input.

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

Reason-code matrix:

| Reason code | Review status |
| --- | --- |
| `edge_packet_review_ready` | `review_ready` |
| `edge_packet_missing_or_malformed` | `packet_malformed` |
| `edge_packet_target_repo_mismatch` | `unsupported_target` |
| `edge_packet_seam_mismatch` | `unsupported_target` |
| `edge_packet_target_surface_mismatch` | `review_blocked` |
| `edge_packet_claims_adjacent_acceptance` | `review_blocked` |
| `edge_packet_missing_draft_authority_boundary` | `review_blocked` |
| `edge_packet_implies_execution` | `review_blocked` |
| `edge_packet_missing_correlation_refs` | `packet_incomplete` |
| `edge_packet_missing_contract_ref` | `packet_incomplete` |
| `edge_packet_contract_metadata_incomplete` | `packet_incomplete` |

Precedence:

1. Unsupported target evidence wins over incomplete or blocked evidence.
2. Incomplete packet evidence wins over ordinary blocked review evidence.
3. Passive evidence flags remain passive in every failure mode.

Examples of passive flags that must remain false include `edgeMutationPerformed`,
`runnerRequired`, `schedulerRequired`, `liveDiscoveryRequired`, and
`meshPublicationImplied`.

## Evidence Labels

Future local fixture review labels should use testbed-owned vocabulary:

```json
{
  "evidenceKind": "local_fixture_review",
  "outcome": "passed | blocked | malformed | incomplete | unsupported",
  "scenarioId": "edge-adjacent-packet-review"
}
```

Existing Phase 109 compatibility fixtures may still carry `fixture_proof`.
Within this repo, `fixture_proof` means deterministic local fixture proof only.
It does not mean production proof, mesh truth, Edge acceptance, or adjacent
acceptance.

## Review Evidence And Proof

Review evidence is the testbed-owned artifact produced after reading a static
packet fixture. It records whether the fixture is review-ready, blocked,
malformed, incomplete, or unsupported.

Fixture proof is the local observation that deterministic testbed fixtures and
tests behaved as expected. It is scoped to this repository and the copied static
inputs.

Production proof is out of scope. This path does not prove real mesh behavior,
runtime readiness, operator acceptance, or correctness outside the local
testbed fixture review.

## Future Rehearsals

For future adjacent packet rehearsals, testbed may validate:

- static fixture readability
- required local correlation refs
- target repo, seam, and target surface fit
- contract metadata completeness
- review-only and evidence-only doctrine flags
- malformed and incomplete packet handling
- local scenario evidence label shape
- deterministic golden response shape

Testbed must not own:

- Edge schema authority
- Edge acceptance
- Edge ledger truth
- production readiness
- adjacent acceptance for other repos
- orchestration authority
- runner or scheduler behavior
- live discovery behavior
- mesh publication behavior
- cross-repo proof semantics

## Boundary

This review path does not call Edge, mutate Edge, fetch live fixtures, run
testbed scenarios, schedule work, publish to mesh, claim production proof, or
claim mesh truth.
