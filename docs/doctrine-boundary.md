# Doctrine Boundary

## Reference Findings

From `mesh-ecology`:

- physics proof is distinct from canonical mesh proof
- probe/test utilities are useful but non-precedential
- mesh-facing actors must not obtain truth by side-channel shortcuts
- adjacent repos should enter through supported surfaces, not engine internals

From `mesh-ecology-packs`:

- adjacent repos should keep their own canon
- packs owns shared control-plane posture, not every repo's local semantics
- local convenience must not silently become durable truth
- browser/control surfaces stay low-authority

## Testbed Posture

This repo is intentionally `probe/test`.

It provides:

- a contained local harness
- explicit fixture behavior
- observation records that help client developers reason about app behavior

It does not provide:

- canonical mesh proof
- runtime authority
- shared truth
- deployment proof

## Non-Goals

- no discovery implementation
- no replication implementation
- no real actor admission path
- no workflow engine
- no hidden control-plane canon
- no bytes-first identity

## Proof Limit

Passing this repo's tests or scenarios means only that the local harness behaved as documented.

It does not prove:

- remote discovery visibility
- cross-runtime truth acquisition
- distributed convergence
- production transport durability
- production scheduling behavior

