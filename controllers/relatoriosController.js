const db = require("../db"); // Conexão com o banco de dados

// Função para gerar o relatório de produtos mais vendidos
const produtosMaisVendidos = (req, res) => {
  const query = `
    SELECT p.nome, SUM(m.quantidade) AS vendas
    FROM Movimentacoes m
    JOIN Produtos p ON m.id_produto = p.id
    WHERE m.tipo_movimentacao = 'saida'
    GROUP BY p.nome
    ORDER BY vendas DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err.stack);
      return res.status(500).send("Erro ao gerar o relatório");
    }
    res.json(results);
  });
};

// Função para gerar o relatório de produtos com baixo estoque
const produtosBaixoEstoque = (req, res) => {
  const query = `
    SELECT nome, quantidade AS estoque
    FROM Produtos
    WHERE quantidade <= 10
    ORDER BY quantidade ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err.stack);
      return res.status(500).send("Erro ao gerar o relatório");
    }
    res.json(results);
  });
};

// Função para gerar o relatório de consumo médio do cliente
const consumoMedioCliente = (req, res) => {
  const query = `
    SELECT c.nome AS cliente, AVG(m.quantidade) AS consumo_medio
    FROM Movimentacoes m
    JOIN Pedidos pe ON m.id_produto = pe.id_produto
    JOIN Clientes c ON pe.id_cliente = c.id_cliente
    GROUP BY c.nome
    ORDER BY c.nome;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err.stack);
      return res.status(500).send("Erro ao gerar o relatório");
    }
    res.json(results);
  });
};

// Função para gerar o relatório de produto por cliente
const produtoPorCliente = (req, res) => {
  const query = `
    SELECT c.nome AS cliente, p.nome AS produto, SUM(m.quantidade) AS quantidade
    FROM Movimentacoes m
    JOIN Pedidos pe ON m.id_produto = pe.id_produto
    JOIN Clientes c ON pe.id_cliente = c.id_cliente
    JOIN Produtos p ON m.id_produto = p.id
    GROUP BY c.nome, p.nome
    ORDER BY c.nome;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err.stack);
      return res.status(500).send("Erro ao gerar o relatório");
    }
    res.json(results);
  });
};

module.exports = {
  produtosMaisVendidos,
  produtosBaixoEstoque,
  consumoMedioCliente,
  produtoPorCliente
};
