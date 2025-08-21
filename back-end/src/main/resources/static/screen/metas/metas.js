// metas.js — front-end das metas
const API_BASE = "/api/metas";

const formMeta = document.getElementById('form-meta');
const listaMetas = document.getElementById('listaMetas');

async function carregarMetas() {
    try {
        const resp = await fetch(API_BASE);
        const data = await resp.json();
        renderizarMetas(data);
    } catch (e) {
        console.error(e);
        alert("Falha ao carregar metas.");
    }
}

function renderizarMetas(metas) {
    listaMetas.innerHTML = "";
    metas.forEach(meta => {
        const pct = Math.min(100, Math.round((Number(meta.valorPoupado) / Number(meta.valorTotal)) * 100));
        const card = document.createElement('div');
        card.className = "meta-card";
        card.innerHTML = `
      <h3>${meta.nomeMeta}</h3>
      <p><strong>Valor total:</strong> R$ ${Number(meta.valorTotal).toFixed(2)}</p>
      <p><strong>Poupado:</strong> R$ ${Number(meta.valorPoupado).toFixed(2)} (${pct}%)</p>
      <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
      <button data-id="${meta.id}" class="btn-add">Adicionar Poupança</button>
      <button data-id="${meta.id}" class="btn-del">Excluir</button>
    `;
        listaMetas.appendChild(card);
    });

    // listeners
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            const id = ev.target.getAttribute('data-id');
            const valor = prompt("Quanto deseja adicionar à poupança desta meta? Ex: 50.00");
            if (!valor)
                return;
            try {
                const getResp = await fetch(`${API_BASE}/${id}`);
                if (!getResp.ok)
                    throw new Error("Meta não encontrada");
                const meta = await getResp.json();
                const novoPoupado = Number(meta.valorPoupado) + Number(valor);
                const payload = {
                    ...meta,
                    valorPoupado: novoPoupado
                };
                const putResp = await fetch(`${API_BASE}/${id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                });
                if (!putResp.ok) {
                    const errText = await putResp.text();
                    throw new Error(errText);
                }
                await carregarMetas();
            } catch (e) {
                alert("Erro ao atualizar meta: " + e.message);
            }
        });
    });

    document.querySelectorAll('.btn-del').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            const id = ev.target.getAttribute('data-id');
            if (!confirm("Excluir esta meta?"))
                return;
            try {
                const delResp = await fetch(`${API_BASE}/${id}`, {method: "DELETE"});
                if (!delResp.ok && delResp.status !== 204) {
                    const errText = await delResp.text();
                    throw new Error(errText);
                }
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
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(errText);
        }
        formMeta.reset();
        await carregarMetas();
    } catch (e) {
        alert("Erro ao salvar: " + e.message);
    }
});

// inicialização
document.addEventListener('DOMContentLoaded', carregarMetas);
