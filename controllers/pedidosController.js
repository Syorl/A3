const db = require('../db'); // Conexão com o banco

// Buscar todos os pedidos
const getAllPedidos = (req, res) => {
  const query = `
    SELECT p.id_pedido, c.nome AS cliente, v.nome AS vendedor, pr.nome AS produto, p.quantidade, p.valor
    FROM Pedidos p
    JOIN Clientes c ON p.id_cliente = c.id_cliente
    JOIN Vendedores v ON p.id_vendedor = v.id_vendedor
    JOIN Produtos pr ON p.id_produto = pr.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar pedidos' });
    } else {
      res.json(results);
    }
  });
};

// Buscar pedido por ID
const getPedidoById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.id_pedido, c.nome AS cliente, v.nome AS vendedor, pr.nome AS produto, p.quantidade, p.valor
    FROM Pedidos p
    JOIN Clientes c ON p.id_cliente = c.id_cliente
    JOIN Vendedores v ON p.id_vendedor = v.id_vendedor
    JOIN Produtos pr ON p.id_produto = pr.id
    WHERE p.id_pedido = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar pedido' });
    } else {
      res.json(results[0] || {});
    }
  });
};

// Criar um novo pedido
const createPedido = (req, res) => {
  const { id_cliente, id_vendedor, id_produto, quantidade, valor } = req.body;
  const query = 'INSERT INTO Pedidos (id_cliente, id_vendedor, id_produto, quantidade, valor) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id_cliente, id_vendedor, id_produto, quantidade, valor], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar pedido' });
    } else {
      res.status(201).json({ id_pedido: result.insertId });
    }
  });
};

// Atualizar um pedido
const updatePedido = (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_vendedor, id_produto, quantidade, valor } = req.body;
  const query = 'UPDATE Pedidos SET id_cliente = ?, id_vendedor = ?, id_produto = ?, quantidade = ?, valor = ? WHERE id_pedido = ?';
  db.query(query, [id_cliente, id_vendedor, id_produto, quantidade, valor, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar pedido' });
    } else {
      res.sendStatus(200);
    }
  });
};

// Deletar um pedido
const deletePedido = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Pedidos WHERE id_pedido = ?';
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar pedido' });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};
