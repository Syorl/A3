const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Importa a conexão com o banco de dados

// Endpoint para criar uma nova venda
router.post('/', async (req, res) => {
  const { clienteId, vendedorId, produtoId, quantidade } = req.body;
  try {
    // Verifica se o produto está no estoque e tem quantidade suficiente
    const [produto] = await db.query('SELECT Quantidade FROM produtos WHERE Id_Prod = ?', [produtoId]);
    if (produto.length > 0 && produto[0].Quantidade >= quantidade) {
      // Registra a venda
      await db.query(
        'INSERT INTO vendas (Id_Clie, Id_Vendedor, Produto, Quantidade) VALUES (?, ?, ?, ?)', 
        [clienteId, vendedorId, produtoId, quantidade]
      );

      // Atualiza a quantidade do produto no estoque
      await db.query(
        'UPDATE produtos SET Quantidade = Quantidade - ? WHERE Id_Prod = ?', 
        [quantidade, produtoId]
      );

      res.status(201).send('Venda registrada com sucesso');
    } else {
      res.status(400).send('Quantidade insuficiente no estoque');
    }
  } catch (error) {
    res.status(500).send('Erro ao registrar venda');
  }
});

// Endpoint para listar todas as vendas
router.get('/', async (req, res) => {
  try {
    const [vendas] = await db.query(`
      SELECT v.Id_Venda, c.Nome AS Cliente, v.Id_Clie, ve.Nome AS Vendedor, v.Id_Vendedor, p.Nome AS Produto, v.Quantidade 
      FROM vendas v
      JOIN cliente c ON v.Id_Clie = c.Id_Clie
      JOIN vendedor ve ON v.Id_Vendedor = ve.Id_Vendedor
      JOIN produtos p ON v.Produto = p.Id_Prod
    `);
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).send('Erro ao listar vendas');
  }
});

// Endpoint para atualizar uma venda
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { clienteId, vendedorId, produtoId, quantidade } = req.body;
  try {
    // Verifica a quantidade atual do produto na venda
    const [vendaAtual] = await db.query('SELECT Quantidade FROM vendas WHERE Id_Venda = ?', [id]);
    if (vendaAtual.length > 0) {
      const quantidadeAnterior = vendaAtual[0].Quantidade;

      // Verifica se o produto está no estoque e tem quantidade suficiente
      const [produto] = await db.query('SELECT Quantidade FROM produtos WHERE Id_Prod = ?', [produtoId]);
      if (produto.length > 0 && (produto[0].Quantidade + quantidadeAnterior) >= quantidade) {
        // Atualiza a venda
        await db.query(
          'UPDATE vendas SET Id_Clie = ?, Id_Vendedor = ?, Produto = ?, Quantidade = ? WHERE Id_Venda = ?', 
          [clienteId, vendedorId, produtoId, quantidade, id]
        );

        // Atualiza a quantidade do produto no estoque
        await db.query(
          'UPDATE produtos SET Quantidade = Quantidade + ? - ? WHERE Id_Prod = ?', 
          [quantidadeAnterior, quantidade, produtoId]
        );

        res.status(200).send('Venda atualizada com sucesso');
      } else {
        res.status(400).send('Quantidade insuficiente no estoque');
      }
    } else {
      res.status(404).send('Venda não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar venda');
  }
});

// Endpoint para excluir uma venda
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Verifica a quantidade do produto na venda
    const [venda] = await db.query('SELECT Produto, Quantidade FROM vendas WHERE Id_Venda = ?', [id]);
    if (venda.length > 0) {
      const produtoId = venda[0].Produto;
      const quantidade = venda[0].Quantidade;

      // Deleta a venda
      await db.query('DELETE FROM vendas WHERE Id_Venda = ?', [id]);

      // Atualiza a quantidade do produto no estoque
      await db.query(
        'UPDATE produtos SET Quantidade = Quantidade + ? WHERE Id_Prod = ?', 
        [quantidade, produtoId]
      );

      res.status(200).send('Venda cancelada com sucesso');
    } else {
      res.status(404).send('Venda não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao cancelar venda');
  }
});

module.exports = router;
