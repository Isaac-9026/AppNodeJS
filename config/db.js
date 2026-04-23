const mysql = require('mysql2/promise') //Acceso
require('dotenv').config() //Leer los valores del archivo de configuración

//pool de conexiones => "conjunto de conexiones disponibles"
//conexión "regular" (normal) => usuario1 => abre => proceso > cierra
//pool "optimizado" => se crean todas las conexiones a ofrecer (10) => usuario1, usuario2, etc. usuario11( tamaño cola)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DB_NAME || "",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 50,
  timezone: "-05:00"
});

//Ejecutar la conexión - IIFE (Expresión de función invocada de forma inmediata)
(async () => {
  try{
    const conn = await pool.getConnection(); //Conexion prestada
    console.log("Conexión a MySQL correcta");
    conn.release(); //devolucion
  }catch (err){
    console.error(err.message)
  }
})();

module.exports = pool;