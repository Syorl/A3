const db = require('../db');

exports.cadastrarProduto = (req, res) => {
  console.log("Dados recebidos para cadastro:", req.body);

  const { name, description, category, brand, model, specs, supplier, value } = req.body;

  const query = `
    INSERT INTO produtos (nome, descricao, categoria, marca, modelo, especificacoes, fornecedor, preco)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description, category, brand, model, specs, supplier, value], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar produto:", err);
      return res.status(500).json({ message: "Erro ao cadastrar produto", error: err });
    }
    res.status(200).json({ message: "Produto cadastrado com sucesso" });
  });
};
