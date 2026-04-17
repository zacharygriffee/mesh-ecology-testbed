# Resident Lab API

The resident lab API is a local-only control surface exposed by `npm run lab:serve`.

Default address:

```text
http://127.0.0.1:4328
```

This API exists for tests, labs, and debugging. It is not a public runtime API.

## GET /api/health

Returns a minimal local health record.

Example:

```json
{
  "ok": true,
  "posture": "local-resident-lab-service",
  "localOnly": true
}
```

## GET /api/status

Returns resident host lifecycle state, readiness gates, timing buckets, topology, and current actor statuses.

Key fields:

- `phase`
- `readiness.mesh.ready`
- `readiness.actors.ready`
- `readiness.mature.ready`
- `timings.coldMeshBringupMs`
- `timings.coldActorsReadyMs`
- `timings.coldMatureReadyMs`
- `topology`
- `actorStatuses`

Typical app-facing use:

- poll until `readiness.mature.ready === true`

## GET /api/events

Returns the in-memory event list captured by the resident host since startup.

Use this for:

- debugging bring-up
- verifying readiness transitions
- inspecting local lab events without opening artifact files

## GET /api/state

Returns observer-facing state for the current concern surface.

Use this for:

- readiness confirmation
- local state inspection
- debugging counts and stages

## GET /api/trace?jobKey=...

Returns observer-facing trace information for a specific job key.

Use this for:

- checking whether a job reached `pub_present_rat_missing`
- checking whether a job reached `rat_present`
- inspecting plural attempts and ratifiers

## POST /api/jobs

Seeds a new job into the resident local lab concern.

Request body:

```json
{
  "cap": "cap/testbed/service-api-job",
  "jobMeta": {
    "source": "manual-debug"
  }
}
```

Response:

```json
{
  "jobKey": "<job-key>",
  "concernKey": "<concern-key>"
}
```

## POST /api/jobs/:jobKey/pubs

Publishes a local manual PUB proposal for an existing job.

Request body:

```json
{
  "cap": "cap/testbed/manual-pub",
  "meta": {
    "source": "manual-debug"
  }
}
```

This is mainly for manual lab work and debugging. Ordinary actor-backed scenarios usually let the actors emit work.

## POST /api/restart

Restarts the resident lab host.

Optional request body:

```json
{
  "scenarioId": "organism-ratifier-basic"
}
```

Use restart when you want:

- a fresh cold lab bring-up
- a clean local lab session
- to switch to another resident-capable scenario later

## Expected Client Pattern

For ordinary local app tests:

1. Start `npm run lab:serve`
2. Poll `GET /api/status`
3. Wait for `readiness.mature.ready`
4. `POST /api/jobs`
5. Poll `GET /api/trace?jobKey=...`

That keeps mature-mesh app testing separate from harness cold-start cost.
