// backend/routes/clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.post('/', clientesController.criarCliente); // Cria um cliente
router.get('/', clientesController.listarClientes); // Lista todos os clientes

module.exports = router;
