# Getting Started

This repo gives you two local-only ways to exercise mesh-facing app behavior.

Use it when you want:

- a quick local scenario surface for UI and client behavior
- a resident local lab host for repeated tests, labs, and debugging

Do not treat it as:

- a mesh runtime
- a production participation surface
- proof that a real mesh deployment is healthy

## Choose A Lane

Use `npm run dev` when you want:

- the fastest way to inspect the concept
- browser-based local scenario work
- synthetic local observations for app/UI logic

Use `npm run lab:serve` when you want:

- a mature local test surface that stays up
- real local concern and actor participation
- repeated local app tests without paying full cold bring-up every time

## Fastest First Run

If you just want to understand the concept quickly:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:4318
```

What to do there:

1. Pick a scenario.
2. Publish a payload.
3. Watch local observations arrive.

What this shows you:

- publication acceptance
- delayed responses
- partial then final responses
- plurality
- anomaly handling

This lane is the fastest way to understand the repo.

## First Real Local Lab Run

If you want the real local mesh-backed lane, make sure the sibling checkout exists:

- `../mesh-v0-2`

and has dependencies installed.

Then start the resident lab host:

```bash
npm run lab:serve
```

In another terminal, inspect status:

```bash
curl http://127.0.0.1:4328/api/status
```

Wait for:

- `readiness.mature.ready` to become `true`

At that point the local lab host is up, the concern is visible, and the configured actors are warmed.

## First Mature-Mesh Test Flow

Create a job:

```bash
curl -X POST http://127.0.0.1:4328/api/jobs \
  -H 'content-type: application/json' \
  -d '{"cap":"cap/testbed/service-api-job","jobMeta":{"source":"manual-debug"}}'
```

That returns a `jobKey`.

Then inspect the trace:

```bash
curl "http://127.0.0.1:4328/api/trace?jobKey=<jobKey>"
```

What you should expect:

- the job may appear before any response
- a PUB may appear before a RAT
- ratification may arrive later
- responses are observed outcomes, not truth

## What Your App Should Expect

For ordinary local app tests, assume a mature local lab host:

- concern already visible
- observer already attached
- configured actors already warmed

Even then, the app still needs to tolerate:

- no immediate response
- delayed response
- partial then final response
- plurality
- ratification later
- anomaly or domain mismatch

What the app should not confuse with ordinary mesh behavior:

- cold discovery bring-up
- first concern bring-up
- first actor warm-up

Those are real local lab costs, but they are not the default thing app teams should debug every day.

## Common Commands

```bash
npm run dev
npm run lab:run -- concern-observe-basic
npm run lab:run -- organism-ratifier-basic
npm run lab:serve
npm test
```

## Where To Go Next

- [resident-lab.md](./resident-lab.md)
- [mature-vs-cold.md](./mature-vs-cold.md)
- [api/resident-lab.md](./api/resident-lab.md)
- [testing.md](./testing.md)
