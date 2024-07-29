// src/products/application/createProductCU.ts
import { ProductRepository } from "../domain/ports/productsRepository";
import { Product } from "../domain/products";

class CreateProductCU {
    constructor(
        private productRepostory: ProductRepository
    ) {}
    
    async execute(productPayload: Omit<Product, 'id'>): Promise<Product>{
        const product = new Product(
            null ,
            productPayload.product,
            productPayload.price,
            productPayload.image,
            productPayload.image_s3
        );

        return this.productRepostory.create(product);
    }
}

export default CreateProductCU;