import { obterValorCampo, verificarEmail, verificarSenhasIguais, verificarTamanhoSenha, camposNaoVazios } from "../../utils/validacoes";
import { postJSON } from "../../services/api.js";
import { mostrarErro, mostrarSucesso } from "../../utils/mensagens.js";

await postJSON("http://localhost:8080/usuarios", loginDTO)

function obterDadosCadastro() {
    return {
        usuario: obterValorCampo("usuario"),
        email: obterValorCampo("email"),
        senha: obterValorCampo("senha"),
        confirmarSenha: obterValorCampo("confirmarSenha")
    }
}

function efetuarCadastro() {
    const { usuario, email, senha, confirmarSenha } = obterDadosCadastro();

    if(!camposNaoVazios([usuario, email, senha, confirmarSenha])){
        alert("Preencha os campos! Todos são obrigatórios para o Cadastro!");
        return;
    }

    if(!verificarEmail(email)){
        alert("email invalido");
        return;
    }

    if(!verificarSenhasIguais(senha, confirmarSenha)){
        alert("senhas diferentes!");
        return;
    }
    if(!verificarTamanhoSenha(email)){
        alert("senha deve ter no min 6 caracteres");
        return;
    }
}


// DTO que será enviado no corpo da requisição
const UsuarioDTO = {  //aqui junção do js com java
    usuario: varUsuario, // essa parte oq faz? de onde tem essas variaveis?
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


