// Ayato Store - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollEffects();
    initSmoothScrolling();
    initAnimations();
    initContactButtons();
    initServiceButtons();
    initTimelineAnimations();
    initParticles();
    init3DCardEffects();
    initTypingEffect();
    initCounterAnimations();
    initParallax();
    initGlowEffects();
    initMorphingBackground();
    fixMobileViewport();

    console.log('🗡️ Ayato Store initialized successfully!');
});

// Fix mobile viewport and prevent zoom issues
function fixMobileViewport() {
    // Prevent double-tap zoom on iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Fix viewport height on mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
}

// Scroll Effects for Navigation
function initScrollEffects() {
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('backdrop-blur-md');
            navbar.classList.remove('backdrop-blur-sm');
        } else {
            navbar.classList.add('backdrop-blur-sm');
            navbar.classList.remove('backdrop-blur-md');
        }
    });

    // Update active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-genshin-gold');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('text-genshin-gold');
            }
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ScrollReveal Animations
function initAnimations() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            easing: 'ease-out'
        });

        // Hero section animations
        sr.reveal('.hero-title', {
            origin: 'left',
            delay: 300
        });
        sr.reveal('.hero-description', {
            origin: 'right',
            delay: 500
        });
        sr.reveal('.hero-buttons', {
            origin: 'bottom',
            delay: 700
        });
        sr.reveal('.hero-image', {
            origin: 'right',
            delay: 900
        });

        // Service cards
        sr.reveal('.service-card', {
            interval: 200,
            scale: 0.9
        });

        // Timeline items
        sr.reveal('.timeline-item', {
            interval: 300,
            origin: 'left'
        });

        // Testimonials
        sr.reveal('.testimonial-card', {
            interval: 150,
            scale: 0.95
        });

        // Contact section
        sr.reveal('.contact-card', {
            interval: 200,
            origin: 'bottom'
        });
    }
}

// Contact Button Functionality
function initContactButtons() {
    const contactButtons = document.querySelectorAll('button, a');

    contactButtons.forEach(button => {
        if (button.textContent.includes('Discord') ||
            button.textContent.includes('Contato') ||
            button.textContent.includes('Falar com Ayato') ||
            button.innerHTML.includes('fa-discord')) {

            button.addEventListener('click', function(e) {
                e.preventDefault();

                // Discord direct link
                //BREVES AJUSTES TÉCNICOS A FAZER, SERVIDOR OU PV






                const discordURL = 'https://discord.gg/TgRKTNjf5A';
                window.open(discordURL, '_blank');
            });
        }
    });
}

// Service Button Functionality
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-card button');

    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card') || this.closest('[class*="bg-gray-800"]');
            const serviceName = serviceCard.querySelector('h3').textContent;

            // Open Discord direct link
            // BREVES AJUSTES TÉCNICOS A FAZER, SERVIDOR OU PV







            const discordURL = 'https://discord.gg/TgRKTNjf5A';
            window.open(discordURL, '_blank');
        });
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('#timeline .relative.flex, .timeline-item');

    // Force visibility immediately
    timelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        item.style.visibility = 'visible';
    });

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in', 'active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';

                // Add pulse effect to timeline icon
                const icon = entry.target.querySelector('.rounded-full');
                if (icon) {
                    icon.classList.add('pulse-animation');
                }
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ========== ADVANCED ANIMATIONS ==========

// Particles Background Animation
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    const colors = ['#0e4b99', '#6b46c1', '#f59e0b', '#3b82f6'];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, colors);
    }

    function createParticle(container, colors) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);

        // Recreate particle when animation ends
        particle.addEventListener('animationiteration', () => {
            particle.style.left = `${Math.random() * 100}%`;
        });
    }
}

