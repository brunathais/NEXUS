const API_URL = "http://localhost:8080/transacoes";

// --- utils ---
const CATEGORIAS = [
    { value: "essencial", label: "Essenciais" },
    { value: "nao-essencial", label: "Não essenciais" },
    { value: "imprevisto", label: "Imprevistos" },
];

function fmtMoeda(n) {
    const v = Number(n || 0);
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function capitalizeTipo(t) {
    return (t || "").toLowerCase() === "receita" ? "Receita" : "Despesa";
}
function lowerTipo(t) {
    return (t || "").toLowerCase();
}
function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = "toast show";
    setTimeout(() => (toast.className = toast.className.replace("show", "")), 3000);
}

// --- categoria: mostrar/ocultar + preencher select ---
function carregarOpcoesCategoria() {
    const sel = document.getElementById("categoria");
    if (!sel) return;
    sel.innerHTML = CATEGORIAS.map(c => `<option value="${c.value}">${c.label}</option>`).join("");
}
function mostrarCategoria() {
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value || "Receita";
    const categoriaDiv = document.getElementById("categoria_div");
    if (!categoriaDiv) return;
    categoriaDiv.style.display = tipo === "Despesa" ? "block" : "none";
}

// --- validações ---
function validarFormulario({ tipo, valor, data, descricao, categoria }) {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
        alert("O valor deve ser um número maior que zero.");
        document.getElementById("valor").focus();
        return false;
    }
    if (!data) {
        alert("A data é obrigatória.");
        document.getElementById("data").focus();
        return false;
    }
    const hoje = new Date().toISOString().split("T")[0];
    if (data > hoje) {
        alert("A data não pode ser no futuro.");
        document.getElementById("data").focus();
        return false;
    }
    const desc = (descricao || "").trim();
    if (!desc || desc.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        document.getElementById("descricao").focus();
        return false;
    }
    if (tipo === "Despesa" && !categoria) {
        alert("A categoria é obrigatória para despesas.");
        document.getElementById("categoria").focus();
        return false;
    }
    return true;
}

// --- CRUD ---
async function salvarTransacao() {
    const tipoUI = document.querySelector('input[name="tipo"]:checked')?.value || "Receita";
    const tipo = lowerTipo(tipoUI); // backend espera "receita"/"despesa"
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value; // yyyy-MM-dd (ok p/ LocalDate)
    const descricao = document.getElementById("descricao").value.trim();
    const idEdicao = document.getElementById("editar_id").value;
    const categoriaSelect = document.getElementById("categoria");
    const categoria = tipo === "despesa" ? (categoriaSelect?.value || "") : null;

    const payload = { tipo, valor, data, descricao };
    if (tipo === "despesa") payload.categoria = categoria;

    if (!validarFormulario({ tipo: tipoUI, valor, data, descricao, categoria })) return;

    try {
        const resp = await fetch(idEdicao ? `${API_URL}/${idEdicao}` : API_URL, {
            method: idEdicao ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) {
            const txt = await resp.text();
            throw new Error(`Erro HTTP ${resp.status}: ${txt}`);
        }
        limparFormulario();
        await listarTransacoes();
        showToast(idEdicao ? "Transação atualizada!" : "Transação criada!");
    } catch (e) {
        console.error(e);
        alert("Erro ao salvar transação. Verifique os campos e tente novamente.");
    }
}

async function listarTransacoes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Falha ao listar");
        const transacoes = await response.json();
        exibirHistorico(transacoes);
        atualizarResumo(transacoes);
    } catch (error) {
        console.error("Erro ao listar transações:", error);
    }
}

function exibirHistorico(transacoes) {
    const container = document.getElementById("lista-transacoes");
    if (!container) return;
    container.innerHTML = "";

    // aplica filtros antes de render
    const tipoFiltro = document.getElementById("filtroTipo")?.value || "";
    const categoriaFiltro = document.getElementById("filtroCategoria")?.value || "";
    const dataIni = document.getElementById("filtroDataInicio")?.value || "";
    const dataFim = document.getElementById("filtroDataFim")?.value || "";

    const filtradas = transacoes.filter(t => {
        const tipoOK = tipoFiltro ? lowerTipo(t.tipo) === lowerTipo(tipoFiltro) : true;
        const catOK = categoriaFiltro ? (t.categoria || "") === categoriaFiltro : true;
        const dataOK =
            (!dataIni || t.data >= dataIni) &&
            (!dataFim || t.data <= dataFim);
        return tipoOK && catOK && dataOK;
    });

    filtradas.forEach(t => {
        const div = document.createElement("div");
        div.className = "transacao";
        div.onclick = () => div.classList.toggle("ativa");

        const cabecalho = `
      <div class="transacao-cabecalho">
        <strong>${capitalizeTipo(t.tipo)}</strong> - ${fmtMoeda(t.valor)}
      </div>
    `;

        const detalhes = `
      <div class="transacao-detalhes">
        <p><strong>Data:</strong> ${t.data}</p>
        <p><strong>Descrição:</strong> ${t.descricao}</p>
        ${lowerTipo(t.tipo) === "despesa" && t.categoria ? `
          <p><strong>Categoria:</strong> ${CATEGORIAS.find(c => c.value === t.categoria)?.label || t.categoria}</p>` : ""
            }
        <div class="acoes">
          <button onclick="editarTransacao(${t.id}); event.stopPropagation();">Editar</button>
          <button onclick="deletarTransacao(${t.id}); event.stopPropagation();">Excluir</button>
        </div>
      </div>
    `;

        div.innerHTML = cabecalho + detalhes;
        container.appendChild(div);
    });
}

