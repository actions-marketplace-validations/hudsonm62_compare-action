const core = require("@actions/core")
const fs = require("fs")

const logPathInput = core.getInput("log_path")
const logPath = core.toPlatformPath(logPathInput)

// should we write logs?
const bWriteLog = logPathInput !== "" || logPath !== null

/**
 * Handles error messages properly
 * @param {string} err The error message to display
 * @param {boolean} bNoError If true, then only throws at info-level
 * @param {boolean} bWarnOnly If true, then only throws at warning-level
 * @returns {string} The error message
 */
function myError(err, bNoError = false, bWarnOnly = false) {
  if (!bNoError) {
    writeLogFile(err)
    if (bWarnOnly) {
      core.warning(err)
    } else {
      // error and terminate
      core.error(err)
      throw err
    }
  } else {
    echo(err)
  }
  return err
}

/**
 * Echoes a message to the console
 * @param {string} str The message to display
 */
function echo(str) {
  core.info(str)
  writeLogFile(str)
  return str
}

// writes to file
function writeLogFile(str) {
  if (bWriteLog) {
    const now = new Date()
    const time = now.toISOString().replace(/\..+/, "")
    fs.appendFile(logPath, time + " " + str + "\n", (err) => {
      core.debug("Error writing to log file: " + err)
    })
  }
}

export { echo, myError, writeLogFile }
