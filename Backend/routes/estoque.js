const express = require("express");
const router = express.Router();
const db = require("../models/db"); // Importa a conexão com o banco de dados

// Endpoint para cadastrar produto
router.post("/produtos", async (req, res) => {
  const { name, description, category, brand, model, specs, supplier } =
    req.body;
  try {
    await db.query(
      "INSERT INTO produtos (Nome, Descrição, Categoria, Marca, Modelo, Especificações, Id_For, Quantidade) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",
      [name, description, category, brand, model, specs, supplier]
    );
    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar produto");
  }
});

// Endpoint para registrar movimentação de estoque
router.post("/movimentacoes", async (req, res) => {
  const { productName, quantity, type, responsible } = req.body;
  try {
    const [product] = await db.query("SELECT * FROM produtos WHERE Nome = ?", [
      productName,
    ]);
    if (product.length > 0) {
      let newQuantity = product[0].Quantidade;
      if (type === "entrada") {
        newQuantity += quantity;
      } else if (type === "saida") {
        newQuantity -= quantity;
      }
      await db.query("UPDATE produtos SET Quantidade = ? WHERE Nome = ?", [
        newQuantity,
        productName,
      ]);
      await db.query(
        "INSERT INTO movimentações (id_Prod, Id_Fun, Tipo, Quantidade, Id_Clie) VALUES (?, ?, ?, ?, ?)",
        [product[0].Id_Prod, responsible, type, quantity, null]
      );
      res.status(201).send("Movimentação registrada com sucesso");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (error) {
    res.status(500).send("Erro ao registrar movimentação");
  }
});

// Endpoint para listar produtos
router.get("/produtos", async (req, res) => {
  try {
    const [produtos] = await db.query("SELECT * FROM produtos");
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).send("Erro ao listar produtos");
  }
});

// Endpoint para listar movimentações
router.get("/movimentacoes", async (req, res) => {
  try {
    const [movimentacoes] = await db.query("SELECT * FROM movimentações");
    res.status(200).json(movimentacoes);
  } catch (error) {
    res.status(500).send("Erro ao listar movimentações");
  }
});

// Endpoint para consulta de produtos
router.get("/produtos/consulta", async (req, res) => {
  const { id, nome, marca, categoria, fornecedor } = req.query;
  try {
    const [produtos] = await db.query(
      `SELECT p.Id_Prod AS id, p.Nome AS nome, p.Marca AS marca, cp.Categoria AS categoria, f.Nome AS fornecedor 
            FROM produtos p
            JOIN 'categoria do produto' cp ON p.Categoria = cp.Id_Cat
            JOIN forneçedor f ON p.Id_For = f.Id_For
            WHERE p.Id_Prod LIKE ? AND p.Nome LIKE ? AND p.Marca LIKE ? AND cp.Categoria LIKE ? AND f.Nome LIKE ?`,
      [
        `%${id}%`,
        `%${nome}%`,
        `%${marca}%`,
        `%${categoria}%`,
        `%${fornecedor}%`,
      ]
    );
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).send("Erro ao consultar produtos");
  }
});
router.get("/produtos/consulta", async (req, res) => {
  const { id, nome, marca, categoria, fornecedor } = req.query;
  try {
    const [produtos] = await db.query(
      `SELECT p.Id_Prod AS id, p.Nome AS nome, p.Marca AS marca, cp.Categoria AS categoria, f.Nome AS fornecedor FROM produtos p JOIN 'categoria do produto' cp ON p.Categoria = cp.Id_Cat JOIN forneçedor f ON p.Id_For = f.Id_For WHERE p.Id_Prod LIKE ? AND p.Nome LIKE ? AND p.Marca LIKE ? AND cp.Categoria LIKE ? AND f.Nome LIKE ?`,
      [
        `%${id}%`,
        `%${nome}%`,
        `%${marca}%`,
        `%${categoria}%`,
        `%${fornecedor}%`,
      ]
    );
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).send("Erro ao consultar produtos");
  }
});
module.exports = router;
module.exports = router;
