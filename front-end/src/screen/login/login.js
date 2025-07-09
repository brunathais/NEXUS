document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("usuario").value.trim();
    const senhaInput = document.getElementById("senha").value.trim();

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // limpa antes

    // Validações
    if (!usuarioInput || !senhaInput) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }

    if (senhaInput.length < 6) {
        exibirMensagem("Senha deve ter pelo menos 6 caracteres!", "erro");
        return;
    }

    // Busca usuários salvos
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se existe com nome ou email + senha
    const usuarioEncontrado = usuarios.find(u =>
        (u.nome === usuarioInput || u.email === usuarioInput) && u.senha === senhaInput
    );

    if (usuarioEncontrado) {
        exibirMensagem(`Bem-vindo, ${usuarioEncontrado.nome}!`, "sucesso");

        setTimeout(() => {
            window.location.href = "../home/home.html";
        }, 2000);
    } else {
        exibirMensagem("Usuário ou senha incorretos.", "erro");
    }
});

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo; // mensagem erro ou mensagem sucesso
    mensagemDiv.innerText = texto;
}

/*
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // limpa antes

    // Validações simples
    if (!usuario || !senha) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }

    if (senha.length < 6) {
        exibirMensagem("Senha deve ter pelo menos 6 caracteres!", "erro");
        return;
    }

    const usuarioDTO = {
        usuario: usuario, // pode ser nome ou email, seu backend decide
        senha: senha
    };

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioDTO),
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || "Erro ao fazer login");
        }

        const mensagem = await response.text();
        exibirMensagem(mensagem || "Login realizado com sucesso!", "sucesso");

        setTimeout(() => {
            window.location.href = "../home/home.html";
        }, 2000);
        
    } catch (error) {
        exibirMensagem("Erro: " + error.message, "erro");
    }
});

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo; // Ex: mensagem erro ou mensagem sucesso
    mensagemDiv.innerText = texto;
}


/* 
import { validarLogin } from "../../utils/validarForm";
import { postJSON } from "../../services/api";

const erro = validarLogin({ usuario, senha });
if (erro) {
    mostrarErro(erro);
    return;
}

await postJSON("localhost:8080/login", usuarioDTO)
*/

function efetuarLogin() {
    const usuarioInput = document.getElementById("nome").value.trim();
    const senhaInput = document.getElementById("senha").value.trim();


    if (!usuarioInput || !senhaInput) {
        alert("Preencha todos os campos!");
        return;
    }


    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const usuarioEncontrado = usuarios.find(u =>
        (u.nome === usuarioInput || u.email === usuarioInput) && u.senha === senhaInput
    );


    if (usuarioEncontrado) {
        alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
        window.location.href = "../home/home.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}


