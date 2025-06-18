document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
    const usuario = {
        nome : document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
    }


fetch("/usuarios", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(usuario)
});

alert("Boa!! usuario foi cadastrado com sucesso!!!!")

})