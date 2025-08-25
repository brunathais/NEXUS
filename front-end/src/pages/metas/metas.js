
    const formMeta = document.getElementById('form-meta');
    const listaMetas = document.getElementById('listaMetas');
    let metas = [];

    function atualizarLista() {
      listaMetas.innerHTML = '';

      metas.forEach((meta, index) => {
        const porcentagem = Math.min((meta.valorPoupado / meta.valorTotal) * 100, 100).toFixed(2);

        const divMeta = document.createElement('div');
        divMeta.className = 'meta';

        divMeta.innerHTML = `
          <h3>${meta.nome}</h3>
          <div class="progress-bar">
            <div class="progress" style="width: ${porcentagem}%;"></div>
          </div>
          <div class="status">${porcentagem}% - R$${meta.valorPoupado.toFixed(2)} / R$${meta.valorTotal.toFixed(2)}</div>
          <label>Adicionar valor poupado:</label>
          <input type="number" min="0" step="0.01" id="inputPoupado${index}" placeholder="Valor" />
          <button onclick="adicionarValor(${index})">Atualizar</button>
        `;

        listaMetas.appendChild(divMeta);
      });
    }

    function adicionarValor(index) {
      const input = document.getElementById(`inputPoupado${index}`);
      const valor = parseFloat(input.value);

      if (!isNaN(valor) && valor > 0) {
        metas[index].valorPoupado += valor;
        if (metas[index].valorPoupado >= metas[index].valorTotal) {
          metas[index].valorPoupado = metas[index].valorTotal;

          // Exibe mensagem de parabéns
          alert(`Meta "${metas[index].nome}" atingida! Parabéns! 🎉`);
        }
        input.value = '';
        atualizarLista();
      } else {
        alert('Informe um valor válido maior que zero.');
      }
    }

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
        alert('Por favor, preencha os dados corretamente. O valor poupado não pode ser maior que o valor total.');
      }
    });


function limitarCaracteres(input, max) {
  const valor = input.value;

  // Remove qualquer coisa que não seja número ou ponto (decimal)
  const valorLimpo = valor.replace(/[^0-9.]/g, '');

  // Se passar do limite, corta
  if (valorLimpo.length > max) {
    input.value = valorLimpo.slice(0, max);
  } else {
    input.value = valorLimpo;
  }

  // Atualiza o contador correspondente
  const contadorId = 'contador' + input.id.charAt(0).toUpperCase() + input.id.slice(1);
  const contadorSpan = document.getElementById(contadorId);
  if (contadorSpan) {
    contadorSpan.textContent = `${input.value.length}/${max}`;
  }
}
function atualizarContadorTexto(input, max) {
  const contador = document.getElementById('contador' + input.id.charAt(0).toUpperCase() + input.id.slice(1));
  if (contador) {
    contador.textContent = `${input.value.length}/${max}`;
  }
}

  