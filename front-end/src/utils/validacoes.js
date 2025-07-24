export function obterValorPorId(id) {
    return document.getElementById(id).value.trim();
}

export function obterValores(ids) {
    const valores = {};
    ids.forEach(id => {
        valores[id] = obterValorPorId(id); 
    });
    return valores;
}

// Valida email com regex
export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostra mensagens de feedback
export function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo;
    mensagemDiv.innerText = texto;
}

// Verifica se já existe usuário ou email
export function usuarioExistente(usuario, email) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.some(u => u.usuario === usuario || u.email === email);
}

// Salva um novo usuário
export function salvarUsuario({ usuario, email, senha }) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ usuario, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
