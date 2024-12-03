const db = require("../db"); // Conexão com o banco

// Buscar todos os produtos no estoque
const getAllProdutos = (req, res) => {
  const query = "SELECT * FROM Produtos WHERE quantidade > 0";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar produtos no estoque" });
    } else {
      res.json(results);
    }
  });
};

// Buscar produto por ID no estoque
const getProdutoById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Produtos WHERE id = ? AND quantidade > 0";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar produto" });
    } else {
      res.json(results[0] || {});
    }
  });
};

// Criar um novo produto
const createProduto = (req, res) => {
  const { nome, descricao, categoria, marca, modelo, especificacoes, id_fornecedor } = req.body;
  const query = "INSERT INTO Produtos (nome, descricao, categoria, marca, modelo, especificacoes, id_fornecedor) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [nome, descricao, categoria, marca, modelo, especificacoes, id_fornecedor], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao criar produto" });
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
};

// Atualizar um produto
const updateProduto = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, marca, modelo, especificacoes, id_fornecedor } = req.body;
  const query = "UPDATE Produtos SET nome = ?, descricao = ?, categoria = ?, marca = ?, modelo = ?, especificacoes = ?, id_fornecedor = ? WHERE id = ?";
  db.query(query, [nome, descricao, categoria, marca, modelo, especificacoes, id_fornecedor, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao atualizar produto" });
    } else {
      res.sendStatus(200);
    }
  });
};

// Deletar um produto
const deleteProduto = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Produtos WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao deletar produto" });
    } else {
      res.sendStatus(200);
    }
  });
};

// Registrar movimentação de estoque
const registerMovimentacao = (req, res) => {
  const { id_produto, tipo_movimentacao, quantidade, valor, responsavel } = req.body;
  let queryUpdate, queryInsertMovimentacao;

  if (tipo_movimentacao === 'entrada') {
    queryUpdate = "UPDATE Produtos SET quantidade = quantidade + ?, valor = ? WHERE id = ?";
  } else if (tipo_movimentacao === 'saida') {
    queryUpdate = "UPDATE Produtos SET quantidade = quantidade - ?, valor = ? WHERE id = ?";
  }

  db.query(queryUpdate, [quantidade, valor, id_produto], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao atualizar quantidade do produto" });
    } else {
      queryInsertMovimentacao = "INSERT INTO Movimentacoes (id_produto, tipo_movimentacao, quantidade, valor, responsavel) VALUES (?, ?, ?, ?, ?)";
      db.query(queryInsertMovimentacao, [id_produto, tipo_movimentacao, quantidade, valor, responsavel], (err) => {
        if (err) {
          res.status(500).json({ error: "Erro ao registrar movimentação" });
        } else {
          res.status(201).json({ message: "Movimentação registrada com sucesso" });
        }
      });
    }
  });
};

module.exports = { getAllProdutos, getProdutoById, createProduto, updateProduto, deleteProduto, registerMovimentacao };
