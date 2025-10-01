const { Router } = require("express");
const router = Router();
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/order');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar o buscar órdenes
 *     tags: [Órdenes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Filtrar por ID de orden (opcional)
 *       - in: query
 *         name: cuit
 *         schema:
 *           type: string
 *           pattern: '^\d{11}$'
 *         description: Filtrar por CUIT del cliente (opcional)
 *       - in: query
 *         name: createdAtMin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha mínima de creación (opcional)
 *       - in: query
 *         name: createdAtMax
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha máxima de creación (opcional)
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware.authenticate, orderController.listOrders);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Órdenes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - productId
 *               - quantity
 *               - deliveryType
 *               - paymentCondition
 *             properties:
 *               customerId:
 *                 type: integer
 *                 minimum: 1
 *               productId:
 *                 type: integer
 *                 minimum: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               deliveryType:
 *                 type: string
 *                 enum: [ASG, REP, ASIG]
 *               paymentCondition:
 *                 type: string
 *                 enum: [FAC]
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware.authenticate, orderController.createOrder);

module.exports = router;
