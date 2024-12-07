const express = require('express');
const router = express.Router();
const {
  produtosBaixoEstoque,
  numeroProdutosPorCategoria,
  numeroProdutosPorFornecedor,
  produtosMaisVendidos,
  produtosPorCliente,
  consumoMedioCliente
} = require('../controllers/relatoriosController');

// Rota para produtos abaixo do estoque mínimo
router.get('/produtos-baixo-estoque', produtosBaixoEstoque);

// Rota para número de produtos por categoria
router.get('/numero-produtos-por-categoria', numeroProdutosPorCategoria);

// Rota para número de produtos por fornecedor
router.get('/numero-produtos-por-fornecedor', numeroProdutosPorFornecedor);

// Rota para produtos mais vendidos
router.get('/produtos-mais-vendidos', produtosMaisVendidos);

// Rota para produtos comprados por cliente
router.get('/produtos-por-cliente', produtosPorCliente);

// Rota para consumo médio do cliente
router.get('/consumo-medio-cliente', consumoMedioCliente);

module.exports = router;
