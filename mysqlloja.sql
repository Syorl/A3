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

-- Consulta para produtos abaixo do estoque mínimo
SELECT nome, quantidade AS estoque
FROM produtos
WHERE quantidade <= 10 -- Produtos com estoque menor ou igual a 10
ORDER BY quantidade ASC; -- Ordenados por quantidade em ordem crescente

-- Consulta para contar número de produtos por categoria
SELECT categoria, COUNT(*) AS total_produtos
FROM produtos
GROUP BY categoria -- Agrupa por categoria
ORDER BY total_produtos DESC; -- Ordena pelo total em ordem decrescente

-- Consulta para contar número de produtos por fornecedor
SELECT f.nome AS fornecedor, COUNT(p.id_produto) AS total_produtos
FROM Fornecedores f
JOIN produtos p ON f.id_fornecedor = p.id_fornecedor -- Relaciona produtos com fornecedores
GROUP BY f.nome -- Agrupa por nome do fornecedor
ORDER BY total_produtos DESC; -- Ordena pelo total em ordem decrescente


-- Inserir fornecedores fictícios
INSERT IGNORE INTO Fornecedores (nome, cnpj, endereco)
VALUES
('TechVantage', '11.222.333/0001-44', 'Rua Alfa, 100'),
('GigaBytes', '22.333.444/0001-55', 'Rua Beta, 200'),
('ProCircuit', '33.444.555/0001-66', 'Rua Gama, 300'),
('SmartSolutions', '44.555.666/0001-77', 'Rua Delta, 400'),
('OptiGear', '55.666.777/0001-88', 'Rua Épsilon, 500');

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
