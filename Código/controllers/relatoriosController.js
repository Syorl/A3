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


// Relatório dos Produtos Mais Vendidos
const produtosMaisVendidos = async (req, res) => {
  const query = `
    SELECT p.nome, SUM(ped.quantidade) AS total_vendido
    FROM pedidos ped
    JOIN produtos p ON ped.id_produto = p.id_produto
    GROUP BY p.nome
    ORDER BY total_vendido DESC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos mais vendidos", error: err });
  }
};

// Relatório de Produtos Comprados por Cliente
const produtosPorCliente = async (req, res) => {
  const query = `
    SELECT c.nome AS cliente, p.nome AS produto, SUM(ped.quantidade) AS total_comprado
    FROM pedidos ped
    JOIN Clientes c ON ped.id_cliente = c.id_cliente
    JOIN produtos p ON ped.id_produto = p.id_produto
    GROUP BY c.nome, p.nome
    ORDER BY c.nome, total_comprado DESC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de produtos comprados por cliente", error: err });
  }
};

// Relatório de Consumo Médio do Cliente
const consumoMedioCliente = async (req, res) => {
  const query = `
    SELECT c.nome AS cliente, AVG(ped.quantidade) AS consumo_medio
    FROM pedidos ped
    JOIN Clientes c ON ped.id_cliente = c.id_cliente
    GROUP BY c.nome
    ORDER BY consumo_medio DESC;
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err.stack);
    res.status(500).json({ message: "Erro ao gerar o relatório de consumo médio do cliente", error: err });
  }
};

module.exports = {
  produtosBaixoEstoque,
  numeroProdutosPorCategoria,
  produtosMaisVendidos,
  produtosPorCliente,
  consumoMedioCliente
};
