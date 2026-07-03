const burger = document.getElementById("navBurger");
const links = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  links.classList.toggle("open");
});

links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => links.classList.remove("open"));
});

const projects = {
  mopar: {
    title: "Campaña Lubricantes MOPAR 2026",
    stack: "React 18 · Vite · Tailwind CSS · Supabase (PostgreSQL) · ExcelJS · Google Apps Script · Vercel",
    images: ["assets/mopar-hero.webp", "assets/mopar-dashboard.webp"],
    link: "https://serviciomopar.com",
    descriptionHTML: `
      <p>Plataforma web para la campaña de lubricantes MOPAR (Stellantis Argentina). Los concesionarios de Jeep, RAM, Fiat, Peugeot y Citroën descargan material POP, suben evidencia fotográfica y los participantes registran sus cambios de aceite para entrar al sorteo.</p>
      <p><strong>Mi rol:</strong> desarrollo full stack + diseño de producto, desde cero.</p>
      <p><strong>Lo más destacado:</strong></p>
      <ul>
        <li>Dashboard interno con métricas en tiempo real: participantes, conversión por marca, % de concesionarios con evidencia POP.</li>
        <li>Descarga de Excel con estado por concesionario (registrado / no registrado / evidencia POP sí o no), con lógica de matching normalizado para evitar doble conteo.</li>
        <li>Formulario de evidencia integrado con Google Drive que crea carpetas automáticamente por concesionario.</li>
        <li>Gestión de red de +300 concesionarios distribuidos en 5 marcas y 23 provincias.</li>
        <li>SPA con routing protegido por contraseña, deployada en Vercel con dominio propio.</li>
      </ul>
    `,
  },
  "peugeot-promo": {
    title: "Mundial 2026 — Promo Interactiva",
    stack: "HTML5 · CSS3 · JavaScript vanilla · Supabase (PostgreSQL) · Cloudflare Workers · Git/GitHub",
    images: [],
    link: "https://peugeot-promo.camilasylvester.workers.dev",
    descriptionHTML: `
      <p>Plataforma de registro y juego para una campaña promocional de Peugeot Argentina vinculada al Mundial 2026. Los usuarios se registran, patean un penal virtual y duplican sus chances de ganar una experiencia Premium al Norte Argentino.</p>
      <p><strong>Mi rol:</strong> fullstack + diseño UI — construí todo desde cero: frontend, lógica del juego, integración con base de datos y deploy.</p>
      <p>Repliqué esta misma plataforma para <strong>Jeep/RAM, Citroën y Fiat</strong> — 4 versiones distintas del juego, cada una con su propia identidad de marca.</p>
      <p><strong>Lo más destacado:</strong></p>
      <ul>
        <li>Formulario multi-paso con validación (4-5 pasos según provincia).</li>
        <li>Juego de penal interactivo con animación de arquero, pelota y resultado aleatorio.</li>
        <li>Integración con Supabase para guardar registros en tiempo real.</li>
        <li>Lógica anti-duplicados por patente (consulta a la DB antes de avanzar).</li>
        <li>Bloqueo de juego post-resultado (no puede volver a jugar).</li>
        <li>Imágenes optimizadas a AVIF (90% menos de peso).</li>
        <li>Dashboard interno con contraseña, filtros por marca y exportación CSV.</li>
        <li>Red de 100+ concesionarios de todo el país.</li>
      </ul>
      <p><a href="https://github.com/camilasylvester/peugeot-promo" target="_blank" rel="noopener">Ver repo en GitHub ↗</a></p>
    `,
  },
  "proyecto-03": {
    title: "Nombre del Proyecto 03",
    stack: "Dashboard · TypeScript · API",
    images: [],
    link: "#",
    descriptionHTML: `<p>Todavía no cargamos el detalle de este proyecto. Contame de qué se trata y lo completo acá.</p>`,
  },
};

const modal = document.getElementById("projectModal");
const modalGallery = modal.querySelector(".modal__gallery");
const modalImage = document.getElementById("modalImage");
const modalPlaceholder = document.getElementById("modalPlaceholder");
const modalDots = document.getElementById("modalDots");
const modalTitle = document.getElementById("modalTitle");
const modalStack = document.getElementById("modalStack");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");

let currentImages = [];
let currentIndex = 0;

function renderImage() {
  if (currentImages.length === 0) {
    modalImage.hidden = true;
    modalPlaceholder.hidden = false;
    modalImage.src = "";
    modalImage.alt = "";
    modalGallery.classList.remove("has-multiple");
    modalDots.innerHTML = "";
    return;
  }
  modalImage.hidden = false;
  modalPlaceholder.hidden = true;
  modalImage.src = currentImages[currentIndex];
  modalImage.alt = modalTitle.textContent;
  modalGallery.classList.toggle("has-multiple", currentImages.length > 1);
  modalDots.innerHTML = "";
  currentImages.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      renderImage();
    });
    modalDots.appendChild(dot);
  });
}

function openModal(id) {
  const data = projects[id];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalStack.textContent = data.stack;
  modalDesc.innerHTML = data.descriptionHTML;
  modalLink.href = data.link;
  currentImages = data.images;
  currentIndex = 0;
  renderImage();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-project]").forEach((el) => {
  el.addEventListener("click", () => openModal(el.dataset.project));
});

modal.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

modal.querySelector("[data-prev]").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  renderImage();
});

modal.querySelector("[data-next]").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  renderImage();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft" && currentImages.length > 1) {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    renderImage();
  }
  if (e.key === "ArrowRight" && currentImages.length > 1) {
    currentIndex = (currentIndex + 1) % currentImages.length;
    renderImage();
  }
});
