const form = document.getElementById('formDivida');
const tabela = document.getElementById('tabelaDividas');

let dividas = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const juros = parseFloat(document.getElementById('juros').value);
    const parcelas = parseInt(document.getElementById('parcelas').value);
    const primeiraParcela = new Date(document.getElementById('primeiraParcela').value);

    const proxVencimento = primeiraParcela.toLocaleDateString('pt-BR');

    const divida = { descricao, valor, juros, parcelas, proxVencimento };
    dividas.push(divida);

    atualizarTabela();
});

function atualizarTabela() {
    tabela.innerHTML = "";
    dividas.forEach(d => {
        tabela.innerHTML += `
        <tr>
            <td>${d.descricao}</td>
            <td>R$ ${d.valor.toFixed(2)}</td>
            <td>${d.parcelas}</td>
            <td>${d.juros}%</td>
            <td>${d.proxVencimento}</td>
        </tr>`;
    });
}
