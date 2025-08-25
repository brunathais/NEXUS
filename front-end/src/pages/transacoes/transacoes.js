// Mostra ou esconde o campo de categoria com base no tipo selecionado (receita ou despesa)
function mostrarCategoria() {
    const tipo = document.querySelector('input[name="tipo"]:checked').value; // Pega o valor do radio button 'tipo' selecionado (Receita ou Despesa)
    const categoriaDiv = document.getElementById("categoria_div"); // Seleciona o container que tem o select de categoria
    if (tipo === "Despesa") {
        categoriaDiv.style.display = "block"; // Mostra o campo categoria para Despesa
    } else {
        categoriaDiv.style.display = "none"; // Esconde para Receita (que não usa categoria)
    }
}

function salvarTransacao() {
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const valorInput = document.getElementById("valor");
    const dataInput = document.getElementById("data");
    const descricaoInput = document.getElementById("descricao");
    let categoria = "";

    const valor = parseFloat(valorInput.value);
    const data = dataInput.value;
    const descricao = descricaoInput.value.trim();

    if (tipo === "Despesa") {
        categoria = document.getElementById("categoria").value;
    }

    // Valida valor
    if (isNaN(valor) || valor <= 0) {
        alert("O valor deve ser um número maior que zero.");
        valorInput.focus();
        return;
    }

    // Valida data
    if (!data) {
        alert("A data é obrigatória.");
        dataInput.focus();
        return;
    }

    const dataHoje = new Date().toISOString().split("T")[0];
    if (data > dataHoje) {
        alert("A data não pode ser no futuro.");
        dataInput.focus();
        return;
    }

    // Valida descrição
    if (!descricao || descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        descricaoInput.focus();
        return;
    }

    // Categoria para despesa
    if (tipo === "Despesa" && !categoria) {
        alert("A categoria é obrigatória para despesas.");
        return;
    }

    const transacao = { tipo, valor, data, descricao, categoria };
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    const idEditar = document.getElementById("editar_id").value;

    if (idEditar) {
        transacoes[idEditar] = transacao;
    } else {
        transacoes.push(transacao);
    }

    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    carregarTransacoes();
    atualizarResumo();
    limparCampos();
}

// Salva o array atualizado no localStorage convertendo para string JSON
// Necessário para persistência dos dados.

function editarTransacao(index) {
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    const transacao = transacoes[index];

    document.getElementById("valor").value = transacao.valor;
    document.getElementById("data").value = transacao.data;
    document.getElementById("descricao").value = transacao.descricao;

    if (transacao.tipo === "Despesa") {
        document.querySelector('input[name="tipo"][value="Despesa"]').checked = true;
        document.getElementById("categoria").value = transacao.categoria;
        document.getElementById("categoria_div").style.display = "block";
    } else {
        document.querySelector('input[name="tipo"][value="Receita"]').checked = true;
        document.getElementById("categoria_div").style.display = "none";
    }

    document.getElementById("editar_id").value = index;
}

function excluirTransacao(index) {
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.splice(index, 1);

    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    carregarTransacoes();
    atualizarResumo();
}

function filtrarHistorico() {
    const tipoFiltro = document.getElementById("filtroTipo").value;
    const categoriaFiltro = document.getElementById("filtroCategoria").value;
    const dataInicioFiltro = document.getElementById("filtroDataInicio").value;
    const dataFimFiltro = document.getElementById("filtroDataFim").value;

    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    const transacoesFiltradas = transacoes.filter(transacao => {
        const tipoValido = tipoFiltro ? transacao.tipo === tipoFiltro : true;
        const categoriaValida = categoriaFiltro ? transacao.categoria === categoriaFiltro : true;
        const dataValida = (!dataInicioFiltro || transacao.data >= dataInicioFiltro) &&
            (!dataFimFiltro || transacao.data <= dataFimFiltro);
        return tipoValido && categoriaValida && dataValida;
    });

    const container = document.getElementById("lista-transacoes");
    container.innerHTML = "";

    transacoesFiltradas.forEach((transacao, index) => {
        const div = document.createElement("div");
        div.className = "transacao";
        div.onclick = () => div.classList.toggle("ativa");

        div.innerHTML = `
            <div class="transacao-cabecalho">
                <strong>${transacao.tipo}</strong> - R$ ${transacao.valor}
            </div>
            <div class="transacao-detalhes">
                <p><strong>Data:</strong> ${transacao.data}</p>
                <p><strong>Descrição:</strong> ${transacao.descricao}</p>
                ${transacao.tipo === "Despesa" ? `<p><strong>Categoria:</strong> ${transacao.categoria}</p>` : ""}
                <div class="acoes">
                    <button onclick="editarTransacao(${index}); event.stopPropagation();">Editar</button>
                    <button onclick="excluirTransacao(${index}); event.stopPropagation();">Excluir</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}


function limparCampos() {
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("editar_id").value = "";
    document.querySelector('input[name="tipo"][value="Receita"]').checked = true;
    document.getElementById("categoria").value = "Essenciais";
    mostrarCategoria();
}

function atualizarResumo() {
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    let totalReceitas = 0;
    let totalDespesas = 0;

    transacoes.forEach(t => {
        if (t.tipo === "Receita") {
            totalReceitas += parseFloat(t.valor);
        } else if (t.tipo === "Despesa") {
            totalDespesas += parseFloat(t.valor);
        }
    });

    document.getElementById("totalReceitas").textContent = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById("totalDespesas").textContent = `R$ ${totalDespesas.toFixed(2)}`;
}


window.onload = carregarTransacoes;

atualizarResumo();

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

document.getElementById('btnFiltrar').addEventListener('click', () => {
    filtrarHistorico();
});

document.getElementById('btnLimpar').addEventListener('click', () => {
    document.getElementById('filtroTipo').value = '';
    document.getElementById('filtroCategoria').value = '';
    document.getElementById('filtroDataInicio').value = '';
    document.getElementById('filtroDataFim').value = '';
    carregarTransacoes(); // Mostra tudo novamente
    atualizarResumo();
});


function carregarTransacoes() {
    const container = document.getElementById("lista-transacoes");
    container.innerHTML = ""; // Limpar antes de renderizar

    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    transacoes.forEach((transacao, index) => {
        const div = document.createElement("div");
        div.className = "transacao";
        div.onclick = () => div.classList.toggle("ativa");

        div.innerHTML = `
        <div class="transacao-cabecalho">
    <strong>${transacao.tipo}</strong> - R$ ${transacao.valor}
        </div>
        <div class="transacao-detalhes">
    <p><strong>Data:</strong> ${transacao.data}</p>
    <p><strong>Descrição:</strong> ${transacao.descricao}</p>
    <div class="acoes">
            <button onclick="editarTransacao(${index}); event.stopPropagation();">Editar</button>
            <button onclick="excluirTransacao(${index}); event.stopPropagation();">Excluir</button>
    </div>
        </div>
    `;
        container.appendChild(div);
    });
}

function excluirTransacao(index) {
    if (confirm("Deseja realmente excluir esta transação?")) {
        const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
        transacoes.splice(index, 1);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
        carregarTransacoes();
    }
}

// Inicializa na primeira carga
window.onload = () => {
    carregarTransacoes();
    atualizarResumo(); // só se quiser forçar na primeira carga
};
