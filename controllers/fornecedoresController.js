const db = require("../db");

const getAllFornecedores = (req, res) => {
  const query = "SELECT * FROM Fornecedores";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar fornecedores" });
    } else {
      res.json(results);
    }
  });
};

const getFornecedorById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Fornecedores WHERE id_fornecedor = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar fornecedor" });
    } else {
      res.json(results[0] || {});
    }
  });
};

const createFornecedor = (req, res) => {
  const { nome, cnpj, telefone, endereco } = req.body;
  const query = "INSERT INTO Fornecedores (nome, cnpj, telefone, endereco) VALUES (?, ?, ?, ?)";
  db.query(query, [nome, cnpj, telefone, endereco], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao criar fornecedor" });
    } else {
      res.status(201).json({ id_fornecedor: result.insertId });
    }
  });
};

const updateFornecedor = (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, telefone, endereco } = req.body;
  const query = "UPDATE Fornecedores SET nome = ?, cnpj = ?, telefone = ?, endereco = ? WHERE id_fornecedor = ?";
  db.query(query, [nome, cnpj, telefone, endereco, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao atualizar fornecedor" });
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteFornecedor = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Fornecedores WHERE id_fornecedor = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao deletar fornecedor" });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  getAllFornecedores,
  getFornecedorById,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
};
