// backend/routes/vendedores.js
const express = require('express');
const router = express.Router();
const vendedoresController = require('../controllers/vendedoresController');

router.post('/', vendedoresController.criarVendedor); // Cria um vendedor
router.get('/', vendedoresController.listarVendedores); // Lista todos os vendedores

module.exports = router;
