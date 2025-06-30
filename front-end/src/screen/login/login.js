import { obterValorCampo, verificarTamanhoSenha, camposNaoVazios } from "../../utils/validacoes";
import { postJSON } from "../../services/api.js";

await postJSON("http://localhost:8080/login", loginDTO)

function obterDadosLogin() {
    return {
        usuario: obterValorCampo("usuario"), //oq faz o :
        senha: obterValorCampo("senha")
    }
}

function efetuarLogin() {
document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o reload da página, para usar o fetch
        const { usuario, senha } = obterDadosLogin(); //forma de desestruturação eu acho, pega as consts que estão na função

        if(!camposNaoVazios([usuario, senha])){
            alert("Preencha os campos! Todos são obrigatórios para o Login!");
            return;
        }
        if(!verificarTamanhoSenha(senha)){
            alert("senha muito curta!");
            return;
        }
    })
}

        // DTO que será enviado no corpo da requisição
        const dto = {
            usuario: usuario,
            senha: senha
        }

        // Configuração da requisição

        fetch("http://localhost:8080/usuarios/login", { //conferir rota
            method: "POST", // Método HTTP
            headers: {
                "Content-Type": "application/json", // Tipo de conteúdo enviado
            },
            body: JSON.stringify(dto), // Converte o DTO para JSON
        })
            .then((response) => { //opcional
                if (!response.ok) {
                    throw new Error("Usuário ou senha inválidos");
                }
                return response.json(); // Receber a mensagem de sucesso
            })
            .then((data) => {
                alert(data); // Exibe a mensagem retornada pelo backend
                // Redirecionar para o dashboard (caso necessário)
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error(error);
                alert("Falha no login. Verifique suas credenciais e tente novamente. Erro: " + error.message); // Exibe a mensagem de erro
            });
