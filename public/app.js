const state = {
  catalog: null,
  currentScenarioId: null,
  observations: []
};

const scenarioSelect = document.querySelector("#scenario-select");
const concernLabel = document.querySelector("#concern-label");
const payloadInput = document.querySelector("#payload-input");
const publishButton = document.querySelector("#publish-button");
const publishStatus = document.querySelector("#publish-status");
const scenarioDescription = document.querySelector("#scenario-description");
const resetButton = document.querySelector("#reset-button");
const heroMeta = document.querySelector("#hero-meta");
const feed = document.querySelector("#feed");
const feedTemplate = document.querySelector("#feed-item-template");
const concernsContainer = document.querySelector("#catalog-concerns");
const actorsContainer = document.querySelector("#catalog-actors");

function prettyJson(value) {
  return JSON.stringify(value, null, 2);
}

function renderHeroMeta(nonGoals) {
  heroMeta.innerHTML = "";
  for (const item of nonGoals) {
    const chip = document.createElement("span");
    chip.className = "meta-chip";
    chip.textContent = `not ${item}`;
    heroMeta.append(chip);
  }
}

function renderCatalogCards(container, items) {
  container.innerHTML = "";
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "catalog-card";
    card.innerHTML = `
      <h3>${item.label || item.title}</h3>
      <p>${item.description}</p>
    `;
    container.append(card);
  }
}

function renderScenarioSelection() {
  scenarioSelect.innerHTML = "";
  for (const scenario of state.catalog.scenarios) {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.title;
    scenarioSelect.append(option);
  }
}

function getScenarioById(id) {
  return state.catalog.scenarios.find((item) => item.id === id);
}

function applyScenario(id) {
  state.currentScenarioId = id;
  const scenario = getScenarioById(id);
  if (!scenario) return;

  concernLabel.textContent = scenario.concern;
  payloadInput.value = prettyJson(scenario.payloadTemplate);
  scenarioDescription.textContent = scenario.description;
}

function prependObservation(observation) {
  const fragment = feedTemplate.content.cloneNode(true);
  const item = fragment.querySelector(".feed-item");
  const kindTag = fragment.querySelector(".kind-tag");
  const actorTag = fragment.querySelector(".actor-tag");
  const domainTag = fragment.querySelector(".domain-tag");
  const feedMeta = fragment.querySelector(".feed-meta");
  const feedNote = fragment.querySelector(".feed-note");
  const feedPayload = fragment.querySelector(".feed-payload");

  kindTag.textContent = observation.kind;
  actorTag.textContent = observation.actorId;
  domainTag.textContent = observation.domainStatus;
  if (observation.domainStatus === "mismatch") {
    domainTag.classList.add("mismatch");
  }

  feedMeta.textContent = `${observation.observedAt} | publication ${observation.publicationId} | concern ${observation.concern}`;
  feedNote.textContent = observation.note || "No note";
  feedPayload.textContent = prettyJson(observation.payload);

  item.dataset.sequence = String(observation.sequence);
  feed.prepend(fragment);
}

function renderInitialObservations(observations) {
  feed.innerHTML = "";
  [...observations].reverse().forEach(prependObservation);
}

async function loadCatalog() {
  const response = await fetch("/api/catalog");
  state.catalog = await response.json();
  renderHeroMeta(state.catalog.about.nonGoals);
  renderCatalogCards(concernsContainer, state.catalog.concerns);
  renderCatalogCards(actorsContainer, state.catalog.actors);
  renderScenarioSelection();
  applyScenario(state.catalog.scenarios[0].id);
}

async function loadObservations() {
  const response = await fetch("/api/observations");
  const data = await response.json();
  state.observations = data.observations;
  renderInitialObservations(state.observations);
}

function connectStream() {
  const source = new EventSource("/api/observations/stream");
  source.addEventListener("observation", (event) => {
    const observation = JSON.parse(event.data);
    state.observations.push(observation);
    prependObservation(observation);
  });
}

async function publishScenario() {
  publishStatus.textContent = "";

  let payload;
  try {
    payload = JSON.parse(payloadInput.value);
  } catch (error) {
    publishStatus.textContent = "Payload must be valid JSON.";
    return;
  }

  const scenario = getScenarioById(state.currentScenarioId);
  const response = await fetch("/api/publications", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      concern: scenario.concern,
      scenarioId: scenario.id,
      payload,
      source: "browser-ui"
    })
  });

  const data = await response.json();

  if (!response.ok) {
    publishStatus.textContent = data.error || "Publish failed.";
    return;
  }

  publishStatus.textContent = `Accepted ${data.publication.id}. Waiting for local observations.`;
}

async function resetFeed() {
  await fetch("/api/reset", { method: "POST" });
  state.observations = [];
  feed.innerHTML = "";
  publishStatus.textContent = "Feed reset.";
}

scenarioSelect.addEventListener("change", () => applyScenario(scenarioSelect.value));
publishButton.addEventListener("click", publishScenario);
resetButton.addEventListener("click", resetFeed);

await loadCatalog();
await loadObservations();
connectStream();

