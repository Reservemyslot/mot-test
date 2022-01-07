
const { connect } = require('mongoose')
const { MONGO_URL } = require('../serverConfig')


const mongoOpt = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const dbConnect = async () => {
  try {
    await connect(MONGO_URL, mongoOpt)
    console.log('Connected to Mongodb server')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = dbConnect
