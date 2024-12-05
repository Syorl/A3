const express = require('express');
const router = express.Router();
const vendedoresController = require('../controllers/vendedoresController');

router.get('/', vendedoresController.getAllVendedores);
router.get('/:id', vendedoresController.getVendedorById);
router.post('/', vendedoresController.createVendedor);
router.put('/:id', vendedoresController.updateVendedor);
router.delete('/:id', vendedoresController.deleteVendedor);

module.exports = router;
