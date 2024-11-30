const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configuração do pool
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432,
});

// Buscar todos os clientes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Clientes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adicionar um novo cliente
router.post('/', async (req, res) => {
  const { nome, cpf, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Clientes (nome, cpf, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, cpf, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
