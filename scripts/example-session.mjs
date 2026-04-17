const scenarioId = process.argv[2] || "text-partial-transform";
const baseUrl = process.env.TESTBED_URL || "http://localhost:4318";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const catalogResponse = await fetch(`${baseUrl}/api/catalog`);
  const catalog = await catalogResponse.json();
  const scenario = catalog.scenarios.find((item) => item.id === scenarioId);

  if (!scenario) {
    throw new Error(`Unknown scenario '${scenarioId}'.`);
  }

  const publishResponse = await fetch(`${baseUrl}/api/publications`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      concern: scenario.concern,
      scenarioId: scenario.id,
      payload: scenario.payloadTemplate,
      source: "example-session"
    })
  });

  const publishData = await publishResponse.json();
  if (!publishResponse.ok) {
    throw new Error(publishData.error || "Publish failed.");
  }

  console.log(`accepted publication ${publishData.publication.id} for scenario ${scenario.id}`);

  let previousCount = -1;
  let unchangedRounds = 0;

  while (unchangedRounds < 3) {
    const response = await fetch(`${baseUrl}/api/publications/${publishData.publication.id}/observations`);
    const data = await response.json();

    if (data.observations.length === previousCount) {
      unchangedRounds += 1;
    } else {
      console.log(JSON.stringify(data.observations, null, 2));
      previousCount = data.observations.length;
      unchangedRounds = 0;
    }

    await sleep(500);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
