// metas.js — front-end das metas (refactor para tabela + estilo Transações)
const API_BASE = "/api/metas";

const formMeta = document.getElementById('form-meta');
const listaMetas = document.getElementById('listaMetas');
const compactSwitch = document.getElementById('compactSwitch');

function formatCurrency(v) {
    try { return Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
    catch { return `R$ ${(Number(v) || 0).toFixed(2)}`; }
}

function escapeHtml(str = '') {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", "&#39;");
}

async function carregarMetas() {
    try {
        const resp = await fetch(API_BASE);
        const data = await resp.json();
        renderizarMetas(data || []);
    } catch (e) {
        console.error(e);
        alert("Falha ao carregar metas.");
    }
}

function renderizarMetas(metas) {
    listaMetas.innerHTML = "";

    let total = 0;
    let poupado = 0;

    metas.forEach(meta => {
        const vt = Number(meta.valorTotal) || 0;
        const vp = Number(meta.valorPoupado) || 0;
        const pct = Math.min(100, Math.round((vp / (vt || 1)) * 100));

        total += vt;
        poupado += vp;

        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td class="strong clamp-2">${escapeHtml(meta.nomeMeta)}</td>
      <td>${formatCurrency(vt)}</td>
      <td>${formatCurrency(vp)} <span class="sr-note">(${pct}%)</span></td>
      <td>
        <div class="meta-progress" aria-label="Progresso: ${pct}%">
          <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
            <div class="progress" style="width:${pct}%"></div>
          </div>
        </div>
      </td>
      <td>
        <div class="actions">
          <button data-id="${meta.id}" class="btn-outline btn-add">+ Poupança</button>
          <button data-id="${meta.id}" class="btn-danger btn-del">Excluir</button>
        </div>
      </td>
    `;
        listaMetas.appendChild(tr);
    });

    // KPIs no topo
    const kpiTotal = document.getElementById('kpiTotal');
    const kpiPoupado = document.getElementById('kpiPoupado');
    const kpiRestante = document.getElementById('kpiRestante');

    if (kpiTotal) kpiTotal.textContent = metas.length;
    if (kpiPoupado) kpiPoupado.textContent = formatCurrency(poupado);
    if (kpiRestante) kpiRestante.textContent = formatCurrency(Math.max(0, total - poupado));

    // Listeners dos botões
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            const id = ev.currentTarget.getAttribute('data-id');
            const valor = prompt("Quanto deseja adicionar à poupança desta meta? Ex: 50.00");
            if (!valor) return;

            try {
                const getResp = await fetch(`${API_BASE}/${id}`);
                if (!getResp.ok) throw new Error("Meta não encontrada");
                const meta = await getResp.json();

                const novoPoupado = (Number(meta.valorPoupado) || 0) + Number(valor);
                const payload = { ...meta, valorPoupado: novoPoupado };

                const putResp = await fetch(`${API_BASE}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (!putResp.ok) throw new Error(await putResp.text());

                await carregarMetas();
            } catch (e) {
                alert("Erro ao atualizar meta: " + e.message);
            }
        });
    });

    document.querySelectorAll('.btn-del').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            const id = ev.currentTarget.getAttribute('data-id');
            if (!confirm("Excluir esta meta?")) return;

            try {
                const delResp = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
                if (!delResp.ok && delResp.status !== 204) throw new Error(await delResp.text());
                await carregarMetas();
            } catch (e) {
                alert("Erro ao excluir meta: " + e.message);
            }
        });
    });
}

formMeta.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nomeMeta = document.getElementById('nomeMeta').value.trim();
    const valorTotal = parseFloat(document.getElementById('valorTotal').value);
    const valorPoupado = parseFloat(document.getElementById('valorPoupado').value);

    if (!nomeMeta || !(valorTotal > 0) || valorPoupado < 0 || valorPoupado > valorTotal) {
        alert('Preencha os dados corretamente. O valor poupado não pode ser maior que o valor total.');
        return;
    }

    const payload = {
        nomeMeta,
        valorTotal,
        valorInicial: valorPoupado,
        valorPoupado
    };

    try {
        const resp = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!resp.ok) throw new Error(await resp.text());

        formMeta.reset();
        await carregarMetas();
    } catch (e) {
        alert("Erro ao salvar: " + e.message);
    }
});

// Densidade compacta (reaproveita regra .compact do tema de Transações)
compactSwitch?.addEventListener('change', (e) => {
    document.body.classList.toggle('compact', e.target.checked);
});

// inicialização
document.addEventListener('DOMContentLoaded', carregarMetas);
