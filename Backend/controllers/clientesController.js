// backend/controllers/clientesController.js
const db = require('../models/db');

exports.criarCliente = async (req, res) => {
  const { nome } = req.body;
  try {
    await db.query('INSERT INTO clientes (nome) VALUES (?)', [nome]);
    res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar cliente' });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM clientes');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar clientes' });
  }
};
