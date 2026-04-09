// Theme
const toggle = document.getElementById("themeToggle");
const html = document.documentElement;
const saved = localStorage.getItem("hp-theme");
if (saved) html.setAttribute("data-theme", saved);
toggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("hp-theme", next);
});

// Hamburger
const burger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".anim").forEach((el) => observer.observe(el));

// Contact form
const form = document.getElementById("contact-form");
const button = form.querySelector(".submit-btn");

form.addEventListener("submit", () => {
  button.innerText = "Enviando...";
  button.disabled = true;
});

//redirecionamento do form

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/xwpappdj", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    window.location.href = "/obrigado.html";
  } else {
    alert("Erro ao enviar. Tente novamente.");
  }
});
