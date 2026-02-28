/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    hamburger.classList.toggle("open");
  });

  // Close menu on link click
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      hamburger.classList.remove("open");
    });
  });
}

/* ===== IMAGE SLIDER ===== */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (slides.length > 0) {
  let current = 0;

  function goToSlide(n) {
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  // Auto-advance
  let timer = setInterval(() => goToSlide(current + 1), 3500);

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      goToSlide(parseInt(dot.dataset.index));
      timer = setInterval(() => goToSlide(current + 1), 3500);
    });
  });
}

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".zoom").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

// Also allow clicking the grid-item wrapper
document.querySelectorAll(".grid-item").forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}

// Close on backdrop click
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ===== VIDEO PLAY HINT ===== */
// Hide the ▶ overlay once user starts playing
document.querySelectorAll(".video-wrap video").forEach(video => {
  video.addEventListener("play", () => {
    video.closest(".video-wrap").classList.add("playing");
  });
  video.addEventListener("pause", () => {
    video.closest(".video-wrap").classList.remove("playing");
  });
});