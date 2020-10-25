// start server connection
const http = require('http');
const config = require('./utils/configs');
const logger = require('./utils/logger');
const app = require('./app.js');


async function server() {
  http.createServer(app)
    .listen(config.PORT, function () {
      logger.info(
        `Server running at http://localhost:${config.PORT}`
      );
    });
}

module.exports = server;