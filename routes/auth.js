const { Router } = require("express");
const router = Router()
const authController = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')
/* GET users listing. */
router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/test', authMiddleware.authenticate, authController.login);

module.exports = router;
