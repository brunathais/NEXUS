
  const formMeta = document.getElementById('form-meta');
  const listaMetas = document.getElementById('listaMetas');
  const API_URL = 'http://localhost:8080/api/metas';

  async function carregarMetas() {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    atualizarLista(dados);
  }

  async function adicionarMeta(event) {
    event.preventDefault();

    const meta = {
      nome: document.getElementById('nomeMeta').value.trim(),
      valorTotal: parseFloat(document.getElementById('valorTotal').value),
      valorPoupado: parseFloat(document.getElementById('valorPoupado').value),
      prazo: document.getElementById('prazo').value,
      categoria: document.getElementById('categoria').value
    };

    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta)
    });

    if (resposta.ok) {
      formMeta.reset();
      carregarMetas();
    } else {
      alert('Erro ao adicionar meta.');
    }
  }

  async function adicionarValor(index, id, valorAtual, valorTotal) {
    const input = document.getElementById(`inputPoupado${index}`);
    const valor = parseFloat(input.value);

    if (!isNaN(valor) && valor > 0) {
      const novoValorPoupado = Math.min(valorAtual + valor, valorTotal);

      const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valorPoupado: novoValorPoupado })
      });

      if (resposta.ok) {
        if (novoValorPoupado >= valorTotal) {
          alert("Meta atingida! Parabéns 🎉");
        }
        carregarMetas();
      } else {
        alert("Erro ao atualizar valor poupado.");
      }
    } else {
      alert('Informe um valor válido maior que zero.');
    }
  }

  function atualizarLista(metas) {
    listaMetas.innerHTML = '';

    if (metas.length === 0) {
      listaMetas.innerHTML = '<p>Nenhuma meta cadastrada.</p>';
      return;
    }

    metas.forEach((meta, index) => {
      const porcentagem = Math.min((meta.valorPoupado / meta.valorTotal) * 100, 100).toFixed(2);

      
      const divMeta = document.createElement('div');
      divMeta.className = 'meta';

      divMeta.innerHTML = `
  <h3 contenteditable="true" id="nomeEdit${index}">${meta.nome}</h3>
  <p>
    Categoria: <input type="text" id="categoriaEdit${index}" value="${meta.categoria}" />
    | Prazo: <input type="date" id="prazoEdit${index}" value="${meta.prazo}" />
  </p>
  <label>Valor Total: <input type="number" id="valorTotalEdit${index}" value="${meta.valorTotal}" step="0.01" /></label>
  <label>Valor Poupado: <input type="number" id="valorPoupadoEdit${index}" value="${meta.valorPoupado}" step="0.01" /></label>
  <div class="progress-bar"><div class="progress" style="width: ${porcentagem}%;"></div></div>
  <div class="status">${porcentagem}% - R$${meta.valorPoupado.toFixed(2)} / R$${meta.valorTotal.toFixed(2)}</div>
  <button onclick="salvarEdicao(${meta.id}, ${index})">Salvar Edição</button>
  <hr/>
`;

      listaMetas.appendChild(divMeta);
    });
  }

  formMeta.addEventListener('submit', adicionarMeta);
  window.onload = carregarMetas;

  async function salvarEdicao(id, index) {
  const nome = document.getElementById(`nomeEdit${index}`).innerText.trim();
  const categoria = document.getElementById(`categoriaEdit${index}`).value;
  const prazo = document.getElementById(`prazoEdit${index}`).value;
  const valorTotal = parseFloat(document.getElementById(`valorTotalEdit${index}`).value);
  const valorPoupado = parseFloat(document.getElementById(`valorPoupadoEdit${index}`).value);

  if (!nome || isNaN(valorTotal) || isNaN(valorPoupado) || !prazo || !categoria) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const metaAtualizada = { nome, categoria, prazo, valorTotal, valorPoupado };

  
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metaAtualizada)
  });

  if (resposta.ok) {
    alert("Meta atualizada com sucesso!");
    carregarMetas();
  } else {
    alert("Erro ao atualizar meta.");
  }
}
