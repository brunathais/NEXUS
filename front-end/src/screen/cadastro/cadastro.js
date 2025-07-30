document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmar-senha").value.trim();

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // limpa antes

    // Validações
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

/*
    if(usuario.length > 50 || email.length > 50 || senha.length > 50 || confirmarSenha > 50){
        exibirMensagem("O maximo de caracteres para esse campo é 50", "erro");
        return;
    }
    */

    // LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar duplicidade por usuario ou email
    const jaExiste = usuarios.some(u => u.usuario === usuario || u.email === email);
    if (jaExiste) {
        exibirMensagem("Já existe um usuário com esse nome ou email.", "erro");
        return;
    }

    // Adiciona novo usuário
    usuarios.push({ usuario, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirMensagem("Cadastro realizado com sucesso! Redirecionando...", "sucesso");

    setTimeout(() => {
        window.location.href = "../login/login.html";
    }, 2000);
});

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo;
    mensagemDiv.innerText = texto;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function toggleSenha(idCampo, icone) {
    const campo = document.getElementById(idCampo);
    const mostrando = campo.type === "text";

    campo.type = mostrando ? "password" : "text";
    icone.textContent = mostrando ? "🙈" : "👁️";
}

document.addEventListener("DOMContentLoaded", () => {
    const campos = [
        { id: "usuario", max: 50 },
        { id: "email", max: 100 },
        { id: "senha", max: 20 },
        { id: "confirmar-senha", max: 20 }
    ];

    campos.forEach(({ id, max }) => {
        const input = document.getElementById(id);
        const contador = document.getElementById(`${id}-contador`);

        const atualizarContador = () => {
            contador.textContent = `${input.value.length}/${max}`;
        };

        input.addEventListener("input", atualizarContador);
        atualizarContador(); // já atualiza ao carregar a página
    });
});


/*
document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmar-senha").value.trim();

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // limpa antes

    // Validações
    if (!usuario || !email || !senha || !confirmarSenha) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }
    if (!validarEmail(email)) {
        exibirMensagem("Digite um email válido!", "erro");
        return;
    }
    if (senha.length < 6) {
        exibirMensagem("Senha deve ter pelo menos 6 caracteres!", "erro");
        return;
    }
    if (senha !== confirmarSenha) {
        exibirMensagem("As senhas não conferem!", "erro");
        return;
    }

    // Monta DTO para enviar pro Java Spring
    const usuarioDTO = {
        usuario: usuario,
        email: email,
        senha: senha
    };

    try {
        const response = await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioDTO),
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || "Erro ao cadastrar");
        }

        const mensagem = await response.text();
        exibirMensagem(mensagem || "Cadastro realizado com sucesso!", "sucesso");

        setTimeout(() => {
            window.location.href = "../login/login.html";
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

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


/*
import { validarCadastro } from "../../utils/validarForm";
import { postJSON } from "../../services/api";

const erro = validarCadastro({ usuario, email, senha, confirmarSenha });
if (erro) {
    mostrarErro(erro);
    return;
}

await postJSON("http://localhost:8080/usuarios", usuarioDTO);

/*
function efetuarCadastro() {

    // Buscar usuarios já cadastrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica duplicidade
    const jaExiste = usuarios.some(u => u.nome === nome || u.email === email);

    if (jaExiste) {
        alert("Já existe um usuário com esse nome ou email.");
        return;
    }

    // Adiciona novo usuario
    usuarios.push({ nome, email, senha });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso! Faça login.");

    window.location.href = "../login/login.html";
}
    */


/*
    function efetuarLogin() {
        //event.preventDefault(); // Evita o reload da página

        // Obter valores dos campos do formulário
        const varnome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        // Validação no frontend
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // DTO que será enviado no corpo da requisição
        const UsuarioDTO = {  //aqui junção do js com java
            nome: varnome,
            email: email,
            senha: senha
        };


    // Configuração da requisição
    fetch("http://localhost:8080/usuarios", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Tipo de conteúdo enviado
        },
        body: JSON.stringify(UsuarioDTO), // Converte o DTO para JSON
    })
        .then((response) => { //opcional
            if (!response.ok) {
                throw new Error("Erro ao cadastrar o usuário");
            }
            return response.text(); // Receber a mensagem de sucesso
        })
        .then((data) => {
            alert(data); // Exibe a mensagem retornada pelo backend
            // Redirecionar para o dashboard (caso necessário)
            window.location.href = "../login/login.html";
        })
        .catch((error) => {
            alert("Erro: " + error.message); // Exibe a mensagem de erro
        });
}


*/