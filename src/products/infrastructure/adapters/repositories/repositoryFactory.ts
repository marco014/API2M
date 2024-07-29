// src/products/infrastructure//adapters/repositories/repositoryFactory.ts
import { ProductRepository } from "../../../domain/ports/productsRepository";
import { MongoProductRepository } from "./mongoproductRepository";
import { MySQLProductRepository } from "./mysqlProductRepository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class Repositoryfactory {
    static createProductRespository(): ProductRepository {
        if ( db_type == 'mysql' ) {
            console.log("Nos encontramos usando MySQL")
            return new MySQLProductRepository();
        } else if ( db_type === 'mongo' ) {
            console.log('Nos encontramos usando Mongo')
            return new MongoProductRepository();
        }
        throw new Error('Unsupported database type');
    }
}
