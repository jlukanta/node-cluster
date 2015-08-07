var cluster = require('cluster');
if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  for (var i=0; i<cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker) {
    console.log('Worker ' + worker.id + ' died');
  });
} else {
  var express = require('express');
  var app = express();
  app.get('/', function(req, res) {
    res.send('Hello from Worker ' + cluster.worker.id);
  });

  app.listen(3000);
  console.log('Worker ' + cluster.worker.id + ' running!');
}
