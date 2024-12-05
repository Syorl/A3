const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

// Rota para cadastrar produto
router.post('/cadastrar', produtoController.cadastrarProduto);

module.exports = router;
