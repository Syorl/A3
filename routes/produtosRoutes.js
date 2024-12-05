const express = require('express');
const router = express.Router();

// Importa os métodos do controlador
const {
    listarProdutos,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto,
} = require('../controllers/produtosController');

// Define as rotas
router.get('/produtos', listarProdutos); // Listar todos os produtos
router.post('/produtos', cadastrarProduto); // Cadastrar um novo produto
router.put('/produtos/:id', atualizarProduto); // Atualizar um produto por ID
router.delete('/produtos/:id', excluirProduto); // Excluir um produto por ID

module.exports = router;
