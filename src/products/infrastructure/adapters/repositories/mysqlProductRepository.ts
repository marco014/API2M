// src/products/infrastructure/adapters/repositories/mysqlProductRepository.ts
import { query } from "../../../../user/infrastructure/databases/mysql/mysql";
import { Product } from "../../../domain/products";
import { ProductRepository } from "../../../domain/ports/productsRepository";

export class MySQLProductRepository implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        const rows = await query(sql, []) as any[]; //Ajuste de tipo aquí

        // Log para verificar los datos obtenidos
        console.log("Datos obtenidos en getAll:", rows);

        return rows.map((row: any) => new Product(
            row.id,
            row.product,
            row.price,
            row.image,
            row.image_s3
        ));
    }

    /*async getById(id: string): Promise<Product | null> {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const params = [id];
        const [rows]: any = await query(sql, params);

        if (!rows || rows.length === 0 ){
            return null;
        }

        const row = rows[0];
        return new Product (
            row.id,
            row.product,
            row.price,
            row.image,
            row.image_s3
        );
    }*/
        async getById(id: string): Promise<Product | null> {
            const sql = 'SELECT * FROM products WHERE id = ?';
            const params = [id];
            const rows = await query(sql, params) as any[];
    
            /*// Log para verificar los datos obtenidos
            console.log("Datos obtenidos en getById:", rows);*/
    
            if (!rows || rows.length === 0) {
                return null;
            }
    
            const row = rows[0];
            return new Product(
                row.id ?? null,
                row.product ?? '',
                row.price ?? 0,
                row.image ?? '',
                row.image_s3 ?? ''
            );
        }

    /*async create(product: Product): Promise<Product> {
        const sql = 'INSERT INTO products (product, price, image, image_s3) VALUES (?, ?, ?, ?)';
        const params = [product.product, product.price, product.image, product.image_s3];
        const result: any = await query(sql, params);

        return new Product(result.insertId, product.product, product.price, product.image, product.image_s3);
    }*/
        async create(product: Product): Promise<Product> {
            const sql = 'INSERT INTO products (product, price, image, image_s3) VALUES (?, ?, ?, ?)';
            const params = [
                product.product ?? null, 
                product.price ?? null, 
                product.image ?? null, 
                product.image_s3 ?? null
            ];
        
            // Log de los parámetros para depuración
            console.log("Params for INSERT:", params);
        
            const result: any = await query(sql, params);
        
            return new Product(result.insertId, product.product, product.price, product.image, product.image_s3);
        }
        

        async update(id: string, product: Partial<Product>): Promise<Product | null> {
            const sql = `UPDATE products SET 
                         product = COALESCE(?, product), 
                         price = COALESCE(?, price), 
                         image = COALESCE(?, image), 
                         image_s3 = COALESCE(?, image_s3) 
                         WHERE id = ?`;
    
            // Asegúrate de que todos los valores undefined sean convertidos a null
            const params = [
                product.product !== undefined ? product.product : null,
                product.price !== undefined ? product.price : null,
                product.image !== undefined ? product.image : null,
                product.image_s3 !== undefined ? product.image_s3 : null,
                id
            ];
    
            console.log("Params for UPDATE:", params);
    
            const result: any = await query(sql, params);
    
            if (result.affectedRows === 0) {
                return null;
            }
    
            return await this.getById(id);
        }

    async delete(id: string): Promise<boolean> {
        const sql = "DELETE FROM products WHERE id = ?";
        const params = [id];
        const result: any = await query(sql, params);

        return result.affectedRows > 0;
    }
}