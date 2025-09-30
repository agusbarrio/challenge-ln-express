const productService = require('../services/product');
const extractSlugAndId = require('../utils/extractIdFromSlug');

class ProductController {

    async getBySlug(req, res) {
        const { slug, id } = extractSlugAndId(req.params.slug)
        // TODO validar slug y id
        const result = await productService.getBySlugAndId(slug, id)
        res.status(201).json(result);
    }


}

module.exports = new ProductController();
