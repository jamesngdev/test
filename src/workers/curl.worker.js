const path = require('path');
const { workerData, parentPort } = require('worker_threads');
const { curlCommand } = workerData;
const exec = require('child_process').exec;
const fs = require('fs');
const { randomStr } = require('../helpers/string');
const tempPath = path.join(__dirname, Date.now() + randomStr(5) + '.sh')
fs.writeFileSync(tempPath, curlCommand)

exec(tempPath, function (error, stdout, stderr) {
    console.log('stderr: ' + stderr);
    let result = {
        error: true,
        message: 'Unknown message'
    }

    if (error) {
        result = {
            error: true,
            response: stdout
        }
    }

    result = {
        error: false,
        response: stdout
    }

    fs.rmSync(tempPath)
    return parentPort.postMessage(result)
})