$(document).ready(function(){
    $(".menu-item").hover(function(){
        var menuId = $(this).data("menu");
        $(".menu").hide();
        $("#menu-" + menuId).show();
    });
});
   // Función easeOutCubic para una animación más suave
   function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // Función para animar los números suavemente
  function animateNumbers(el, start, end, duration) {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);  // Suavizado
      el.textContent = Math.floor(easedProgress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Intersection Observer para detectar cuando la sección es visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numberElements = document.querySelectorAll('.stat-number');
        numberElements.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateNumbers(el, 0, target, 3000); // Duración de 3 segundos para una animación más suave
        });
        observer.disconnect(); // Detener el observer después de ejecutar la animación
      }
    });
  });

  // Aplicar el observer a la sección
  const statsSection = document.querySelector('.stats-section');
  observer.observe(statsSection);