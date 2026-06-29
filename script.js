// ========================================
// ===== ДАННЫЕ ПРОЕКТОВ =====
// ========================================
const projects = [
    {
        id: 1,
        title: "Калькулятор расходов",
        category: "frontend",
        description: "Веб-приложение для учёта личных финансов с графиками и экспортом в Excel."
    },
    {
        id: 2,
        title: "Чат-приложение в реальном времени",
        category: "fullstack",
        description: "Мессенджер на WebSocket с комнатами, историей сообщений и уведомлениями."
    },
    {
        id: 3,
        title: "Парсер вакансий",
        category: "backend",
        description: "Сервис для парсинга вакансий с HH.ru с фильтрацией и отправкой уведомлений в Telegram."
    },
    {
        id: 4,
        title: "Лендинг фитнес-клуба",
        category: "design",
        description: "Дизайн сайта для фитнес-центра с программой тренировок и системой бронирования."
    },
    {
        id: 5,
        title: "To-Do приложение с дедлайнами",
        category: "fullstack",
        description: "Менеджер задач с категориями, приоритетами и push-уведомлениями."
    },
    {
        id: 6,
        title: "Сайт-портфолио фотографа",
        category: "frontend",
        description: "Адаптивный сайт с галереей изображений, фильтрацией и слайдером."
    },
    {
        id: 7,
        title: "Сервис сокращения ссылок",
        category: "backend",
        description: "API для сокращения URL с отслеживанием статистики переходов."
    },
    {
        id: 8,
        title: "Мобильное приложение для заметок",
        category: "fullstack",
        description: "Приложение для заметок с синхронизацией между устройствами и поиском."
    },
    {
        id: 9,
        title: "Интерактивная карта города",
        category: "frontend",
        description: "Карта с отображением достопримечательностей с использованием Leaflet.js."
    },
    {
        id: 10,
        title: "Платформа для онлайн-курсов",
        category: "fullstack",
        description: "Веб-платформа с видеоуроками, тестами и системой прогресса."
    },
    {
        id: 11,
        title: "Генератор QR-кодов",
        category: "frontend",
        description: "Веб-приложение для создания QR-кодов с возможностью скачивания в PNG."
    },
    {
        id: 12,
        title: "Система управления библиотекой",
        category: "backend",
        description: "API для библиотеки с авторизацией, выдачей книг и историей читателей."
    },
    {
        id: 13,
        title: "Корпоративный сайт компании",
        category: "design",
        description: "Дизайн корпоративного сайта с блогом, новостями и формой обратной связи."
    },
    {
        id: 14,
        title: "Игра Виселица",
        category: "frontend",
        description: "Интерактивная игра с угадыванием слов, счётчиком попыток и подсказками."
    },
    {
        id: 15,
        title: "Агрегатор новостей",
        category: "fullstack",
        description: "Сервис, собирающий новости из разных источников с фильтрацией по темам."
    },
    {
        id: 16,
        title: "Интернет-магазин электроники",
        category: "fullstack",
        description: "Полноценный интернет-магазин с корзиной, оплатой и историей заказов."
    }
];

// ========================================
// ===== КАТЕГОРИИ ДЛЯ ФИЛЬТРОВ =====
// ========================================
const categories = [
    { key: "all", label: "Все" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "design", label: "Дизайн" },
    { key: "fullstack", label: "Fullstack" }
];

// ========================================
// ===== ГЕНЕРАЦИЯ КАРТОЧЕК =====
// ========================================
function createCard(project) {
    return `
        <article class="project-card" data-id="${project.id}" data-category="${project.category}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="category-tag">${project.category}</span>
        </article>
    `;
}

function renderProjects(list) {
    const container = document.getElementById("projects-grid");
    const counter = document.getElementById("projects-counter");
    
    if (list.length === 0) {
        container.innerHTML = `
            <div class="project-card" style="text-align: center; grid-column: 1 / -1;">
                <p style="font-size: 1.2rem; opacity: 0.7;">🔍 Проектов не найдено</p>
            </div>
        `;
        counter.textContent = `Найдено: 0 проектов`;
    } else {
        container.innerHTML = list.map(createCard).join("");
        const word = list.length === 1 ? 'проект' : list.length < 5 ? 'проекта' : 'проектов';
        counter.textContent = `Найдено: ${list.length} ${word}`;
    }
}

// ========================================
// ===== СОЗДАНИЕ КНОПОК ФИЛЬТРОВ =====
// ========================================
function createFilterButtons() {
    const container = document.getElementById("filters-container");
    
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.dataset.filter = cat.key;
        btn.textContent = cat.label;
        if (cat.key === "all") {
            btn.classList.add("active");
        }
        container.appendChild(btn);
    });
}

// ========================================
// ===== ФИЛЬТРАЦИЯ =====
// ========================================
let currentFilter = "all";
let currentSearchQuery = "";

