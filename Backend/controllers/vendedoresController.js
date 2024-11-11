// backend/controllers/vendedoresController.js
const db = require('../models/db');

exports.criarVendedor = async (req, res) => {
  const { nome } = req.body;
  try {
    await db.query('INSERT INTO vendedores (nome) VALUES (?)', [nome]);
    res.status(201).json({ message: 'Vendedor cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar vendedor', error });
  }
};

exports.listarVendedores = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM vendedores');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar vendedores', error });
  }
};
