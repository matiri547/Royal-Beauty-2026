/* =========================================
   ROYAL BEAUTY ACADEMY
   JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    setTimeout(() => {
        loader.classList.add("hidden");
        document.body.classList.add("loaded");
    }, 1800);
});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

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


/* =========================================
   CURSOR INTERACTION
========================================= */

const interactiveElements =
    document.querySelectorAll("a, button, .service, .gallery-item, .eleves-item");

interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("active"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});


/* =========================================
   NAVBAR ON SCROLL
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


/* =========================================
   HERO LIGHT
========================================= */

const hero = document.querySelector(".hero");
const glow = document.querySelector(".hero-glow");

hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    glow.style.left = (event.clientX - rect.left) + "px";
    glow.style.top = (event.clientY - rect.top) + "px";
});


/* =========================================
   IMAGE PARALLAX
========================================= */

const heroImage = document.querySelector(".hero-image-wrapper");

hero.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

hero.addEventListener("mouseleave", () => {
    heroImage.style.transform = "translate(0, 0)";
});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .universe-grid, .service, .academy-content, .gallery-item, .eleves-item, .contact, .session-banner, .certificats-grid, .affiche-wrapper"
);

revealElements.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));


/* =========================================
   SERVICE STAGGER
========================================= */

const services = document.querySelectorAll(".service");

services.forEach((service, index) => {
    service.style.transitionDelay = `${index * 0.08}s`;
});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".navbar nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
    menuButton.classList.toggle("active");
});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* =========================================
   CLOSE MOBILE MENU ON LINK CLICK
========================================= */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        menuButton.classList.remove("active");
    });
});


/* =========================================
   SMOOTH IMAGE TILT (GALERIE + ÉLÈVES)
========================================= */

const tiltItems = document.querySelectorAll(".gallery-item, .eleves-item");

tiltItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateX = (y - 0.5) * -4;
        const rotateY = (x - 0.5) * 4;

        item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    });
});