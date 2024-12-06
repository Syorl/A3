const db = require('../db'); // Conexão com o banco de dados

// Função para gerar o relatório de produtos mais vendidos
const produtosMaisVendidos = async (req, res) => {
  const query = `
    SELECT p.nome, SUM(m.quantidade) AS vendas
    FROM Movimentacoes m
    JOIN produtos p ON m.id_produto = p.id
    WHERE m.tipo_movimentacao = 'saida'
    GROUP BY p.nome
    ORDER BY vendas DESC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos mais vendidos", error: err });
  }
};

// Função para gerar o relatório de produtos com baixo estoque
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
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos com baixo estoque", error: err });
  }
};

// Função para gerar o relatório de consumo médio do cliente
const consumoMedioCliente = async (req, res) => {
  const query = `
    SELECT c.nome AS cliente, AVG(m.quantidade) AS consumo_medio
    FROM Movimentacoes m
    JOIN Pedidos pe ON m.id_produto = pe.id_produto
    JOIN Clientes c ON pe.id_cliente = c.id_cliente
    GROUP BY c.nome
    ORDER BY c.nome;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de consumo médio do cliente", error: err });
  }
};

// Função para gerar o relatório de produto por cliente
const produtoPorCliente = async (req, res) => {
  const query = `
    SELECT c.nome AS cliente, p.nome AS produto, SUM(m.quantidade) AS quantidade
    FROM Movimentacoes m
    JOIN Pedidos pe ON m.id_produto = pe.id_produto
    JOIN Clientes c ON pe.id_cliente = c.id_cliente
    JOIN produtos p ON m.id_produto = p.id
    GROUP BY c.nome, p.nome
    ORDER BY c.nome;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos por cliente", error: err });
  }
};

module.exports = {
  produtosMaisVendidos,
  produtosBaixoEstoque,
  consumoMedioCliente,
  produtoPorCliente
};
