const { Router } = require('express');


const router = new Router()

router.use('/business', require('./api/businessApi'));

module.exports = router
