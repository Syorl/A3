// backend/routes/estoque.js
const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.post('/', estoqueController.adicionarItemEstoque); // Adiciona um item ao estoque
router.get('/', estoqueController.listarEstoque); // Lista todos os itens no estoque

module.exports = router;
