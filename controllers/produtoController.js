const pool = require('../db');

// Buscar todos os produtos
const getAllProdutos = async (req, res) => {
  const query = `
  SELECT p.id, p.nome, p.categoria, p.marca, f.nome AS fornecedor, p.quantidade
  FROM Produtos p
  LEFT JOIN fornecedores f ON p.id_fornecedor = f.id_fornecedor
`;
  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.stack);
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};

// Buscar produto por ID
const getProdutoById = async (req, res) => {
  const { id } = req.params; // Utilizando req para obter o ID da rota
  const query = `
    SELECT p.id, p.nome, p.categoria, p.marca, f.nome AS fornecedor, p.quantidade 
    FROM produtos p 
    LEFT JOIN fornecedores f ON p.id_fornecedor = f.id_fornecedor 
    WHERE p.id = ?
  `;
  try {
    const [rows] = await pool.query(query, [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error.stack);
    res.status(500).json({ message: "Erro ao buscar produto", error });
  }
};

// Criar um novo produto
const createProduto = async (req, res) => {
  const { nome, descricao, categoria, marca, modelo, quantidade, valor } = req.body; // Utilizando req para obter os dados do corpo da solicitação
  const query = `
    INSERT INTO produtos (nome, descricao, categoria, marca, modelo, quantidade, valor) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.query(query, [nome, descricao, categoria, marca, modelo, quantidade, valor]);
    res.status(201).json({
      id: result.insertId,
      nome,
      descricao,
      categoria,
      marca,
      modelo,
      quantidade,
      valor,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error.stack);
    res.status(500).json({ message: "Erro ao criar produto", error });
  }
};

// Atualizar um produto
const updateProduto = async (req, res) => {
  const { id } = req.params; // Utilizando req para obter o ID da rota
  const { nome, descricao, categoria, marca, modelo, quantidade, valor } = req.body; // Utilizando req para obter os dados do corpo da solicitação
  const query = `
    UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, marca = ?, modelo = ?, quantidade = ?, valor = ? 
    WHERE id = ?
  `;
  try {
    const [result] = await pool.query(query, [nome, descricao, categoria, marca, modelo, quantidade, valor, id]);
    if (result.affectedRows > 0) {
      res.json({
        id,
        nome,
        descricao,
        categoria,
        marca,
        modelo,
        quantidade,
        valor,
      });
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error.stack);
    res.status(500).json({ message: "Erro ao atualizar produto", error });
  }
};

// Deletar um produto
const deleteProduto = async (req, res) => {
  const { id } = req.params; // Utilizando req para obter o ID da rota
  const query = "DELETE FROM produtos WHERE id = ?";
  try {
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error.stack);
    res.status(500).json({ message: "Erro ao deletar produto", error });
  }
};

// Buscar produtos por critérios de consulta
const consultaProdutos = async (req, res) => {
  const { nome, categoria, marca, fornecedor } = req.query; // Utilizando req para obter os parâmetros de consulta
  let query = `
    SELECT p.id, p.nome, p.categoria, p.marca, f.nome AS fornecedor, p.quantidade 
    FROM produtos p 
    LEFT JOIN fornecedores f ON p.id_fornecedor = f.id_fornecedor 
    WHERE 1=1
  `;
  const params = [];

  if (nome) {
    query += " AND p.nome LIKE ?";
    params.push(`%${nome}%`);
  }
  if (categoria) {
    query += " AND p.categoria LIKE ?";
    params.push(`%${categoria}%`);
  }
  if (marca) {
    query += " AND p.marca LIKE ?";
    params.push(`%${marca}%`);
  }
  if (fornecedor) {
    query += " AND f.nome LIKE ?";
    params.push(`%${fornecedor}%`);
  }

  try {
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.stack);
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
  consultaProdutos
};
