const express = require("express");
const router = express.Router();
const db = require("../models/db"); // Importa a conexão com o banco de dados

// Endpoint para criar um novo fornecedor
router.post("/", async (req, res) => {
  const { nome, cnpj, endereco } = req.body;
  try {
    await db.query(
      "INSERT INTO forneçedor (Nome, CNPJ, Endereço) VALUES (?, ?, ?)",
      [nome, cnpj, endereco]
    );
    res.status(201).send("Fornecedor cadastrado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar fornecedor");
  }
});

// Endpoint para listar todos os fornecedores
router.get("/", async (req, res) => {
  try {
    const [fornecedores] = await db.query("SELECT * FROM forneçedor");
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).send("Erro ao listar fornecedores");
  }
});

// Endpoint para atualizar um fornecedor
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, endereco } = req.body;
  try {
    await db.query(
      "UPDATE forneçedor SET Nome = ?, CNPJ = ?, Endereço = ? WHERE Id_For = ?",
      [nome, cnpj, endereco, id]
    );
    res.status(200).send("Fornecedor atualizado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao atualizar fornecedor");
  }
});

// Endpoint para deletar um fornecedor
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM forneçedor WHERE Id_For = ?", [id]);
    res.status(200).send("Fornecedor deletado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao deletar fornecedor");
  }
});

module.exports = router;
