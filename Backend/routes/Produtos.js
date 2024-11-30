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

// Buscar todos os produtos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Produto');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adicionar um novo produto
router.post('/', async (req, res) => {
  const { nome, preco, estoque } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Produto (nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *',
      [nome, preco, estoque]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
