const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const path = require("path");
const { exec } = require("child_process");

// Instância do App
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Importação de Rotas
const clientesRoutes = require("./routes/clientesRoutes");
const fornecedoresRoutes = require("./routes/fornecedoresRoutes");
const estoqueRoutes = require("./routes/produtosRoutes");
const vendedoresRoutes = require("./routes/vendedoresRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const movimentacaoRoutes = require("./routes/movimentacaoRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
// Uso das Rotas
app.use("/clientes", clientesRoutes);
app.use("/fornecedores", fornecedoresRoutes);
app.use("/estoque", estoqueRoutes);
app.use("/vendedores", vendedoresRoutes);
app.use("/pedidoss", pedidosRoutes);
app.use("/relatorio", relatorioRoutes);
app.use('/api', produtosRoutes);

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
