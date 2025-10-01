const { Router } = require("express");
const router = Router()
const authMiddleware = require('../middlewares/auth')
const productController = require('../controllers/product')

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Buscar productos
 *     description: Permite buscar productos filtrando por texto, con paginación y ordenamiento opcional.
 *     tags:
 *       - Productos
 *     security:
 *       - cookieAuth: []  # autenticación mediante cookie con JWT
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Texto a buscar en los productos (opcional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad máxima de resultados a devolver
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Número de resultados a saltar
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           enum: [price, category]  # reemplaza con productValidSortFields
 *         description: Campo por el cual ordenar los resultados
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Orden ascendente o descendente
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *       401:
 *         description: No autorizado (cookie inválida o ausente)
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authMiddleware.authenticate, productController.search);


module.exports = router;
