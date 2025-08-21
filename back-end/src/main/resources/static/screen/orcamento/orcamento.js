// CRUD com backend Spring (SQL Server) via fetch
// Endpoints esperados (CORS habilitado no backend):
// POST   /orcamentos          -> cria e retorna {id,...}
// GET    /orcamentos          -> lista todos
// GET    /orcamentos/{id}     -> retorna 1
// PUT    /orcamentos/{id}     -> atualiza e retorna {id,...}
// DELETE /orcamentos/{id}     -> 204

(function () {
    const API = (window.ORC_API_BASE ?? 'http://localhost:8080') + '/orcamentos';
    const form = document.getElementById('formOrcamento');
    const btnExportar = document.getElementById('btnExportar');
    const btnAtualizar = document.getElementById('btnAtualizar');
    const btnMassDelete = document.getElementById('btnMassDelete'); // permanece como "limpar tudo" (lado cliente)

    const tabelaBody = document.getElementById('listaOrcamentos');
    const tplLinha = document.getElementById('tplLinha');

    const chipsResumo = document.getElementById('chipsResumo');
    const chartCanvas = document.getElementById('chartCanvas');
    const ctx = chartCanvas.getContext('2d');

    // Campos presentes no backend
    const camposBack = ['nome', 'essenciais', 'naoEssenciais', 'imprevistos', 'reservaEmergencia'];
    // Campos da UI adicionais (não existem no modelo atual)
    const camposUIOnly = ['mesRef'];
    const camposValor = ['essenciais', 'naoEssenciais', 'imprevistos', 'reservaEmergencia'];
    const camposAll = [...camposUIOnly, 'nome', ...camposValor];

    let editId = null; // id vindo do backend

    // ---------- Utils de moeda ----------
    function aplicarMascara(input) {
        const formatar = (v) => {
            const d = String(v).replace(/\D/g, '');
            const n = (parseInt(d || '0', 10) / 100).toFixed(2);
            return 'R$ ' + n.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        };
        input.addEventListener('input', () => {
            input.value = formatar(input.value);
        });
        input.addEventListener('blur', () => {
            input.value = formatar(input.value);
        });
        // valor inicial
        if (!input.value)
            input.value = formatar(0);
    }
    function lerValor(str) {
        return parseFloat(String(str).replace(/[R$\s\.]/g, '').replace(',', '.')) || 0;
    }
    function fmt(n) {
        return 'R$ ' + Number(n || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    camposValor.forEach(id => aplicarMascara(document.getElementById(id)));

    // ---------- Meta local (apenas para mesRef enquanto não existir no backend) ----------
    const META_KEY = 'orc_meta';
    const metaLoad = () => JSON.parse(localStorage.getItem(META_KEY) || '{}');
    const metaSave = (obj) => localStorage.setItem(META_KEY, JSON.stringify(obj));

    // ---------- HTTP helper ----------
    async function http(method, url, body) {
        const opts = {
            method,
            headers: {'Content-Type': 'application/json'}
        };
        if (body !== undefined)
            opts.body = JSON.stringify(body);
        const res = await fetch(url, opts);
        if (!res.ok) {
            const msg = await res.text().catch(() => '');
            throw new Error(`Erro ${res.status} ${res.statusText}: ${msg}`);
        }
        // DELETE 204 não tem body
        if (res.status === 204)
            return null;
        return res.json();
    }

    // ---------- Create/Update ----------
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // coleta & valida
            const dados = {};
            for (const c of camposAll) {
                const el = document.getElementById(c);
                const v = camposValor.includes(c) ? lerValor(el.value) : el.value?.trim();
                dados[c] = v;
                if ((camposValor.includes(c) && v <= 0) || (!camposValor.includes(c) && !v)) {
                    alert('Preencha todos os campos com valores válidos.');
                    return;
                }
            }

            // separa payload para backend
            const payload = {
                nome: dados.nome,
                essenciais: dados.essenciais,
                naoEssenciais: dados.naoEssenciais,
                imprevistos: dados.imprevistos,
                reservaEmergencia: dados.reservaEmergencia
            };

            let salvo;
            if (editId) {
                salvo = await http('PUT', `${API}/${editId}`, payload);
            } else {
                salvo = await http('POST', API, payload);
                editId = salvo?.id ?? null;
            }

            // salva meta local do mesRef ligado ao id do backend
            if (salvo?.id && dados.mesRef) {
                const meta = metaLoad();
                meta[salvo.id] = {mesRef: dados.mesRef};
                metaSave(meta);
            }

            // limpa estado
            editId = null;
            form.reset();
            camposValor.forEach(id => document.getElementById(id).value = 'R$ 0,00');
            await render();
        } catch (err) {
            console.error(err);
            alert('Falha ao salvar: ' + err.message);
        }
    });

    // ---------- Read/List ----------
    async function fetchLista() {
        const lista = await http('GET', API);
        // Anexa total (cliente) e mesRef (meta local)
        const meta = metaLoad();
        return (lista || []).map(it => {
            const total = (Number(it.essenciais || 0) + Number(it.naoEssenciais || 0) + Number(it.imprevistos || 0) + Number(it.reservaEmergencia || 0));
            const mesRef = meta[it.id]?.mesRef ?? '';
            return {...it, total, mesRef};
        }).sort((a, b) => (String(b.mesRef || '')).localeCompare(String(a.mesRef || '')));
    }

    async function render() {
        const lista = await fetchLista();
        tabelaBody.innerHTML = '';
        const frag = document.createDocumentFragment();

        lista.forEach(item => {
            const row = tplLinha.content.cloneNode(true);
            row.querySelector('[data-col="mesRef"]').textContent = item.mesRef || '';
            if (row.querySelector('[data-col="nome"]'))
                row.querySelector('[data-col="nome"]').textContent = item.nome || '';
            row.querySelector('[data-col="essenciais"]').textContent = fmt(item.essenciais);
            row.querySelector('[data-col="naoEssenciais"]').textContent = fmt(item.naoEssenciais);
            row.querySelector('[data-col="imprevistos"]').textContent = fmt(item.imprevistos);
            row.querySelector('[data-col="reservaEmergencia"]').textContent = fmt(item.reservaEmergencia);
            row.querySelector('[data-col="total"]').textContent = fmt(item.total);

            const editar = row.querySelector('.btn-editar');
            const excluir = row.querySelector('.btn-excluir');
            editar.addEventListener('click', () => onEditar(item.id));
            excluir.addEventListener('click', () => onExcluir(item.id));

            frag.appendChild(row);
        });

        tabelaBody.appendChild(frag);
        renderResumo(lista);
        renderChart(lista);
    }

    // ---------- Update/Delete ----------
    async function onEditar(id) {
        try {
            const item = await http('GET', `${API}/${id}`);
            if (!item)
                return;

            // preenche campos do backend
            document.getElementById('nome').value = item.nome || '';
            ['essenciais', 'naoEssenciais', 'imprevistos', 'reservaEmergencia'].forEach(k => {
                document.getElementById(k).value = fmt(item[k]);
            });

            // preenche mesRef da meta local
            const meta = metaLoad();
            document.getElementById('mesRef').value = meta[id]?.mesRef ?? '';

            editId = id;
            window.scrollTo({top: 0, behavior: 'smooth'});
        } catch (err) {
            console.error(err);
            alert('Falha ao carregar orçamento: ' + err.message);
        }
    }

    async function onExcluir(id) {
        if (!confirm('Excluir este orçamento?'))
            return;
        try {
            await http('DELETE', `${API}/${id}`);
            // remove meta local correspondente
            const meta = metaLoad();
            delete meta[id];
            metaSave(meta);
            await render();
        } catch (err) {
            console.error(err);
            alert('Falha ao excluir: ' + err.message);
        }
    }

    // Deleção em massa (cliente): limpa apenas metas locais e tenta apagar todos no backend
    btnMassDelete?.addEventListener('click', async () => {
        if (!confirm('Deseja mesmo apagar todos os orçamentos?'))
            return;
        try {
            const lista = await http('GET', API);
            // backend não tem "truncate": faz N deletes
            await Promise.all((lista || []).map(x => http('DELETE', `${API}/${x.id}`)));
            localStorage.removeItem(META_KEY);
            await render();
        } catch (err) {
            console.error(err);
            alert('Falha ao apagar em massa: ' + err.message);
        }
    });

    btnAtualizar?.addEventListener('click', render);

    // ---------- Resumo ----------
    function renderResumo(lista) {
        const totalMes = lista.reduce((acc, it) => acc + (it.total || 0), 0);
        const sum = (k) => lista.reduce((acc, it) => acc + (Number(it[k]) || 0), 0);

        const chips = [
            ['Total de Orçamentos', String(lista.length)],
            ['Soma Essenciais', fmt(sum('essenciais'))],
            ['Soma Não essenciais', fmt(sum('naoEssenciais'))],
            ['Soma Imprevistos', fmt(sum('imprevistos'))],
            ['Soma Reserva', fmt(sum('reservaEmergencia'))],
            ['Soma Geral', fmt(totalMes)],
        ];

        chipsResumo.innerHTML = '';
        for (const [label, value] of chips) {
            const div = document.createElement('div');
            div.className = 'chip';
            div.textContent = `${label}: ${value}`;
            chipsResumo.appendChild(div);
        }
    }

    // ---------- Chart (barras empilhadas do último orçamento) ----------
    function clearCanvas() {
        ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, chartCanvas.width, chartCanvas.height);
        ctx.globalAlpha = 1;
    }
    function renderChart(lista) {
        clearCanvas();
        if (!lista.length)
            return;
        const ultimo = lista[0];
        const data = [
            ['Essenciais', Number(ultimo.essenciais || 0)],
            ['Não essenciais', Number(ultimo.naoEssenciais || 0)],
            ['Imprevistos', Number(ultimo.imprevistos || 0)],
            ['Reserva', Number(ultimo.reservaEmergencia || 0)],
        ];
        const total = data.reduce((a, [, v]) => a + v, 0) || 1;

        const x = 20, y = 80, w = chartCanvas.width - 40, h = 28;
        ctx.fillStyle = '#ffffff22';
        ctx.fillRect(x, y, w, h);
        let off = 0;
        const labelsY = y + h + 20;
        data.forEach(([label, v], i) => {
            const seg = w * (v / total);
            ctx.fillStyle = ['#e8b3f7', '#c4b5fd', '#93c5fd', '#86efac'][i % 4];
            ctx.fillRect(x + off, y, seg, h);
            ctx.fillStyle = '#fff';
            ctx.font = '12px system-ui';
            ctx.fillText(`${label} (${Math.round((v / total) * 100)}%)`, x + off, labelsY + i * 18);
            off += seg;
        });
        ctx.font = 'bold 14px system-ui';
        ctx.fillText(`Distribuição do último orçamento: ${ultimo.nome || ''} ${ultimo.mesRef ? '(' + ultimo.mesRef + ')' : ''}`, x, 36);
    }

    // ---------- Exportar PDF ----------
    btnExportar?.addEventListener('click', async () => {
        try {
            const {jsPDF} = window.jspdf;
            const lista = await fetchLista();
            if (!lista.length)
                return alert('Nenhum orçamento para exportar.');
            const doc = new jsPDF({unit: 'pt'});

            let y = 40;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('Orçamentos', 40, y);
            y += 18;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);

            lista.forEach((o, idx) => {
                const linhas = [
                    `#${idx + 1} – ${o.nome} ${o.mesRef ? '(' + o.mesRef + ')' : ''}`,
                    `Essenciais: ${fmt(o.essenciais)}`,
                    `Não essenciais: ${fmt(o.naoEssenciais)}`,
                    `Imprevistos: ${fmt(o.imprevistos)}`,
                    `Reserva: ${fmt(o.reservaEmergencia)}`,
                    `Total: ${fmt(o.total)}`,
                    ''
                ];
                linhas.forEach(t => {
                    doc.text(t, 42, y);
                    y += 16;
                });
                if (y > 760) {
                    doc.addPage();
                    y = 40;
                }
            });

            doc.save('orcamentos.pdf');
        } catch (err) {
            console.error(err);
            alert('Falha ao exportar PDF: ' + err.message);
        }
    });

    // init
    render();
})();