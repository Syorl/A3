const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega as variáveis de ambiente

// Cria uma pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = pool;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = sequelize;

sequelize.sync({ alter: true })
  .then(() => console.log('Tabelas sincronizadas com sucesso.'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));
