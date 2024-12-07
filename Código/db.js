const mysql = require('mysql2/promise');
require('dotenv').config();

// Configurando o pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "senha123",
  database: process.env.DB_NAME || "mysqlloja",
  port: process.env.DB_PORT || 3306, // Configuração da porta
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    connection.release(); // Libera a conexão de volta para o pool
  } catch (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
    process.exit(1); // Sai do processo com erro
  }
})();

module.exports = pool;
 