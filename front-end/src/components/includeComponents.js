async function incluirComponente(id, caminho) {
  const res = await fetch(caminho);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

window.addEventListener("DOMContentLoaded", () => {
  incluirComponente("meu-header", "../../components/header.html");
  incluirComponente("meu-sidebar", "../../components/sidebar.html");
  incluirComponente("meu-footer", "../../components/footer.html");
});
