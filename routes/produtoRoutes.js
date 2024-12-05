const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.getAllProdutos);
router.get('/:id', produtoController.getProdutoById);
router.post('/adicionar', produtoController.createProduto);
router.put('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);
router.get('/consulta', produtoController.consultaProdutos); // Rota de consulta

module.exports = router;