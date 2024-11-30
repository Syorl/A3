const express = require("express");
const router = express.Router();
const db = require("../models/db"); // Importa a conexão com o banco de dados

// Endpoint para criar um novo cliente
router.post("/", async (req, res) => {
  const { nome, cpf, endereco, email } = req.body;
  try {
    await db.query(
      "INSERT INTO cliente (Nome, CPF, Endereço, Email) VALUES (?, ?, ?, ?)",
      [nome, cpf, endereco, email]
    );
    res.status(201).send("Cliente cadastrado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar cliente");
  }
});

// Endpoint para listar todos os clientes e quantidade de produtos adquiridos
router.get("/", async (req, res) => {
  try {
    const [clientes] = await db.query(`
      SELECT c.*, 
      (SELECT COUNT(*) FROM movimentações m WHERE m.Id_Clie = c.Id_Clie) AS produtosAdquiridos 
      FROM cliente c
    `);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).send("Erro ao listar clientes");
  }
});

// Endpoint para atualizar um cliente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, endereco, email } = req.body;
  try {
    await db.query(
      "UPDATE cliente SET Nome = ?, CPF = ?, Endereço = ?, Email = ? WHERE Id_Clie = ?",
      [nome, cpf, endereco, email, id]
    );
    res.status(200).send("Cliente atualizado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao atualizar cliente");
  }
});

// Endpoint para deletar um cliente
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM cliente WHERE Id_Clie = ?", [id]);
    res.status(200).send("Cliente deletado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao deletar cliente");
  }
});

module.exports = router;
