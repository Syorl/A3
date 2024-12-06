-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS mysqlloja;
USE mysqlloja;

-- Tabela de Fornecedores
CREATE TABLE IF NOT EXISTS Fornecedores (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    endereco VARCHAR(200)
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS Produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    id_fornecedor INT NOT NULL,
    FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id_fornecedor) ON DELETE CASCADE
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    endereco VARCHAR(200),
    email VARCHAR(100)
);

-- Tabela de Vendedores
CREATE TABLE IF NOT EXISTS Vendedores (
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_vendedor INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_vendedor) REFERENCES Vendedores(id_vendedor) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto) ON DELETE CASCADE
);

-- Tabela de Movimentações
CREATE TABLE IF NOT EXISTS Movimentacoes (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    tipo_movimentacao ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    valor DECIMAL(10, 2),
    responsavel VARCHAR(100),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto) ON DELETE CASCADE
);

-- Inserir fornecedores fictícios
INSERT IGNORE INTO Fornecedores (nome, cnpj, endereco)
VALUES
('TechVantage', '11.222.333/0001-44', 'Rua Alfa, 100'),
('GigaBytes', '22.333.444/0001-55', 'Rua Beta, 200'),
('ProCircuit', '33.444.555/0001-66', 'Rua Gama, 300'),
('SmartSolutions', '44.555.666/0001-77', 'Rua Delta, 400'),
('OptiGear', '55.666.777/0001-88', 'Rua Épsilon, 500');

-- Inserir produtos de tecnologia
INSERT IGNORE INTO Produtos (nome, descricao, categoria, marca, modelo, quantidade, valor, id_fornecedor)
VALUES
('Notebook Gamer', 'Notebook com alta performance para jogos', 'Informática', 'Dell', 'G5 5590', 10, 5500.00, 1),
('Memória RAM 8GB', 'Memória RAM DDR4 8GB', 'Hardware', 'Corsair', 'Vengeance LPX', 20, 350.00, 2),
('PC Desktop', 'Computador desktop para uso geral', 'Informática', 'HP', 'Pavilion', 15, 2500.00, 3),
('Monitor 24"', 'Monitor LED 24 polegadas Full HD', 'Periféricos', 'Samsung', 'T35F', 25, 800.00, 4),
('Smartphone', 'Smartphone com tela de 6.5 polegadas', 'Eletrônicos', 'Apple', 'iPhone 13', 5, 4000.00, 5);

-- Inserir clientes
INSERT IGNORE INTO Clientes (nome, cpf, endereco, email)
VALUES
('Ana Silva', '123.456.789-00', 'Rua A, 123', 'ana.silva@example.com'),
('Bruno Santos', '234.567.890-00', 'Avenida B, 456', 'bruno.santos@example.com'),
('Carla Oliveira', '345.678.901-00', 'Travessa C, 789', 'carla.oliveira@example.com'),
('Daniel Pereira', '456.789.012-00', 'Praça D, 101', 'daniel.pereira@example.com'),
('Eva Costa', '567.890.123-00', 'Largo E, 202', 'eva.costa@example.com');

-- Inserir vendedores
INSERT IGNORE INTO Vendedores (nome, cpf, email)
VALUES
('Fernanda Lima', '678.901.234-00', 'fernanda.lima@example.com'),
('Gabriel Souza', '789.012.345-00', 'gabriel.souza@example.com');

-- Inserir movimentações
INSERT IGNORE INTO Movimentacoes (id_produto, tipo_movimentacao, quantidade, valor, responsavel)
VALUES
(1, 'entrada', 10, 5500.00, 'João Mendes'),
(2, 'saida', 5, 1750.00, 'Maria Costa'),
(3, 'entrada', 15, 3750.00, 'Lucas Oliveira'),
(4, 'saida', 7, 5600.00, 'Raquel Lima'),
(5, 'entrada', 5, 20000.00, 'Paulo Silva');

-- Inserir pedidos
INSERT IGNORE INTO Pedidos (id_cliente, id_vendedor, id_produto, quantidade)
VALUES
(1, 1, 1, 2),
(2, 2, 2, 1),
(3, 1, 3, 5),
(4, 2, 4, 3),
(5, 1, 5, 4);
