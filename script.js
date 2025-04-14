// ↕️ Fonction : égaliser la hauteur des cartes projet
function equalizeProjectHeights() {
  const cards = document.querySelectorAll(".project-card");
  let maxHeight = 0;

  cards.forEach(card => {
    card.style.minHeight = "auto";
    card.style.visibility = "hidden";
    card.style.position = "absolute";
    card.style.display = "block";
  });

  cards.forEach(card => {
    const height = card.offsetHeight;
    if (height > maxHeight) maxHeight = height;
  });

  cards.forEach(card => {
    card.style.minHeight = `${maxHeight}px`;
    card.style.visibility = "";
    card.style.position = "";
    card.style.display = "";
  });
}

// 🌐 Global : ajustement à la taille de la fenêtre
window.addEventListener("resize", equalizeProjectHeights);

// 🧭 Global : bouton scroll to top
window.addEventListener("scroll", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 🌙 Mode sombre (persistance + toggle)
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  const toggleDark = document.getElementById('toggle-dark');
  toggleDark?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode',
      document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
  });

  // 🎞️ Animation fade-in à l’apparition
  const faders = document.querySelectorAll('.fade-in, .project-card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  faders.forEach(el => observer.observe(el));

  // 🖼️ Lightbox image
  const lightboxLinks = document.querySelectorAll('.lightbox');
  lightboxLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const src = e.target.src;
      const modal = document.createElement('div');
      modal.classList.add('lightbox-modal');
      modal.innerHTML = `
        <div class="lightbox-content">
          <img src="${src}" alt="Image agrandie" />
          <button class="close-lightbox">×</button>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('.close-lightbox').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    });
  });

  // 🎠 Carrousel projets
  const cards = document.querySelectorAll('.project-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let current = 0;

  // Création des "dots"
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      showCard(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      card.style.opacity = 0;
    });

    cards[index].classList.add('active');
    setTimeout(() => {
      cards[index].style.opacity = 1;
    }, 50);

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    current = index;
  }

  prevBtn?.addEventListener('click', () => {
    current = (current - 1 + cards.length) % cards.length;
    showCard(current);
  });

  nextBtn?.addEventListener('click', () => {
    current = (current + 1) % cards.length;
    showCard(current);
  });

  // ⏱️ Carrousel automatique toutes les X secondes
  setInterval(() => {
    current = (current + 1) % cards.length;
    showCard(current);
  }, 8000); // toutes les 8 secondes

  // Appel initial
  showCard(current);
  equalizeProjectHeights();

  // 🔝 Scroll to top
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
