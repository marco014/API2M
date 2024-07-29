// src/products/application/getByIdProductCU.ts
import { ProductRepository } from "../domain/ports/productsRepository";

export class GetByIdProductCU {
    constructor(
        private readonly productRepository: ProductRepository
    ){}

    async run(productId: string) {
        const product = await this.productRepository.getById(productId);

        if ( !product ) {
            throw new Error(`Id: ${productId} de producto no encontrada aqui busque bien`); // Lanza el error
        }
        
        console.log(product);
        return product;
    }
}