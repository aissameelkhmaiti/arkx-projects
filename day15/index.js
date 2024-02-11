// Importer les modules nécessaires
const http = require('http');
const url = require('url');
const fs = require('fs').promises;
//importer 
const {
  cities,
  selectRandomCity,
  fetchDataTemperatureByCity,
} = require('../day13/meteo');
 
// Créer le serveur
const server = http.createServer((req, res) => {
  // Étape 1 : Analyser les données de la requête
  
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Étape 2 : Implémenter les gestionnaires de requêtes
  if (path === '/weather') {
    // Gestion de l'endpoint '/users'
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Liste des utilisateurs : Alice, Bob, Charlie');
  }   else {
    // Gestion des endpoints inconnus
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Endpoint non trouvé');
  }
});

// Étape 3 : Démarrer le serveur et écouter sur le port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