async function editarTransacao(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Não encontrado");
        const t = await response.json();

        document.querySelector(`input[name="tipo"][value="${capitalizeTipo(t.tipo)}"]`).checked = true;
        document.getElementById("valor").value = t.valor;
        document.getElementById("data").value = t.data;
        document.getElementById("descricao").value = t.descricao;
        document.getElementById("editar_id").value = t.id;

        mostrarCategoria();
        if (lowerTipo(t.tipo) === "despesa" && t.categoria) {
            document.getElementById("categoria").value = t.categoria;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error("Erro ao buscar transação:", error);
        alert("Não foi possível carregar a transação para edição.");
    }
}

async function deletarTransacao(id) {
    if (!confirm("Deseja realmente excluir esta transação?")) return;
    try {
        const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (resp.status === 204 || resp.ok) {
            await listarTransacoes();
            showToast("Transação excluída!");
        } else {
            const txt = await resp.text();
            throw new Error(`Erro HTTP ${resp.status}: ${txt}`);
        }
    } catch (error) {
        console.error("Erro ao deletar transação:", error);
        alert("Erro ao excluir. Tente novamente.");
    }
}

// --- filtros ---
function filtrarHistorico() {
    // Como exibirHistorico já lê os filtros, basta recarregar lista da API e re-renderizar:
    listarTransacoes();
}
function limparFiltros() {
    const el = id => document.getElementById(id);
    el('filtroTipo') && (el('filtroTipo').value = '');
    el('filtroCategoria') && (el('filtroCategoria').value = '');
    el('filtroDataInicio') && (el('filtroDataInicio').value = '');
    el('filtroDataFim') && (el('filtroDataFim').value = '');
    listarTransacoes();
}

// --- cards de resumo ---
function atualizarResumo(transacoes = []) {
    let receitas = 0;
    let despesas = 0;
    transacoes.forEach(t => {
        const v = Number(t.valor || 0);
        if (lowerTipo(t.tipo) === "receita") receitas += v;
        else if (lowerTipo(t.tipo) === "despesa") despesas += v;
    });
    const saldo = receitas - despesas;

    const setText = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    };
    setText("totalReceitas", fmtMoeda(receitas));
    setText("totalDespesas", fmtMoeda(despesas));
    setText("totalSaldo", fmtMoeda(saldo));
}

// --- reset/UX ---
function limparFormulario() {
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("editar_id").value = "";
    // padrão: Receita selecionada
    const radioReceita = document.querySelector('input[name="tipo"][value="Receita"]');
    if (radioReceita) radioReceita.checked = true;
    // categoria reseta para a primeira opção
    const sel = document.getElementById("categoria");
    if (sel && sel.options.length) sel.value = sel.options[0].value;
    mostrarCategoria();
}

// --- event listeners ---
document.addEventListener("DOMContentLoaded", async () => {
    carregarOpcoesCategoria();
    mostrarCategoria();
    await listarTransacoes();

    // change de radios para exibir/ocultar categoria
    document.querySelectorAll('input[name="tipo"]').forEach(r =>
        r.addEventListener("change", mostrarCategoria)
    );

    // botões de filtros
    const btnFiltrar = document.getElementById('btnFiltrar');
    const btnLimpar = document.getElementById('btnLimpar');
    if (btnFiltrar) btnFiltrar.addEventListener('click', filtrarHistorico);
    if (btnLimpar) btnLimpar.addEventListener('click', limparFiltros);
});

// Exponha no escopo global se precisa chamar pelos onclick do HTML
window.salvarTransacao = salvarTransacao;
window.editarTransacao = editarTransacao;
window.deletarTransacao = deletarTransacao;
window.filtrarHistorico = filtrarHistorico;
window.mostrarCategoria = mostrarCategoria;

