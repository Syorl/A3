const express = require("express");
const router = express.Router();
const {
  getAllFornecedores,
  getFornecedorById,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
} = require("../controllers/fornecedoresController");

router.get("/", getAllFornecedores);
router.get("/:id", getFornecedorById);
router.post("/", createFornecedor);
router.put("/:id", updateFornecedor);
router.delete("/:id", deleteFornecedor);

module.exports = router;
