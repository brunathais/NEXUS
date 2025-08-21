function enviarNotificacaoPorEmail() {
    const params = {
        to_name: "João",
        from_name: "NEXUS",
        message: "Você ultrapassou seu orçamento mensal.",
        user_email: "joao@email.com"
    };

    emailjs.send("seu_service_id", "seu_template_id", params)
            .then(function (res) {
                alert("Notificação enviada com sucesso!");
            }, function (err) {
                console.error("Erro ao enviar:", err);
            });
}

fetch("https://seuservidor.com/send-email", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({to: "user@email.com", subject: "Aviso", message: "..."})
});
