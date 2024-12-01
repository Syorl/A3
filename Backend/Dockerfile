# Usando a imagem oficial do Node.js como base
FROM node:16

# Definindo o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiando o package.json e o package-lock.json (se houver) para o container
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o resto dos arquivos do projeto
COPY . .

# Expondo a porta em que o servidor Node vai rodar
EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "app.js"]
