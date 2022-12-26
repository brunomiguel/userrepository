"use strict";

var FileTester = require("./lib/file-tester");
var ExpectationError = require("./lib/errors").ExpectationError;
var log = require("fancy-log");
var PluginError = require("plugin-error");
var through = require("through2");
var colors = require("ansi-colors");

module.exports = expect;

module.exports.real = function (options, expectation) {
  if (!expectation) {
    expectation = options;
    options = {};
  }
  options = Object.assign({ checkRealFile: true }, options);
  return expect(options, expectation);
};

function expect(options, expectation) {
  if (!expectation) {
    expectation = options;
    options = {};
  }
  if (!expectation) {
    throw new PluginError("gulp-expect-file", "Expectation required");
  }

  options = Object.assign(
    {
      reportUnexpected: true,
      reportMissing: true,
      checkRealFile: false,
      errorOnFailure: false,
      silent: false,
      verbose: false,
    },
    options
  );

  try {
    var fileTester = new FileTester(expectation, options);
  } catch (e) {
    throw new PluginError("gulp-expect-file", e.message || e);
  }

  var numTests = 0,
    numPasses = 0,
    numFailures = 0;

  function eachFile(file, encoding, done) {
    // To fix relative path to be based on cwd (where gulpfile.js exists)
    var originalFile = file;
    file = originalFile.clone();
    file.base = file.cwd;

    numTests++;

    var _this = this;
    fileTester.test(file, function (err) {
      if (err && !options.reportUnexpected) {
        if (err instanceof ExpectationError && err.message === "unexpected") {
          err = null;
        }
      }
      if (err) {
        numFailures++;
        reportFailure(file, err);
      } else {
        numPasses++;
        reportPassing(file);
      }
      _this.push(originalFile);
      done();
    });
  }

  function endStream(done) {
    if (options.reportMissing) {
      numTests++;

      var unusedRules = fileTester.getUnusedRules();
      if (unusedRules.length === 0) {
        numPasses++;
      } else {
        numFailures++;
        reportMissing(unusedRules);
      }
    }

    reportSummary();

    if (numFailures > 0 && options.errorOnFailure) {
      this.emit(
        "error",
        new PluginError(
          "gulp-expect-file",
          "Failed " + numFailures + " expectations"
        )
      );
    }

    numTests = numPasses = numFailures = 0;
    done();
  }

  function reportFailure(file, err) {
    if (err instanceof ExpectationError) {
      options.silent ||
        log(
          colors.red("\u2717 FAIL:"),
          colors.magenta(file.relative),
          "is",
          err.message
        );
    } else {
      options.silent ||
        log(
          colors.red("\u2717 ERROR:"),
          colors.magenta(file.relative) + ":",
          err.message || err
        );
    }
  }

  function reportPassing(file) {
    if (options.verbose && !options.silent) {
      log(colors.green("\u2713 PASS:"), colors.magenta(file.relative));
    }
  }

  function reportMissing(rules) {
    var missings = rules
      .map(function (r) {
        return r.toString();
      })
      .join(", ");
    if (!options.silent) {
      log(
        colors.red("\u2717 FAIL:"),
        "Missing",
        colors.cyan(rules.length),
        "expected files:",
        colors.magenta(missings)
      );
    }
  }

  function reportSummary() {
    options.silent ||
      log(
        "Tested",
        colors.cyan(numTests),
        "tests,",
        colors.cyan(numPasses),
        "passes,",
        colors.cyan(numFailures),
        "failures:",
        numFailures > 0 ? colors.bgRed.white("FAIL") : colors.green("PASS")
      );
  }

  return through.obj(eachFile, endStream);
}
