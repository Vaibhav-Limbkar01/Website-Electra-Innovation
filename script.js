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
document.querySelectorAll(".video-wrap video").forEach(video => {
  video.addEventListener("play", () => {
    video.closest(".video-wrap").classList.add("playing");
  });
  video.addEventListener("pause", () => {
    video.closest(".video-wrap").classList.remove("playing");
  });
});

/* ===== NAV DROPDOWN ===== */
document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
  const btn = dropdown.querySelector(".nav-dropdown-btn");
  const menu = dropdown.querySelector(".nav-dropdown-menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains("show");
    document.querySelectorAll(".nav-dropdown-menu.show").forEach(m => m.classList.remove("show"));
    document.querySelectorAll(".nav-dropdown-btn.open").forEach(b => b.classList.remove("open"));
    if (!isOpen) {
      menu.classList.add("show");
      btn.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    } else {
      btn.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown-menu.show").forEach(m => m.classList.remove("show"));
  document.querySelectorAll(".nav-dropdown-btn.open").forEach(b => {
    b.classList.remove("open");
    b.setAttribute("aria-expanded", "false");
  });
});

/* ===== COURSE / BLOG FILTER TABS ===== */
document.querySelectorAll(".filter-tabs").forEach(tabGroup => {
  const btns = tabGroup.querySelectorAll(".filter-btn");
  const gridId = tabGroup.id === "course-filters" ? "courses-grid"
               : tabGroup.id === "blog-filters"   ? "blog-grid"
               : null;
  if (!gridId) return;
  const grid = document.getElementById(gridId);
  if (!grid) return;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      grid.querySelectorAll("[data-category]").forEach(card => {
        card.style.display = (filter === "all" || card.dataset.category === filter) ? "" : "none";
      });
    });
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const isOpen = item.classList.contains("open");

    item.closest(".faq-list").querySelectorAll(".faq-item.open").forEach(openItem => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-answer").classList.remove("show");
      openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.classList.add("show");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

/* ===== FAQ SEARCH ===== */
const faqSearch = document.getElementById("faq-search");
if (faqSearch) {
  faqSearch.addEventListener("input", () => {
    const query = faqSearch.value.toLowerCase().trim();
    document.querySelectorAll(".faq-item").forEach(item => {
      const text = item.querySelector(".faq-question").textContent.toLowerCase()
                 + item.querySelector(".faq-answer").textContent.toLowerCase();
      item.classList.toggle("hidden", query !== "" && !text.includes(query));
    });
  });
}

const track = document.getElementById("galleryTrack");
const nextBtn = document.querySelector(".slider-btn.next");
const prevBtn = document.querySelector(".slider-btn.prev");

const scrollAmount = 300;

nextBtn.addEventListener("click", () => {
  track.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});