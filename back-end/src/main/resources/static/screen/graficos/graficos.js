import { getJSON } from "../../services/api.js";

// URL base da API (pode sobrescrever no HTML: window.API_BASE_URL = "http://ip:porta")
const API_BASE = (window.API_BASE_URL || "http://localhost:8080");

// ===== Gráfico de barras =====
let barChart;

async function carregarMensal(ano) {
  try {
    const data = await getJSON(`${API_BASE}/graficos/mensal?ano=${ano}`);
    const meses = data.meses || [];

    const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const receitas = meses.map(m => Number(m.receitas));
    const despesas = meses.map(m => Number(m.despesas));
    const essenciais = meses.map(m => Number(m.essenciais));
    const naoEssenciais = meses.map(m => Number(m.nao_essenciais));
    const imprevistos = meses.map(m => Number(m.imprevistos));

    const ctx = document.getElementById('barChart').getContext('2d');
    if (barChart) {
      barChart.data.datasets[0].data = receitas;
      barChart.data.datasets[1].data = despesas;
      barChart.data.datasets[2].data = essenciais;
      barChart.data.datasets[3].data = naoEssenciais;
      barChart.data.datasets[4].data = imprevistos;
      barChart.update();
    } else {
      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: 'Receitas', backgroundColor: '#4caf50', data: receitas },
            { label: 'Despesas Totais', backgroundColor: '#f44336', data: despesas },
            { label: 'Essenciais', backgroundColor: '#e53935', data: essenciais },
            { label: 'Não Essenciais', backgroundColor: '#fb8c00', data: naoEssenciais },
            { label: 'Imprevistos', backgroundColor: '#8e24aa', data: imprevistos }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
          plugins: { legend: { position: 'top' } }
        }
      });
    }
  } catch (err) {
    console.error("Erro ao carregar dados do back-end:", err);
  }
}

// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
  const anoAtual = new Date().getFullYear();
  carregarMensal(anoAtual);
});
