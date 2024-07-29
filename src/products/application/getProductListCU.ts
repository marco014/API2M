// src/products/application/getProductListCU.ts
import { Product } from "../domain/products";
import { ProductRepository } from "../domain/ports/productsRepository";

class GetProductListCU {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(): Promise<Product[]>{
        return this.productRepository.getAll();
    }
}

export default GetProductListCU;