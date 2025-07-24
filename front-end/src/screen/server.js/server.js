// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Caminho da pasta a ser servida
const pastaPublica = path.join(__dirname);

// Servir os arquivos estáticos
app.use(express.static(pastaPublica));

// Rota padrão
app.get('*', (req, res) => {
  res.sendFile(path.join(pastaPublica, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
