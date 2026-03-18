document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const currentTheme = html.getAttribute('data-theme') || 'light';
        updateIcon(icon, currentTheme);

        themeToggle.addEventListener('click', () => {
            const updatedTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', updatedTheme);
            localStorage.setItem('theme', updatedTheme);
            updateIcon(icon, updatedTheme);
        });
    }

    function updateIcon(icon, theme) {
        if (!icon) return;
        if (theme === 'dark') { 
            icon.classList.remove('fa-moon'); 
            icon.classList.add('fa-sun'); 
        } else { 
            icon.classList.remove('fa-sun'); 
            icon.classList.add('fa-moon'); 
        }
    }

    // --- 2. MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const isOpen = mobileMenu.classList.contains('open');
            hamburger.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });
        
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // --- 3. SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                setTimeout(() => { 
                    entry.target.style.transform = ''; 
                    entry.target.style.transition = ''; 
                }, 600);
                
                // Animate skill circles if they exist in this block
                const progressCircles = entry.target.querySelectorAll('.circle');
                progressCircles.forEach(circle => {
                    const val = circle.getAttribute('data-percent');
                    circle.style.strokeDasharray = `${val}, 100`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .project-card, .lovable-app-card').forEach(el => {
        el.style.opacity = 0; 
        el.style.transform = 'translateY(20px)'; 
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // --- 4. TYPING EFFECT (Homepage Only) ---
    const typingTarget = document.querySelector('.typing-text');
    if (typingTarget) {
        const texts = ["IT Engineer", "Networking", "Windows Server", "AI Prompting", "WordPress", "Cloud Server", "Firewall"];
        let count = 0; let index = 0; let currentText = ""; let letter = "";
        
        (function type() {
            if (count === texts.length) { count = 0; }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            typingTarget.textContent = letter;
            
            if (letter.length === currentText.length) {
                count++; index = 0; setTimeout(type, 2000);
            } else { 
                setTimeout(type, 100); 
            }
        })();
    }

    // --- 5. DYNAMIC YEAR ---
    const yearSpan = document.getElementById("year");
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 6. MODALS (About & Certs) ---
    const certModal = document.getElementById('certModal');
    const certFrame = document.getElementById('certFrame');
    const closeModal = document.querySelector('.close-modal');
    const certLinks = document.querySelectorAll('.cert-card');
    
    const aboutModal = document.getElementById('aboutModal');
    const openAboutBtn = document.getElementById('openAboutBtn');
    const closeAbout = document.querySelector('.close-about');

    if (certModal && certFrame) {
        certLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('href');
                const previewUrl = url.replace('/view', '/preview');
                certFrame.src = previewUrl;
                certModal.classList.add('show');
                certModal.setAttribute('aria-hidden', 'false');
            });
        });
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                certModal.classList.remove('show');
                certModal.setAttribute('aria-hidden', 'true');
                certFrame.src = '';
            });
        }
    }

    if (aboutModal) {
        if (openAboutBtn) openAboutBtn.addEventListener('click', () => { 
            aboutModal.classList.add('show'); 
            aboutModal.setAttribute('aria-hidden', 'false'); 
        });
        if (closeAbout) closeAbout.addEventListener('click', () => { 
            aboutModal.classList.remove('show'); 
            aboutModal.setAttribute('aria-hidden', 'true'); 
        });
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (certModal && e.target === certModal) {
            certModal.classList.remove('show'); 
            certModal.setAttribute('aria-hidden', 'true');
            if (certFrame) certFrame.src = '';
        }
        if (aboutModal && e.target === aboutModal) {
            aboutModal.classList.remove('show'); 
            aboutModal.setAttribute('aria-hidden', 'true');
        }
    });

    // --- 7. NEWSLETTER FORM ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = document.getElementById('footer-email');
            alert(`Thank you for subscribing with: ${emailInput.value}`);
            emailInput.value = '';
        });
    }
});

// --- 8. GLOBAL FUNCTIONS (Accessible from HTML onclick attributes) ---

// Lightbox variables
let currentImageIndex = 0;
let currentGalleryImages = [];

window.openLightbox = function(element) {
    const galleryGrid = element.closest('.gallery-grid');
    if (!galleryGrid) return;
    currentGalleryImages = Array.from(galleryGrid.querySelectorAll('img'));
    const clickedImg = element.querySelector('img');
    currentImageIndex = currentGalleryImages.indexOf(clickedImg);
    
    updateLightboxImage();
    
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.add('show');
        lb.setAttribute('aria-hidden', 'false');
    }
};

window.changeImage = function(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= currentGalleryImages.length) { 
        currentImageIndex = 0; 
    } else if (currentImageIndex < 0) { 
        currentImageIndex = currentGalleryImages.length - 1; 
    }
    updateLightboxImage();
};

function updateLightboxImage() {
    if (currentGalleryImages.length > 0) {
        const imgSource = currentGalleryImages[currentImageIndex].src;
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightboxImg) lightboxImg.src = imgSource;
    }
}

window.closeLightbox = function(event) {
    if (event.target.id === 'lightbox' || event.target.classList.contains('close-lightbox')) {
        const lb = document.getElementById('lightbox');
        if (lb) {
            lb.classList.remove('show');
            lb.setAttribute('aria-hidden', 'true');
        }
    }
};

// Keyboard navigation for Lightbox
document.addEventListener('keydown', function(e) {
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('show')) {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") { 
            lb.classList.remove('show'); 
            lb.setAttribute('aria-hidden', 'true'); 
        }
    }
});

// Lovable AI App Preview Functions
window.loadApp = function(url, title) {
    const previewBox = document.getElementById("previewBox");
    const frame = document.getElementById("appFrame");
    const openFullBtn = document.getElementById("openFullBtn");
    const previewTitle = document.getElementById("previewTitle");

    if (previewBox && frame) {
        if (previewTitle) previewTitle.innerText = title + " - Preview";
        previewBox.style.display = "block";
        frame.src = url;
        if (openFullBtn) openFullBtn.href = url;
        previewBox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

window.closeApp = function() {
    const previewBox = document.getElementById("previewBox");
    const frame = document.getElementById("appFrame");
    if (previewBox && frame) {
        frame.src = "";
        previewBox.style.display = "none";
    }
}
