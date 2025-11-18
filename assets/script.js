document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Form submission handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    // Adicionar validação no campo de telefone
    const telefoneInput = contactForm.querySelector('input[type="tel"]');

    telefoneInput.addEventListener("input", function (e) {
      // Remove tudo que não é número
      let value = e.target.value.replace(/\D/g, "");

      // Formata o telefone (11) 91234-5678
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
      }

      e.target.value = value;
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validar telefone
      const telefone = telefoneInput.value.replace(/\D/g, "");

      if (telefone.length < 10 || telefone.length > 11) {
        alert(
          "❌ Por favor, digite um telefone válido com DDD.\nExemplo: (11) 91234-5678"
        );
        telefoneInput.focus();
        return;
      }

      const btn = this.querySelector("button");
      btn.textContent = "Enviando...";
      btn.disabled = true;

      // Enviar para Formspree
      fetch(this.action, {
        method: "POST",
        body: new FormData(this),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("✅ Obrigado por entrar em contato! Retornaremos em breve.");
            contactForm.reset();
          } else {
            alert("❌ Erro ao enviar. Tente novamente.");
          }
        })
        .catch((error) => {
          alert("❌ Erro de conexão. Verifique sua internet.");
          console.error("Erro:", error);
        })
        .finally(() => {
          btn.textContent = "Enviar Mensagem";
          btn.disabled = false;
        });
    });
  }

  // Add animation on scroll for elements
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
  });

  // Observe service cards and portfolio items
  document.querySelectorAll(".service-card, .portfolio-item").forEach((el) => {
    observer.observe(el);
  });
});
