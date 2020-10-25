const server = require('./server');
const dbConnect = require('./db');

(function start() {
  dbConnect()
  server()
})()