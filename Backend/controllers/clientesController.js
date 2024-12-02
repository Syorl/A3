const db = require("../models/db");

// Função para adicionar um cliente
exports.addCliente = async (req, res) => {
  const { nome, cpf, endereco, email } = req.body;
  try {
    const [result] = await db.execute("INSERT INTO clientes (nome, cpf, endereco, email) VALUES (?, ?, ?, ?)", [nome, cpf, endereco, email]);
    res.status(200).json({ message: "Cliente adicionado com sucesso", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar cliente" });
  }
};

// Função para obter todos os clientes
exports.getClientes = async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM clientes");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter clientes" });
  }
};

// Função para atualizar um cliente
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, endereco, email } = req.body;
  try {
    await db.execute("UPDATE clientes SET nome = ?, cpf = ?, endereco = ?, email = ? WHERE Id_Clie = ?", [nome, cpf, endereco, email, id]);
    res.status(200).json({ message: "Cliente atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
};

// Função para deletar um cliente
exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM clientes WHERE Id_Clie = ?", [id]);
    res.status(200).json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
};
