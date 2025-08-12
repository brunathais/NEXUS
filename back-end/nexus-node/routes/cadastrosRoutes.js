// routes/cadastrosRoutes.js
const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.send('Cadastro funcionando');
});

module.exports = router;
