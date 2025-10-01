const { Router } = require("express");
const router = Router()
const authMiddleware = require('../middlewares/auth')
const productController = require('../controllers/product')

router.get('/', authMiddleware.authenticate, productController.listProducts);
router.get('/:slug', authMiddleware.authenticate, productController.getBySlug);

module.exports = router;
