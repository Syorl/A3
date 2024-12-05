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
const pedidosRoutes = require("./routes/pedidosRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const movimentacaoRoutes = require("./routes/movimentacaoRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

// Uso das Rotas
app.use("/clientes", clientesRoutes);
app.use("/fornecedores", fornecedoresRoutes);
app.use("/vendedores", vendedoresRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/relatorio", relatorioRoutes);
app.use('/produto', produtoRoutes);  // Consistente com o nome da rota principal
app.use('/produtos', produtoRoutes); // Alternativa para rotas de produtos
app.use('/movimentacao', movimentacaoRoutes);

// Servir arquivos estáticos da pasta Frontend
app.use(express.static(path.join(__dirname, 'Frontend')));

// Rota principal para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
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
