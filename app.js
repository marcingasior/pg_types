var cluster = require('cluster'),
    debugMode = typeof v8debug === 'object',
    http    = require('http'),
    models  = require("./models"),
    numCPUs = require('os').cpus().length;


if (cluster.isMaster && !debugMode) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        console.log("node ID : "+cluster.workers[id].process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    })

} else {
    models.sequelize.sync().then(function () {

        http.createServer(function(request, response) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.send("Hello World")
        }).listen(3000);
    });
}