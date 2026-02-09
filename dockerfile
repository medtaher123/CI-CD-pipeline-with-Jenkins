# On part d'une version légère de Node.js
FROM node:18-alpine

# On crée le dossier de travail dans le conteneur
WORKDIR /app

# On copie d'abord les dépendances (pour optimiser le cache Docker)
COPY package.json ./

# On installe les librairies
RUN npm install

# On copie le reste du code
COPY . .

# On expose le port 3000
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]

