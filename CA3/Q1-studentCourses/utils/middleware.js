const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}`)
  logger.info(`Path: ${req.path}`)
  logger.info(`Body: ${JSON.stringify(req.body, null, 2)}`)
  logger.info('--- --- ---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    res.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token, wrong username or password'
    })
  }

  logger.error(error.message)

  next(error)
}


module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}