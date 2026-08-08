/**
 * Blugold - 3D Animated Hero & Luxury Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =======================================
       0. Preloader Logic & Reveal Init
    ======================================= */
    const preloader = document.getElementById('preloader');

    const initScrollAnimations = () => {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.05,
            rootMargin: "0px 0px -20px 0px"
        });
        revealElements.forEach(el => revealObserver.observe(el));
    };

    const dismissPreloader = () => {
        if (!preloader) {
            initScrollAnimations();
            return;
        }
        if (preloader.dataset.dismissed) return;
        preloader.dataset.dismissed = "true";

        preloader.classList.add('pre-fade');

        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.add('loaded');
            initScrollAnimations();

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 300);
    };

    // Smooth Percentage Counter Animation (0% to 100% over ~2 seconds)
    const percentEl = document.getElementById('preloaderPercent');
    if (percentEl) {
        let currentPercent = 0;
        const countInterval = setInterval(() => {
            currentPercent += Math.floor(Math.random() * 5) + 3;
            if (currentPercent >= 100) {
                currentPercent = 100;
                clearInterval(countInterval);
            }
            percentEl.textContent = `${currentPercent}%`;
        }, 75);
    }

    // Smooth cinematic entry: relaxed 2.2s duration for complete loading animation
    setTimeout(dismissPreloader, 2200);
    window.addEventListener('load', () => setTimeout(dismissPreloader, 2000));




    /* =======================================
       1. Mobile Menu Toggle
    ======================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    const toggleMenu = () => {
        if (!mobileOverlay) return;
        mobileOverlay.classList.toggle('open');
        document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    };

    if (mobileBtn && closeBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay && mobileOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* =======================================
       2. Reveal Full Nav After Hero Section
    ======================================= */
    const navWrapper = document.getElementById('navWrapper');
    const heroSection = document.getElementById('home');

    const updateNavVisibility = () => {
        if (!navWrapper) return;
        const heroHeight = heroSection ? heroSection.offsetHeight : 600;
        const triggerPoint = heroHeight - 120; // Transition as About page enters

        if (window.scrollY >= triggerPoint) {
            navWrapper.classList.add('scrolled-dark');
        } else {
            navWrapper.classList.remove('scrolled-dark');
        }
    };

    window.addEventListener('scroll', updateNavVisibility, { passive: true });
    updateNavVisibility();

    /* =======================================
       3. Active Nav Link Update on Scroll
    ======================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    }, { passive: true });

    /* =======================================
       4. Interactive 3D Cursor Tilt Parallax
    ======================================= */
    const heroCard = document.querySelector('.hero-text-wrapper');
    const capsules = document.querySelectorAll('.feature-capsule');

    if (heroSection && heroCard) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // 3D Tilt on hero card
            const rotateX = y * -16;
            const rotateY = x * 20;
            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

            // 3D Parallax on feature capsules
            capsules.forEach((capsule, index) => {
                const depth = (index + 1) * 6;
                const cRotateX = y * -10;
                const cRotateY = x * 12;
                const transZ = (index + 1) * 8;
                capsule.style.transform = `perspective(1000px) rotateX(${cRotateX}deg) rotateY(${cRotateY}deg) translateZ(${transZ}px) translateY(${y * depth}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateY(1.5deg)';
            capsules.forEach(capsule => {
                capsule.style.transform = 'perspective(1000px) translateZ(0)';
            });
        });
    }

    /* =======================================
       5. Form Submission Feedback
    ======================================= */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerText;

            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                btn.innerText = "Inquiry Sent!";
                btn.style.background = "#22c55e";
                btn.style.boxShadow = "0 0 20px rgba(34, 197, 94, 0.4)";
                btn.style.opacity = "1";
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "";
                    btn.style.boxShadow = "";
                }, 3000);
            }, 1000);
        });
    }
});
