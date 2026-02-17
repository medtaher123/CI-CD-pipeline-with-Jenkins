const express = require('express');
const app = express();
const port = 3000;

const excuses = [
    "C'est pas un bug, c'est une feature non documentée.",
    "Ça marchait sur ma machine !",
    "C'est surement un problème de DNS.",
    "Le stagiaire a touché au serveur.",
    "J'ai pas touché à ce module depuis 6 mois.",
    "C'est un problème de cache, videz-le et réessayez.",
    "C'est un problème de permissions, je vais vérifier ça.",
    "C'est un problème de réseau, je vais vérifier la connexion.",
    "Je suis sûr que c'était pas comme ça hier.",
    "C'est un problème de version, je vais vérifier les dépendances."
];

app.get('/', (req, res) => {
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    res.json({ 
        app: "Générateur d'Excuses 3000",
        message: randomExcuse,
        version: "1.0"
    });
});

const server = app.listen(port, () => {
    console.log(`L'application critique tourne sur le port ${port}`);
});

// Export pour les tests
module.exports = server;