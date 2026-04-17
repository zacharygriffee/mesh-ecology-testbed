# Testing

## What The Test Suite Covers

- local publication acceptance
- partial response then final response
- plurality across multiple tutorial actors
- delayed responses
- anomaly and domain mismatch classification
- HTTP API behavior over the same local testbed core

## What The Test Suite Does Not Cover

- discovery correctness
- replication correctness
- real transport behavior
- remote runtime participation
- writer admission

## Recommended Local Commands

```bash
npm test
npm run dev
npm run example:session
npm run lab:run -- concern-observe-basic
```

## Test Classification

- core tests here are probe/test validation
- they are valuable regression checks
- they are not canonical mesh proof

## Real Mesh Lab Note

The concern-observation lab scenario uses actual `mesh-ecology` concern and discovery surfaces plus an SDK observer client.

It requires:

- a sibling `mesh-ecology` checkout by default at `../mesh-ecology`
- `npm install` already run in that sibling repo

Use `MESH_ECOLOGY_ROOT` to override the default sibling path when needed.
