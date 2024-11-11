// backend/controllers/vendasController.js
const db = require('../models/db');

exports.registrarVenda = async (req, res) => {
  const { produto, quantidade } = req.body;
  try {
    await db.query('INSERT INTO vendas (produto, quantidade) VALUES (?, ?)', [produto, quantidade]);
    res.status(201).json({ message: 'Venda registrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar venda', error });
  }
};

exports.listarVendas = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM vendas');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar vendas', error });
  }
};
