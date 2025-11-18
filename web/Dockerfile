FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os manifests primeiro (cache melhor)
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDependencies, como typescript)
RUN npm install

# Copia o restante do código
COPY . .

# Garante que estamos em modo desenvolvimento (Next dev)
ENV NODE_ENV=development

# Porta padrão do Next (dentro do container)
EXPOSE 3000

# Comando para rodar o Next em modo dev
CMD ["npm", "run", "dev"]
