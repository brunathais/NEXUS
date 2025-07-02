
  function toggleNotificacoes() {
    alert("Notificações em breve!");
  }

  // Menu lateral em dispositivos móveis
  const sidebar = document.getElementById('sidebar');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

fetch("http://localhost:8080/api/resumo") // ajuste conforme seu endpoint real
  .then(res => res.json())
  .then(data => {
    const receitas = data.receitas;
    const despesas = data.despesas;
    const ctx = document.getElementById("graficoResumo").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Receitas", "Despesas"],
        datasets: [{
          label: "Resumo",
          data: [receitas, despesas],
          backgroundColor: ["#4CAF50", "#F44336"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Resumo Financeiro Mensal" }
        }
      }
    });
  });
