# Edge Local-Layer Promotion Pressure Plan

Status: reversible pressure plan; no Edge state promotion.
Owner: `mesh-ecology-testbed`.
Purpose: define fail-closed review cases for the eventual Edge-local material
before any backend work, durable state migration, or promotion decision.

## Boundary

Testbed pressures producer-owned artifacts. It does not run Edge, open Edge
storage, open Autobase, open Corestore, write continuity records, decide local
layer readiness, grant authority, or make review status into truth.

Until Spine records an explicit promotion decision, Edge Autobase labs,
replica views, projection logs, projection-key exchange, causal reviews,
Platform append-log joins, local JSON exports, and operator-visible statuses
remain proof pressure, review evidence, candidate artifacts, scaffold material,
or derived projections.

## Candidate Surfaces To Pressure

| Surface | Pressure posture | Promotion posture |
| --- | --- | --- |
| Local-layer projection event | semantic continuity candidate | eligible for future promotion discussion |
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
- missing causal refs
- missing writer refs
- missing reader policy
- reader without key/proof
- append success mistaken for acceptance
- replica visibility mistaken for continuity
- review status mistaken for authority
- HTTP/SSH/local path ref used as seam
- wall-clock order used as causal order
- imported JSON treated as substrate
- causal review treated as truth
- Testbed review treated as readiness
- Platform append-log join treated as deployment authority

## Review Discipline

The eventual promoted material must be reviewed as a producer-owned artifact
with explicit schema, version, source refs, causal refs, writer policy, reader
policy, and non-claims.

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

Before Testbed can mark a promoted material reviewable, Spine must name:

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

Without that Spine decision, Testbed should continue to emit review evidence
only and should reject any fixture or source artifact that claims promoted
local-layer continuity.

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
