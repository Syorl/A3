const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");
const db = require("./models/db");

const estoqueRoutes = require("./routes/estoque");
const relatoriosRoutes = require("./routes/relatorios");
const clientesRoutes = require("./routes/clientes");
const fornecedoresRoutes = require("./routes/fornecedores");
const vendedoresRoutes = require("./routes/vendedores");
const vendasRoutes = require("./routes/vendas");

const app = express();

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

// Serve a página HTML
app.use(express.static(path.join(__dirname, "Frontend")));

// Função para verificar o status do Docker
function checkDockerStatus() {
  exec("docker info", (error, stdout, stderr) => {
    if (error) {
      console.error("Erro ao executar o comando:");
      console.error(error.message);
      console.error("Docker não está ativo ou ocorreu um erro.");
      console.error(stderr);
      return;
    }
    console.log("Docker está ativo.");
    console.log(stdout);
  });
}

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Verificar o status do Docker
  checkDockerStatus();

  // Importação dinâmica do módulo open e abrir a página HTML
  const openModule = await import('open');
  openModule.default(`http://localhost:${PORT}/Index.html`);
});

// Exporta o banco de dados para uso nas rotas
module.exports = db;