// 3D Card Tilt Effect
function init3DCardEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });

    function handleCardTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
            translateZ(10px)
        `;
    }

    function resetCardTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroDescription = document.querySelector('.hero-description');
    if (!heroDescription) return;

    const originalText = heroDescription.textContent;
    heroDescription.textContent = '';
    heroDescription.style.opacity = '1';

    let charIndex = 0;
    const typingSpeed = 30;

    function typeChar() {
        if (charIndex < originalText.length) {
            heroDescription.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        }
    }

    // Start typing after a small delay
    setTimeout(typeChar, 1000);
}

// Counter Animations for Stats
function initCounterAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    // Add data-count attribute to price elements
    const priceElements = document.querySelectorAll('.service-card .text-genshin-gold');
    priceElements.forEach(el => {
        counterObserver.observe(el);
    });

    function animateCounter(element) {
        const text = element.textContent;
        const match = text.match(/R\$\s*(\d+)/);

        if (match) {
            const targetValue = parseInt(match[1]);
            const duration = 1000;
            const steps = 30;
            const increment = targetValue / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    element.textContent = text;
                    clearInterval(timer);
                } else {
                    element.textContent = text.replace(/\d+/, Math.floor(current));
                }
            }, duration / steps);
        }
    }
}

// Parallax Scroll Effect
function initParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        const decorativeElements = document.querySelectorAll('.hero-image > div');

        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }

        decorativeElements.forEach((el, index) => {
            const speed = (index + 1) * 0.15;
            el.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0002})`;
        });

        // Parallax for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight) {
                const speed = 0.05 + (index * 0.01);
                card.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
            }
        });
    }
}

// Glow Effects on Scroll
function initGlowEffects() {
    const glowElements = document.querySelectorAll('.service-card, .testimonial-card, .contact-card');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('glow-border', 'pulse-glow');

                // Add sequential animation delay
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    glowElements.forEach(el => glowObserver.observe(el));
}

// Morphing Background Effect
function initMorphingBackground() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            // Add subtle morphing gradient to alternating sections
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 morphing-bg opacity-5 pointer-events-none';
            section.style.position = 'relative';
            section.insertBefore(overlay, section.firstChild);
        }
    });
}

// Hover Sound Effects (Optional - uncomment if you want sound)
/*
function initHoverSounds() {
    const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiP1fPTgjMGHm7A7+OZSA0PWqzm77BdGAg+ldf0yoI0Bx1rwO7mnEsMC1Kn4/K2YhsGN47U8s+DMQYfbsDu5ZpKDAtSp+LyvmMbBjiO1fLPgzEGH27A7uaaSQwKUqfj8rZjGwY3jtXyz4IyBh9uwO7lmkoMC1Kn4/K2YhsGOI7U8s+DMQYfbsDu5ppJDAtSp+PytmIbBjiO1PLPgjIGH27A7uWaSgwLUqfi8r5jGwY4jtXyz4MxBh9uwO7mmkkMC1Kn4/K2YhsGOI7V8s+DMQYfbsDu5ppJDAtSp+PytmIbBjiO1PLPgjIGH27A7uWaSgwLUqfi8r5jGwY4jtXyz4MxBh9uwO7mmkkMC1Kn4/K2YhsGOI7U8s+CMgYfbsDu5ZpKDAtSp+LyvmMbBjiO1fLPgzEGH27A7uaaSQwLUqfj8rZjGwY3jtXyz4IyBh9uwO7lmkoMC1Kn4vK+YxsGOI7V8s+DMQYfbsDu5ppJDAtSp+PytmIbBjiO1PLPgjIGH27A7uWaSgwLUqfi8r5jGwY4jtXyz4MxBh9uwO7mmkkMC1Kn4/K2YhsGOI7U8s+CMgYfbsDu5ZpKDAtSp+LyvmMbBjiO1fLPgzEGH27A7uaaSQwLUqfj8rZjGwY3jtXyz4IyBh9uwO7lmkoMC1Kn4vK+YxsGOI7V8s+DMQYfbsDu5ppJDAtSp+PytmIbBjiO1PLPgjIGH27A7uWaSgwLUqfi8r5jGwY4jtXyz4MxBh9uwO7mmkkMC1Kn4/K2YhsGN47V8s+CMgYfbsDu5ZpKDAtSp+LyvmMbBjiO1fLPgzEGH27A7uaaSQwLUqfj8rZjGwY3jtXyz4IyBh9uwO7lmkoMC1Kn4vK+YxsGOI7V8s+DMQYfbsDu5ppJDAtSp+PytmIbBjiO1PLPgjIGH27A7uWaSgwL');
    
    const buttons = document.querySelectorAll('button, .contact-card');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
        });
    });
}
*/

