import test from "node:test";
import assert from "node:assert/strict";
import { createTestbed } from "../src/testbed/create-testbed.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("partial scenario emits accepted, partial, and final observations", async () => {
  const testbed = createTestbed();
  const publication = testbed.publish({
    concern: "text/transform",
    scenarioId: "text-partial-transform",
    payload: {
      text: "Mesh ecology testbed keeps observations explicit."
    }
  });

  await sleep(750);

  const observations = testbed.getObservations({ publicationId: publication.id });
  assert.equal(observations[0].kind, "publication.accepted");
  assert.ok(observations.some((item) => item.kind === "response.partial"));
  assert.ok(observations.some((item) => item.kind === "response.final"));

  testbed.dispose();
});

test("plurality scenario emits multiple competing final responses and one delayed response", async () => {
  const testbed = createTestbed();
  const publication = testbed.publish({
    concern: "scoring/estimate",
    scenarioId: "scoring-plurality-delay",
    payload: {
      subject: "battery profile",
      evidence: ["bursty usage", "variable conditions"]
    }
  });

  await sleep(1400);

  const observations = testbed.getObservations({ publicationId: publication.id });
  const finalResponses = observations.filter((item) => item.kind === "response.final");

  assert.ok(finalResponses.length >= 3);
  assert.ok(finalResponses.some((item) => item.actorId === "plural-responder/low"));
  assert.ok(finalResponses.some((item) => item.actorId === "plural-responder/high"));
  assert.ok(finalResponses.some((item) => item.actorId === "delayed-responder"));

  testbed.dispose();
});

test("anomaly scenario marks the response as a domain mismatch", async () => {
  const testbed = createTestbed();
  const publication = testbed.publish({
    concern: "anomaly/testing",
    scenarioId: "anomaly-domain-mismatch",
    payload: {
      sample: { kind: "unexpected-shape", value: 42 }
    }
  });

  await sleep(260);

  const observations = testbed.getObservations({ publicationId: publication.id });
  const anomaly = observations.find((item) => item.kind === "response.anomaly");

  assert.ok(anomaly);
  assert.equal(anomaly.domainStatus, "mismatch");
  assert.equal(anomaly.payload.anomalyCode, "domain-mismatch");

  testbed.dispose();
});

