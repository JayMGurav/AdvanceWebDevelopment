// require('dotenv').config()

const PORT = process.env.PORT || 4000
let MONGO_URI = 'mongodb://localhost:27017/ca3'

module.exports = {
  PORT,
  MONGO_URI
}