# HackTrack

HackTrack est une application web permettant de gérer des hackathons, les équipes participantes et les utilisateurs. Elle est construite avec **React**, **React Router**, et **Axios** pour le frontend, et une API backend basée sur **Express.js** et **Prisma**.

## Fonctionnalités

-  Affichage des hackathons à venir et passés.
-  Détails des hackathons avec possibilité de créer ou rejoindre une équipe.
-  Authentification des utilisateurs (inscription, connexion, déconnexion).
-  Gestion des utilisateurs via un contexte global.

## Structure du projet

```
hacktrack/
├── src/
│   ├── api/                # Appels API
│   ├── components/         # Composants réutilisables
│   ├── context/            # Contexte global pour l'authentification
│   ├── pages/              # Pages principales de l'application
│   ├── styles/             # Fichiers CSS
│   ├── App.jsx             # Composant principal
│   ├── main.jsx            # Point d'entrée de l'application
├── vite.config.js          # Configuration de Vite
├── package.json            # Dépendances et scripts
```

## Installation

### Prérequis

-  Node.js
-  npm

### Étapes

1. Clonez le dépôt :

   ```bash
   git clone <repository-url>
   cd hacktrack
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez l'API backend :

   -  Suivez les instructions dans le fichier `README.md` du dossier `hacktrack-api`.

4. Lancez l'application en mode développement :

   ```bash
   npm run dev
   ```

5. Ouvrez votre navigateur à l'adresse suivante :
   ```
   http://localhost:5173
   ```

## Dépendances principales

-  **React** : Bibliothèque pour construire l'interface utilisateur.
-  **React Router** : Gestion des routes.
-  **Axios** : Appels HTTP vers l'API backend.
-  **Zod** : Validation des formulaires.
