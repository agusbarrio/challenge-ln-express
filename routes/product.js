const { Router } = require("express");
const router = Router();
const authMiddleware = require('../middlewares/auth');
const productController = require('../controllers/product');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar productos con paginación y ordenamiento
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Cantidad máxima de resultados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Número de resultados a saltar
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           enum: [price, category]  # reemplazar con productValidSortFields
 *         description: Campo para ordenar
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Orden ascendente o descendente
 *     responses:
 *       200:
 *         description: Lista de productos
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware.authenticate, productController.listProducts);

/**
 * @swagger
 * /products/{slug}:
 *   get:
 *     summary: Obtener producto por slug
 *     tags: [Productos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: 'Slug del producto con ID incluido. Ejemplos: diario-la-nacion-lunes-1, hola-argentina-ed-373-2, agenda-jardin-ed-1-3, el-club-del-crimen-de-los-jueves-5'
 *     responses:
 *       201:
 *         description: Producto encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */

router.get('/:slug', authMiddleware.authenticate, productController.getBySlug);

module.exports = router;
