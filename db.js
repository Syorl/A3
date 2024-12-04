const mysql = require("mysql2");
require("dotenv").config();

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "senha123",
  database: process.env.DB_NAME || "SistemaGerenciamento",
  port: process.env.DB_PORT || 3306,
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
    process.exit(1);
  }
  console.log("Conexão com o banco de dados estabelecida com sucesso!");

  // Testar consulta simples para verificar conexão
  db.query("SELECT 1 + 1 AS resultado", (err, results) => {
    if (err) {
      console.error("Erro ao testar conexão com o banco:", err.message);
      return;
    }
    console.log("Conexão testada com sucesso! Resultado:", results[0].resultado);
  });
});

module.exports = db;
