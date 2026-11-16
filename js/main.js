document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MENU HAMBURGUESA
  ===================== */

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }


  /* =====================
     CAROUSEL STATS
  ===================== */

  const grid = document.getElementById("stats-grid");
  const next = document.getElementById("stats-next");
  const prev = document.getElementById("stats-prev");

  if (grid && next && prev) {
    // Asegurar que empiece en el primer item
    grid.scrollLeft = 0;

    next.addEventListener("click", () => {
      grid.scrollBy({
        left: grid.offsetWidth,
        behavior: "smooth"
      });
    });

    prev.addEventListener("click", () => {
      grid.scrollBy({
        left: -grid.offsetWidth,
        behavior: "smooth"
      });
    })
  }


  /* =====================
     CAROUSEL PRODUCTOS (móvil)
  ===================== */

  const productsTrack = document.getElementById("products-track");
  const productsNext = document.getElementById("products-next");
  const productsPrev = document.getElementById("products-prev");

  if (productsTrack && productsNext && productsPrev) {
    productsTrack.scrollLeft = 0;

    productsNext.addEventListener("click", () => {
      productsTrack.scrollBy({ left: productsTrack.offsetWidth, behavior: "smooth" });
    });

    productsPrev.addEventListener("click", () => {
      productsTrack.scrollBy({ left: -productsTrack.offsetWidth, behavior: "smooth" });
    });
  }


  /* =====================
     CAROUSEL PRODUCTS GRID (móvil)
  ===================== */

  const gridTrack = document.getElementById("products-grid");
  const gridNext = document.getElementById("grid-next");
  const gridPrev = document.getElementById("grid-prev");

  if (gridTrack && gridNext && gridPrev) {
    gridTrack.scrollLeft = 0;

    gridNext.addEventListener("click", () => {
      gridTrack.scrollBy({ left: gridTrack.offsetWidth, behavior: "smooth" });
    });

    gridPrev.addEventListener("click", () => {
      gridTrack.scrollBy({ left: -gridTrack.offsetWidth, behavior: "smooth" });
    });
  }


  /* =====================
     WhatsApp Float + reCAPTCHA v3
  ===================== */

  const RECAPTCHA_SITE_KEY = "6LfyX4csAAAAALmGDaVMruds2PMxaLfg7itK7Gn9";
  const WHATSAPP_NUMBER = "56973860069"; // formato wa.me: solo dígitos con código de país, sin "+"
  const WHATSAPP_MESSAGE = "Hola, me gustaría obtener más información.";

  const wspBtn = document.getElementById("whatsapp-float");

  if (wspBtn) {
    wspBtn.addEventListener("click", function (e) {
      e.preventDefault();

      grecaptcha.ready(function () {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "whatsapp_click" })
          .then(function (token) {
            // Token obtenido — redirigir a WhatsApp
            const url = "https://wa.me/" + WHATSAPP_NUMBER
              + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
            window.open(url, "_blank", "noopener,noreferrer");
          })
          .catch(function (err) {
            console.error("reCAPTCHA error:", err);
            // Fallback: abrir igual
            // const url = "https://wa.me/" + WHATSAPP_NUMBER
            //   + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
            // window.open(url, "_blank", "noopener,noreferrer");
          });
      });
    });
  }
});