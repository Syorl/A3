const pool = require('../db'); // Conexão com o banco

// Buscar todos os clientes
const getAllClientes = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM Clientes');
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar clientes:", err.message);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// Buscar cliente por ID
const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
    res.json(results[0] || {}); // Retorna o cliente ou um objeto vazio
  } catch (err) {
    console.error("Erro ao buscar cliente por ID:", err.message);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// Criar um novo cliente
const createCliente = async (req, res) => {
  try {
    const { nome, cpf, endereco, email } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Clientes (nome, cpf, endereco, email) VALUES (?, ?, ?, ?)',
      [nome, cpf, endereco, email]
    );
    res.status(201).json({ id_cliente: result.insertId });
  } catch (err) {
    console.error("Erro ao criar cliente:", err.message);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

// Atualizar um cliente
const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, endereco, email } = req.body;
    await pool.query(
      'UPDATE Clientes SET nome = ?, cpf = ?, endereco = ?, email = ? WHERE id_cliente = ?',
      [nome, cpf, endereco, email, id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err.message);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Deletar um cliente
const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar cliente:", err.message);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};

module.exports = { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente };
