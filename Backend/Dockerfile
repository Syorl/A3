# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (se houver) para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos do projeto
COPY . .

# Exponha a porta em que o servidor Node vai rodar
EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "app.js"]
