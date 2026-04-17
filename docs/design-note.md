# Design Note

## How This Respects `mesh-ecology`

The testbed is kept in the `probe/test` lane. It never claims canonical mesh proof and never treats local fixture timing as mesh participation physics. Publications are accepted locally and converted into observation records; tutorial actors then emit explicit local responses against those records.

The repo also avoids the shortcut mental model rejected upstream. Nothing here reads another runtime's store, pretends to replicate discovery, or implies that a same-process local harness is equivalent to cross-runtime participation.

## How This Respects `mesh-ecology-packs`

The repo uses packs posture as an adjacent boundary, not as something to absorb. It keeps packaging simple, does not invent deployment canon, and keeps the browser surface as a low-authority inspector over local observations.

## How It Avoids A Fake Mesh Runtime

The implementation is deliberately narrow:

- in-memory state only
- explicit tutorial scenarios instead of generic orchestration
- no discovery graph
- no replica model
- no ratification or convergence claims

The result is a useful local participation harness without creating a misleading "mini mesh runtime" mental model.

