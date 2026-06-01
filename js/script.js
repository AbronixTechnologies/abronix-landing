document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       AUTO HIDE NAVBAR
    ========================== */
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            const navbar = document.getElementById("nav");
                    const collapse = bootstrap.Collapse.getInstance(navbar);

    if (collapse) {
        collapse.hide();
    }
});
});


/* =========================
   PORTFOLIO SLIDER
========================== */
    const sliders = document.querySelectorAll(".portfolio-slider");

sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".portfolio-slide");
let currentSlide = 0;

if (slides.length > 0) {
    slides[0].classList.add("active-slide");
}

setInterval(() => {
    slides[currentSlide].classList.remove("active-slide");

currentSlide = (currentSlide + 1) % slides.length;

slides[currentSlide].classList.add("active-slide");
}, 5000);
});


/* =========================
   COUNTER ANIMATION
========================== */
    const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText.replace('+', '');
            const increment = target / 80;

if (current < target) {
    counter.innerText = Math.ceil(current + increment);
    setTimeout(updateCounter, 20);
} else {
    counter.innerText = target + "+";
}
};

updateCounter();
});


/* =========================
   SCROLL TO TOP BUTTON
========================== */
    const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "flex";
} else {
    scrollTopBtn.style.display = "none";
}
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
}


/* =========================
   ACTIVE NAV LINK ON SCROLL
========================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

if (window.pageYOffset >= sectionTop) {
    current = section.getAttribute("id");
}
});

navLinks.forEach(link => {
    link.classList.remove("active");

if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
}
});
});




});