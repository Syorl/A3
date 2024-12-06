// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { exec } = require("child_process");

// Instância do App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importação de Rotas
const clientesRoutes = require("./routes/clientesRoutes");
const fornecedoresRoutes = require("./routes/fornecedoresRoutes");
const vendedoresRoutes = require("./routes/vendedoresRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");

// Uso das Rotas
app.use("/clientes", clientesRoutes);       // Endpoints para clientes
app.use("/fornecedores", fornecedoresRoutes); // Endpoints para fornecedores
app.use("/vendedores", vendedoresRoutes);   // Endpoints para vendedores
app.use("/relatorios", relatorioRoutes);    // Corrigi para plural, mais semântico
app.use("/produtos", produtoRoutes);        // Consistência para rotas relacionadas a produtos
app.use("/pedidos", pedidosRoutes);        // Consistência para rotas relacionadas a produtos

// Servir arquivos estáticos da pasta Frontend
app.use(express.static(path.join(__dirname, "Frontend")));

// Rota principal para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `Conectado ao banco de dados: ${process.env.DB_NAME || "mysqlloja"}`
  );

  // Abrir o navegador padrão automaticamente
  const url = `http://localhost:${PORT}`;
  switch (process.platform) {
    case "darwin": // macOS
      exec(`open ${url}`);
      break;
    case "win32": // Windows
      exec(`start ${url}`);
      break;
    default: // Linux
      exec(`xdg-open ${url}`);
  }
});
