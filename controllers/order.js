const orderService = require('../services/order');

class OrderController {
    async listOrders(req, res) {
        const { id, cuit, createdAtMin, createdAtMax } = req.query;
        // TODO validar datos
        const result = await orderService.searchOrders(
            id,
            cuit,
            createdAtMin,
            createdAtMax
        );
        res.status(200).json(result);
    }

    async createOrder(req, res) {
        const { customerId, productId, quantity, deliveryType, paymentCondition } = req.body;
        // TODO validar datos
        const order = await orderService.createOrder(customerId, productId, quantity, deliveryType, paymentCondition);
        res.status(201).json(order);
    }
}

module.exports = new OrderController();
