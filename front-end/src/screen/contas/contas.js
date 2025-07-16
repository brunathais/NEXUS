document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formConta');
  const tabelaBody = document.querySelector('#tabelaContas tbody');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nomeConta = document.getElementById('nomeConta').value.trim();
    const codigoBoleto = document.getElementById('codigoBoleto').value.trim();
    const valorConta = parseFloat(document.getElementById('valorConta').value);
    const dataVencimento = document.getElementById('dataVencimento').value;

    if (!nomeConta) {
      alert('Por favor, insira o nome da conta.');
      return;
    }

    if (isNaN(valorConta) || valorConta <= 0) {
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }

    if (!dataVencimento) {
      alert('Por favor, selecione a data de vencimento.');
      return;
    }

    const ano = new Date(dataVencimento).getFullYear();
    if (ano < 1900 || ano > 2100) {
      alert('Por favor, insira uma data de vencimento com ano válido (4 dígitos).');
      return;
    }

    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const dataVenc = new Date(dataVencimento);

    const diffTime = dataVenc - hoje;
    const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status;
    let classeLinha;
    if (diffDias < 0) {
      status = 'Vencido';
      classeLinha = 'vencido';
    } else if (diffDias <= 7) {
      status = 'Quase vencendo';
      classeLinha = 'vencendo';
    } else {
      status = 'Em aberto';
      classeLinha = 'emaberto';
    }

    // Cria nova linha na tabela e adiciona a classe
    const novaLinha = tabelaBody.insertRow();
    novaLinha.classList.add(classeLinha);

    const celulaNome = novaLinha.insertCell(0);
    const celulaValor = novaLinha.insertCell(1);
    const celulaVencimento = novaLinha.insertCell(2);
    const celulaStatus = novaLinha.insertCell(3);
    const celulaAcoes = novaLinha.insertCell(4);

    celulaNome.textContent = nomeConta;
    celulaValor.textContent = valorConta.toFixed(2);
    celulaVencimento.textContent = dataVenc.toLocaleDateString('pt-BR');
    celulaStatus.textContent = status;

    const btnPagar = document.createElement('button');
    btnPagar.textContent = 'Marcar Pago';
    btnPagar.addEventListener('click', function() {
      celulaStatus.textContent = 'Pago';
      novaLinha.classList.remove('vencido', 'vencendo', 'emaberto');
      novaLinha.classList.add('emaberto');
      btnPagar.disabled = true;
    });
    celulaAcoes.appendChild(btnPagar);

    form.reset();
  });
});
