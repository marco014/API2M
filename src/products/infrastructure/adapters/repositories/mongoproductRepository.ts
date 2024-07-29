// src/products/infrastructure/adapters/repositories/mongoProductRepository.ts
import { ProductRepository } from "../../../domain/ports/productsRepository";
import { Product } from "../../../domain/products";
import { ProductModel } from "../../schemas/productSchema";

export class MongoProductRepository implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const product = await ProductModel.find();
        return product.map(pro => new Product(pro.id, pro.product, pro.price, pro.image, pro.image_s3));
    }

    async getById(id: string): Promise<Product | null> {
        const product = await ProductModel.findById(id);
        return product ? new Product(product.id, product.product, product.price, product.image, product.image_s3) : null;
    }

    async create(product: Product): Promise<Product> {
        const newProduct = new ProductModel(product);
        const savedProduct = await newProduct.save();
        return new Product(savedProduct.id, savedProduct.product, savedProduct.price, savedProduct.image, savedProduct.image_s3);
    }

    async update(id: string, product: Partial<Product>): Promise<Product | null> {
        const updateProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
        return updateProduct ? new Product(updateProduct.id, updateProduct.product, updateProduct.price, updateProduct.image, updateProduct.image_s3) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await ProductModel.findByIdAndDelete(id);
        return result !== null;
    }
}