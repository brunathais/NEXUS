    function toggleSidebar() {
      const sidebar = document.querySelector('.sidebar');
      const button = document.getElementById('toggleButton');
      sidebar.classList.toggle('active');

      if (sidebar.classList.contains('active')) {
        button.innerHTML = '&times;';
        button.setAttribute('aria-label', 'Fechar menu lateral');
      } else {
        button.innerHTML = '&#9776;';
        button.setAttribute('aria-label', 'Abrir menu lateral');
      }
    }

    function toggleNotificacoes() {
      const menu = document.getElementById('notificacao-menu');
      const icone = document.querySelector('.icone-notificacao');
      menu.classList.toggle('show');

      // Atualiza atributo aria para acessibilidade
      const expanded = menu.classList.contains('show');
      icone.setAttribute('aria-expanded', expanded);
      menu.setAttribute('aria-hidden', !expanded);
    }

    // Fecha o menu de notificações ao clicar fora
    document.addEventListener('click', function (e) {
      const menu = document.getElementById('notificacao-menu');
      const icone = document.querySelector('.icone-notificacao');
      if (!menu.contains(e.target) && !icone.contains(e.target)) {
        menu.classList.remove('show');
        icone.setAttribute('aria-expanded', false);
        menu.setAttribute('aria-hidden', true);
      }
    });
