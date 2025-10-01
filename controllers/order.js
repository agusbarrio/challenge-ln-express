const orderService = require('../services/order');
const Validator = require('../utils/validator');

class OrderController {
    async listOrders(req, res) {

        const id = Validator.isNumber(req.query.id, { field: "query.id", min: 1, integer: true, required: false })
        const cuit = Validator.isString(req.query.cuit, { field: "query.cuit", regex: /^\d{11}$/, regexErrorMessage: 'Must be a valid CUIT (11 digits, e.g., 20205558692)', required: false })
        const createdAtMin = Validator.isDate(req.query.createdAtMin, { field: "query.createdAtMin", required: false })
        const createdAtMax = Validator.isDate(req.query.createdAtMax, { field: "query.createdAtMax", required: false })
        // TODO valid createdAtMin-createdAtMax range

        const result = await orderService.searchOrders(
            id,
            cuit,
            createdAtMin,
            createdAtMax
        );
        res.status(200).json(result);
    }

    async createOrder(req, res) {
        const customerId = Validator.isNumber(req.body.customerId, { field: "body.customerId", min: 1, integer: true })
        const productId = Validator.isNumber(req.body.productId, { field: "body.productId", min: 1, integer: true })
        const quantity = Validator.isNumber(req.body.quantity, { field: "body.quantity", min: 1, integer: true })
        const deliveryType = Validator.isEnum(req.body.deliveryType, ['ASG', 'REP', 'ASIG'], { field: "body.deliveryType" })
        const paymentCondition = Validator.isEnum(req.body.paymentCondition, ['FAC'], { field: "body.paymentCondition" })

        const order = await orderService.createOrder(customerId, productId, quantity, deliveryType, paymentCondition);
        res.status(201).json(order);
    }
}

module.exports = new OrderController();
