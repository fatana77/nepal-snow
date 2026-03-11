(() => {
  // ==========================================
  // HEADER SCROLL ELEVATION
  // ==========================================
  const header = document.querySelector(".site-header");

  const setHeaderElevated = () => {
    if (!header) return;
    header.dataset.elevate = window.scrollY > 10 ? "true" : "false";
  };

  window.addEventListener("scroll", setHeaderElevated, { passive: true });
  setHeaderElevated();

  // ==========================================
  // MOBILE NAV TOGGLE
  // ==========================================
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector("#navMenu");

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("active");
  };

  const openMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    navMenu.classList.add("active");
  };

  if (navToggle && navMenu) {
    // Toggle on button click
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("active");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.classList.contains("active")) return;
      if (!e.target.closest(".nav__inner")) closeMenu();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close when a nav link is clicked (mobile)
    navMenu.addEventListener("click", (e) => {
      if (e.target.matches("a")) closeMenu();
    });
  }


const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".nav-arrow.prev");
const nextBtn = document.querySelector(".nav-arrow.next");
const carouselEl = document.querySelector(".carousel");

let currentSlide = 0;
let autoSlideInterval = null;
const totalSlides = slides.length;

if (totalSlides === 0) {
    console.warn("SLIM Carousel: No .slide elements found.");
} else {
   
   
    const updateSlides = () => {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    };

    const goNext = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    };

    const goPrev = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    };

    const startAutoSlide = () => {
        stopAutoSlide();
      
        autoSlideInterval = setInterval(goNext, 5500); 
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    };

   
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            updateSlides();
            startAutoSlide();
        });
    });

    if (prevBtn) prevBtn.addEventListener("click", () => { goPrev(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { goNext(); startAutoSlide(); });

    if (carouselEl) {
        carouselEl.addEventListener("mouseenter", stopAutoSlide);
        carouselEl.addEventListener("mouseleave", startAutoSlide);
        
        let touchStartX = 0;
        carouselEl.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        carouselEl.addEventListener("touchend", e => {
            let touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) goNext();
            else if (touchStartX - touchEndX < -50) goPrev();
            startAutoSlide();
        }, { passive: true });
    }

    // Initialize
    updateSlides();
    startAutoSlide();
}
 
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const highlightNavLink = () => {
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNavLink, { passive: true });
  highlightNavLink();
})();