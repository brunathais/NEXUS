// Referências ao formulário e à lista de metas
const formMeta = document.getElementById('form-meta');
const listaMetas = document.getElementById('listaMetas');

// Array para armazenar as metas
let metas = [];

// Estado atual do filtro
let filtroAtual = 'todas';

// Função para atualizar a lista de metas
function atualizarLista() {
  listaMetas.innerHTML = ''; // Limpa o conteúdo anterior

  // Filtra metas com base no filtro atual
  const metasFiltradas = metas.filter(meta => {
    if (filtroAtual === 'completas') return meta.valorPoupado >= meta.valorTotal;
    if (filtroAtual === 'incompletas') return meta.valorPoupado < meta.valorTotal;
    return true;
  });

  // Renderiza cada meta
  metasFiltradas.forEach((meta, index) => {
    const porcentagem = Math.min((meta.valorPoupado / meta.valorTotal) * 100, 100).toFixed(2);

    const divMeta = document.createElement('div');
    divMeta.className = 'meta';
    divMeta.innerHTML = `
      <h3>${meta.nome}</h3>
      <div class="progress-bar">
        <div class="progress" style="width: ${porcentagem}%;"></div>
      </div>
      <div class="status">${porcentagem}% - R$${meta.valorPoupado.toFixed(2)} / R$${meta.valorTotal.toFixed(2)}</div>
    `;

    if (meta.valorPoupado < meta.valorTotal) {
      divMeta.innerHTML += `
        <label>Adicionar valor poupado:</label>
        <input type="number" min="0" step="0.01" id="inputPoupado${index}" placeholder="Valor" />
        <button onclick="adicionarValor(${index})">Atualizar</button>
      `;
    }

    listaMetas.appendChild(divMeta);
  });
}

// Função para adicionar valor poupado a uma meta
function adicionarValor(index) {
  const input = document.getElementById(`inputPoupado${index}`);
  const valor = parseFloat(input.value);

  if (!isNaN(valor) && valor > 0) {
    metas[index].valorPoupado = Math.min(metas[index].valorPoupado + valor, metas[index].valorTotal);
    input.value = '';
    atualizarLista();
  } else {
    alert('Informe um valor válido.');
  }
}

// Função para filtrar metas
function filtrarMetas(filtro) {
  filtroAtual = filtro; // Define o filtro atual
  atualizarLista(); // Atualiza a lista
}

// Listener para o formulário
formMeta.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nomeMeta').value.trim();
  const valorTotal = parseFloat(document.getElementById('valorTotal').value);
  const valorPoupado = parseFloat(document.getElementById('valorPoupado').value);

  if (nome && valorTotal > 0 && valorPoupado >= 0 && valorPoupado <= valorTotal) {
    metas.push({ nome, valorTotal, valorPoupado });
    formMeta.reset();
    atualizarLista();
  } else {
    alert('Preencha os dados corretamente.');
  }
});
