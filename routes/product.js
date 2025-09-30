const { Router } = require("express");
const router = Router()
const authMiddleware = require('../middlewares/auth')
const productController = require('../controllers/product')

router.get('/:slug', authMiddleware.authenticate, productController.getBySlug);

module.exports = router;
