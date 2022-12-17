import path from "node:path";
const dist = path.resolve("dist");

import fs from "fs-extra";

if (fs.existsSync(dist)) {
  console.log(`🚮 Removing ${dist}...`);
  fs.removeSync(dist);
  console.log(`✅ Removed!`);
}
