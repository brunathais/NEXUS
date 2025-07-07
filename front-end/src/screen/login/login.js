
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


