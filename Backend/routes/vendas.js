// backend/routes/vendas.js
const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.post('/', vendasController.registrarVenda); // Registra uma venda
router.get('/', vendasController.listarVendas); // Lista todas as vendas

module.exports = router;
