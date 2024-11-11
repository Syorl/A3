// backend/controllers/estoqueController.js
const db = require('../models/db');

exports.adicionarItemEstoque = async (req, res) => {
  const { produto, quantidade } = req.body;
  try {
    await db.query('INSERT INTO estoque (produto, quantidade) VALUES (?, ?)', [produto, quantidade]);
    res.status(201).json({ message: 'Item de estoque adicionado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar item ao estoque' });
  }
};

exports.listarEstoque = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM estoque');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar estoque' });
  }
};
