import fs from "node:fs";
import path from "node:path";

export function createObservationCapture(layout) {
  const events = [];
  const streamPath = path.join(layout.artifactsDir, "observations.ndjson");

  function record(kind, payload = {}) {
    const event = {
      observedAt: new Date().toISOString(),
      kind,
      payload
    };
    events.push(event);
    fs.appendFileSync(streamPath, `${JSON.stringify(event)}\n`);
    return event;
  }

  function writeJson(name, value) {
    const filePath = path.join(layout.artifactsDir, name);
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
    return filePath;
  }

  function flushArtifacts(extra = {}) {
    return {
      eventsPath: writeJson("observations.json", events),
      ...Object.fromEntries(
        Object.entries(extra).map(([name, value]) => [
          `${name}Path`,
          writeJson(`${name}.json`, value)
        ])
      )
    };
  }

  return {
    events,
    record,
    flushArtifacts
  };
}
