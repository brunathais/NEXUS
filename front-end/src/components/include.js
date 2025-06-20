function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');

  includes.forEach(async (el) => {
    const file = el.getAttribute('data-include');
    const response = await fetch(file);
    const content = await response.text();
    el.innerHTML = content;

    // Executar scripts dentro do conteúdo injetado (como o dropdown)
    const scripts = el.querySelectorAll("script");
    scripts.forEach(script => {
      const newScript = document.createElement("script");
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
    });
  });
}

// Executa assim que a página carregar
window.addEventListener('DOMContentLoaded', includeHTML);
