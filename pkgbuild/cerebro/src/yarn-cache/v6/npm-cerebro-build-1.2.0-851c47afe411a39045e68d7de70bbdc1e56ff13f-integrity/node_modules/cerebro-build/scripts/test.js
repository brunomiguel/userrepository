import createJestConfig from './utils/createJestConfig.js';
import spawn from 'cross-spawn'

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

argv.push(
  '--config',
  JSON.stringify(createJestConfig())
);

const child = spawn(
  "node --experimental-vm-modules node_modules/jest/bin/jest.js", 
  argv,
  { stdio: 'inherit' }
)

child.on("error", (err) => {
  if (err.code === "ENOENT") {
    console.error("⚠️  Couldn't find the `jest` binary. Did you forget to install Jest?");
  }
})
