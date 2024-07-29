// src/products//domain/ports/productsRepository.ts
import { Product } from "../products";

export interface ProductRepository {
    getAll(): Promise<Product[]>
    getById(id: string): Promise<(Product | null)>;
    create(product: Product): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
}