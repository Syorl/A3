const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

// Rota para adicionar um cliente
router.post("/", clientesController.addCliente);

// Rota para obter todos os clientes
router.get("/", clientesController.getClientes);

// Rota para atualizar um cliente
router.put("/:id", clientesController.updateCliente);

// Rota para deletar um cliente
router.delete("/:id", clientesController.deleteCliente);

module.exports = router;
