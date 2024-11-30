const express = require("express");
const router = express.Router();
const db = require("../models/db"); // Importa a conexão com o banco de dados

// Endpoint para obter dados do relatório de produtos
router.get("/produtos/relatorio", async (req, res) => {
  try {
    const [bestSellingProducts] = await db.query(`
      SELECT p.Nome AS nome, SUM(m.Quantidade) AS vendas
      FROM movimentações m
      JOIN produtos p ON m.id_Prod = p.Id_Prod
      WHERE m.Tipo = 'saida'
      GROUP BY p.Nome
      ORDER BY vendas DESC
      LIMIT 10
    `);

    const [productByCustomer] = await db.query(`
      SELECT c.Nome AS cliente, p.Nome AS produto, SUM(m.Quantidade) AS quantidade
      FROM movimentações m
      JOIN cliente c ON m.Id_Clie = c.Id_Clie
      JOIN produtos p ON m.id_Prod = p.Id_Prod
      GROUP BY c.Nome, p.Nome
    `);

    const [avgConsumption] = await db.query(`
      SELECT c.Nome AS cliente, AVG(m.Quantidade) AS consumoMedio
      FROM movimentações m
      JOIN cliente c ON m.Id_Clie = c.Id_Clie
      GROUP BY c.Nome
    `);

    const [lowStockProducts] = await db.query(`
      SELECT Nome AS nome, Quantidade AS estoque
      FROM produtos
      WHERE Quantidade < 10
    `);

    const reportData = {
      bestSellingProducts,
      productByCustomer,
      avgConsumption,
      lowStockProducts,
    };

    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).send("Erro ao obter dados do relatório");
  }
});

module.exports = router;
