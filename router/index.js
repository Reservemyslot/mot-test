const { Router } = require('express');


const router = new Router()


router.use('/user',  require('./api/userApi'));
router.use('/business', require('./api/businessApi'));



module.exports = router
