// ===== PAGE LOAD FADE-IN EFFECT ===== //
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

// ===== NAVBAR ACTIVE LINK HIGHLIGHT (OPTIONAL) ===== //
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// ===== SMOOTH SCROLL ===== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
