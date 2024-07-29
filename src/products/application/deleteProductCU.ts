// src/products/application/deleteProductCU.ts
import { ProductRepository } from "../domain/ports/productsRepository";

class DeleteProductCU {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(productId: string): Promise<boolean> {
        const result = await this.productRepository.delete(productId);
       
        if ( !result ) {
            throw new Error(`No se pudo eliminar el producto con el id: ${productId}`);
        }
        
        console.log(`Producto con el id: ${productId} ha sido borrado de este mundo`);
        return result; //Devuelve un booleano
    }
}

export default DeleteProductCU;