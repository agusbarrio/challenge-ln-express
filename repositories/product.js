const db = require("../db");

class ProductRepository {
    async getById(id) {
        const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }

    async getRelatedProductsByCategoryAndType(id, categoryId, typeId) {
        // const [rows] = await db.query("SELECT * FROM productos p WHERE p.id != ? AND p.producto_categoria_id = ? AND p.producto_tipo_id = ? LIMIT 3", [id, categoryId, typeId]);
        const [rows] = await db.query("SELECT * FROM productos p WHERE p.id != ? AND p.producto_categoria_id = ? LIMIT 3", [id, categoryId]);
        return rows.length ? rows : [];
    }
}

module.exports = new ProductRepository();
