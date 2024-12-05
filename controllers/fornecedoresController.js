const db = require('../db');

const getAllFornecedores = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Fornecedores");
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar fornecedores:", err.stack);
    res.status(500).json({ error: "Erro ao buscar fornecedores" });
  }
};

const getFornecedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query("SELECT * FROM Fornecedores WHERE id_fornecedor = ?", [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Fornecedor não encontrado" });
    }
  } catch (err) {
    console.error("Erro ao buscar fornecedor:", err.stack);
    res.status(500).json({ error: "Erro ao buscar fornecedor" });
  }
};

const createFornecedor = async (req, res) => {
  const { nome, cnpj, telefone, endereco } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Fornecedores (nome, cnpj, telefone, endereco) VALUES (?, ?, ?, ?)",
      [nome, cnpj, telefone, endereco]
    );
    res.status(201).json({ id_fornecedor: result.insertId });
  } catch (err) {
    console.error("Erro ao criar fornecedor:", err.stack);
    res.status(500).json({ error: "Erro ao criar fornecedor" });
  }
};

const updateFornecedor = async (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, telefone, endereco } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE Fornecedores SET nome = ?, cnpj = ?, telefone = ?, endereco = ? WHERE id_fornecedor = ?",
      [nome, cnpj, telefone, endereco, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Fornecedor não encontrado" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar fornecedor:", err.stack);
    res.status(500).json({ error: "Erro ao atualizar fornecedor" });
  }
};

const deleteFornecedor = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM Fornecedores WHERE id_fornecedor = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Fornecedor não encontrado" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar fornecedor:", err.stack);
    res.status(500).json({ error: "Erro ao deletar fornecedor" });
  }
};

module.exports = {
  getAllFornecedores,
  getFornecedorById,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
};
