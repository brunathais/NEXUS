
        // Função que exibe ou oculta o campo de categoria dependendo do tipo selecionado
        function mostrarCategoria() {
            // Obtém o valor do tipo de transação selecionado (Receita ou Despesa)
            const tipo = document.querySelector('input[name="tipo"]:checked').value;
            const categoriaDiv = document.getElementById("categoria_div");
            
            // Se for Despesa, mostra o campo de categoria, caso contrário oculta
            categoriaDiv.style.display = tipo === "Despesa" ? "block" : "none";
        }

        // Função que salva a transação no localStorage
        function salvarTransacao() {
            // Captura os valores do formulário
            const tipo = document.querySelector('input[name="tipo"]:checked').value;
            const valor = document.getElementById("valor").value;
            const data = document.getElementById("data").value;
            const descricao = document.getElementById("descricao").value;
            let categoria = "";

            // Se for despesa, captura a categoria selecionada
            if (tipo === "Despesa") {
                categoria = document.getElementById("categoria").value;
            }

            // Validação: todos os campos obrigatórios devem ser preenchidos
            if (!valor || !data || !descricao || (tipo === "Despesa" && !categoria)) {
                alert("Todos os campos são obrigatórios!");
                return; // Para a execução caso algum campo não esteja preenchido
            }

            // Cria objeto da transação
            const transacao = { tipo, valor, data, descricao, categoria };

            // Recupera lista atual de transações do localStorage ou inicializa vazio
            let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

            // Verifica se está editando uma transação existente
            const idEditar = document.getElementById("editar_id").value;

            if (idEditar) {
                // Substitui a transação no índice específico
                transacoes[idEditar] = transacao;
            } else {
                // Adiciona nova transação ao array
                transacoes.push(transacao);
            }

            // Salva as transações atualizadas no localStorage
            localStorage.setItem("transacoes", JSON.stringify(transacoes));

            // Atualiza a exibição do histórico
            exibirHistorico();

            // Limpa os campos do formulário para nova entrada
            limparCampos();
        }

        // Função para preencher o formulário com dados de uma transação para edição
        function editarTransacao(index) {
            // Recupera as transações salvas
            const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
            const transacao = transacoes[index];

            // Preenche os campos com os dados da transação selecionada
            document.getElementById("valor").value = transacao.valor;
            document.getElementById("data").value = transacao.data;
            document.getElementById("descricao").value = transacao.descricao;

            // Ajusta o tipo e categoria conforme a transação selecionada
            if (transacao.tipo === "Despesa") {
                document.querySelector('input[name="tipo"][value="Despesa"]').checked = true;
                document.getElementById("categoria").value = transacao.categoria;
                document.getElementById("categoria_div").style.display = "block";
            } else {
                document.querySelector('input[name="tipo"][value="Receita"]').checked = true;
                document.getElementById("categoria_div").style.display = "none";
            }

            // Guarda o índice da transação que está sendo editada
            document.getElementById("editar_id").value = index;
        }

        // Função para excluir uma transação pelo índice
        function excluirTransacao(index) {
            let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
            // Remove a transação do array
            transacoes.splice(index, 1);

            // Atualiza o localStorage após exclusão
            localStorage.setItem("transacoes", JSON.stringify(transacoes));
            exibirHistorico();
        }

        // Exibe o histórico de todas as transações armazenadas
        function exibirHistorico() {
            const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
            const historicoDiv = document.getElementById("historico");

            // Limpa o conteúdo anterior
            historicoDiv.innerHTML = "";

            // Para cada transação cria um bloco com seus dados e botões de ação
            transacoes.forEach((transacao, index) => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <strong>${transacao.tipo} ${index + 1}:</strong><br>
                    Valor: R$${transacao.valor}<br>
                    Data: ${transacao.data}<br>
                    Descrição: ${transacao.descricao}<br>
                    ${transacao.tipo === "Despesa" ? "Categoria: " + transacao.categoria + "<br>" : ""}
                    <button onclick="editarTransacao(${index})">Editar</button>
                    <button onclick="excluirTransacao(${index})">Excluir</button><br><br>
                `;
                historicoDiv.appendChild(div);
            });
        }

        // Filtra as transações exibidas de acordo com os filtros selecionados
        function filtrarHistorico() {
            const tipoFiltro = document.getElementById("filtroTipo").value;
            const categoriaFiltro = document.getElementById("filtroCategoria").value;
            const dataInicioFiltro = document.getElementById("filtroDataInicio").value;
            const dataFimFiltro = document.getElementById("filtroDataFim").value;

            const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

            // Aplica os filtros selecionados na lista de transações
            const transacoesFiltradas = transacoes.filter(transacao => {
                const tipoValido = tipoFiltro ? transacao.tipo === tipoFiltro : true;
                const categoriaValida = categoriaFiltro ? transacao.categoria === categoriaFiltro : true;
                const dataValida = (dataInicioFiltro ? transacao.data >= dataInicioFiltro : true) &&
                    (dataFimFiltro ? transacao.data <= dataFimFiltro : true);

                return tipoValido && categoriaValida && dataValida;
            });

            const historicoDiv = document.getElementById("historico");
            historicoDiv.innerHTML = "";

            // Exibe as transações filtradas na tela
            transacoesFiltradas.forEach((transacao, index) => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <strong>${transacao.tipo} ${index + 1}:</strong><br>
                    Valor: R$${transacao.valor}<br>
                    Data: ${transacao.data}<br>
                    Descrição: ${transacao.descricao}<br>
                    ${transacao.tipo === "Despesa" ? "Categoria: " + transacao.categoria + "<br>" : ""}
                    <button onclick="editarTransacao(${index})">Editar</button>
                    <button onclick="excluirTransacao(${index})">Excluir</button><br><br>
                `;
                historicoDiv.appendChild(div);
            });
        }

        // Limpa os campos do formulário após salvar ou cancelar edição
        function limparCampos() {
            document.getElementById("valor").value = "";
            document.getElementById("data").value = "";
            document.getElementById("descricao").value = "";
            document.getElementById("editar_id").value = "";
            document.querySelector('input[name="tipo"][value="Receita"]').checked = true; // Reseta para Receita
            document.getElementById("categoria").value = "Essenciais"; // Categoria padrão
            mostrarCategoria(); // Atualiza a visibilidade do campo categoria
        }

        // Quando a página carrega, exibe o histórico de transações salvas
        window.onload = exibirHistorico;

