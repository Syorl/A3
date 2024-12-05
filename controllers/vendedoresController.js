const db = require('../db');

// Buscar todos os vendedores
const getAllVendedores = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Vendedores");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao buscar vendedores", error: err });
  }
};

// Buscar vendedor por ID
const getVendedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Vendedores WHERE id_vendedor = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Vendedor não encontrado" });
    }
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao buscar vendedor", error: err });
  }
};

// Criar um novo vendedor
const createVendedor = async (req, res) => {
  const { nome, cpf, email } = req.body;
  try {
    const [result] = await db.query("INSERT INTO Vendedores (nome, cpf, email) VALUES (?, ?, ?)", [nome, cpf, email]);
    res.status(201).json({ id_vendedor: result.insertId });
  } catch (err) {
    console.error("Erro ao criar vendedor:", err.stack);
    res.status(500).json({ message: "Erro ao criar vendedor", error: err });
  }
};

// Atualizar um vendedor
const updateVendedor = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email } = req.body;
  try {
    const [result] = await db.query("UPDATE Vendedores SET nome = ?, cpf = ?, email = ? WHERE id_vendedor = ?", [nome, cpf, email, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vendedor não encontrado" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao atualizar vendedor:", err.stack);
    res.status(500).json({ message: "Erro ao atualizar vendedor", error: err });
  }
};

// Deletar um vendedor
const deleteVendedor = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM Vendedores WHERE id_vendedor = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vendedor não encontrado" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao deletar vendedor:", err.stack);
    res.status(500).json({ message: "Erro ao deletar vendedor", error: err });
  }
};

module.exports = {
  getAllVendedores,
  getVendedorById,
  createVendedor,
  updateVendedor,
  deleteVendedor,
};
