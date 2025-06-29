function obterValorCampo(id) {
    return document.getElementById(id).value.trim(); //o trim() tira espaços em branco do inicio e fim
}

function obterDadosCadastro() {
    return {
        nome: obterValorCampo("nome"),
        email: obterValorCampo("email"),
        senha: obterValorCampo("senha"),
        confirmarSenha: obterValorCampo("confirmarSenha")
    }
}

function obterDadosLogin() {
    return {
        nome: obterValorCampo("nome"), //oq faz o :
        senha: obterValorCampo("senha")
    }
}

function efetuarLogin() {
document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o reload da página, para usar o fetch
        const { nome, senha } = obterDadosLogin(); //forma de desestruturação eu acho, pega as consts que estão na função

        if (!nome || !senha) {
            alert("Preencha os campos! Todos são obrigatórios para o Login!")
            return;
        }
    })
}

function efetuarCadastro() {
    const { nome, email, senha, confirmarSenha } = obterDadosCadastro();

    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) { //! inverte o valor true e false
        alert("Preencha os campos! Todos são obrigatórios para o Cadastro!")
        return;
    }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
    alert("digite email valido");
    return;
}

if (senha !== confirmarSenha) {
    alert("As senhas são diferentes!");
    return;
}

if(senha.lenght < 6){
    alert("senha deve ter no min 6 caracteres");
    return;
}


// DTO que será enviado no corpo da requisição
const UsuarioDTO = {  //aqui junção do js com java
    nome: varnome, // essa parte oq faz? de onde tem essas variaveis?
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


