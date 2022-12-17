import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import path from "node:path";
import fs from "node:fs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const configFile = path.resolve("cerebro.build.js");
let config = {};
if (fs.existsSync(configFile)) {
  console.log("✅ Loaded configuration file from: ", configFile);
  config = require(configFile);
}

console.log("⌛ Creating plugin bundle...");
esbuild
  .build({
    logLevel: "info",
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    format: "cjs",
    target: "es2016",
    loader: { ".js": "jsx", ".png": "dataurl", ".svg": "text" },
    outfile: "dist/index.js",
    plugins: [cssModulesPlugin()],
    ...config,
  })
  .then(() => {
    console.log("✅ Plugin build finished");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
