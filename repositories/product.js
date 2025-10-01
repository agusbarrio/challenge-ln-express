const db = require("../db");

class ProductRepository {
    async getById(id) {
        const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }

    async getRelatedProductsByCategoryAndType(id, categoryId, typeId) {
        const [rows] = await db.query("SELECT * FROM productos p WHERE p.id != ? AND p.producto_categoria_id = ? LIMIT 3", [id, categoryId]);
        return rows.length ? rows : [];
    }

    async searchProducts(q, limit = 10, offset = 0, sortField, sortOrder) {
        const validSortFields = { "price": "lp.precio", "category": "pc.descripcion" };
        const safeSortField = Object.keys(validSortFields).includes(sortField) ? validSortFields[sortField] : null;

        const validOrder = ["asc", "desc"];
        const safeSortOrder = validOrder.includes(sortOrder?.toLowerCase()) ? sortOrder.toUpperCase() : null;

        // Base para la consulta de productos
        let baseQuery = `
        FROM productos p
        LEFT JOIN lista_precios lp 
            ON lp.producto_id = p.id 
            AND lp.fecha_desde <= NOW() 
            AND (lp.fecha_hasta IS NULL OR lp.fecha_hasta >= NOW())
        LEFT JOIN producto_categoria pc
            ON p.producto_categoria_id = pc.id
        WHERE 1
    `;
        const params = [];

        if (q) {
            baseQuery += `
            AND (p.sku LIKE ? OR p.descripcion_corta LIKE ? OR p.descripcion_larga LIKE ?)
        `;
            const likeQ = `%${q}%`;
            params.push(likeQ, likeQ, likeQ);
        }

        // 1️⃣ Total de registros coincidentes
        const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
        const [countRows] = await db.query(countQuery, params);
        const total = countRows[0]?.total || 0;

        // 2️⃣ Consulta de datos de la página
        let selectQuery = `
        SELECT p.*, lp.precio, pc.descripcion AS categoria
        ${baseQuery}
    `;

        if (safeSortField && safeSortOrder) {
            selectQuery += ` ORDER BY ${safeSortField} ${safeSortOrder}`;
        }

        selectQuery += ` LIMIT ? OFFSET ?`;
        const rowsParams = [...params, limit, offset];
        const [rows] = await db.query(selectQuery, rowsParams);

        // 3️⃣ Calcular offsets útiles
        const nextOffset = Math.min(offset + limit, total);
        const prevOffset = Math.max(offset - limit, 0);
        const lastOffset = Math.floor((total - 1) / limit) * limit;

        return {
            products: rows,
            meta: {
                total,
                limit,
                offset,
                nextOffset,
                prevOffset,
                lastOffset
            }
        };
    }


}


module.exports = new ProductRepository();
