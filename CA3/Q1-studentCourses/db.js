// connect to DB
const mongoose = require('mongoose')
const config = require('./utils/configs')
const logger = require('./utils/logger')

function dbConnect() {
  logger.info(`Connecting to ${config.MONGO_URI}`)

  mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    logger.info('Connected to MongoDB')
  }).catch(err => {
    logger.error('Error connecting to MongoDB : ', err.message)
  })
}

module.exports = dbConnect;
