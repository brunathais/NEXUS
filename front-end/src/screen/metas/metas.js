const btnAdicionar = document.getElementById("btnAdicionar");

btnAdicionar.addEventListener("click", function () {
    const nome = document.getElementById("nomeMeta").value;
    const valorMeta = parseFloat(document.getElementById("valorMeta").value);
    const valorInicial = parseFloat(document.getElementById("valorInicial").value);

    if (!nome || isNaN(valorMeta) || isNaN(valorInicial)) {
        alert("Por favor, preencha todos os dados corretamente.");
        return;
    }

    const novaMeta = {
        nome: nome,
        valorMeta: valorMeta,
        valorInicial: valorInicial
    };

    let metas = JSON.parse(localStorage.getItem("metas")) || [];
    metas.push(novaMeta);
    localStorage.setItem("metas", JSON.stringify(metas)); // CORRIGIDO

    alert("Meta adicionada com sucesso!");

    exibirMetas();
    limparCampos();
});

function exibirMetas() {
    const container = document.getElementById("listaMetas");
    container.innerHTML = "";

    const metas = JSON.parse(localStorage.getItem("metas")) || [];

    metas.forEach((meta, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${meta.nome}</strong><br>
            Valor da Meta: R$ ${meta.valorMeta.toFixed(2)}<br>
            Valor Inicial: R$ ${meta.valorInicial.toFixed(2)}</p>
            <hr>
        `;
        container.appendChild(div);
    });
}

function limparCampos() {
    document.getElementById("nomeMeta").value = "";
    document.getElementById("valorMeta").value = "";
    document.getElementById("valorInicial").value = "";
}


window.onload = exibirMetas;
