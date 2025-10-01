const db = require('../db');

class OrderRepository {
    async searchOrders(id, cuit, createdAtMin, createdAtMax) {
        const params = [];
        let baseQuery = `
            FROM pedidos p
            LEFT JOIN clientes c ON p.cliente_id = c.id
            WHERE 1
        `;

        if (id) {
            baseQuery += ' AND p.id = ?';
            params.push(id);
        }

        if (cuit) {
            baseQuery += ' AND c.cuit = ?';
            params.push(cuit);
        }

        if (createdAtMin) {
            baseQuery += ' AND p.fecha_circulacion >= ?';
            params.push(createdAtMin);
        }

        if (createdAtMax) {
            baseQuery += ' AND p.fecha_circulacion <= ?';
            params.push(createdAtMax);
        }

        const [rows] = await db.query(
            `SELECT p.*, c.nombre, c.apellido, c.cuit ${baseQuery} ORDER BY p.fecha_circulacion DESC`,
            [...params]
        );

        return { orders: rows };
    }

    async createOrder(orderDate, totalPrice, deliveryType, paymentCondition, customerId, productId, quantity) {
        const [result] = await db.query(
            `INSERT INTO pedidos 
            (fecha_circulacion, precio, clase_entrega, condicion_pago_aplicada, id_cliente, cliente_id, producto_id, cantidad_solicitada)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [orderDate, totalPrice, deliveryType, paymentCondition, customerId, customerId, productId, quantity]
        );
        return result.insertId;
    }


}

module.exports = new OrderRepository();
