# Utilisation de l'image Node.js officielle
FROM node:lts-alpine

# Installation de Python
RUN apk add --no-cache python3

# Création du répertoire de travail dans l'image
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour gérer les dépendances
COPY package*.json ./

# Supprimer les dépendances natives et reconstruire
RUN rm -rf node_modules
RUN rm -rf ~/.npm
RUN npm install

# Copie du reste des fichiers de l'application
COPY . .

# Exposition du port sur lequel l'application écoute
EXPOSE 8888

# Commande pour démarrer l'application
CMD ["npm", "start"]
