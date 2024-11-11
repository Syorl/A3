// backend/controllers/vendasController.js
const db = require('../models/db');

exports.registrarVenda = async (req, res) => {
  const { cliente_id, vendedor_id, produto, quantidade } = req.body;
  try {
    await db.query(
      'INSERT INTO vendas (cliente_id, vendedor_id, produto, quantidade) VALUES (?, ?, ?, ?)',
      [cliente_id, vendedor_id, produto, quantidade]
    );
    res.status(201).json({ message: 'Venda registrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar venda' });
  }
};

exports.listarVendas = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM vendas');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar vendas' });
  }
};
