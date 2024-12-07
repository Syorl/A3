const pool = require('../db');

// Buscar todos os pedidos
const getAllPedidos = async (req, res) => {
  const query = `
    SELECT p.id_pedido, c.nome AS cliente, v.nome AS vendedor, pr.nome AS produto, p.quantidade, p.valor, p.id_cliente, p.id_produto, p.id_vendedor
    FROM pedidos p
    JOIN Clientes c ON p.id_cliente = c.id_cliente
    JOIN Vendedores v ON p.id_vendedor = v.id_vendedor
    JOIN produtos pr ON p.id_produto = pr.id_produto
  `;
  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.stack);
    res.status(500).json({ message: "Erro ao buscar pedidos", error });
  }
};

// Criar um novo pedido
const createPedido = async (req, res) => {
  const { id_cliente, id_vendedor, id_produto, quantidade, valor } = req.body;
  const query = `
    INSERT INTO pedidos (id_cliente, id_vendedor, id_produto, quantidade, valor)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.query(query, [id_cliente, id_vendedor, id_produto, quantidade, valor]);
    res.status(201).json({
      id_pedido: result.insertId,
      id_cliente,
      id_vendedor,
      id_produto,
      quantidade,
      valor
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error.stack);
    res.status(500).json({ message: "Erro ao criar pedido", error });
  }
};

// Atualizar um pedido
const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_vendedor, id_produto, quantidade, valor } = req.body;
  const query = `
    UPDATE pedidos 
    SET quantidade = ?, valor = ? 
    WHERE id_pedido = ?
  `;
  try {
    const [result] = await pool.query(query, [ quantidade, valor, id]);
    if (result.affectedRows > 0) {
      res.json({ id_pedido: id, id_cliente, id_vendedor, id_produto, quantidade, valor });
    } else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error.stack);
    res.status(500).json({ message: "Erro ao atualizar pedido", error });
  }
};

// Deletar um pedido
const deletePedido = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM pedidos WHERE id_pedido = ?";
  try {
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar pedido:", error.stack);
    res.status(500).json({ message: "Erro ao deletar pedido", error });
  }
};

module.exports = {
  getAllPedidos,
  createPedido,
  updatePedido,
  deletePedido
};
