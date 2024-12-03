const db = require('../db'); // Conexão com o banco

// Função: Buscar todos os produtos
const getAllProdutos = (req, res) => {
  const query = `
    SELECT p.id, p.nome, p.categoria, p.marca, f.nome AS fornecedor, p.quantidade 
    FROM Produtos p 
    LEFT JOIN Fornecedores f ON p.id_fornecedor = f.id_fornecedor
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    } else {
      res.json(results);
    }
  });
};

// Função: Buscar produto por ID
const getProdutoById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.id, p.nome, p.categoria, p.marca, f.nome AS fornecedor, p.quantidade 
    FROM Produtos p 
    LEFT JOIN Fornecedores f ON p.id_fornecedor = f.id_fornecedor 
    WHERE p.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar produto' });
    } else {
      res.json(results[0] || {});
    }
  });
};

// Função: Buscar produtos por critérios de consulta
const consultaProdutos = (req, res) => {
  const { nome, categoria, marca, fornecedor } = req.query;
  let query = `
    SELECT p.id, p.nome, p.categoria, p.marca, f.nome AS fornecedor, p.quantidade 
    FROM Produtos p 
    LEFT JOIN Fornecedores f ON p.id_fornecedor = f.id_fornecedor 
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

  db.query(query, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    } else {
      res.json(results);
    }
  });
};

// Função: Gerar relatório de produtos
const gerarRelatorio = async (req, res) => {
  try {
    // Relatório de produtos mais vendidos
    const [bestSellingProducts] = await db.query(`
      SELECT p.nome, SUM(v.quantidade) AS vendas
      FROM vendas v
      JOIN produtos p ON v.produto_id = p.id
      GROUP BY p.nome
      ORDER BY vendas DESC
      LIMIT 10
    `);

    // Relatório de produto por cliente
    const [productByCustomer] = await db.query(`
      SELECT c.nome AS cliente, p.nome AS produto, SUM(v.quantidade) AS quantidade
      FROM vendas v
      JOIN clientes c ON v.cliente_id = c.id
      JOIN produtos p ON v.produto_id = p.id
      GROUP BY c.nome, p.nome
      ORDER BY quantidade DESC
    `);

    // Consumo médio por cliente
    const [avgConsumption] = await db.query(`
      SELECT c.nome AS cliente, AVG(v.quantidade) AS consumoMedio
      FROM vendas v
      JOIN clientes c ON v.cliente_id = c.id
      GROUP BY c.nome
      ORDER BY consumoMedio DESC
    `);

    // Produtos com baixo estoque
    const [lowStockProducts] = await db.query(`
      SELECT nome, quantidade AS estoque
      FROM produtos
      WHERE quantidade < 50
      ORDER BY quantidade ASC
    `);

    // Enviar dados como JSON
    res.json({
      bestSellingProducts,
      productByCustomer,
      avgConsumption,
      lowStockProducts
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório.' });
  }
};

// Exportação consolidada
module.exports = {
  getAllProdutos,
  getProdutoById,
  consultaProdutos,
  gerarRelatorio
};
