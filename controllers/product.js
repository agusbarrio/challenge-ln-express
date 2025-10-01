const productService = require('../services/product');
const extractSlugAndId = require('../utils/extractIdFromSlug');

class ProductController {

    async getBySlug(req, res) {
        const { slug, id } = extractSlugAndId(req.params.slug)
        // TODO validar slug y id
        const result = await productService.getBySlugAndId(slug, id)
        res.status(201).json(result);
    }

    async search(req, res) {
        const { q, limit, offset, sortField, sortOrder } = req.query;

        // TODO validar datos
        const result = await productService.searchProducts(
            q,
            Number(limit || 10),
            Number(offset || 0),
            sortField,
            sortOrder
        );

        res.status(200).json(result);
    }

    async listProducts(req, res) {
        const { limit, offset, sortField, sortOrder } = req.query;
        // TODO validar datos
        const result = await productService.listProducts(
            Number(limit || 10),
            Number(offset || 0),
            sortField,
            sortOrder
        );

        res.status(200).json(result);
    }


}

module.exports = new ProductController();
