import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createTestbed } from "./testbed/create-testbed.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "../public");

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"]
]);

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body)
  });
  res.end(body);
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    "content-type": "text/plain; charset=utf-8",
    "content-length": Buffer.byteLength(text)
  });
  res.end(text);
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

async function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const resolvedPath = path.resolve(publicDir, `.${requestedPath}`);

  if (!resolvedPath.startsWith(publicDir)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(resolvedPath);
    const contentType = contentTypes.get(path.extname(resolvedPath)) || "application/octet-stream";
    res.writeHead(200, { "content-type": contentType });
    res.end(file);
  } catch (error) {
    sendText(res, 404, "Not found");
  }
}

function matchPublicationObservations(pathname) {
  const match = pathname.match(/^\/api\/publications\/([^/]+)\/observations$/);
  return match?.[1] || null;
}

export function createAppServer({ testbed = createTestbed() } = {}) {
  const sseClients = new Set();
  const unsubscribe = testbed.subscribe((observation) => {
    const payload = `event: observation\ndata: ${JSON.stringify(observation)}\n\n`;
    for (const res of sseClients) {
      res.write(payload);
    }
  });

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");

    try {
      if (req.method === "GET" && url.pathname === "/api/health") {
        sendJson(res, 200, { ok: true, posture: "local-probe-test" });
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/catalog") {
        sendJson(res, 200, testbed.buildCatalog());
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/observations") {
        const since = Number(url.searchParams.get("since") || "0");
        sendJson(res, 200, { observations: testbed.getObservations({ since }) });
        return;
      }

      if (req.method === "GET" && url.pathname === "/api/observations/stream") {
        res.writeHead(200, {
          "content-type": "text/event-stream; charset=utf-8",
          "cache-control": "no-cache, no-transform",
          connection: "keep-alive"
        });
        res.write(`event: ready\ndata: ${JSON.stringify({ ok: true })}\n\n`);
        sseClients.add(res);
        req.on("close", () => sseClients.delete(res));
        return;
      }

      const publicationId = matchPublicationObservations(url.pathname);
      if (req.method === "GET" && publicationId) {
        sendJson(res, 200, {
          publicationId,
          observations: testbed.getObservations({ publicationId })
        });
        return;
      }

      if (req.method === "POST" && url.pathname === "/api/publications") {
        const body = await collectJsonBody(req);
        const publication = testbed.publish({
          concern: body.concern,
          payload: body.payload || {},
          scenarioId: body.scenarioId,
          source: body.source || "local-ui"
        });

        sendJson(res, 201, {
          publication,
          observations: testbed.getObservations({ publicationId: publication.id })
        });
        return;
      }

      if (req.method === "POST" && url.pathname === "/api/reset") {
        testbed.reset();
        sendJson(res, 200, { ok: true });
        return;
      }

      if (req.method === "GET") {
        await serveStatic(req, res);
        return;
      }

      sendJson(res, 404, { error: "Not found" });
    } catch (error) {
      sendJson(res, 400, { error: error.message || "Request failed" });
    }
  });

  async function listen(port = 4318) {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(port, () => {
        server.removeListener("error", reject);
        resolve();
      });
    });
    return server.address();
  }

  async function close() {
    unsubscribe();
    for (const res of sseClients) {
      res.end();
    }
    sseClients.clear();
    testbed.dispose();
    await new Promise((resolve) => server.close(resolve));
  }

  return { server, testbed, listen, close };
}

async function main() {
  const port = Number(process.env.PORT || "4318");
  const app = createAppServer();
  const address = await app.listen(port);
  const activePort = typeof address === "object" && address ? address.port : port;

  console.log(`mesh-ecology-testbed listening on http://localhost:${activePort}`);
  console.log("Posture: local participation testbed only. Not canonical mesh proof.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    if (error?.code === "EADDRINUSE") {
      console.error(`Port ${error.port || process.env.PORT || "4318"} is already in use. Try PORT=4319 npm run dev`);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  });
}
