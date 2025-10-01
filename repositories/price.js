const db = require('../db');

class PriceRepository {

    async getProductPrice(productId) {
        const [rows] = await db.query(
            `SELECT precio 
             FROM lista_precios 
             WHERE producto_id = ? AND fecha_desde <= NOW() AND (fecha_hasta IS NULL OR fecha_hasta >= NOW()) 
             ORDER BY fecha_desde DESC 
             LIMIT 1`,
            [productId]
        );
        return rows[0] ? rows[0].precio : null;
    }
}

module.exports = new PriceRepository();
