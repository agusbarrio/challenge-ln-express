const { Router } = require("express");
const router = Router()
const authMiddleware = require('../middlewares/auth')
const productController = require('../controllers/product')

router.get('/', authMiddleware.authenticate, productController.search);

module.exports = router;
