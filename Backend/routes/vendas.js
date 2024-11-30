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

// Registrar uma nova venda
router.post('/', async (req, res) => {
  const { cliente_id, produto_id, quantidade, data } = req.body;
  try {
    // Insere na tabela Vendas
    const result = await pool.query(
      'INSERT INTO Vendas (cliente_id, produto_id, quantidade, data) VALUES ($1, $2, $3, $4) RETURNING *',
      [cliente_id, produto_id, quantidade, data]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todas as vendas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM Vendas'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
