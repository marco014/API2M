//  src/products/infrastructure/routes/productRouter.ts
import express from 'express';
import { productControllers } from '../dependenciesProduct';
import { upload } from '../adapters/storages/localFileStorage';

const productRouter = express.Router();

productRouter.get('/getAll', productControllers.getAll.bind(productControllers));
productRouter.post('/create', upload, productControllers.create.bind(productControllers));
productRouter.get('/:id', productControllers.getById.bind(productControllers));
productRouter.put('/:id', upload, productControllers.update.bind(productControllers));
productRouter.delete('/:id', productControllers.delete.bind(productControllers));

export { productRouter };
