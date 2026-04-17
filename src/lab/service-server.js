import http from "node:http";
import { loadScenarioById } from "./load-scenario.js";
import { createResidentLab } from "./create-resident-lab.js";

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body)
  });
  res.end(body);
}

async function collectJsonBody(req) {
  let raw = "";

  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1_000_000) {
      throw new Error("Request body too large.");
    }
  }

  if (!raw) return {};
  return JSON.parse(raw);
}

function matchJobPub(pathname) {
  return pathname.match(/^\/api\/jobs\/([^/]+)\/pubs$/)?.[1] || null;
}

export function createLabServiceServer({
  scenarioId = process.env.LAB_SCENARIO_ID || "organism-ratifier-basic",
  meshRoot = process.env.MESH_ECOLOGY_ROOT
} = {}) {
  let lab = createResidentLab({
    scenario: loadScenarioById(scenarioId),
    meshRoot
  });
  let startupPromise = null;
  let startupError = null;

  function startLab() {
    startupError = null;
    startupPromise = lab.start().catch((error) => {
      startupError = error;
      throw error;
    });
    return startupPromise;
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");

    try {
      if (req.method === "GET" && url.pathname === "/api/health") {
        sendJson(res, 200, {
          ok: true,
          posture: "local-resident-lab-service",
          localOnly: true
        });
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/status") {
        sendJson(res, 200, {
          ...lab.getStatus(),
          startupError: startupError ? (startupError.message || String(startupError)) : null
        });
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/events") {
        sendJson(res, 200, {
          events: lab.events
        });
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/state") {
        sendJson(res, 200, await lab.getState());
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/trace") {
        const jobKey = url.searchParams.get("jobKey");
        sendJson(res, 200, await lab.getTrace({ jobKey }));
        return;
      }

      if (req.method === "POST" && url.pathname === "/api/jobs") {
        const body = await collectJsonBody(req);
        sendJson(res, 201, await lab.publishJob(body));
        return;
      }

      const pubJobKey = matchJobPub(url.pathname);
      if (req.method === "POST" && pubJobKey) {
        const body = await collectJsonBody(req);
        sendJson(res, 201, await lab.publishWork({
          ...body,
          jobKey: pubJobKey
        }));
        return;
      }

      if (req.method === "POST" && url.pathname === "/api/restart") {
        const body = await collectJsonBody(req);
        const nextScenarioId = body.scenarioId || lab.scenario.id;
        await lab.close();
        lab = createResidentLab({
          scenario: loadScenarioById(nextScenarioId),
          meshRoot
        });
        sendJson(res, 200, await startLab());
        return;
      }

      sendJson(res, 404, { error: "Not found" });
    } catch (error) {
      sendJson(res, 400, {
        error: error.message || "Request failed"
      });
    }
  });

  async function listen(port = 4328) {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(port, () => {
        server.removeListener("error", reject);
        resolve();
      });
    });

    void startLab();

    return server.address();
  }

  async function close() {
    await lab.close();
    await new Promise((resolve) => server.close(resolve));
  }

  return {
    server,
    get lab() {
      return lab;
    },
    listen,
    close
  };
}
