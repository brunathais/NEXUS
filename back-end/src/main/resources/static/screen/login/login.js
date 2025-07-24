document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

const usuario = document.getElementById("usuario").value.trim();
const senha = document.getElementById("senha").value.trim();

const loginDTO = { usuario, senha }; // <-- usar somente 'usuario' aqui

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = "";

    if (!usuario || !senha) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }
    if (senha.length < 8) {
        exibirMensagem("Senha deve ter pelo menos 8 caracteres!", "erro");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDTO),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.erro || "Erro ao fazer login");
        }

        exibirMensagem(data.mensagem || "Login realizado com sucesso!", "sucesso");
        setTimeout(() => {
            window.location.href = "../home/home.html";
        }, 2000);

    } catch (error) {
        exibirMensagem("Erro: " + error.message, "erro");
    }
});

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo;
    mensagemDiv.innerText = texto;
}

/*
// com local storage
document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmar-senha").value.trim();

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = "";

    if (!usuario || !email || !senha || !confirmarSenha) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }
    if (!validarEmail(email)) {
        exibirMensagem("Digite um email válido!", "erro");
        return;
    }
    if (senha.length < 8) {
        exibirMensagem("Senha deve ter pelo menos 8 caracteres!", "erro");
        return;
    }
    if (senha !== confirmarSenha) {
        exibirMensagem("As senhas não conferem!", "erro");
        return;
    }

    // DTO para o backend
    const cadastroDTO = {
        nome: usuario,
        email: email,
        senha: senha
    };

    try {
        const response = await fetch("http://localhost:8080/cadastros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cadastroDTO),
        });

        const data = await response.json();

        if (!response.ok) {
            let erros = "";
            for (const campo in data) {
                erros += `${campo}: ${data[campo]}\n`;
            }
            throw new Error(erros);
        }

        exibirMensagem(data.mensagem || "Cadastro realizado com sucesso!", "sucesso");
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);

    } catch (error) {
        exibirMensagem("Erro:\n" + error.message, "erro");
    }
});

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo;
    mensagemDiv.innerText = texto;
}
*/

/*
// usando local storage
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

*/


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


