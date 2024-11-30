const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Definir o modelo Produto
const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Produto", // Nome da tabela no banco de dados
    timestamps: false, // Desativa os campos createdAt e updatedAt
  }
);

module.exports = Produto;
