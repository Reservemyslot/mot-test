const { Router } = require('express');
const {
  getBusiness,
} = require('../../controllers/businessController')

const businessApi = new Router()

businessApi.get('/search', getBusiness)

module.exports = businessApi
