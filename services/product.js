const ApiError = require('../common/ApiError');
const productRepository = require('../repositories/product');
const slugify = require('../utils/slugify');


class ProductService {
    async getBySlugAndId(slug, id) {
        const productDetails = await productRepository.getById(id)
        if (!productDetails) throw new ApiError(404)
        const productSlug = slugify(productDetails.descripcion_larga)
        if (productSlug !== slug) throw new ApiError(404)
        const relatedProducts = await productRepository.getRelatedProductsByCategoryAndType(productDetails.id, productDetails.producto_categoria_id, productDetails.producto_tipo_id)
        return { productDetails, relatedProducts }
    }

}

module.exports = new ProductService();
