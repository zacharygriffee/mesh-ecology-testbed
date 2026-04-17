import fs from "node:fs";
import { getLabRoot } from "../src/lab/run-layout.js";

fs.rmSync(getLabRoot(), { recursive: true, force: true });
console.log(`removed ${getLabRoot()}`);

