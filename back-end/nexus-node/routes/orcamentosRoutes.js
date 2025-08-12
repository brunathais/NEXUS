// routes/orcamentosRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de orcamentos funcionando!');
});

module.exports = router;
