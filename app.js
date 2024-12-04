const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const path = require("path");
const { exec } = require("child_process");

// Instância do App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com Banco de Dados
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost", // Localhost para instância local do MySQL
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "senha123",
  database: process.env.DB_NAME || "mysqlloja",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
    process.exit(1);
  }
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

// Testar conexão ao banco ao iniciar
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("Erro ao testar conexão com o banco:", err.message);
  } else {
    console.log("Conexão com o banco testada com sucesso!");
  }
});

// Importação de Rotas
const clientesRoutes = require("./routes/clientesRoutes");
const fornecedoresRoutes = require("./routes/fornecedoresRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const vendedoresRoutes = require("./routes/vendedoresRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const relatoriosRoutes = require("./routes/relatoriosRoutes");
// Uso das Rotas
app.use("/clientes", clientesRoutes);
app.use("/fornecedores", fornecedoresRoutes);
app.use("/produtos", produtosRoutes);
app.use("/vendedores", vendedoresRoutes);
app.use("/pedidoss", pedidosRoutes);
app.use("/estoque", estoqueRoutes);
app.use("/relatorio", relatoriosRoutes);



// Servir arquivos estáticos da pasta Frontend
app.use(express.static(path.join(__dirname, 'Frontend')));

// Rota principal para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'Index.html'));
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Conectado ao banco de dados: ${process.env.DB_NAME || "mysqlloja"}`);
  
  // Abrir o navegador padrão
  const url = `http://localhost:${PORT}`;
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`);
      break;
    case 'win32':
      exec(`start ${url}`);
      break;
    default:
      exec(`xdg-open ${url}`);
  }
});
