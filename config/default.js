const path = require('path')

const projectRoot = path.join(__dirname, '..')

module.exports = {
  PROJECT_NAME: 'MOT_TEST_API',
  PROJECT_ROOT: projectRoot,
  PORT: 8080,
  DEFAULT_LANGUAGE: 'en',
  ORIGIN: 'http://localhost:3000',
  MONGO_URL:
    'mongodb+srv://mot_test:r0zV6GLJZFZxTEOH@cluster0.a24xv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  JWT_SECRET: 'I_@M_THE_$ecret_KEY',
}
