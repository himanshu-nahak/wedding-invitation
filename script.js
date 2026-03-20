/* script.js */
// Always start at the top on page refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    /* Setup Ambient Gold Dust Particles - Faster and More Visible */
    const container = document.getElementById('particles-container');
    const particleCount = window.innerWidth > 768 ? 60 : 30; // Increased count
    for (let i = 0; i < particleCount; i++) {
        let p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}vw`;
        // Faster animation: 4s to 12s
        p.style.animationDuration = `${4 + Math.random() * 8}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(p);
    }

    /* Countdown Timer (Multi-instance) */
    const countdownDate = new Date("May 1, 2026 00:00:00").getTime();
    const daysEls = document.querySelectorAll('.days');
    const hoursEls = document.querySelectorAll('.hours');
    const minEls = document.querySelectorAll('.minutes');
    const secEls = document.querySelectorAll('.seconds');

    if (daysEls.length > 0) {
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(x);
                daysEls.forEach(el => el.innerText = "00");
                hoursEls.forEach(el => el.innerText = "00");
                minEls.forEach(el => el.innerText = "00");
                secEls.forEach(el => el.innerText = "00");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

            daysEls.forEach(el => el.innerText = days);
            hoursEls.forEach(el => el.innerText = hours);
            minEls.forEach(el => el.innerText = minutes);
            secEls.forEach(el => el.innerText = seconds);
        }, 1000);
    }

    // Scroll to Top Hook
    const scrollTopBtns = document.querySelectorAll('a[href="#home"]');
    scrollTopBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    /* Splash Screen Logic */
    const splashScreen = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const scrollDots = document.querySelector('.scroll-dots');

    enterBtn.addEventListener('click', () => {
        splashScreen.classList.add('hide');
        document.body.style.overflow = 'auto'; 
        
        setTimeout(() => {
            mainContent.classList.add('show');
            scrollDots.classList.add('visible');
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 500); 
        }, 800); 
    });

    /* Section Intersection Observer for Fast Reveals */
    const fadeElements = document.querySelectorAll('.fade-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    fadeElements.forEach(el => revealObserver.observe(el));

    /* Active Scroll Dots & Confetti Logic Tracker */
    const sections = document.querySelectorAll('header.section, section.section, footer.section');
    const dots = document.querySelectorAll('.dot');
    
    const currentSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = '#' + entry.target.id;
                dots.forEach(dot => {
                    dot.classList.toggle('active', dot.getAttribute('data-target') === targetId);
                });
            }
        });
    }, { threshold: 0.4 }); 

    sections.forEach(sec => currentSectionObserver.observe(sec));

    // Dots Click Navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.querySelector(dot.getAttribute('data-target'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* Smooth Parallax Effects */
    const heroBg = document.querySelector('.hero-bg');
    const mandalaBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        if (heroBg && window.innerWidth > 768) {
            heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
        
        if (mandalaBg) {
            // Mandala scrolls at a different speed for depth
            mandalaBg.style.transform = `translateY(${Math.max(0, scrollY - mandalaBg.parentElement.offsetTop) * 0.25}px)`;
        }
    });

    /* Interaction Button Listeners - Guided Scroll & Micro-Animations */
    const interactBtns = document.querySelectorAll('.action-btn');
    
    function createFloatingEmojis(btn, emojis) {
        const count = Math.floor(Math.random() * 4) + 6; // 6 to 9 emojis
        const btnRect = btn.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const emojiEl = document.createElement('span');
            emojiEl.classList.add('floating-emoji');
            
            emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            
            const offsetX = (Math.random() - 0.5) * 80; 
            
            emojiEl.style.left = `${btnRect.left + (btnRect.width / 2) + offsetX}px`;
            emojiEl.style.top = `${btnRect.top + window.scrollY - 10}px`;
            
            emojiEl.style.animationDuration = `${1.2 + Math.random() * 0.6}s`;
            
            document.body.appendChild(emojiEl);
            
            setTimeout(() => {
                emojiEl.remove();
            }, 2000);
        }
    }

    interactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Determine the right emojis
            let emojis = ['✨', '💖']; 
            if (this.classList.contains('interact-ring')) emojis = ['✨', '💍', '💖'];
            if (this.classList.contains('interact-dance')) emojis = ['🎵', '🌼', '🎶', '✨'];
            if (this.classList.contains('interact-wedding')) emojis = ['🌸', '🌺', '💖', '✨'];
            if (this.classList.contains('interact-reception')) emojis = ['🥂', '✨', '🍽️'];
            
            // 2. Fire the effect
            createFloatingEmojis(this, emojis);
            
            // 3. Guided Scroll to next section
            const targetSelector = this.getAttribute('data-next');
            if (targetSelector) {
                const targetEl = document.querySelector(targetSelector);
                if (targetEl) {
                    setTimeout(() => {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }, 800); 
                }
            }
        });
    });
});
