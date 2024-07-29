// src/products/application/updateProductCU.ts
import { ProductRepository } from "../domain/ports/productsRepository";
import { Product } from "../domain/products";

class UpdateProductCU {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(productId: string, productPayload: Partial<Product>): Promise<Product> {
        const result = await this.productRepository.update(productId, productPayload);

        if ( !result ) {
            throw new Error(`Id: ${productId} de producto no fue encontrado intente de nuevo`);
        }

        return result;
    }
}

export default UpdateProductCU;