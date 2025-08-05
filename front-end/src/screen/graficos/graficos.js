// registros em memória
const records = [];

// tenta carregar do localStorage
const savedRecords = localStorage.getItem('financeRecords');
if (savedRecords) {
  records = JSON.parse(savedRecords);
  updateCharts();
}

// contextos dos gráficos

const barCtx = document.getElementById('barChart').getContext('2d');


// // inicializa pieChart sem frestas
// let pieChart = new Chart(pieCtx, {
//   type: 'pie',
//   data: {
//     labels: ['Receitas', 'Despesas'],
//     datasets: [{
//       data: [0, 0],
//       backgroundColor: ['#4caf50', '#f44336'],
//       borderWidth: 0
//     }]
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       tooltip: { enabled: true },
//       legend: { position: 'top' }
//     }
//   }
// });


// inicializa barChart
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


// atualiza gráficos
function updateCharts() {
  const totalReceitas = records
    .filter(r => r.type === 'receita')
    .reduce((acc, r) => acc + r.valor, 0);
  const totalDespesas = records
    .filter(r => r.type === 'despesa')
    .reduce((acc, r) => acc + r.valor, 0);


  


const labels = records.map(r => r.desc);

  const receitas = records.map(r => r.type === 'receita' ? r.valor : 0);
  const despesas = records.map(r => r.type === 'despesa' ? r.valor : 0);


  barChart.data.labels = labels;
  barChart.data.datasets[0].data = receitas;
  barChart.data.datasets[1].data = despesas;
  barChart.update();
}


// campo de valor com máscara monetária brasileira
const form = document.getElementById('finance-form');
const valorInput = document.getElementById('valor');


let rawValue = '';


function formatToBRL(value) {
  const cents = value.padStart(3, '0');
  const intPart = cents.slice(0, -2).replace(/^0+/, '') || '0';
  const decimalPart = cents.slice(-2);
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${formattedInt},${decimalPart}`;
}


valorInput.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/\D/g, '');
  rawValue = digits;
  e.target.value = formatToBRL(digits);
});


form.addEventListener('submit', function (e) {
  e.preventDefault();
  const type = document.getElementById('type').value;
  const desc = document.getElementById('desc').value.trim();


  if (!type || !desc || rawValue === '' || rawValue === '0') {
    alert('Preencha todos os campos corretamente.');
    return;
  }


  const valor = parseFloat((parseInt(rawValue, 10) / 100).toFixed(2));
  records.push({ type, desc, valor });


  // ... código anterior ...

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const type = document.getElementById('type').value;
    const desc = document.getElementById('desc').value.trim();

    if (!type || !desc || rawValue === '' || rawValue === '0') {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const valor = parseFloat((parseInt(rawValue, 10) / 100).toFixed(2));
    records.push({ type, desc, valor });

    // Salva no localStorage
    localStorage.setItem('financeRecords', JSON.stringify(records));

    this.reset();
    rawValue = '';
    valorInput.value = '';
    updateCharts();
  });


  this.reset();
  rawValue = '';
  valorInput.value = '';
  updateCharts();
});
