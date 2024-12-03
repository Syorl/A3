const express = require("express");
const router = express.Router();
const {
  getAllVendedores,
  getVendedorById,
  createVendedor,
  updateVendedor,
  deleteVendedor,
} = require("../controllers/vendedoresController");

router.get("/", getAllVendedores);
router.get("/:id", getVendedorById);
router.post("/", createVendedor);
router.put("/:id", updateVendedor);
router.delete("/:id", deleteVendedor);

module.exports = router;
