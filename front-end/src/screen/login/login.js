// usando local storage
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("usuario").value.trim();
    const senhaInput = document.getElementById("senha").value.trim();

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // limpa antes

    if (!usuarioInput || !senhaInput) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }

    if (senhaInput.length < 8) {
        exibirMensagem("Senha deve ter pelo menos 8 caracteres!", "erro");
        return;
    }

    // Busca usuários salvos
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se existe com nome ou email + senha
    const usuarioEncontrado = usuarios.find(u =>
        (u.usuario === usuarioInput || u.email === usuarioInput) && u.senha === senhaInput
    );

    if (usuarioEncontrado) {
        exibirMensagem(`Bem-vindo, ${usuarioEncontrado.usuario}!`, "sucesso");

        setTimeout(() => {
            window.location.href = "../home/home.html";
        }, 2000);
    } else {
        exibirMensagem("Usuário ou senha incorretos.", "erro");
    }

    if(usuarioInput.length > 50 || senhaInput.length > 50){
        exibirMensagem("O maximo de caracteres desse campo é 50")
        return;
    }
});

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo; // mensagem erro ou mensagem sucesso
    mensagemDiv.innerText = texto;
}

function efetuarLogin() {
    const usuarioInput = document.getElementById("usuario").value.trim();
    const senhaInput = document.getElementById("senha").value.trim();


    if (!usuarioInput || !senhaInput) {
        alert("Preencha todos os campos!");
        return;
    }


    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const usuarioEncontrado = usuarios.find(u =>
        (u.usuario === usuarioInput || u.email === usuarioInput) && u.senha === senhaInput
    );


    if (usuarioEncontrado) {
        alert(`Bem-vindo, ${usuarioEncontrado.usuario}!`);
        window.location.href = "../home/home.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
    
}
function toggleSenha(idCampo, icone) {
    const campo = document.getElementById(idCampo);
    const mostrando = campo.type === "text";

    campo.type = mostrando ? "password" : "text";
    icone.textContent = mostrando ? "🙈" : "👁️";
}