function filterProjects() {
    let filtered = projects;
    
    if (currentFilter !== "all") {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    if (currentSearchQuery.trim() !== "") {
        const query = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }
    
    renderProjects(filtered);
}

// ========================================
// ===== ОБНОВЛЕНИЕ СЧЁТЧИКОВ В КНОПКАХ =====
// ========================================
function updateFilterCounts() {
    const buttons = document.querySelectorAll(".filters button");
    const total = projects.length;
    
    buttons.forEach(btn => {
        const filter = btn.dataset.filter;
        let count;
        if (filter === "all") {
            count = total;
        } else {
            count = projects.filter(p => p.category === filter).length;
        }
        // Сохраняем оригинальный текст
        if (!btn.dataset.originalText) {
            btn.dataset.originalText = btn.textContent;
        }
        btn.textContent = `${btn.dataset.originalText} (${count})`;
    });
}

// ========================================
// ===== ИНИЦИАЛИЗАЦИЯ =====
// ========================================
function init() {
    // Создаём кнопки фильтров
    createFilterButtons();
    
    // Обновляем счётчики
    updateFilterCounts();
    
    // Отрисовываем все проекты
    renderProjects(projects);
    
    // Навешиваем обработчики
    setupEventListeners();
}

// ========================================
// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
// ========================================
function setupEventListeners() {
    // Фильтры
    const filterButtons = document.querySelectorAll(".filters button");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            filterProjects();
        });
    });
    
    // Поиск
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        currentSearchQuery = searchInput.value;
        filterProjects();
    });
}

// ========================================
// ===== ЗАПУСК =====
// ========================================
document.addEventListener("DOMContentLoaded", init);

// ========================================
// ===== ПРИВЕТСТВИЕ В КОНСОЛИ =====
// ========================================
console.log("Привет! Скрипт подключен и работает.");
console.log(`Загружено ${projects.length} проектов`);

// ========================================
// ===== ДАТА В ПОДВАЛЕ =====
// ========================================
const dateSpan = document.getElementById("update-date");
const today = new Date();
dateSpan.textContent = today.toLocaleDateString("ru-RU");

// ========================================
// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
// ========================================
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ========================================
// ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ =====
// ========================================
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        
        const nav = document.getElementById("nav-menu");
        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            burgerBtn.textContent = "☰";
            burgerBtn.setAttribute("aria-label", "Открыть меню");
        }
    });
});

// ========================================
// ===== БУРГЕР-МЕНЮ =====
// ========================================
const burgerBtn = document.getElementById("burger-btn");
const nav = document.getElementById("nav-menu");

burgerBtn.addEventListener("click", function() {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
        this.textContent = "✕";
        this.setAttribute("aria-label", "Закрыть меню");
    } else {
        this.textContent = "☰";
        this.setAttribute("aria-label", "Открыть меню");
    }
});

// ========================================
// ===== КНОПКА "ПОКАЗАТЬ БОЛЬШЕ" =====
// ========================================
const toggleBtn = document.getElementById("toggle-btn");
const extraInfo = document.getElementById("extra-info");

toggleBtn.addEventListener("click", function() {
    extraInfo.classList.toggle("expanded");
    this.textContent = extraInfo.classList.contains("expanded") 
        ? "Скрыть" 
        : "Показать больше";
});

// ========================================
// ===== ВАЛИДАЦИЯ ФОРМЫ =====
// ========================================
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add("error-input");
}

function clearError(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("error-input");
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let isValid = true;
    
    if (nameInput.value.trim() === "") {
        showError(nameInput, nameError, "Пожалуйста, введите ваше имя");
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, "Имя должно содержать минимум 2 символа");
        isValid = false;
    } else {
        clearError(nameInput, nameError);
    }
    
    if (emailInput.value.trim() === "") {
        showError(emailInput, emailError, "Пожалуйста, введите ваш email");
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, emailError, "Введите корректный email (например, name@mail.com)");
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }
    
    if (isValid) {
        alert("✅ Форма заполнена верно! Спасибо за обратную связь.");
        form.reset();
        document.querySelectorAll(".error-input").forEach(el => {
            el.classList.remove("error-input");
        });
    } else {
        const firstError = document.querySelector(".error-input");
        if (firstError) {
            firstError.focus();
        }
    }
});

nameInput.addEventListener("input", function() {
    if (this.value.trim() !== "") {
        clearError(this, nameError);
    }
});

emailInput.addEventListener("input", function() {
    if (this.value.trim() !== "") {
        clearError(this, emailError);
    }
});

// ========================================
// ===== ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО =====
// ========================================
document.addEventListener("click", function(e) {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnBurger = burgerBtn.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnBurger && nav.classList.contains("open")) {
        nav.classList.remove("open");
        burgerBtn.textContent = "☰";
        burgerBtn.setAttribute("aria-label", "Открыть меню");
    }
});