// Add shimmer effect to buttons
function addShimmerToButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (!btn.classList.contains('shimmer')) {
            btn.classList.add('shimmer', 'btn-ripple', 'btn-gradient-hover');
        }
    });
}

// Initialize shimmer effects after a delay
setTimeout(addShimmerToButtons, 500);

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Skip on mobile

    mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
    });

    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }

    // Clean up old trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    console.log('🔄 Window resized, recalculating animations...');
    // Reinitialize animations that depend on viewport size
}, 250));

console.log('✨ Advanced animations loaded successfully!');

// Mobile Device Detection and Optimization
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
}

function optimizeForMobile() {
    if (isMobileDevice()) {
        console.log('📱 Mobile device detected - optimizing performance...');

        // Disable heavy animations
        const heavyAnimations = document.querySelectorAll('.float-slow, .float-medium, .float-fast, .morphing-bg');
        heavyAnimations.forEach(el => {
            el.style.animation = 'none';
        });

        // Simplify particles
        const particles = document.querySelector('.particles-container');
        if (particles) {
            particles.style.display = 'none';
        }

        // Reduce glow effects
        const glowElements = document.querySelectorAll('.glow-pulse, .neon-text');
        glowElements.forEach(el => {
            el.style.animation = 'none';
        });

        // Ensure timeline is visible
        const timelineItems = document.querySelectorAll('.timeline-item, #timeline .relative.flex');
        timelineItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
            item.style.visibility = 'visible';
        });
    }
}

// Run on load
optimizeForMobile();

// Rerun on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(optimizeForMobile, 250);
});

// Force timeline visibility after a delay
setTimeout(() => {
    const allTimelineItems = document.querySelectorAll('#timeline .relative.flex, #timeline .space-y-8 > div, .timeline-item');
    allTimelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.transform = 'translateX(0)';
    });
    console.log('✅ Timeline visibility forced:', allTimelineItems.length, 'items');
}, 1000);

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Add entrance animations to all cards
setTimeout(() => {
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        if (!isMobileDevice()) {
            card.classList.add('bounce-in');
        }
    });
}, 500);

// Utility Functions

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado para a área de transferência!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copiado para a área de transferência!');
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform transition-transform duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Loading state for buttons
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.disabled = true;
        button.classList.add('loading');

        const originalContent = button.innerHTML;
        button.dataset.originalContent = originalContent;

        button.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i>Carregando...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');

        if (button.dataset.originalContent) {
            button.innerHTML = button.dataset.originalContent;
        }
    }
}

// Analytics tracking (if needed)
function trackEvent(action, category = 'General', label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }

    console.log(`📊 Event tracked: ${action} - ${category} - ${label}`);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);

    // Optional: Send error to analytics or logging service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);

        // Track load time
        trackEvent('page_load_time', 'Performance', Math.round(loadTime));
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();

        const phoneNumber = '5511999999999'; // Replace with actual number
        const message = encodeURIComponent('Olá! Vim do site da Ayato Store e gostaria de saber mais sobre os serviços.');
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappURL, '_blank');
    }
});

// Export functions for global access
window.AyatoStore = {
    copyToClipboard,
    showNotification,
    setButtonLoading,
    trackEvent
};

// ===== LIGHTBOX =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');

    if (!lightbox || !lightboxImg) return;

    // Abrir ao clicar em qualquer relato-card
    document.querySelectorAll('.relato-card').forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-img');
            lightboxImg.src = src;
            lightbox.classList.add('active');
            lightbox.scrollTop = 0; // sempre começa do topo
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar ao clicar no botão X ou no backdrop
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 350);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);

    // Fechar com ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
}

document.addEventListener('DOMContentLoaded', initLightbox);