// src/products/infreastructure/dependencies.ts
import CreateProductCU from "../application/createProductCU";
import DeleteProductCU from "../application/deleteProductCU";
import { GetByIdProductCU } from "../application/getByIdProductCU";
import GetProductListCU from "../application/getProductListCU";
import UpdateProductCU from "../application/updateProductCU";
import ProductControllers from "./controllers/productControllers";
import { Repositoryfactory } from "./adapters/repositories/repositoryFactory";

const productRespoitory = Repositoryfactory.createProductRespository();

export const getProductListCU = new GetProductListCU(
    productRespoitory
);


export const createProductCU = new CreateProductCU (
    productRespoitory
);

export const getByIdProductCU = new GetByIdProductCU (
    productRespoitory
);
  
export const updateProductCU = new UpdateProductCU (
    productRespoitory
);
  
export const deleteProductCU = new DeleteProductCU (
    productRespoitory
);

export const productControllers =new ProductControllers (
    getProductListCU,
    createProductCU,
    getByIdProductCU,
    updateProductCU,
    deleteProductCU
);