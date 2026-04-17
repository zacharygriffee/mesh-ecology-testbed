# Getting Started Plan

This doc is a plan for a short human-oriented getting-started guide.

The goal is not deep doctrine or full API reference. The goal is to get a new person productive quickly without misleading them about what this repo is.

## Audience

Primary audience:

- engineers building or debugging mesh-facing apps
- engineers trying to understand the local testbed concept quickly
- engineers who need a local surface for tests, labs, and debugging

Secondary audience:

- people evaluating whether the repo is relevant to their workflow

## Intended Outcome

After reading the guide, a person should know:

- what the testbed is
- what it is not
- when to use the synthetic lane
- when to use the resident local lab host
- how to start one local workflow quickly

## Proposed Doc Name

- `docs/getting-started.md`

## Proposed Length

Short.

Target:

- one fast conceptual page
- one short command path
- one short testing path
- one short debugging path

## Proposed Sections

### 1. What This Repo Is

Very short explanation:

- local participation testbed
- local lab host for tests, labs, and debugging
- not a mesh runtime

### 2. Choose A Lane

Simple choice:

- use `npm run dev` for synthetic local scenario work
- use `npm run lab:serve` for mature local real-mesh-backed testing

### 3. Fastest First Run

One short path:

```bash
npm install
npm run dev
```

Then:

- open browser
- publish a scenario
- watch observations

### 4. First Real Lab Run

One short path:

```bash
npm run lab:serve
curl http://127.0.0.1:4328/api/status
```

Then:

- wait for `mature.ready`
- publish a job
- inspect a trace

### 5. What Your App Should Expect

Short explanation:

- expect delayed, plural, partial, and ratified outcomes
- do not assume cold bring-up delay is the same as mature participation timing

### 6. Where To Go Next

Links to:

- `docs/resident-lab.md`
- `docs/mature-vs-cold.md`
- `docs/api/resident-lab.md`
- `docs/testing.md`

## Writing Constraints

The getting-started guide should:

- use plain language
- avoid doctrine jargon when a simpler phrase works
- avoid overclaiming
- stay short enough to skim in a few minutes
- keep the phrase `local-only` visible

## Non-Goals

The getting-started guide should not:

- teach all of mesh doctrine
- document every endpoint in detail
- try to prove parity or correctness
- read like a protocol specification
