// ===== 3D TILT ANIMATION ===== //
document.addEventListener("mousemove", function (event) {
    const card = document.querySelector(".hero-card, .main-card, .profile-card, .container");

    if (!card) return;

    const x = (window.innerWidth / 2 - event.clientX) / 25;
    const y = (window.innerHeight / 2 - event.clientY) / 25;

    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    card.style.transition = "transform 0.1s ease-out";
});

// Reset animation when mouse leaves window
document.addEventListener("mouseleave", function () {
    const card = document.querySelector(".hero-card, .main-card, .profile-card, .container");
    if (card) {
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
        card.style.transition = "transform 0.5s ease-out";
    }
});
