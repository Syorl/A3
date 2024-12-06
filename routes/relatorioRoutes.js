const express = require('express');
const router = express.Router();
const {
  produtosBaixoEstoque,
  numeroProdutosPorCategoria,
  numeroProdutosPorFornecedor
} = require('../controllers/relatoriosController');

// Rota para produtos abaixo do estoque mínimo
router.get('/produtos-baixo-estoque', produtosBaixoEstoque);

// Rota para número de produtos por categoria
router.get('/numero-produtos-por-categoria', numeroProdutosPorCategoria);

// Rota para número de produtos por fornecedor
router.get('/numero-produtos-por-fornecedor', numeroProdutosPorFornecedor);

module.exports = router;
