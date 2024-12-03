const db = require("../db");

// Produtos mais vendidos
const getBestSellingProducts = async () => {
  const query = "SELECT * FROM view_produtos_mais_vendidos";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Produto por cliente
const getProductByCustomer = async () => {
  const query = "SELECT * FROM view_produto_por_cliente";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Consumo médio por cliente
const getAvgConsumption = async () => {
  const query = "SELECT * FROM view_consumo_medio_cliente";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Produtos com baixo estoque
const getLowStockProducts = async () => {
  const query = "SELECT * FROM view_produtos_baixo_estoque";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getBestSellingProducts,
  getProductByCustomer,
  getAvgConsumption,
  getLowStockProducts
};
