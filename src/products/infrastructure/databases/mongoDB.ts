// src/products/infrasctructure/databases/mongoDB.ts
import mongoose from "mongoose";
import dotenv from 'dotenv';

//Cargamos las variables de entorno desde el archivo .env
dotenv.config();

//Obtenemos la URI de MongoDB desde las variables de entorno
const mongoUri = process.env.MONGO_URI;

//Verificamos que la URI se haya cargado correctamente
console.log('MONGO_URI', mongoUri);

if ( !mongoUri ) {
    throw new Error('MONGO_URI no esta definido en el archivo .env');
}

// Opciones de conexion mejoradas
const options = {
    connectionTimeoutMS: 1000, // 10 segundos de espera de conexion
    serverSelectionTimeoutMS: 100, // 10 segundos de tiempo deespera de selección del servidor
};

//Conectar a MongoDB
mongoose.connect( mongoUri, options )
    .then(() => {
        console.error('Conectado a MongoDB');
    })
    .catch ((error) => {
        console.error('Error de conexion:', error.message);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexion'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

// Exportamos el objeto mongoose y la conexion db
export {mongoose, db};