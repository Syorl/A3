// produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Rota para buscar um produto pelo ID
router.get('/:id', produtoController.getProdutoById);

// Rota para criar um novo produto
router.post('/adicionar', produtoController.createProduto);

// Rota para atualizar um produto
router.put('/:id', produtoController.updateProduto);

// Rota para deletar um produto
router.delete('/:id', produtoController.deleteProduto);

// Rota para consulta de produtos com parÃ¢metros (nome, categoria, marca, fornecedor)
router.get('/consulta', produtoController.consultaProdutos);

module.exports = router;