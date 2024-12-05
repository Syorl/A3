const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

router.get('/produtos-mais-vendidos', relatoriosController.produtosMaisVendidos);
router.get('/produtos-baixo-estoque', relatoriosController.produtosBaixoEstoque);
router.get('/consumo-medio-cliente', relatoriosController.consumoMedioCliente);
router.get('/produto-por-cliente', relatoriosController.produtoPorCliente);

module.exports = router;
