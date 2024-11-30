const mysql = require('mysql2/promise'); // Importa o módulo MySQL
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Cria uma pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Porta definida no .env
});

// Função para testar a conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection(); // Pega uma conexão do pool
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    connection.release(); // Libera a conexão de volta ao pool
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Teste a conexão ao inicializar o arquivo
testConnection();

// Exporta o pool para ser usado em outras partes do projeto
module.exports = pool;
