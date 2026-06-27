/* ==========================================================
   EVENT SLIDER
========================================================== */

const events = document.getElementById("events");
const eventCards = document.querySelectorAll(".event");

const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

let currentSlide = 0;

function slideWidth() {
    return events.clientWidth;
}

function showSlide(index) {

    currentSlide = index;

    events.scrollTo({
        left: currentSlide * slideWidth(),
        behavior: "smooth"
    });

}

function nextSlide() {

    currentSlide++;

    if (currentSlide >= eventCards.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = eventCards.length - 1;
    }

    showSlide(currentSlide);

}

rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", previousSlide);

/* ==========================================================
   AUTO SLIDER
========================================================== */

let autoSlide = setInterval(nextSlide, 4000);

events.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

events.addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 4000);
});

/* ==========================================================
   RESPONSIVE RESIZE
========================================================== */

window.addEventListener("resize", () => {
    showSlide(currentSlide);
});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});

/* ==========================================================
   NAVBAR SHADOW
========================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.boxShadow = "0 12px 30px rgba(0,0,0,.25)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

document.querySelectorAll(".feature-card, .cta, .footer-box").forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});

/* ==========================================================
   PAGE LOAD
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});