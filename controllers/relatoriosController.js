const db = require('../db'); // Conexão com o banco de dados

// Produtos abaixo do estoque mínimo
const produtosBaixoEstoque = async (req, res) => {
  const query = `
    SELECT nome, quantidade AS estoque
    FROM produtos
    WHERE quantidade <= 10
    ORDER BY quantidade ASC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos abaixo do estoque", error: err });
  }
};

// Número de produtos por categoria
const numeroProdutosPorCategoria = async (req, res) => {
  const query = `
    SELECT categoria, COUNT(*) AS total_produtos
    FROM produtos
    GROUP BY categoria
    ORDER BY total_produtos DESC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos por categoria", error: err });
  }
};

// Número de produtos por fornecedor
const numeroProdutosPorFornecedor = async (req, res) => {
  const query = `
    SELECT f.nome AS fornecedor, COUNT(p.id_produto) AS total_produtos
    FROM Fornecedores f
    JOIN produtos p ON f.id_fornecedor = p.id_fornecedor
    GROUP BY f.nome
    ORDER BY total_produtos DESC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de número de produtos por fornecedor", error: err });
  }
};

module.exports = {
  produtosBaixoEstoque,
  numeroProdutosPorCategoria,
  numeroProdutosPorFornecedor
};
