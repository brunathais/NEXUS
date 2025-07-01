import { obterValorCampo, verificarEmail, verificarSenhasIguais, verificarTamanhoSenha, camposNaoVazios } from "../../utils/validacoes";
import { postJSON } from "../../services/api.js";
import { mostrarErro, mostrarMensagem, limparMensagem } from "../../utils/mensagens.js";
import { validarCadastro } from "../../utils/validarFormulario.js";

await postJSON("http://localhost:8080/usuarios", loginDTO)


const erro = validarCadastro({ usuario, email, senha, confirmarSenha })

if (erro) {
    mostrarErro(erro);
    return;
}

function obterDadosCadastro() {
    return {
        usuario: obterValorCampo("usuario"),
        email: obterValorCampo("email"),
        senha: obterValorCampo("senha"),
        confirmarSenha: obterValorCampo("confirmarSenha")
    }
}

function efetuarCadastro() {
    limparMensagem();

    const { usuario, email, senha, confirmarSenha } = obterDadosCadastro();

    if (!camposNaoVazios([usuario, email, senha, confirmarSenha])) {
        mostrarMensagem("erro", "Preencha os campos! Todos são obrigatórios para o Cadastro!");
        return;
    }

    if (!verificarEmail(email)) {
        mostrarMensagem("erro","email invalido");
        return;
    }

    if (senha !== confirmarSenha) {
        mostrarMensagem("erro","senhas diferentes!");
        return;
    }
    if (!verificarTamanhoSenha(email)) {
        alert("erro","senha deve ter no min 6 caracteres");
        return;
    }
}

// DTO que será enviado no corpo da requisição
const UsuarioDTO = {  //aqui junção do js com java
    usuario: varUsuario, // essa parte oq faz? de onde tem essas variaveis?
    email: email,
    senha: senha
};

try {
    await postJSON("http://localhost:8080/usuarios", {nome, email, senha});
    mostrarMensagem("sucesso", "Cadastro realizado com sucesso!");
    setTimeout(() => window.location.href = "../login/login.html", 1500);
} catch (error){
    mostrarMensagem("erro", error.message);
}

/*
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

*/

/*
.then(response => {
  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos");
  }
  return response.text();
})
.then(data => {
  alert("Login bem-sucedido!");
  window.location.href = "../home/home.html";
})
.catch(error => {
  alert(error.message);
});

*/