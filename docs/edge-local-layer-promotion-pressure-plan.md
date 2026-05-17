# Edge Local-Layer Promotion Pressure Plan

Status: projection event selected; storage/backend promotion still blocked.
Owner: `mesh-ecology-testbed`.
Purpose: define fail-closed review cases for the eventual Edge-local material
before any backend work, durable state migration, or promotion decision.

## Boundary

Testbed pressures producer-owned artifacts. It does not run Edge, open Edge
storage, open Autobase, open Corestore, write continuity records, decide local
layer readiness, grant authority, or make review status into truth.

Spine has selected `mesh_ecology_local_layer_projection_event` as the first
semantic continuity input. Edge Autobase labs, replica views, projection logs,
projection-key exchange, causal reviews, Platform append-log joins, local JSON
exports, and operator-visible statuses remain proof pressure, review evidence,
candidate artifacts, scaffold material, or derived projections until separately
promoted.

## Candidate Surfaces To Pressure

| Surface | Pressure posture | Promotion posture |
| --- | --- | --- |
| Local-layer projection event | semantic continuity input | selected first promoted material |
| Projection event log entry | append-only preservation record | possible storage unit, not semantic truth by itself |
| Projection event replica view | observer-visible replica evidence | not continuity by visibility alone |
| Projection-key exchange evidence | bounded contact proof | not readiness or replicated continuity |
| Frontier candidate | collaborative causality pressure | not promoted Autobase state |
| Autobase projection view | sandboxed derived view candidate | not durable local-layer state |
| Optimistic intake evidence/status | append versus acceptance pressure | append success is not acceptance |
| Self-work trace evidence | work/decision/verifier trace | evidence input, not projection lane |
| Platform append-log join status | Edge-visible lifecycle review | review/status only |
| Causal review artifacts | interpretation evidence | not truth or readiness |
| Imported JSON/files and `$EDGE_STATE` | import/export scaffold | never-promote compatibility input |

## Required Fail-Closed Cases

Any future promoted-material review should fail closed on these cases:

- missing source refs
- missing causal refs without explicit deferral
- malformed causal-ref deferral
- missing writer refs
- missing reader policy
- reader without key/proof
- append success mistaken for acceptance
- replica visibility mistaken for continuity
- review status mistaken for authority
- HTTP/SSH/local path ref used as seam
- wall-clock order used as causal order
- Autobase linearization mistaken for truth
- production Autobase backend promotion claimed before Spine decision
- Edge state migration claimed by proof/lab evidence
- discovery absence treated as failure
- imported JSON treated as substrate
- causal review treated as truth
- Testbed review treated as readiness
- Platform append-log join treated as deployment authority
- source refs contain local paths, HTTP, SSH, ports, or local endpoint seams
- promotion posture promotes storage record, backend, derived view, review
  status, or replicated state by implication

## Review Discipline

The eventual promoted material must be reviewed as a producer-owned artifact
with explicit schema, version, source refs, causal refs, writer policy, reader
policy, canonical identity posture, and non-claims. Status-only projections may
defer causal topology only when deferral is represented as data with a reason;
omission is a blocked review case.

Testbed should keep extending existing review lanes rather than replacing them:

- `local-layer-projection-event-evidence`
- `local-layer-projection-log-evidence`
- `local-layer-projection-happening-map-evidence`
- `projection-key-exchange-evidence`
- `edge-projection-replica-view-evidence`
- `local-layer-frontier-candidate-evidence`
- `edge-autobase-optimistic-intake-evidence`
- `edge-autobase-projection-view-evidence`
- `edge-self-work-trace-evidence`
- `edge-platform-lifecycle-append-log-review-evidence`

## Promotion Readiness Gate

Before Testbed can mark the selected material reviewable, Spine must name:

- promoted artifact kind
- schema/version
- storage lane
- writer policy
- reader policy
- acceptance rule
- causal interpretation path
- compatibility/import posture
- rollback posture
- non-promoted adjacent materials
- stop conditions

Without that Spine decision, Testbed should emit review evidence only. With the
projection-event decision recorded, Testbed should accept only projection
events that preserve semantic source refs, causal refs, writer policy, reader
policy, identity hash posture, and non-promoted storage/backend posture.

Autobase/frontier artifacts must also carry explicit storage-lane posture:

- `intendedStorageLane=bounded_autobase_equivalent_linearization`
- `inputSemanticUnit=mesh_ecology_local_layer_projection_event`
- `requiresPromotedProjectionEventInput=true`
- `sandboxedOnly=true`
- `productionBackendPromoted=false`
- `storageRecordPromoted=false`
- `edgeStateMigration=false`
- `appendSuccessIsAcceptance=false`
- `linearizationIsTruth=false`
- `replicaVisibilityIsContinuity=false`
- `wallClockDefinesCausalOrder=false`
- `discoveryAbsenceIsFailure=false`

## Non-Goals

- no durable `$EDGE_STATE` migration
- no production Autobase backend
- no Hyperbee requirement
- no GUI/TUI work
- no Edge runtime ownership
- no Platform deployment ownership by Edge
- no causal truth claim
- no renderer authority
- no treating Causal review as truth
- no treating Testbed review as readiness
- no treating replica visibility as continuity
- no treating append success as acceptance
