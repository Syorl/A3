const express = require("express");
const router = express.Router();
const db = require("../models/db"); // Importa a conexão com o banco de dados

// Endpoint para criar um novo vendedor
router.post("/", async (req, res) => {
  const { nome, cpf, email } = req.body;
  try {
    await db.query("INSERT INTO vendedor (Nome, CPF, Email) VALUES (?, ?, ?)", [
      nome,
      cpf,
      email,
    ]);
    res.status(201).send("Vendedor cadastrado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar vendedor");
  }
});

// Endpoint para listar todos os vendedores
router.get("/", async (req, res) => {
  try {
    const [vendedores] = await db.query("SELECT * FROM vendedor");
    res.status(200).json(vendedores);
  } catch (error) {
    res.status(500).send("Erro ao listar vendedores");
  }
});

// Endpoint para atualizar um vendedor
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email } = req.body;
});

module.exports = router;
