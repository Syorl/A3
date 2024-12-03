const express = require("express");
const router = express.Router();
const {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
  registerMovimentacao
} = require("../controllers/estoqueController");

// Definição das rotas
router.get("/", getAllProdutos);
router.get("/:id", getProdutoById);
router.post("/", createProduto);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto);
router.post("/movimentacao", registerMovimentacao);

module.exports = router;
