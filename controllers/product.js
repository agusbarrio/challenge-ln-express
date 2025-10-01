const ApiError = require('../common/ApiError');
const { validSortOrders } = require('../common/constants/db');

const { productValidSortFields } = require('../constants/product');
const productService = require('../services/product');
const extractSlugAndId = require('../utils/extractIdFromSlug');
const Validator = require('../utils/validator');

class ProductController {

    async getBySlug(req, res) {
        const { slug, id } = extractSlugAndId(req.params.slug)
        if (!slug || !id) throw new ApiError(404)
        const result = await productService.getBySlugAndId(slug, id)
        res.status(201).json(result);
    }

    async search(req, res) {

        const q = Validator.isString(req.query.q, { field: "query.q", required: false })
        const limit = Validator.isNumber(req.query.limit, { field: "query.limit", required: false, min: 1, max: 100, integer: true }) || 10
        const offset = Validator.isNumber(req.query.offset, { field: "query.offset", required: false, min: 0, integer: true }) || 0
        const sortField = Validator.isEnum(req.query.sortField, productValidSortFields, { field: "query.sortField", required: false })
        const sortOrder = Validator.isEnum(req.query.sortOrder, validSortOrders, { field: "query.sortOrder", required: false })

        const result = await productService.searchProducts(
            q,
            limit,
            offset,
            sortField,
            sortOrder
        );

        res.status(200).json(result);
    }

    async listProducts(req, res) {
        const limit = Validator.isNumber(req.query.limit, { field: "query.limit", required: false, min: 1, max: 100, integer: true }) || 10
        const offset = Validator.isNumber(req.query.offset, { field: "query.offset", required: false, min: 0, integer: true }) || 0
        const sortField = Validator.isEnum(req.query.sortField, productValidSortFields, { field: "query.sortField", required: false })
        const sortOrder = Validator.isEnum(req.query.sortOrder, validSortOrders, { field: "query.sortOrder", required: false })

        const result = await productService.listProducts(
            limit,
            offset,
            sortField,
            sortOrder
        );

        res.status(200).json(result);
    }


}

module.exports = new ProductController();
