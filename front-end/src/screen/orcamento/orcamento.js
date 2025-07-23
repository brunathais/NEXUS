document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formOrcamento");
  const dadosOrc = document.getElementById("dadosOrcamento");
  const btnExportar = document.getElementById("btnExportar");
  const btnMassDelete = document.getElementById("btnMassDelete");
  const campos = ["essenciais", "naoEssenciais", "imprevistos", "reservaEmergencia"];

  // Máscara de moeda: apenas dígitos, agrupa milhares e duas casas decimais
  function aplicarMascara(input) {
    input.addEventListener("input", () => {
      let digits = input.value.replace(/\D/g, "");
      if (!digits) {
        input.value = "R$ 0,00";
        return;
      }
      const cents = parseInt(digits, 10);
      const reais = cents / 100;
      input.value = "R$ " + new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(reais);
    });
    input.addEventListener("blur", () => {
      if (!input.value || input.value === "R$ 0,") {
        input.value = "R$ 0,00";
      }
    });
  }
  campos.forEach(id => aplicarMascara(document.getElementById(id)));

  // Lê valor puro de string "R$ 1.234,56"
  const lerValor = str =>
    parseFloat(str.replace(/[R$\s\.]/g, "").replace(",", ".")) || 0;

  form.addEventListener("submit", async e => {
  e.preventDefault();
  
  const novo = {};
  for (const c of campos) {
    const val = lerValor(document.getElementById(c).value);
    if (val <= 0) return alert("Todos os campos devem ser maiores que zero.");
    novo[c] = val;
  }

  try {
    const res = await fetch("http://localhost:8080/orcamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo)
    });

    if (!res.ok) throw new Error("Erro ao salvar.");
    alert("Orçamento salvo!");
    form.reset();
    campos.forEach(id => document.getElementById(id).value = "R$ 0,00");
    render(); // atualiza lista
  } catch (err) {
    alert("Erro ao salvar orçamento.");
  }
});

async function render() {
  dadosOrc.innerHTML = "";
  try {
    const res = await fetch("http://localhost:8080/orcamentos");
    const lista = await res.json();

    lista.forEach((orc, i) => {
      const box = document.createElement("div");
      box.className = "orcamento-box";
      box.innerHTML = `<strong>Orçamento ${orc.id}</strong>`;

      const det = document.createElement("div");
      det.className = "orcamento-detalhes";
      det.style.display = "none";
      det.innerHTML = `
        <strong>Essenciais:</strong> R$ ${orc.essenciais.toFixed(2)}<br>
        <strong>Não Essenciais:</strong> R$ ${orc.naoEssenciais.toFixed(2)}<br>
        <strong>Imprevistos:</strong> R$ ${orc.imprevistos.toFixed(2)}<br>
        <strong>Reserva Emergência:</strong> R$ ${orc.reservaEmergencia.toFixed(2)}
      `;

      box.addEventListener("click", () => {
        det.style.display = det.style.display === "none" ? "block" : "none";
      });

      box.appendChild(det);
      dadosOrc.appendChild(box);
    });

  } catch (err) {
    alert("Erro ao carregar orçamentos.");
  }
}

btnMassDelete.addEventListener("click", async () => {
  if (!confirm("Deseja mesmo apagar todos os orçamentos?")) return;
  
  try {
    const res = await fetch("http://localhost:8080/orcamentos");
    const lista = await res.json();

    for (const item of lista) {
      await fetch(`http://localhost:8080/orcamentos/${item.id}`, { method: "DELETE" });
    }

    alert("Todos os orçamentos foram deletados.");
    render();
  } catch (err) {
    alert("Erro na deleção em massa.");
  }
});


  //localStorage funcional
  // Salva novo orçamento (limite 5, sem zeros)
  form.addEventListener("submit", e => {
    e.preventDefault();
    const lista = JSON.parse(localStorage.getItem("orcamentos")) || [];
    if (lista.length >= 5) return alert("Limite de 5 orçamentos atingido.");

    const novo = {};
    for (const c of campos) {
      const val = lerValor(document.getElementById(c).value);
      if (val <= 0) return alert("Todos os campos devem ser maiores que zero.");
      novo[c] = "R$ " + new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2
      }).format(val);
    }

    lista.push(novo);
    localStorage.setItem("orcamentos", JSON.stringify(lista));
    form.reset();
    campos.forEach(id => document.getElementById(id).value = "R$ 0,00");
    render();
  });

  // Renderiza lista com botões de editar
  function render() {
    dadosOrc.innerHTML = "";
    const lista = JSON.parse(localStorage.getItem("orcamentos")) || [];
    lista.forEach((orc, i) => {
      const box = document.createElement("div");
      box.className = "orcamento-box";
      box.innerHTML = `<strong>Orçamento ${i + 1}</strong>`;

      const det = document.createElement("div");
      det.className = "orcamento-detalhes";
      det.style.display = "none";
      det.innerHTML = `
        <strong>Essenciais:</strong> ${orc.essenciais}<br>
        <strong>Não Essenciais:</strong> ${orc.naoEssenciais}<br>
        <strong>Imprevistos:</strong> ${orc.imprevistos}<br>
        <strong>Reserva de Emergência:</strong> ${orc.reservaEmergencia}
      `;

      const editBtn = document.createElement("button");
      editBtn.className = "btn-edit";
      editBtn.textContent = "Editar";
      editBtn.onclick = () => {
        const arr = JSON.parse(localStorage.getItem("orcamentos")) || [];
        campos.forEach(c => {
          document.getElementById(c).value = arr[i][c];
        });
        arr.splice(i, 1);
        localStorage.setItem("orcamentos", JSON.stringify(arr));
        render();
      };

      box.addEventListener("click", () => {
        det.style.display = det.style.display === "none" ? "block" : "none";
      });

      box.appendChild(det);
      box.appendChild(editBtn);
      dadosOrc.appendChild(box);
    });
  }

  // Exporta todos em PDF
  btnExportar.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lista = JSON.parse(localStorage.getItem("orcamentos")) || [];
    if (!lista.length) return alert("Nenhum orçamento para exportar.");

    let y = 10;
    lista.forEach((orc, idx) => {
      doc.text(`Orçamento ${idx + 1}`, 10, y); y += 7;
      campos.forEach(c => {
        const label = c === "naoEssenciais"
          ? "Não Essenciais"
          : c === "reservaEmergencia"
            ? "Reserva Emergência"
            : c.charAt(0).toUpperCase() + c.slice(1);
        doc.text(`${label}: ${orc[c]}`, 12, y);
        y += 7;
      });
      y += 5;
      if (y > 280) { doc.addPage(); y = 10; }
    });
    doc.save("orcamentos.pdf");
  });

  // Deleção em massa com confirmação
  btnMassDelete.addEventListener("click", () => {
    if (confirm("Deseja mesmo continuar com a Deleção em Massa?")) {
      localStorage.removeItem("orcamentos");
      render();
    }
  });

  // Inicializa
  render();
});

