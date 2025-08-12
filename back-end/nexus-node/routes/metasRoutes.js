// routes/metasRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de metas funcionando!');
});

module.exports = router;
