# Usar uma imagem oficial do Node.js como base
FROM node:18

# Configurar diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos do projeto para o container
COPY package*.json ./
COPY . .

# Instalar as dependências do projeto
RUN npm install

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]
