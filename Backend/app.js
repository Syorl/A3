const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Middleware para permitir requests cross-origin
const estoqueRoutes = require("./routes/estoque");
const relatoriosRoutes = require("./routes/relatorios");
const clientesRoutes = require("./routes/clientes");
const fornecedoresRoutes = require("./routes/fornecedores");
const vendedoresRoutes = require("./routes/vendedores");
const vendasRoutes = require("./routes/vendas");
const app = express();

app.use(bodyParser.json()); // Middleware para parsear JSON
app.use(cors()); // Middleware para permitir requests cross-origin

// Adiciona as rotas de estoque, relatórios e clientes
app.use("/estoque", estoqueRoutes);
app.use("/api", relatoriosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/fornecedores", fornecedoresRoutes);
app.use("/vendedores", vendedoresRoutes);
app.use("/vendas", vendasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
