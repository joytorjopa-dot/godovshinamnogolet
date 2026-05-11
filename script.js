/* ============================================= */
/*  СКРИПТЫ ДЛЯ САЙТА-ПОЗДРАВЛЕНИЯ               */
/*  Тут менять почти ничего не надо,              */
/*  кроме ДАТЫ НАЧАЛА ОТНОШЕНИЙ ниже 👇           */
/* ============================================= */


// =============================================
//  🗓️ ДАТА НАЧАЛА ВАШИХ ОТНОШЕНИЙ
//  Формат: Год, Месяц (0-11!), День
//  ВНИМАНИЕ: Месяцы считаются с НУЛЯ!
//  Январь = 0, Февраль = 1, Март = 2 ... Декабрь = 11
//  
//  Пример: 14 февраля 2023 = new Date(2023, 1, 14)
//  Пример: 1 сентября 2022 = new Date(2022, 8, 1)
// =============================================

const ДАТА_НАЧАЛА = new Date(Date.now() - 497 * 24 * 60 * 60 * 1000);  // 👈 МЕНЯЙ ЭТУ ДАТУ!
// Сейчас стоит: 132 дня назад от текущего момента
// Если хочешь конкретную дату — напиши так: new Date(2026, 0, 20)
// (Год, Месяц от 0 до 11, День)


// ========== ТАЙМЕР ==========
// Считает сколько вы вместе и обновляет каждую секунду

function обновитьТаймер() {
    const сейчас = new Date();
    const разница = сейчас - ДАТА_НАЧАЛА;

    // Переводим миллисекунды в дни, часы, минуты, секунды
    const дни = Math.floor(разница / (1000 * 60 * 60 * 24));
    const часы = Math.floor((разница / (1000 * 60 * 60)) % 24);
    const минуты = Math.floor((разница / (1000 * 60)) % 60);
    const секунды = Math.floor((разница / 1000) % 60);

    // Находим элементы на странице и вставляем числа
    const элементДни = document.getElementById('timer-days');
    const элементЧасы = document.getElementById('timer-hours');
    const элементМинуты = document.getElementById('timer-minutes');
    const элементСекунды = document.getElementById('timer-seconds');

    if (элементДни) элементДни.textContent = дни;
    if (элементЧасы) элементЧасы.textContent = String(часы).padStart(2, '0');
    if (элементМинуты) элементМинуты.textContent = String(минуты).padStart(2, '0');
    if (элементСекунды) элементСекунды.textContent = String(секунды).padStart(2, '0');
}

// Обновляем сразу и потом каждую секунду
обновитьТаймер();
setInterval(обновитьТаймер, 1000);


// ========== НАВИГАЦИЯ МЕЖДУ СТРАНИЦАМИ ==========
// Это позволяет переключать "страницы" не перезагружая сайт

function показатьСтраницу(имяСтраницы) {
    // Скрываем все страницы
    const страницы = document.querySelectorAll('.page');
    страницы.forEach(function(стр) {
        стр.classList.remove('active');
    });

    // Показываем нужную
    const нужнаяСтраница = document.getElementById(имяСтраницы);
    if (нужнаяСтраница) {
        нужнаяСтраница.classList.add('active');
    }

    // Подсвечиваем активную кнопку в меню
    const ссылки = document.querySelectorAll('nav a');
    ссылки.forEach(function(ссылка) {
        ссылка.classList.remove('active');
        if (ссылка.getAttribute('data-page') === имяСтраницы) {
            ссылка.classList.add('active');
        }
    });

    // Прокручиваем наверх к контенту
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Вешаем обработчики на ссылки навигации
document.addEventListener('DOMContentLoaded', function() {
    const ссылкиНав = document.querySelectorAll('nav a');
    ссылкиНав.forEach(function(ссылка) {
        ссылка.addEventListener('click', function(e) {
            e.preventDefault();
            const страница = this.getAttribute('data-page');
            показатьСтраницу(страница);
        });
    });
});


// ========== КЛИК ПО ФОТО-КАРТОЧКЕ ==========
// Когда кликаешь по фото — переходит на нужную страницу

function переходНаСтраницу(имяСтраницы) {
    показатьСтраницу(имяСтраницы);
}


// ========== ПЛАВАЮЩИЕ СЕРДЕЧКИ (фоновая анимация) ==========
// Создаёт сердечки, которые летают по экрану

function создатьСердечки() {
    const контейнер = document.querySelector('.floating-hearts');
    if (!контейнер) return;

    // Сколько сердечек создать (не ставь больше 25, иначе лагать будет)
    const количество = 15;

    const символы = ['♥', '♡', '💕', '💗'];

    for (let i = 0; i < количество; i++) {
        const сердечко = document.createElement('span');
        сердечко.classList.add('floating-heart');
        сердечко.textContent = символы[Math.floor(Math.random() * символы.length)];

        // Случайная позиция по горизонтали
        сердечко.style.left = Math.random() * 100 + '%';

        // Случайная задержка анимации
        сердечко.style.animationDelay = Math.random() * 8 + 's';

        // Случайная скорость
        сердечко.style.animationDuration = (6 + Math.random() * 6) + 's';

        // Случайный размер
        сердечко.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';

        // Цвет — розоватый
        сердечко.style.color = `hsl(${340 + Math.random() * 20}, 70%, ${65 + Math.random() * 20}%)`;

        контейнер.appendChild(сердечко);
    }
}

// Запускаем сердечки при загрузке
document.addEventListener('DOMContentLoaded', создатьСердечки);


// ========== АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ ==========
// Элементы плавно появляются когда до них доскролливаешь

document.addEventListener('DOMContentLoaded', function() {
    const элементы = document.querySelectorAll('.fade-in');

    const наблюдатель = new IntersectionObserver(function(записи) {
        записи.forEach(function(запись) {
            if (запись.isIntersecting) {
                запись.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    элементы.forEach(function(эл) {
        наблюдатель.observe(эл);
    });
});



