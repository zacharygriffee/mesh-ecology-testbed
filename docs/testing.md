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
```

## Test Classification

- core tests here are probe/test validation
- they are valuable regression checks
- they are not canonical mesh proof

