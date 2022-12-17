#!/usr/bin/env node

const scripts = {
  build: () => import("./scripts/build.js"),
  start: () => import("./scripts/dev.js"), // both start and dev are the same
  dev: () => import("./scripts/dev.js"),
  test: () => import("./scripts/test.js"),
  clear: () => import("./scripts/clear.js"),
  default: () => {
    console.error("Invalid-Command - Usage: npm run (build|clear|dev|start|test)")
    process.exit(1)
  }
}

const script = scripts[process.argv[2]] || scripts.default 

script()
