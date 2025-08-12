// routes/transacoesRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de transacoes funcionando!');
});

module.exports = router;
