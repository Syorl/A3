-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS mysqlloja;
USE mysqlloja;


-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL
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

CREATE TABLE pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_vendedor INT NOT NULL,
  id_produto INT NOT NULL,
  quantidade INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
  FOREIGN KEY (id_vendedor) REFERENCES Vendedores(id_vendedor),
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

--Relatório dos Produtos Mais Vendidos

SELECT p.nome, SUM(ped.quantidade) AS total_vendido
FROM pedidos ped
JOIN produtos p ON ped.id_produto = p.id_produto
GROUP BY p.nome
ORDER BY total_vendido DESC;

--Relatório de Produtos Comprados por Cliente

SELECT c.nome AS cliente, p.nome AS produto, SUM(ped.quantidade) AS total_comprado
FROM pedidos ped
JOIN Clientes c ON ped.id_cliente = c.id_cliente
JOIN produtos p ON ped.id_produto = p.id_produto
GROUP BY c.nome, p.nome
ORDER BY c.nome, total_comprado DESC;

--Relatório de Consumo Médio do Cliente
SELECT c.nome AS cliente, AVG(ped.quantidade) AS consumo_medio
FROM pedidos ped
JOIN Clientes c ON ped.id_cliente = c.id_cliente
GROUP BY c.nome
ORDER BY consumo_medio DESC;

--Relatório de Produtos com Baixo Estoque
SELECT nome, quantidade
FROM produtos
WHERE quantidade <= 5 -- Defina o valor mínimo de estoque conforme necessário
ORDER BY quantidade ASC;


-- Inserir produtos de tecnologia
INSERT IGNORE INTO produtos (id_produto, nome, descricao, categoria, marca, modelo, quantidade, valor)
VALUES
('1','Notebook Gamer', 'Notebook com alta performance para jogos', 'Informática', 'Dell', 'G5 5590', 10, 5500.00),
('2','Memória RAM 8GB', 'Memória RAM DDR4 8GB', 'Hardware', 'Corsair', 'Vengeance LPX', 20, 350.00),
('3','PC Desktop', 'Computador desktop para uso geral', 'Informática', 'HP', 'Pavilion', 15, 2500.00),
('4','Monitor 24"', 'Monitor LED 24 polegadas Full HD', 'Periféricos', 'Samsung', 'T35F', 25, 800.00),
('5','Smartphone', 'Smartphone com tela de 6.5 polegadas', 'Eletrônicos', 'Apple', 'iPhone 13', 5, 4000.00);

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
