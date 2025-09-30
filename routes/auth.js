const { Router } = require("express");
const router = Router()
const authController = require('../controllers/auth')

router.post('/login', authController.login);
if (process.env.ENABLE_REGISTRATION === 'true') router.post('/register', authController.register);

module.exports = router;
