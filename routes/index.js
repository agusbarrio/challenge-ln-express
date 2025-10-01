const { Router } = require("express");
const router = Router()

router.use('/auth', require('./auth'))
router.use('/products', require('./product'))
router.use('/search', require('./search'))
router.use('/orders', require('./order'))

module.exports = router;
