// backend/controllers/vendedoresController.js
const db = require('../models/db');

exports.criarVendedor = async (req, res) => {
  const { nome, area } = req.body;
  try {
    await db.query('INSERT INTO vendedores (nome, area) VALUES (?, ?)', [nome, area]);
    res.status(201).json({ message: 'Vendedor cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar vendedor' });
  }
};

exports.listarVendedores = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM vendedores');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar vendedores' });
  }
};
