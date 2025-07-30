formMeta.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeMeta = document.getElementById('nomeMeta').value.trim();
  const valorTotal = parseFloat(document.getElementById('valorTotal').value);
  const valorPoupado = parseFloat(document.getElementById('valorPoupado').value);

  if (nomeMeta && valorTotal > 0 && valorPoupado >= 0 && valorPoupado <= valorTotal) {
    const novaMeta = {
      nomeMeta,
      valorTotal,
      valorInicial: valorPoupado,
      valorPoupado
    };

    try {
      const response = await fetch('http://localhost:8080/metas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaMeta)
      });

      if (response.ok) {
        const metaSalva = await response.json();
        metas.push(metaSalva);
        atualizarLista();
        formMeta.reset();
      } else {
        alert('Erro ao salvar meta no servidor.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão com o servidor.');
    }
  } else {
    alert('Preencha os dados corretamente. O valor poupado não pode ser maior que o valor total.');
  }
});
