const gm = require('gm');
const { workerData, parentPort } = require('worker_threads');

gm(workerData.source).resize(100,100).write(workerData.destination, (err) => {
    if (err) {
        throw err;
    } else {
        parentPort.postMessage({resized: true});
    }
})