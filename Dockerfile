# Utilise l'image officielle Node.js 14 comme base
FROM node:14

# Crée un répertoire de travail dans l'image
WORKDIR /usr/src/app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Expose le port 3000 (le port sur lequel votre application s'exécute)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
