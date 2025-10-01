const ApiError = require('../common/ApiError');
const orderRepository = require('../repositories/order');
const productRepository = require('../repositories/product');
const priceRepository = require('../repositories/price');

class OrderService {
    async searchOrders(id, cuit, createdAtMin, createdAtMax) {
        return orderRepository.searchOrders(id, cuit, createdAtMin, createdAtMax);
    }

    async createOrder(customerId, productId, quantity, deliveryType, paymentCondition) {

        const product = await productRepository.getById(productId);
        if (!product) throw new ApiError(404, 'Product not found');

        if (product.qty < quantity) {
            throw new ApiError(409, 'Insufficient stock');
        }

        const unitPrice = await priceRepository.getProductPrice(productId);
        if (unitPrice === null) throw new ApiError(409, 'Price not available');

        const totalPrice = unitPrice * quantity;

        // 5️⃣ Create order
        const orderDate = new Date();
        const orderId = await orderRepository.createOrder(
            orderDate,
            totalPrice,
            deliveryType || 'ASG',
            paymentCondition || 'FAC',
            customerId,
            productId,
            quantity
        );

        // 6️⃣ Update stock
        await productRepository.updateProductQty(productId, quantity);

        return { orderId };
    }
}

module.exports = new OrderService();
