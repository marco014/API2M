import mysql from 'mysql2/promise';

const config = {
  host: 'database-1-rds.c4wsy2r85bv0.us-east-1.rds.amazonaws.com',
  port: 3306,  // Asegúrate de usar el puerto correcto para MySQL
  user: 'luffy', 
  password: '12345678',
  database: 'mantenimiento',  // Este es el nombre de la base de datos que definiste al crear la instancia de RDS
};

/*export const query = async (sql: string, params: any[]) => {
  console.log('Conectando a MySQL');
  const conn = await mysql.createConnection(config);
  try {
    const [result] = await conn.execute(sql, params);
    return result;
  } finally {
    console.log('Cerrando connecion con MySQL ');
    await conn.end();
  }*/
    export const query = async (sql: string, params: any[]) => {
      let conn;
      try {
        console.log('Conectando a MySQL');
        conn = await mysql.createConnection(config);
        const [result] = await conn.execute(sql, params);
        return result;
      } catch (error) {
        console.error('Error en la consulta de MySQL:', error);
        throw error;
      } finally {
        if (conn) {
          console.log('Cerrando conexión con MySQL');
          await conn.end();
        }
      }
};
