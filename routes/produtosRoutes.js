const express = require("express");
const router = express.Router();
const {
  getAllProdutos,
  getProdutoById,
  consultaProdutos,
  gerarRelatorio // Adicionado para usar a função de relatório
} = require("../controllers/produtosController");

// Definição das rotas
router.get("/", getAllProdutos);
router.get("/:id", getProdutoById);
router.get("/consulta", consultaProdutos);
router.get("/relatorio", gerarRelatorio); // Usando a função corretamente

module.exports = router;
