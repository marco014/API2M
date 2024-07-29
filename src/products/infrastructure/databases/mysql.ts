// src/products/infrastructure/databases/mysql.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

//Cargamos las variables de entorno
dotenv.config();

//Aseguramos que las variables de entorno estan definidas
for ( const key of ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_PASSWORD', 'MYSQL_DATABASE']) {
    if ( !process.env[key] ) {
        throw new Error(`Variable de entorno faltante: ${key}`);
    }
}

//Convertir MYSQL_PORT de string a number
const config = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT), //Aseguramos de queel puerto sean numeros
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

export const query = async (sql: string, params: any[]) => {
    console.log('Conectando a MySQL');
    const conn = await mysql.createConnection(config);

    try {
        const [rows] = await conn.execute<any[]>(sql, params);
        return rows;
    } catch ( error ) {
        console.log('Error de consulta con MySQL:', error);
    } finally {
        console.log('Cerrando conección MySQL');
    }
}