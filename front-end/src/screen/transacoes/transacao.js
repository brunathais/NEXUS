const API_URL = "http://localhost:8080/transacoes"; // ajuste para seu endpoint correto

async function salvarTransacao() {
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;
    const descricao = document.getElementById("descricao").value;
    const idEdicao = document.getElementById("editar_id").value;

    const transacao = {
        tipo,
        valor,
        data,
        descricao
    };

    try {
        if (idEdicao) {
            await fetch(`${API_URL}/${idEdicao}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(transacao)
            });
            document.getElementById("editar_id").value = "";
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(transacao)
            });
        }
        limparFormulario();
        listarTransacoes();
    } catch (error) {
        console.error("Erro ao salvar transação:", error);
    }
}

async function listarTransacoes() {
    try {
        const response = await fetch(API_URL);
        const transacoes = await response.json();
        exibirHistorico(transacoes);
    } catch (error) {
        console.error("Erro ao listar transações:", error);
    }
}

function exibirHistorico(transacoes) {
    const historicoDiv = document.getElementById("historico");
    historicoDiv.innerHTML = "";

    transacoes.forEach(t => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${t.tipo}</strong> - R$ ${t.valor} - ${t.data} - ${t.descricao}
            <button onclick="editarTransacao(${t.id})">Editar</button>
            <button onclick="deletarTransacao(${t.id})">Excluir</button>
        `;
        historicoDiv.appendChild(div);
    });
}

async function editarTransacao(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
            const transacao = await response.json();
            document.querySelector(`input[name="tipo"][value="${transacao.tipo}"]`).checked = true;
            document.getElementById("valor").value = transacao.valor;
            document.getElementById("data").value = transacao.data;
            document.getElementById("descricao").value = transacao.descricao;
            document.getElementById("editar_id").value = transacao.id;
        }
    } catch (error) {
        console.error("Erro ao buscar transação:", error);
    }
}

async function deletarTransacao(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        listarTransacoes();
    } catch (error) {
        console.error("Erro ao deletar transação:", error);
    }
}

function limparFormulario() {
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("editar_id").value = "";
}

// ao carregar página
document.addEventListener("DOMContentLoaded", listarTransacoes);
