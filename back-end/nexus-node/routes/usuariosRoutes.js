// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de usuarios funcionando!');
});

module.exports = router;
