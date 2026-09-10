/* =========================================================
   ROYAL BEAUTY ACADEMY
   JAVASCRIPT V4 — MOBILE SAFE + LIGHTBOX
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */
    const loader = document.querySelector(".loader");

    function hideLoader() {
        if (!loader) return;
        loader.classList.add("hidden");
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
    }

    window.addEventListener("load", () => setTimeout(hideLoader, 1200));
    setTimeout(hideLoader, 3000);

    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */
    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (desktop && cursor && cursorDot) {
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + "px";
            cursor.style.top = cursorY + "px";
            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveElements = document.querySelectorAll(
            "a, button, .service, .gallery-item, .eleves-item"
        );
        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", () => cursor.classList.add("active"));
            element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
        });
    }

    /* =====================================================
       NAVBAR
    ===================================================== */
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        function updateNavbar() {
            if (window.scrollY > 80) navbar.classList.add("scrolled");
            else navbar.classList.remove("scrolled");
        }
        window.addEventListener("scroll", updateNavbar);
        updateNavbar();
    }

    /* =====================================================
       HERO — LIGHT EFFECT + PARALLAX
    ===================================================== */
    const hero = document.querySelector(".hero");
    const glow = document.querySelector(".hero-glow");
    const heroImage = document.querySelector(".hero-image-wrapper");

    if (desktop && hero && glow) {
        hero.addEventListener("mousemove", (event) => {
            const rect = hero.getBoundingClientRect();
            glow.style.left = (event.clientX - rect.left) + "px";
            glow.style.top = (event.clientY - rect.top) + "px";
        });
    }

    if (desktop && hero && heroImage) {
        hero.addEventListener("mousemove", (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 10;
            const y = (event.clientY / window.innerHeight - 0.5) * 10;
            heroImage.style.transform = `translate(${x}px, ${y}px)`;
        });
        hero.addEventListener("mouseleave", () => {
            heroImage.style.transform = "translate(0, 0)";
        });
    }

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */
    const revealElements = document.querySelectorAll(`
        .section-heading,
        .universe-grid,
        .service,
        .academy-content,
        .gallery-item,
        .eleves-item,
        .contact,
        .session-banner,
        .certificats-grid,
        .affiche-wrapper
    `);

    revealElements.forEach((element) => element.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    /* =====================================================
       SERVICES — STAGGER
    ===================================================== */
    document.querySelectorAll(".service").forEach((service, index) => {
        service.style.transitionDelay = `${index * 0.08}s`;
    });

    /* =====================================================
       MOBILE MENU
    ===================================================== */
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".navbar nav");

    if (menuButton && nav) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Ouvrir le menu");

        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("mobile-open");
            menuButton.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
            document.body.classList.toggle("menu-open", isOpen);
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("mobile-open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Ouvrir le menu");
                document.body.classList.remove("menu-open");
            });
        });
    }

    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar nav a");

    function updateActiveNavigation() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 180;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && href === "#" + current) link.classList.add("active");
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();

    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
            link.addEventListener("click", (event) => {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }
    });

    /* =====================================================
       GALLERY / STUDENTS TILT — desktop only
    ===================================================== */
    if (desktop) {
        document.querySelectorAll(".gallery-item, .eleves-item").forEach((item) => {
            item.addEventListener("mousemove", (event) => {
                const rect = item.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateX = (y - 0.5) * -4;
                const rotateY = (x - 0.5) * 4;
                item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            item.addEventListener("mouseleave", () => {
                item.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
            });
        });
    }

    /* =====================================================
       LIGHTBOX — clic sur une photo de la galerie ou des élèves
    ===================================================== */
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer">&times;</button>
        <img src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    function openLightbox(src, alt) {
        lightboxImg.setAttribute("src", src);
        lightboxImg.setAttribute("alt", alt || "");
        lightbox.classList.add("active");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    document.querySelectorAll(".gallery-item img, .eleves-item img").forEach((img) => {
        img.addEventListener("click", () => openLightbox(img.getAttribute("src"), img.getAttribute("alt")));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */
    document.querySelectorAll("img").forEach((image) => {
        image.addEventListener("error", () => {
            console.warn("Image introuvable :", image.getAttribute("src"));
        });
    });

    /* =====================================================
       ESCAPE — FERMER MENU / LIGHTBOX
    ===================================================== */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (nav && menuButton) {
                nav.classList.remove("mobile-open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
            closeLightbox();
        }
    });

    /* =====================================================
       FINAL SAFETY
    ===================================================== */
    setTimeout(hideLoader, 3500);

    console.log("Royal Beauty Academy — JavaScript chargé correctement.");
});