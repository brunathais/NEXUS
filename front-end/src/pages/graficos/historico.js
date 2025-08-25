document.addEventListener('DOMContentLoaded', () => {
  const btnVoltar = document.getElementById('btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = 'graficos.html'; // Ajuste o caminho conforme seu projeto
      }, 500);
    });
  }
});
