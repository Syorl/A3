const db = require('../db'); // Conexão com o banco de dados

// Função para registrar movimentação de estoque
exports.registrarMovimentacao = (req, res) => {
  const { id_produto, tipo_movimentacao, quantidade, valor, responsavel } = req.body;

  const query = `
    INSERT INTO movimentacoes (id_produto, tipo_movimentacao, quantidade, valor, responsavel)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [id_produto, tipo_movimentacao, quantidade, valor, responsavel], (err, result) => {
    if (err) {
      console.error("Erro ao registrar movimentação:", err);
      return res.status(500).json({ message: "Erro ao registrar movimentação", error: err });
    }
    res.status(200).json({ message: "Movimentação registrada com sucesso" });
  });
};
