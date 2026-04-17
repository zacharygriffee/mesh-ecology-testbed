import { createLabServiceServer } from "../src/lab/service-server.js";

async function main() {
  const port = Number(process.env.PORT || "4328");
  const service = createLabServiceServer();
  const address = await service.listen(port);
  const activePort = typeof address === "object" && address ? address.port : port;

  console.log(`mesh-ecology-testbed resident lab service listening on http://localhost:${activePort}`);
  console.log("Posture: local lab host only. Not a mesh runtime and not canonical mesh proof.");
}

main().catch((error) => {
  if (error?.code === "EADDRINUSE") {
    console.error(`Port ${error.port || process.env.PORT || "4328"} is already in use. Try PORT=4329 npm run lab:serve`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
