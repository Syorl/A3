const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Importa a conexão com o banco de dados

// Endpoint para criar uma nova venda
router.post('/', async (req, res) => {
  const { clienteId, vendedorId, produto, quantidade } = req.body;
  try {
    await db.query(
      'INSERT INTO vendas (Id_Clie, Id_Vendedor, Produto, Quantidade) VALUES (?, ?, ?, ?)', 
      [clienteId, vendedorId, produto, quantidade]
    );
    res.status(201).send('Venda registrada com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao registrar venda');
  }
});

// Endpoint para listar todas as vendas
router.get('/', async (req, res) => {
  try {
    const [vendas] = await db.query(`
      SELECT v.Id_Venda, c.Nome AS Cliente, v.Id_Clie, ve.Nome AS Vendedor, v.Id_Vendedor, v.Produto, v.Quantidade 
      FROM vendas v
      JOIN cliente c ON v.Id_Clie = c.Id_Clie
      JOIN vendedor ve ON v.Id_Vendedor = ve.Id_Vendedor
    `);
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).send('Erro ao listar vendas');
  }
});

// Endpoint para atualizar uma venda
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { clienteId, vendedorId, produto, quantidade } = req.body;
  try {
    await db.query(
      'UPDATE vendas SET Id_Clie = ?, Id_Vendedor = ?, Produto = ?, Quantidade = ? WHERE Id_Venda = ?', 
      [clienteId, vendedorId, produto, quantidade, id]
    );
    res.status(200).send('Venda atualizada com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao atualizar venda');
  }
});

// Endpoint para excluir uma venda
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM vendas WHERE Id_Venda = ?', [id]);
    res.status(200).send('Venda cancelada com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao cancelar venda');
  }
});

module.exports = router;
