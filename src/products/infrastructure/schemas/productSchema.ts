// src/products/infrastructure/productSchemas.ts
import mongoose, {Schema, Document} from 'mongoose';
import { Product } from '../../domain/products';

export interface ProductDocument extends Product, Document {
    id: number | null;
    product: string;
    price: number;
    image: string;
    image_s3: string;
}

const ProductSchema: Schema = new Schema({
    product: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    image_s3: { type: String, required: true },
});

export const ProductModel = mongoose.model<ProductDocument>('products', ProductSchema);