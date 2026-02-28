document.addEventListener('DOMContentLoaded', () => {

    // --- Footer Year Update ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Language Toggle Logic ---
    const btnEn = document.getElementById('lang-en');
    const btnTh = document.getElementById('lang-th');
    const body = document.body;

    // Check local storage for preference, default to EN
    const currentLang = localStorage.getItem('kosoopangg_lang') || 'en';

    if (currentLang === 'th') {
        setLanguage('th');
    }

    btnEn.addEventListener('click', () => setLanguage('en'));
    btnTh.addEventListener('click', () => setLanguage('th'));

    function setLanguage(lang) {
        if (lang === 'th') {
            body.classList.add('lang-th');
            btnTh.classList.add('active');
            btnEn.classList.remove('active');
            localStorage.setItem('kosoopangg_lang', 'th');
            updateTextContent('th');
        } else {
            body.classList.remove('lang-th');
            btnEn.classList.add('active');
            btnTh.classList.remove('active');
            localStorage.setItem('kosoopangg_lang', 'en');
            updateTextContent('en');
        }
    }

    function updateTextContent(lang) {
        const elements = document.querySelectorAll('[data-en][data-th]');
        elements.forEach(el => {
            if (lang === 'th') {
                el.innerHTML = el.getAttribute('data-th');
            } else {
                el.innerHTML = el.getAttribute('data-en');
            }
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
