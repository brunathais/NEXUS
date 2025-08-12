// front-end/src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5500;

// serve estático tudo dentro de front-end/src
app.use(express.static(path.join(__dirname)));

// fallback para sua página inicial (ajuste se necessário)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'screen', 'inicial', 'inicial.html'));
});

app.listen(PORT, () => {
  console.log(`Front rodando em http://localhost:${PORT}`);
});
