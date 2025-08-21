document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const saldo = localStorage.getItem("saldoUsuario") || "0.00";
    const meta = localStorage.getItem("metaUsuario") || "0.00";

    if (usuario) {
        document.getElementById("user-nome").textContent = usuario.nome || "Sem nome";
        document.getElementById("user-email").textContent = usuario.email || "Sem email";
    } else {
        document.getElementById("user-nome").textContent = "Não logado";
        document.getElementById("user-email").textContent = "-";
    }

    document.getElementById("user-saldo").textContent = `R$ ${parseFloat(saldo).toFixed(2)}`;
    document.getElementById("user-meta").textContent = parseFloat(meta).toFixed(2);
});

function editarPerfil() {
    alert("Função de edição em breve!");
}
