
// Cadastrar um novo produto
async function cadastrarProduto(req, res) {
    try {
        // Validação dos dados do corpo da requisição
        const {
            nome,
            descricao,
            categoria,
            marca,
            modelo,
            especificacoes,
            id_fornecedor,
            quantidade,
            valor
        } = req.body;

        if (!nome || !descricao || !categoria || !marca || !modelo || !id_fornecedor || !quantidade || !valor) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }

        // Verificação do fornecedor (garantir que existe no banco)
        const fornecedorQuery = 'SELECT * FROM Fornecedores WHERE id_fornecedor = ?';
        const [fornecedor] = await pool.query(fornecedorQuery, [id_fornecedor]);

        if (fornecedor.length === 0) {
            return res.status(400).json({ error: 'Fornecedor inválido.' });
        }

        // Query para inserir o novo produto
        const sql = `
            INSERT INTO Produtos (
                nome, descricao, categoria, marca, modelo, especificacoes,
                id_fornecedor, quantidade, valor, data_entrada
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        const result = await pool.query(sql, [
            nome, descricao, categoria, marca, modelo, especificacoes,
            id_fornecedor, quantidade, valor
        ]);

        // Retorno de sucesso
        res.status(201).json({ message: 'Produto cadastrado com sucesso!', produtoId: result.insertId });
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error); // Log completo com o stack
        res.status(500).json({ error: 'Erro ao cadastrar produto.' });
    }
}

async function listarProdutos(req, res) {
    try {
        const sql = `SELECT * FROM Produtos`;
        const [rows] = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar produtos:', error.message);
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
}
