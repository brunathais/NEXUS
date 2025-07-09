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