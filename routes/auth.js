const { Router } = require("express");
const router = Router();
const authController = require('../controllers/auth');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login exitoso. Se devuelve una cookie con JWT.
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', authController.login);

if (process.env.ENABLE_REGISTRATION === 'true') {
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Registrar nuevo usuario
     *     tags: [Autenticación]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *                 minLength: 6
     *                 maxLength: 30
     *                 pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*'
     *                 description: Debe contener al menos una minúscula, una mayúscula y un número
     *     responses:
     *       201:
     *         description: Usuario registrado correctamente
     *       400:
     *         description: Datos inválidos
     */
    router.post('/register', authController.register);
}

module.exports = router;
