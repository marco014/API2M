// src/products/infrastructure/controllers/productControllers.ts
import {Request, Response, NextFunction } from 'express';
import CreateProductCU from '../../application/createProductCU';
import GetProductListCU from '../../application/getProductListCU';
import { GetByIdProductCU } from '../../application/getByIdProductCU';
import UpdateProductCU from '../../application/updateProductCU';
import DeleteProductCU from '../../application/deleteProductCU';
import { LocalFileStorage } from '../adapters/storages/localFileStorage';
import { S3FileStorage } from '../adapters/storages/s3FileStorage';

const localFileStorage = new LocalFileStorage();
const s3FileStorage = new S3FileStorage();

class ProductControllers {
    constructor (
        private getProductListCU: GetProductListCU,
        private createProductCU: CreateProductCU,
        private getByIdProductCU: GetByIdProductCU,
        private updateProductCU: UpdateProductCU,
        private deleteProductCU: DeleteProductCU
    ){}

    async create(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        console.log('Datos del formulario:', req.body);
        console.log('Archivo recibido:', req.file);

        try {
            const productPayLoad = req.body;
            const file = req.file;
            
            if (!file) {
                console.error('No se pudo subir ningún archivo');
                return res.status(400).send('No se pudo subir ningún archivo');
            }

            // Guarda el archivo localmente
            const localFilePath = await localFileStorage.uploadFile(file);

            // Sube la imagen a S3
            const s3FilePath = await s3FileStorage.uploadFile(file);

            const productData = { ...productPayLoad, image: localFilePath, image_s3: s3FilePath };
            const product = await this.createProductCU.execute(productData);

            res.status(201).json(product);
        
        } catch (error) {
            console.error('Error al crear el producto:', error);
            next(error);
        } finally {
            if (req.file) {
                console.log('Producto creado con éxito');
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const product = await this.getProductListCU.execute();
            res.json(product);
        } catch ( error ) {
            next( error );
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await this.getByIdProductCU.run(req.params.id);
            res.json(product);
        } catch ( error ) {
            next( error );
        }
    }

    /*async update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        try {
            const productId = req.params.id;
            const productPayLoad = req.body;
            const file = req.file;
    
            // Obtenemos el producto existente
            const existingProduct = await this.getByIdProductCU.run(productId);
            if (!existingProduct) {
                return res.status(404).send('Producto no encontrado');
            }
    
            // Eliminar imagen antigua si existe una nueva
            if (file) {
                if (existingProduct.image) {
                    await localFileStorage.deleteFile(existingProduct.image);
                }
                if (existingProduct.image_s3) {
                    await s3FileStorage.deleteFile(existingProduct.image_s3);
                }
    
                // Guardar archivo localmente
                const localFilePath = await localFileStorage.uploadFile(file);
    
                // Subir imagen a S3
                const s3FilePath = await s3FileStorage.uploadFile(file);
                    productPayLoad.image = localFilePath;
                    productPayLoad.image_s3 = s3FilePath;
                }
    
                // Actualizar el producto en la base de datos
                const updatedProduct = await this.updateProductCU.execute(productId, productPayLoad);
                if (!updatedProduct) {
                    return res.status(500).send('Error al actualizar el producto');
                }
    
                res.json(updatedProduct);
            } catch (error) {
                next(error);
            } finally {
                if (req.file) {
                    console.log('Producto actualizado de manera exitosa');
            }
        }
    }


    async delete(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        try {
            const productId = req.params.id;
    
            // Obtenemos el producto existente
            const existingProduct = await this.getByIdProductCU.run(productId);
            if (!existingProduct) {
                return res.status(404).send('Producto no encontrado');
            }
    
            // Eliminar imagen S3
            await s3FileStorage.deleteFile(existingProduct.image_s3);
    
            // Eliminar imagen del almacenamiento local
            await localFileStorage.deleteFile(existingProduct.image);
    
            const result = await this.deleteProductCU.execute(productId);
            res.status(result ? 200 : 404).json({ success: result });
            } catch (error) {
                next(error);
            } finally {
                if (req.file) {
                    console.log('Producto eliminado con éxito');
            }
        }
    }*/

        async update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
            try {
                const productId = req.params.id;
                const productPayLoad = req.body;
                const file = req.file;
    
                // Obtenemos el producto existente
                const existingProduct = await this.getByIdProductCU.run(productId);
                if (!existingProduct) {
                    return res.status(404).send('Producto no encontrado');
                }
    
                // Eliminar imagen antigua si existe una nueva
                if (file) {
                    if (existingProduct.image) {
                        await localFileStorage.deleteFile(existingProduct.image);
                    }
                    if (existingProduct.image_s3) {
                        await s3FileStorage.deleteFile(existingProduct.image_s3);
                    }
    
                    // Guardar archivo localmente
                    const localFilePath = await localFileStorage.uploadFile(file);
    
                    // Subir imagen a S3
                    const s3FilePath = await s3FileStorage.uploadFile(file);
    
                    productPayLoad.image = localFilePath;
                    productPayLoad.image_s3 = s3FilePath;
                }
    
                // Actualizar el producto en la base de datos
                const updatedProduct = await this.updateProductCU.execute(productId, productPayLoad);
                if (!updatedProduct) {
                    return res.status(500).send('Error al actualizar el producto');
                }
    
                res.json(updatedProduct);
            } catch (error) {
                next(error);
            } finally {
                if (req.file) {
                    console.log('Producto actualizado de manera exitosa');
                }
            }
        }
    
        async delete(req: Request, res: Response, next: NextFunction): Promise<void | any> {
            try {
                const productId = req.params.id;
    
                // Obtenemos el producto existente
                const existingProduct = await this.getByIdProductCU.run(productId);
                if (!existingProduct) {
                    return res.status(404).send('Producto no encontrado');
                }
    
                // Eliminar imagen S3
                await s3FileStorage.deleteFile(existingProduct.image_s3);
    
                // Eliminar imagen del almacenamiento local
                await localFileStorage.deleteFile(existingProduct.image);
    
                const result = await this.deleteProductCU.execute(productId);
                res.status(result ? 200 : 404).json({ success: result });
            } catch (error) {
                next(error);
            } finally {
                if (req.file) {
                    console.log('Producto eliminado con éxito');
                }
            }
        }
}

export default ProductControllers;