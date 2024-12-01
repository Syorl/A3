const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors"); // Middleware para permitir requests cross-origin
const mysql = require("mysql2"); // Conexão com MySQL
const estoqueRoutes = require("./Backend/routes/estoque");
const relatoriosRoutes = require("./Backend/routes/relatorios");
const clientesRoutes = require("./Backend/routes/clientes");
const fornecedoresRoutes = require("./Backend/routes/fornecedores");
const vendedoresRoutes = require("./Backend/routes/vendedores");
const vendasRoutes = require("./Backend/routes/vendas");

const app = express();

// Configuração de conexão com o banco de dados
const db = mysql.createConnection({
  host: "mysql", // Nome do serviço MySQL no docker-compose
  user: "root",
  password: "senha",
  database: "loja",
});

// Verifica a conexão com o banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Adiciona as rotas
app.use("/estoque", estoqueRoutes);
app.use("/api", relatoriosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/fornecedores", fornecedoresRoutes);
app.use("/vendedores", vendedoresRoutes);
app.use("/vendas", vendasRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta o banco de dados para uso nas rotas
module.exports = db;
