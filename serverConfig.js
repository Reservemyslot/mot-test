const config = require('config')


module.exports = {

  PROJECT_NAME: config.get('PROJECT_NAME') || '',
  PROJECT_ROOT: config.get('PROJECT_ROOT') || '',
  PORT: config.get('PORT') || '',
  MONGO_URL: config.get('MONGO_URL') || '',
  ORIGIN: config.get('ORIGIN') || '',
  JWT_SECRET: config.get('JWT_SECRET') || '',
  DEFAULT_LANGUAGE: config.get('DEFAULT_LANGUAGE') || '',
}
