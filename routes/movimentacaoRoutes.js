const express = require('express');
const movimentacaoController = require('../controllers/movimentacaoController');
const router = express.Router();

// Rota para registrar movimentação
router.post('/produtos/movimentacao', movimentacaoController.registrarMovimentacao);

module.exports = router;
