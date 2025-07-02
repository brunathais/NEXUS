
        const API_URL = "http://localhost:8080/transacoes";

        function mostrarCategoria() {
            const tipo = document.querySelector('input[name="tipo"]:checked').value; //como funciona essa parte: 'input[name="tipo"]:checked'
            document.getElementById("categoria_div").style.display = tipo === "Despesa" ? "block" : "none"; //o que é style.display e o resto: tipo === "Despesa" ? "block" : "none"
        }

        function salvarTransacao(event) { //é necessario esse parametro? o que acontece se eu tirar
            event.preventDefault();

            const tipo = document.querySelector('input[name="tipo"]:checked').value;
            const valor = parseFloat(document.getElementById("valor").value); // aqui transforma o valor para float né? ou não é isso?
            const data = document.getElementById("data").value;
            const descricao = document.getElementById("descricao").value;
            const categoria = tipo === "Despesa" ? document.getElementById("categoria").value : ""; //o que significa o "?"
            const id = document.getElementById("transacao_id").value;

            const transacao = { tipo, valor, data, descricao, categoria };

            if (id) {
                // UPDATE
                //quero entender essa parte, o que o fetch faz? e o que esta fazendo em cada parte 
                fetch(`${API_URL}/${id}`, { 
                    method: "PUT", // o que o metodo PUT faz?
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(transacao)
                })
                .then(res => res.json())
                .then(() => {
                    alert("Transação atualizada!");
                    limparCampos(); 
                    exibirHistorico();
                });
            } else {
                // CREATE
                fetch(API_URL, {
                    method: "POST", // o que o metodo POST faz?
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(transacao)
                })
                .then(res => res.json())
                .then(() => {
                    alert("Transação criada!");
                    limparCampos();
                    exibirHistorico();
                });
            }
        }

        function exibirHistorico() {
            fetch(API_URL)
                .then(res => res.json())
                .then(transacoes => renderizarTransacoes(transacoes));
        }

        function renderizarTransacoes(transacoes) {
            const historico = document.getElementById("historico");
            historico.innerHTML = ""; // o que é isso?

            if (transacoes.length === 0) { //o que esta acontecendo aqui?
                historico.innerHTML = "<p>Nenhuma transação encontrada.</p>";
                return;
            }

            transacoes.forEach(transacao => { // o que faz o forEach?
                const div = document.createElement("div");
                //o que faz essa parte de baixo?
                div.innerHTML = `
                    <strong>${transacao.tipo}</strong><br>
                    Valor: R$ ${transacao.valor.toFixed(2)}<br>
                    Data: ${transacao.data}<br>
                    Descrição: ${transacao.descricao}<br>
                    ${transacao.tipo === "Despesa" ? "Categoria: " + transacao.categoria + "<br>" : ""}
                    <button onclick="editarTransacao(${transacao.id})">Editar</button>
                    <button onclick="excluirTransacao(${transacao.id})">Excluir</button>
                    <hr>
                `;
                historico.appendChild(div);
            });
        }

        function editarTransacao(id) {
            fetch(`${API_URL}/${id}`)
                .then(res => res.json())
                .then(transacao => {
                    document.getElementById("transacao_id").value = transacao.id;
                    document.getElementById("valor").value = transacao.valor;
                    document.getElementById("data").value = transacao.data;
                    document.getElementById("descricao").value = transacao.descricao;

                    if (transacao.tipo === "Despesa") {
                        document.querySelector('input[name="tipo"][value="Despesa"]').checked = true;
                        document.getElementById("categoria").value = transacao.categoria;
                    } else {
                        document.querySelector('input[name="tipo"][value="Receita"]').checked = true;
                    }

                    mostrarCategoria();
                });
        }

        function excluirTransacao(id) {
            if (!confirm("Deseja realmente excluir esta transação?")) return;

            fetch(`${API_URL}/${id}`, { method: "DELETE" })
                .then(() => {
                    alert("Transação excluída!");
                    exibirHistorico();
                });
        }

        function limparCampos() {
            document.getElementById("transacao_id").value = "";
            document.getElementById("valor").value = "";
            document.getElementById("data").value = "";
            document.getElementById("descricao").value = "";
            document.querySelector('input[name="tipo"][value="Receita"]').checked = true;
            document.getElementById("categoria").value = "Essenciais";
            mostrarCategoria();
        }

        function filtrarHistorico() {
            fetch(API_URL)
                .then(res => res.json())
                .then(transacoes => {
                    const tipoFiltro = document.getElementById("filtroTipo").value;
                    const categoriaFiltro = document.getElementById("filtroCategoria").value;
                    const dataInicio = document.getElementById("filtroDataInicio").value;
                    const dataFim = document.getElementById("filtroDataFim").value;

                    const filtradas = transacoes.filter(transacao => {
                        const tipoOk = !tipoFiltro || transacao.tipo === tipoFiltro;
                        const categoriaOk = !categoriaFiltro || transacao.categoria === categoriaFiltro;
                        const dataOk = (!dataInicio || transacao.data >= dataInicio) &&
                                       (!dataFim || transacao.data <= dataFim);
                        return tipoOk && categoriaOk && dataOk;
                    });

                    renderizarTransacoes(filtradas);
                });
        }

        window.onload = exibirHistorico;
    