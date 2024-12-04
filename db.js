const mysql = require('mysql2');
require('dotenv').config();

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "senha123",
  database: process.env.DB_NAME || "mysqlloja",
  port: process.env.DB_PORT || 3306 // Adicionando a configuração da porta
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
    process.exit(1);
  }
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

module.exports = db;