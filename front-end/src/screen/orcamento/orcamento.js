
    const API_URL = "http://localhost:8080/orcamentos";
    const TRANSACOES_URL = "http://localhost:8080/transacoes";

    const form = document.getElementById("formOrcamento");

    // Carregar orçamento do banco ao iniciar
    function carregarOrcamento() {
      fetch(API_URL)
        .then(res => res.json())
        .then(lista => {
          if (lista.length > 0) {
            const orcamento = lista[0]; // assumindo um único orçamento
            document.getElementById("orcamento_id").value = orcamento.id;
            form.essenciais.value = orcamento.essenciais;
            form.naoEssenciais.value = orcamento.naoEssenciais;
            form.imprevistos.value = orcamento.imprevistos;
            form.reservaEmergencia.value = orcamento.reservaEmergencia;
            gerarRelatorio(orcamento);
          }
        });
    }

    // Enviar dados para o back-end
    function salvarOrcamento(e) {
      e.preventDefault();

      const id = document.getElementById("orcamento_id").value;
      const orcamento = {
        essenciais: parseFloat(form.essenciais.value),
        naoEssenciais: parseFloat(form.naoEssenciais.value),
        imprevistos: parseFloat(form.imprevistos.value),
        reservaEmergencia: parseFloat(form.reservaEmergencia.value)
      };

      const url = id ? `${API_URL}/${id}` : API_URL;
      const method = id ? "PUT" : "POST";

      fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orcamento)
      })
        .then(res => res.json())
        .then(dados => {
          alert("Orçamento salvo com sucesso!");
          document.getElementById("orcamento_id").value = dados.id;
          gerarRelatorio(dados);
        });
    }

    // Relatório comparativo com transações
    function gerarRelatorio(orcamento) {
      fetch(TRANSACOES_URL)
        .then(res => res.json())
        .then(transacoes => {
          const gastos = { essenciais: 0, naoEssenciais: 0, imprevistos: 0 };

          transacoes
            .filter(t => t.tipo === "Despesa")
            .forEach(t => {
              if (gastos[t.categoria] !== undefined) {
                gastos[t.categoria] += t.valor;
              }
            });

          const resumo = document.getElementById("resumo");
          resumo.innerHTML = `
            <p><strong>Essenciais:</strong> R$ ${gastos.essenciais.toFixed(2)} / R$ ${orcamento.essenciais.toFixed(2)}</p>
            <p><strong>Não Essenciais:</strong> R$ ${gastos.naoEssenciais.toFixed(2)} / R$ ${orcamento.naoEssenciais.toFixed(2)}</p>
            <p><strong>Imprevistos:</strong> R$ ${gastos.imprevistos.toFixed(2)} / R$ ${orcamento.imprevistos.toFixed(2)}</p>
            <p><strong>Reserva de Emergência:</strong> R$ ${orcamento.reservaEmergencia.toFixed(2)}</p>
          `;

          Object.keys(gastos).forEach(cat => {
            if (orcamento[cat] && gastos[cat] > orcamento[cat]) {
              alert(`⚠️ Você ultrapassou o limite para ${cat}`);
            }
          });
        });
    }

    form.addEventListener("submit", salvarOrcamento);
    window.onload = carregarOrcamento;
  