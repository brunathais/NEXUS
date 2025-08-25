// === Config ===
const API_URL = "http://localhost:8080/transacoes"; // ajuste se o backend estiver noutro host/porta
const USE_CATEGORIA = false; // mude para true SE o backend tiver o campo 'categoria' no model/DB

// === Dados fixos (front) ===
const CATEGORIAS = [
    { value: "essencial", label: "Essenciais" },
    { value: "nao-essencial", label: "Não essenciais" },
    { value: "imprevisto", label: "Imprevistos" },
];

// === Utils ===
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const qs = (s) => document.querySelector(s);
const qsa = (s) => [...document.querySelectorAll(s)];

function fmtBRL(n) { return BRL.format(Number(n || 0)); }
function todayStr() { return new Date().toISOString().slice(0, 10); }
function norm(s) { return (s || "").normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase(); }

// Backend usa "Entrada"/"Saída" (exemplo do seu model). Mapeamos com a UI "Receita"/"Despesa".
function tipoUIFromBackend(t) {
    const n = norm(t);
    if (n.startsWith('e') || n === 'receita') return 'Receita';
    return 'Despesa';
}
function tipoBackendFromUI(t) {
    const n = norm(t);
    return n === 'receita' ? 'Entrada' : 'Saída';
}

function showToast(msg) {
    const toast = qs('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show';
    setTimeout(() => (toast.className = toast.className.replace('show', '')), 2500);
}

// === Estado ===
let state = [];          // array de transações vindas da API
let activeFilter = null; // { type: 'c'|'t', value: string }
let currentEdit = null;  // transação sendo editada

// === Form: categoria (mostrar/ocultar + options) ===
function carregarOpcoesCategoria() {
    const sel = qs('#categoria');
    if (!sel) return;
    sel.innerHTML = CATEGORIAS.map(c => `<option value="${c.value}">${c.label}</option>`).join('');
}
function mostrarCategoria() {
    const tipoUI = (document.querySelector('input[name="tipo"]:checked')?.value) || 'Receita';
    const categoriaDiv = qs('#categoria_div');
    if (!categoriaDiv) return;
    categoriaDiv.style.display = tipoUI === 'Despesa' ? 'block' : 'none';
}

// === Validações do formulário ===
function validarFormulario({ tipoUI, valor, data, descricao, categoria }) {
    const valorNum = Number(valor);
    if (!Number.isFinite(valorNum) || valorNum <= 0) {
        alert('O valor deve ser maior que zero.');
        qs('#valor')?.focus();
        return false;
    }
    if (!data) {
        alert('A data é obrigatória.');
        qs('#data')?.focus();
        return false;
    }
    const hoje = todayStr();
    if (data > hoje) {
        alert('A data não pode ser no futuro.');
        qs('#data')?.focus();
        return false;
    }
    const desc = (descricao || '').trim();
    if (desc.length < 3) {
        alert('A descrição deve ter pelo menos 3 caracteres.');
        qs('#descricao')?.focus();
        return false;
    }
    if (tipoUI === 'Despesa' && USE_CATEGORIA && !categoria) {
        alert('Selecione uma categoria.');
        qs('#categoria')?.focus();
        return false;
    }
    return true;
}

// === CRUD (API) ===
async function salvarTransacao() {
    const tipoUI = document.querySelector('input[name="tipo"]:checked')?.value || 'Receita';
    const payload = {
        descricao: (qs('#descricao')?.value || '').trim(),
        valor: Number(qs('#valor')?.value),
        data: qs('#data')?.value, // yyyy-MM-dd para LocalDate
        tipo: tipoBackendFromUI(tipoUI),
    };
    const idEdicao = qs('#editar_id')?.value || '';

    // Envie categoria apenas se o backend suportar o campo
    if (USE_CATEGORIA && tipoUI === 'Despesa') {
        payload.categoria = qs('#categoria')?.value || '';
    }

    if (!validarFormulario({
        tipoUI,
        valor: payload.valor,
        data: payload.data,
        descricao: payload.descricao,
        categoria: payload.categoria,
    })) return;

    try {
        const resp = await fetch(idEdicao ? `${API_URL}/${idEdicao}` : API_URL, {
            method: idEdicao ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) {
            const txt = await resp.text();
            throw new Error(`HTTP ${resp.status}: ${txt}`);
        }
        limparFormulario();
        await carregarLista();
        showToast(idEdicao ? 'Transação atualizada!' : 'Transação criada!');
    } catch (e) {
        console.error(e);
        alert('Erro ao salvar a transação. Verifique os campos/servidor.');
    }
}

async function carregarLista() {
    try {
        const r = await fetch(API_URL);
        if (!r.ok) throw new Error('Falha ao listar');
        state = await r.json();
        render();
    } catch (e) {
        console.error('Erro ao listar:', e);
    }
}

async function carregarPorId(id) {
    const r = await fetch(`${API_URL}/${id}`);
    if (!r.ok) throw new Error('Não encontrado');
    return r.json();
}

async function deletarTransacao(id) {
    if (!confirm('Deseja realmente excluir esta transação?')) return;
    try {
        const r = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!r.ok && r.status !== 204) throw new Error('Falha ao excluir');
        await carregarLista();
        showToast('Transação excluída!');
    } catch (e) {
        console.error(e);
        alert('Erro ao excluir.');
    }
}

// === Render ===
function aplicaFiltro(rows) {
    if (!activeFilter) return rows;
    const f = activeFilter;
    const now = new Date();
    if (f.type === 't') {
        if (f.value === 'mes') {
            return rows.filter(t => {
                const d = new Date(t.data);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            });
        }
        if (f.value === '7d') {
            const from = new Date(now);
            from.setDate(now.getDate() - 6);
            return rows.filter(t => new Date(t.data) >= from);
        }
    }
    if (f.type === 'c') {
        if (f.value === 'receita') return rows.filter(t => tipoUIFromBackend(t.tipo) === 'Receita');
        if (!USE_CATEGORIA) return rows; // ignora filtros de categoria se backend não tiver esse campo
        return rows.filter(t => {
            const isDesp = tipoUIFromBackend(t.tipo) === 'Despesa';
            return isDesp && (t.categoria === f.value);
        });
    }
    return rows;
}

function render() {
    // ordenar por data desc
    const rows = aplicaFiltro([...state]).sort((a, b) => new Date(b.data) - new Date(a.data));

    // tabela
    const tbody = qs('#tbody');
    if (tbody) {
        if (!rows.length) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; opacity:.8">Sem transações.</td></tr>`;
        } else {
            tbody.innerHTML = rows.map(t => {
                const tipoUI = tipoUIFromBackend(t.tipo);
                const valorFmt = (tipoUI === 'Despesa' ? '-' : '') + fmtBRL(t.valor);
                const badgeClass = tipoUI === 'Receita' ? 'receita' : ((t.categoria || 'essencial'));
                const catLabel = tipoUI === 'Receita' ? 'receita' : (t.categoria || (USE_CATEGORIA ? 'essencial' : '-'));
                return `<tr data-id="${t.id}">
          <td><input type="checkbox" class="ck" aria-label="Selecionar transação"></td>
          <td>${t.data}</td>
          <td>${t.descricao}</td>
          <td><span class="badge ${badgeClass}"><i></i>${catLabel}</span></td>
          <td class="strong" style="text-align:right">${valorFmt}</td>
          <td>
            <button class="btn-outline btn-sm" data-act="edit">Editar</button>
            <button class="btn-danger btn-sm" data-act="delete">Excluir</button>
          </td>
        </tr>`
            }).join('');
        }
    }

    // habilitar bulk delete
    const anyChecked = qsa('.ck:checked').length > 0;
    const btnBulk = qs('#btn-bulk-del');
    if (btnBulk) btnBulk.disabled = !anyChecked;

    // KPIs
    const sum = rows.reduce((acc, t) => {
        if (tipoUIFromBackend(t.tipo) === 'Receita') acc.rec += Number(t.valor || 0);
        else acc.desp += Number(t.valor || 0);
        if (USE_CATEGORIA && t.categoria === 'essencial') acc.ess += Number(t.valor || 0);
        return acc;
    }, { rec: 0, desp: 0, ess: 0 });
    const saldo = sum.rec - sum.desp;
    qs('#kpi-receitas') && (qs('#kpi-receitas').textContent = fmtBRL(sum.rec));
    qs('#kpi-despesas') && (qs('#kpi-despesas').textContent = fmtBRL(sum.desp));
    qs('#kpi-saldo') && (qs('#kpi-saldo').textContent = fmtBRL(saldo));
    const pctEss = sum.desp ? Math.round((sum.ess / sum.desp) * 100) : 0;
    qs('#kpi-essenciais') && (qs('#kpi-essenciais').textContent = (USE_CATEGORIA ? pctEss + '%' : '—'));
}

