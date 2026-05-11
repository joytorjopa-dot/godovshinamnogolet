/* ============================================= */
/*  CONGRATULATION SITE SCRIPTS                  */
/* ============================================= */

// =============================================
//  🗓️ RELATIONSHIP START DATE
//  Format: Year, Month (0-11), Day
//  ATTENTION: Months start from ZERO!
//  Jan = 0, Feb = 1, Mar = 2 ... Dec = 11
// =============================================

// Current example: 497 days ago. 
// To set a specific date, use: new Date(2023, 1, 14) (for Feb 14, 2023)
const startDate = new Date(2024, 12, 27, 0, 0, 0); // Например, 11 мая 2024

function updateTimer() {
    const now = new Date();
    const diff = now - startDate; // Разница в миллисекундах

    // Вычисляем дни, часы, минуты и секунды
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Находим элементы на странице и обновляем их
    document.getElementById('timer-days').innerText = days;
    document.getElementById('timer-hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('timer-minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('timer-seconds').innerText = seconds.toString().padStart(2, '0');
}

// Запускаем обновление каждую секунду
setInterval(updateTimer, 1000);

// Вызываем один раз сразу при загрузке, чтобы не было задержки в 1 секунду
updateTimer();

// Логика переключения страниц (если она у вас была в старом скрипте)
// document.querySelectorAll('nav a, .gallery-card').forEach(link => {
//     link.addEventListener('click', function(e) {
//         const pageId = this.getAttribute('data-page');
//         if (pageId) {
//             e.preventDefault();
//             document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
//             document.getElementById(pageId).classList.add('active');

//             document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
//             const navLink = document.querySelector(nav a[data-page="${pageId}"]);
//             if (navLink) navLink.classList.add('active');
//         }
//     });
// });


// ========== PAGE NAVIGATION ==========
// Switches between "pages" (sections) without reloading

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active state in navigation menu
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });
});


// ========== PHOTO CARD CLICK ==========
function navigateToPage(pageId) {
    showPage(pageId);
}


// ========== FLOATING HEARTS ANIMATION ==========

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;

    const heartCount = 15;
    const symbols = ['♥', '♡', '💕', '💗'];

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';

        // Random animation delay and duration
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';

        // Random size
        heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';

        // Random pinkish color
        heart.style.color = `hsl(${340 + Math.random() * 20}, 70%, ${65 + Math.random() * 20}%)`;

        container.appendChild(heart);
    }
}

document.addEventListener('DOMContentLoaded', createFloatingHearts);


// ========== SCROLL REVEAL ANIMATION ==========

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});