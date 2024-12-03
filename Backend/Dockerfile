FROM node:16

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos restantes para o container
COPY . .

# Exponha a porta que o aplicativo usa
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "app.js"]
