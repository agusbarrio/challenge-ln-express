const orderRepository = require('../repositories/order');

class OrderService {
    async searchOrders(id, cuit, createdAtMin, createdAtMax) {
        return orderRepository.searchOrders(id, cuit, createdAtMin, createdAtMax);
    }
}

module.exports = new OrderService();
