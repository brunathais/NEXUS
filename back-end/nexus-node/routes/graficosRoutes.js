// routes/graficosRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de gráficos funcionando!');
});

module.exports = router;
