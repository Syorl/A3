const express = require("express");
const router = express.Router();
const relatoriosController = require("../controllers/relatoriosController");

// Rota para relatório de produtos mais vendidos
router.get("/produtos-mais-vendidos", relatoriosController.produtosMaisVendidos);

// Rota para relatório de produtos com baixo estoque
router.get("/produtos-baixo-estoque", relatoriosController.produtosBaixoEstoque);

// Rota para relatório de consumo médio do cliente
router.get("/consumo-medio-cliente", relatoriosController.consumoMedioCliente);

// Rota para relatório de produto por cliente
router.get("/produto-por-cliente", relatoriosController.produtoPorCliente);

module.exports = router;
