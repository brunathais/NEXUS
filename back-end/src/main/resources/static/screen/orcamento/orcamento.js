document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formOrcamento');

  /**
   * Carrega os valores salvos no localStorage e preenche o formulário.
   */
  function carregarOrcamento() {
    const orcamento = JSON.parse(localStorage.getItem('orcamento')) || {};
    form.essenciais.value = orcamento.essenciais ?? 0;
    form.naoEssenciais.value = orcamento.naoEssenciais ?? 0;
    form.imprevistos.value = orcamento.imprevistos ?? 0;
    form.reservaEmergencia.value = orcamento.reservaEmergencia ?? 0;
  }

  
function salvarOrcamento(event) {
  event.preventDefault();

  const orcamento = {
    essenciais: parseFloat(form.essenciais.value) || 0,
    naoEssenciais: parseFloat(form.naoEssenciais.value) || 0,
    imprevistos: parseFloat(form.imprevistos.value) || 0,
    reservaEmergencia: parseFloat(form.reservaEmergencia.value) || 0
  };

  localStorage.setItem('orcamento', JSON.stringify(orcamento));
  alert('Orçamento salvo com sucesso!');
  
  exibirOrcamentoSalvo(); // atualiza o display
}


  /**
 * Exibe o orçamento salvo no localStorage na página
 */
function exibirOrcamentoSalvo() {
  const dadosDiv = document.getElementById('dadosOrcamento');
  const orcamento = JSON.parse(localStorage.getItem('orcamento'));

  if (!orcamento) {
    dadosDiv.innerHTML = "<p>Nenhum orçamento salvo ainda.</p>";
    return;
  }

  dadosDiv.innerHTML = `
    <ul>
      <li><strong>Essenciais:</strong> R$ ${orcamento.essenciais.toFixed(2)}</li>
      <li><strong>Não Essenciais:</strong> R$ ${orcamento.naoEssenciais.toFixed(2)}</li>
      <li><strong>Imprevistos:</strong> R$ ${orcamento.imprevistos.toFixed(2)}</li>
      <li><strong>Reserva de Emergência:</strong> R$ ${orcamento.reservaEmergencia.toFixed(2)}</li>
    </ul>
  `;
}


  // Eventos
  form.addEventListener('submit', salvarOrcamento);

  exibirOrcamentoSalvo();
  // Inicializa com dados salvos
  carregarOrcamento();

  
});
