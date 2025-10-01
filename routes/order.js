const { Router } = require("express");
const router = Router()
const authMiddleware = require('../middlewares/auth')
const orderController = require('../controllers/order')

router.get('/', authMiddleware.authenticate, orderController.listOrders);
router.post('/', authMiddleware.authenticate, orderController.createOrder);

module.exports = router;
