// backend/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Importação das rotas
const clientesRouter = require('./routes/clientes');
const vendedoresRouter = require('./routes/vendedores');
const estoqueRouter = require('./routes/estoque');
const vendasRouter = require('./routes/vendas');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/clientes', clientesRouter);
app.use('/vendedores', vendedoresRouter);
app.use('/estoque', estoqueRouter);
app.use('/vendas', vendasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