// === Reset/UX ===
function limparFormulario() {
    qs('#valor') && (qs('#valor').value = '');
    qs('#data') && (qs('#data').value = '');
    qs('#descricao') && (qs('#descricao').value = '');
    qs('#editar_id') && (qs('#editar_id').value = '');
    const radioRec = document.querySelector('input[name="tipo"][value="Receita"]');
    if (radioRec) radioRec.checked = true;
    const sel = qs('#categoria');
    if (sel && sel.options.length) sel.value = sel.options[0].value;
    mostrarCategoria();
}

// === Edit modal ===
function openEditDialog(t) {
    currentEdit = t;
    qs('#ed-data') && (qs('#ed-data').value = t.data || '');
    qs('#ed-desc') && (qs('#ed-desc').value = t.descricao || '');
    // Se for receita, ed-cat = 'receita', senão categoria
    qs('#ed-cat') && (qs('#ed-cat').value = (tipoUIFromBackend(t.tipo) === 'Receita') ? 'receita' : (t.categoria || 'essencial'));
    qs('#ed-valor') && (qs('#ed-valor').value = Number(t.valor || 0));
    qs('#dlg-edit')?.setAttribute('open', '');
}

async function salvarEdicao() {
    if (!currentEdit) return;
    const data = qs('#ed-data')?.value || currentEdit.data;
    const desc = qs('#ed-desc')?.value?.trim() || currentEdit.descricao;
    const catIn = (qs('#ed-cat')?.value || '').toLowerCase();
    const valor = Math.max(0, Number(qs('#ed-valor')?.value) || Number(currentEdit.valor || 0));

    // Inferir tipo/categoria a partir do campo ed-cat
    const isReceita = catIn === 'receita';
    const payload = {
        descricao: desc,
        valor,
        data,
        tipo: isReceita ? 'Entrada' : 'Saída',
    };
    if (USE_CATEGORIA && !isReceita) payload.categoria = ['essencial', 'nao-essencial', 'imprevisto'].includes(catIn) ? catIn : 'essencial';

    try {
        const r = await fetch(`${API_URL}/${currentEdit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error('Falha ao atualizar');
        currentEdit = null;
        qs('#dlg-edit')?.removeAttribute('open');
        await carregarLista();
        showToast('Transação atualizada!');
    } catch (e) {
        console.error(e);
        alert('Não foi possível salvar a edição.');
    }
}

function fecharDialogo() { currentEdit = null; qs('#dlg-edit')?.removeAttribute('open'); }

// === Eventos globais ===
document.addEventListener('DOMContentLoaded', async () => {
    carregarOpcoesCategoria();
    mostrarCategoria();
    await carregarLista();

    // Radios tipo -> mostrar/ocultar categoria
    qsa('input[name="tipo"]').forEach(r => r.addEventListener('change', mostrarCategoria));

    // Chips de filtro
    qsa('.btn-chip').forEach(btn => btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        if (!f || f === 'clear') activeFilter = null; else {
            const [type, value] = f.split(':');
            activeFilter = { type, value };
        }
        render();
    }));

    // Seleção em massa
    qs('#ck-all')?.addEventListener('change', (e) => {
        qsa('.ck').forEach(ck => { ck.checked = e.target.checked; });
        const btn = qs('#btn-bulk-del');
        if (btn) btn.disabled = !e.target.checked;
    });
    document.addEventListener('change', (e) => {
        if (e.target.classList?.contains('ck')) {
            const btn = qs('#btn-bulk-del');
            if (btn) btn.disabled = !qsa('.ck:checked').length;
        }
    });
    qs('#btn-bulk-del')?.addEventListener('click', async () => {
        const ids = qsa('.ck:checked').map(ck => ck.closest('tr')?.dataset.id).filter(Boolean);
        if (!ids.length) return;
        if (!confirm(`Excluir ${ids.length} item(ns)?`)) return;
        for (const id of ids) { await fetch(`${API_URL}/${id}`, { method: 'DELETE' }); }
        await carregarLista();
        showToast('Itens excluídos');
    });

    // Ações por linha (editar/deletar)
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const act = btn.dataset.act;
        if (!act) return;
        const tr = btn.closest('tr');
        if (!tr) return;
        const id = tr.dataset.id;
        if (act === 'delete') { await deletarTransacao(id); }
        if (act === 'edit') {
            try {
                const t = await carregarPorId(id);
                openEditDialog(t);
            } catch (err) {
                console.error(err);
                alert('Não foi possível carregar a transação para edição.');
            }
        }
    });

    // Dialog
    qs('#dlg-close')?.addEventListener('click', fecharDialogo);
    qs('#ed-save')?.addEventListener('click', salvarEdicao);

    // Botão "Adicionar" -> foco no formulário
    qs('#btn-add')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        qs('#descricao')?.focus();
    });
});

// Expor funções chamadas inline no HTML
window.salvarTransacao = salvarTransacao;
window.mostrarCategoria = mostrarCategoria;
window.deletarTransacao = (id) => deletarTransacao(id);
