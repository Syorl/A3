const db = require("../db");

const getAllVendedores = (req, res) => {
  const query = "SELECT * FROM Vendedores";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar vendedores" });
    } else {
      res.json(results);
    }
  });
};

const getVendedorById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Vendedores WHERE id_vendedor = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar vendedor" });
    } else {
      res.json(results[0] || {});
    }
  });
};

const createVendedor = (req, res) => {
  const { nome, cpf, email } = req.body;
  const query = "INSERT INTO Vendedores (nome, cpf, email) VALUES (?, ?, ?)";
  db.query(query, [nome, cpf, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao criar vendedor" });
    } else {
      res.status(201).json({ id_vendedor: result.insertId });
    }
  });
};

const updateVendedor = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email } = req.body;
  const query = "UPDATE Vendedores SET nome = ?, cpf = ?, email = ? WHERE id_vendedor = ?";
  db.query(query, [nome, cpf, email, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao atualizar vendedor" });
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteVendedor = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Vendedores WHERE id_vendedor = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao deletar vendedor" });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  getAllVendedores,
  getVendedorById,
  createVendedor,
  updateVendedor,
  deleteVendedor,
};
