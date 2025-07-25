export function getById(id) {
    return document.getElementById(id);
}

export function getValue(id) {
    return getById(id).value.trim();
}

export function exibirMensagem(texto, tipo, id = "mensagem") {
    const mensagemDiv = getById(id);
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.innerText = texto;
    mensagemDiv.style.display = "block";
}

export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function carregarLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}

export function salvarLocalStorage(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}
