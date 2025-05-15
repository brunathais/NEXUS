document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o reload da página

    // Obter valores dos campos do formulário
    const usuario = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    // DTO que será enviado no corpo da requisição
    const dto = {
        usuario: usuario,
        senha: senha
       }

        

    // Configuração da requisição
    fetch("http://localhost:8080/usuarioController/autenticar", {
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
            return response.text(); // Receber a mensagem de sucesso
        })
        .then((data) => {
            alert(data); // Exibe a mensagem retornada pelo backend
            // Redirecionar para o dashboard (caso necessário)
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Erro: " + error.message); // Exibe a mensagem de erro
        });
});


