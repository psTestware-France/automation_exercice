const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3030;

// Fonction pour servir les fichiers statiques
function serveStaticFile(response, filePath, contentType, statusCode = 200) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Erreur interne du serveur');
    } else {
      response.writeHead(statusCode, { 'Content-Type': contentType });
      response.end(content);
    }
  });
}

// Créer le serveur HTTP
const server = http.createServer((request, response) => {
  let filePath = '.' + request.url;

  // Si l'URL se termine par "/", ajouter "index.html" à la fin
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Déterminer le type de contenu en fonction de l'extension du fichier
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
  }

  // Servir le fichier statique
  serveStaticFile(response, filePath, contentType);
});

// Démarrer le serveur
server.listen(port, () => {
  console.log(`Le serveur est en écoute sur http://localhost:${port}`);
});
