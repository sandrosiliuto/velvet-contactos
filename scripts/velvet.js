// VELVET contactos — micro-interacciones SPA-like

(function () {
  'use strict';

  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (btn.closest('form') || btn.type === 'submit') return;
      e.preventDefault();
      pulse(btn);
    });
  });

  function pulse(element) {
    element.style.transform = 'scale(0.97)';
    setTimeout(() => {
      element.style.transform = '';
    }, 120);
  }

  // Entrada suave de secciones al scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((sec) => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(18px)';
    sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(sec);
  });

  // Simular indicador "VIP" siempre visible ya está maquetado
  console.log('VELVET contactos · EN LA VIDA TODO SON CONTACTOS · VIP');
})();
