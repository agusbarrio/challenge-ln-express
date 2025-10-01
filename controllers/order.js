const orderService = require('../services/order');

class OrderController {
    async listOrders(req, res) {
        let { id, cuit, createdAtMin, createdAtMax } = req.query;
        // TODO validar datos
        const result = await orderService.searchOrders(
            id,
            cuit,
            createdAtMin,
            createdAtMax
        );
        res.status(200).json(result);
    }
}

module.exports = new OrderController();
