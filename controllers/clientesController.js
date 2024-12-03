const db = require('../db'); // Conexão com o banco

// Buscar todos os clientes
const getAllClientes = (req, res) => {
  const query = 'SELECT * FROM Clientes';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    } else {
      res.json(results);
    }
  });
};

// Buscar cliente por ID
const getClienteById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Clientes WHERE id_cliente = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    } else {
      res.json(results[0] || {});
    }
  });
};

// Criar um novo cliente
const createCliente = (req, res) => {
  const { nome, cpf, endereco, email } = req.body;
  const query = 'INSERT INTO Clientes (nome, cpf, endereco, email) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, cpf, endereco, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    } else {
      res.status(201).json({ id_cliente: result.insertId });
    }
  });
};

// Atualizar um cliente
const updateCliente = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, endereco, email } = req.body;
  const query = 'UPDATE Clientes SET nome = ?, cpf = ?, endereco = ?, email = ? WHERE id_cliente = ?';
  db.query(query, [nome, cpf, endereco, email, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    } else {
      res.sendStatus(200);
    }
  });
};

// Deletar um cliente
const deleteCliente = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Clientes WHERE id_cliente = ?';
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente };
