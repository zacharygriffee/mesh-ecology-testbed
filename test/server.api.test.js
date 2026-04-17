import test from "node:test";
import assert from "node:assert/strict";
import { createAppServer } from "../src/server.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("HTTP API accepts a publication and exposes observations", async () => {
  const app = createAppServer();
  const address = await app.listen(0);
  const port = address.port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const catalogResponse = await fetch(`${baseUrl}/api/catalog`);
  assert.equal(catalogResponse.status, 200);
  const catalog = await catalogResponse.json();
  assert.equal(catalog.about.posture, "probe/test");

  const publishResponse = await fetch(`${baseUrl}/api/publications`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      concern: "math/basic",
      scenarioId: "math-basic-deterministic",
      payload: {
        operation: "add",
        operands: [2, 3, 5]
      },
      source: "test-suite"
    })
  });

  assert.equal(publishResponse.status, 201);
  const publishData = await publishResponse.json();
  assert.equal(publishData.observations[0].kind, "publication.accepted");

  await sleep(120);

  const observationsResponse = await fetch(`${baseUrl}/api/publications/${publishData.publication.id}/observations`);
  const observationsData = await observationsResponse.json();
  assert.ok(observationsData.observations.some((item) => item.kind === "response.final"));

  await app.close();
});
