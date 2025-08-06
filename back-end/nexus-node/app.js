const express = require('express');
const app = express();

// Importando as rotas
const cadastrosRoutes = require('./routes/cadastrosRoutes');
const graficosRoutes = require('./routes/graficosRoutes');
const metasRoutes = require('./routes/metasRoutes');
const orcamentosRoutes = require('./routes/orcamentosRoutes');
const transacoesRoutes = require('./routes/transacoesRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// Usando as rotas
app.use('/cadastros', cadastrosRoutes);
app.use('/graficos', graficosRoutes);
app.use('/metas', metasRoutes);
app.use('/orcamentos', orcamentosRoutes);
app.use('/transacoes', transacoesRoutes);
app.use('/usuarios', usuariosRoutes);

app.listen(3000, () => {
  console.log('Servidor Node rodando na porta 3000');
});
