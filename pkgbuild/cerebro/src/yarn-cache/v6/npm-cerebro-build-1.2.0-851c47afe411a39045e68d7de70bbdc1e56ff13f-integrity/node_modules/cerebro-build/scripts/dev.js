import path from "node:path";
import fs from "node:fs";
import os from "node:os";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkgJson = require(path.resolve("package.json"));

const appName = "Cerebro";
const homeDir = os.homedir();
const pluginName = pkgJson.name;

const macosPath = path.join(homeDir, "Library", "Application Support", appName, "plugins", "node_modules", pluginName);
const windowsPath = path.join(process.env.APPDATA, appName, "plugins", "node_modules", pluginName);
const linuxPath = path.join(homeDir, ".config", appName, "plugins", "node_modules", pluginName);

const symlinkPaths = {
  darwin: macosPath,
  win32: windowsPath,
  default: linuxPath,
};

let symlinkPath = symlinkPaths[process.platform] || symlinkPaths.default;

function removeSymlink() {
  console.log("🚮 Removing symlink");
  fs.unlinkSync(symlinkPath);
}

console.log("⌛ Starting plugin development...");
if (fs.existsSync(symlinkPath)) {
  console.log("🔎 Symlink already exist");
  removeSymlink();
}

console.log("✅ Create symlink");
fs.symlinkSync(
  path.resolve(),
  symlinkPath,
  process.platform === "win32" ? "junction" : "file"
);

// Handle ctrl+c to remove symlink to plugin
process.on("SIGHUP", removeSymlink);
process.on("SIGINT", removeSymlink);
process.on("SIGTERM", removeSymlink);
process.on("SIGBREAK", removeSymlink);

console.log("✅ Starting esbuild...");

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";

const configFile = path.resolve("cerebro.build.js");
let config = {};
if (fs.existsSync(configFile)) {
  console.log("✅ Loaded configuration file from: ", configFile);
  config = require(configFile)
}

esbuild
  .build({
    watch: true,
    logLevel: "info",
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: false,
    format: "cjs",
    target: "es2016",
    loader: { ".js": "jsx", ".png": "dataurl", ".svg": "text" },
    outfile: "./dist/index.js",
    plugins: [cssModulesPlugin()],
    ...config,
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
