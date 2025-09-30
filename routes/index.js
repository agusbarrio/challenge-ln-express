const { Router } = require("express");
const router = Router()

router.use('/auth', require('./auth'))
router.use('/product', require('./product'))

module.exports = router;
