const { Router } = require("express");
const router = Router()

router.use('/auth', require('./auth'))
router.use('/product', require('./product'))
router.use('/search', require('./search'))

module.exports = router;
