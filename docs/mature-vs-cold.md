# Mature Versus Cold

This repo needs two distinct testing postures.

## Cold

`cold` means the local lab is still paying bring-up cost for:

- discovery host start
- concern host start
- observer attach
- actor discovery and warm-up

Cold tests are valuable when you want to inspect:

- startup behavior
- delayed readiness
- late actor appearance
- how apps behave before the local lab is usable

Cold is not the right default for ordinary mesh-facing app tests.

## Mature

`mature` means:

- the local lab host is already up
- the concern is already visible
- the observer can already read the concern
- configured actors are already warmed

Mature tests are the default posture for ordinary local app testing.

This is the closer approximation to how a mesh-facing app should usually be exercised in the testbed:

- publish work into an already-up participation surface
- observe delayed, plural, partial, or ratified outcomes
- tolerate participation timing and outcome variance
- avoid conflating harness startup delay with app-facing mesh behavior

## What The Harness Should Hide

For ordinary mature tests, the harness should absorb:

- cold discovery bring-up
- concern host start
- observer attach cost
- actor first warm-up cost

Those are real lab costs, but they are not the main thing app teams should be debugging day-to-day.

## What Mesh Apps Still Must Tolerate

Even on a mature local lab host, mesh-facing apps still need to tolerate:

- no immediate response
- delayed response
- plurality of responses
- partial then final response
- ratification arriving later
- anomalies and domain mismatch
- degraded or missing actor work

That is the important split:

- hide harness bring-up by default
- preserve participation variance by default

## Recommended Default

For ordinary local tests:

- wait for `mature.ready`
- publish work
- observe behavior

For explicit cold or degraded tests:

- start before readiness
- or intentionally restart the resident lab host
- or use a cold ephemeral scenario run
