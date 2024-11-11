// backend/routes/clientes.js
const express = require('express');
const router = express.Router();
const { criarCliente, listarClientes } = require('../controllers/clientesController');

router.post('/', criarCliente);
router.get('/', listarClientes);

module.exports = router;