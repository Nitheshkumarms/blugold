document.addEventListener('DOMContentLoaded', () => {

    /* =======================================
       0. Preloader Logic & Reveal Init
    ======================================= */
    const preloader = document.getElementById('preloader');

    // Define scroll animation initialization
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
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        revealElements.forEach(el => revealObserver.observe(el));
    };

    if (preloader) {
        let preloaderHidden = false;

        const hidePreloader = () => {
            if (preloaderHidden) return;
            preloaderHidden = true;

            // 1. Zoom out the bottle
            preloader.classList.add('pre-fade');

            // 2. Slide the curtain up & Initializer scroll animations
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.add('loaded'); // Mark as loaded
                initScrollAnimations(); // Trigger hero entry animations now!

                // Remove from DOM to save resources
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }, 500);
        };

        // Trigger the curtain lift exactly 800ms after the initial HTML is parsed.
        // This guarantees a fast, predictable, beautiful entrance without waiting for slow images.
        setTimeout(hidePreloader, 800);
    } else {
        // If no preloader, just init animations immediately
        initScrollAnimations();
    }

    /* =======================================
       1. Mobile Menu Toggle
    ======================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    const toggleMenu = () => {
        mobileOverlay.classList.toggle('open');
        document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    };

    if (mobileBtn && closeBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    /* =======================================
       2. Sticky Nav Dark Mode on Scroll
    ======================================= */
    const navWrapper = document.getElementById('navWrapper');
    const heroSection = document.getElementById('home');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const heroHeight = heroSection ? heroSection.clientHeight : 500;

        // Change nav to dark mode when scrolled slightly past the top
        if (currentScrollY > heroHeight * 0.8) {
            navWrapper.classList.add('scrolled-dark');
        } else {
            navWrapper.classList.remove('scrolled-dark');
        }
    }, { passive: true });


    /* =======================================
       3. Scroll Reveal Animations
    ======================================= */
    // Initialized inside the Preloader logic above to ensure hero syncs!


    /* =======================================
       4. Active Nav Link Update on Scroll
    ======================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
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
       5. Form Submission Dummy
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
                btn.style.background = "#22c55e"; // Success green
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
