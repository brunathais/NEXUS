document.addEventListener('DOMContentLoaded', () => {
    const div = document.getElementById('conteudo');
    div.innerHTML = '<p>Funcionalidade básica carregada.</p>';
});

const lista = document.getElementById('listaAlertas');
const alertas = [
  "Você já gastou 80% do orçamento em Alimentação.",
  "Sua conta de Luz ultrapassou o previsto."
];

alertas.forEach(alerta => {
  const li = document.createElement('li');
  li.textContent = alerta;
  lista.appendChild(li);
});
