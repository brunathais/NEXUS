const records = [];
let rawValue = '';

const form = document.getElementById('finance-form');
const amountInput = document.getElementById('amount');
const barCtx = document.getElementById('barChart').getContext('2d');

let barChart = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      { label: 'Receitas', backgroundColor: '#4caf50', data: [] },
      { label: 'Despesas', backgroundColor: '#f44336', data: [] }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { position: 'top' } }
  }
});

function formatToBRL(value) {
  const cents = value.padStart(3, '0');
  const intPart = cents.slice(0, -2).replace(/^0+/, '') || '0';
  const decimalPart = cents.slice(-2);
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${formattedInt},${decimalPart}`;
}

amountInput.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/\D/g, '');
  rawValue = digits;
  e.target.value = formatToBRL(digits);
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const type = document.getElementById('type').value;
  const desc = document.getElementById('desc').value.trim();

  if (!type || !desc || rawValue === '' || rawValue === '0') {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const amount = parseFloat((parseInt(rawValue, 10) / 100).toFixed(2));

  try {
    await fetch('http://localhost:8080/graficos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tipo: type,
        descricao: desc,
        valor: amount
      })
    });

    this.reset();
    rawValue = '';
    amountInput.value = '';
    loadRecords(); // atualiza os gráficos com dados do banco
  } catch (error) {
    alert('Erro ao salvar. Verifique a API.');
    console.error(error);
  }
});

async function loadRecords() {
  try {
    const res = await fetch('http://localhost:8080/graficos');
    const data = await res.json();

    records.length = 0; // limpa array local
    data.forEach(item => {
      records.push({
        type: item.tipo,
        desc: item.descricao,
        amount: parseFloat(item.valor)
      });
    });

    updateCharts();
  } catch (error) {
    console.error('Erro ao carregar registros:', error);
  }
}

function updateCharts() {
  const labels = records.map((r, i) =>
    r.type === 'despesa' ? `Saída ${i + 1}` : `Entrada ${i + 1}`
  );
  const receitas = records.map(r => r.type === 'receita' ? r.amount : 0);
  const despesas = records.map(r => r.type === 'despesa' ? r.amount : 0);

  barChart.data.labels = labels;
  barChart.data.datasets[0].data = receitas;
  barChart.data.datasets[1].data = despesas;
  barChart.update();
}

document.addEventListener('DOMContentLoaded', loadRecords);
