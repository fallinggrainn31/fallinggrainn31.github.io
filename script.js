// ==================== MOBILE MENU TOGGLE ==================== 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== SCROLL TO TOP BUTTON ==================== 
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, and achievement items
document.querySelectorAll('.skill-card, .project-card, .achievement-item, .stat-card').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== PROGRESS BAR ANIMATION ==================== 
const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.animation = 'fillProgress 1.5s ease-out forwards';
            }
            skillProgressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillProgressObserver.observe(card);
});

// ==================== STAT COUNTER ANIMATION ==================== 
const statCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                animateCounter(statNumber);
                statNumber.classList.add('counted');
            }
            statCounterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statCounterObserver.observe(card);
});

function animateCounter(element) {
    const finalValue = element.textContent;
    const numericPart = parseInt(finalValue);
    let currentValue = 0;
    const increment = numericPart / 30;
    const suffix = finalValue.replace(/[0-9]/g, '');

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericPart) {
            element.textContent = finalValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue) + suffix;
        }
    }, 30);
}

// ==================== SMOOTH SCROLL TO SECTIONS ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECT ==================== 
const shapes = document.querySelectorAll('.shape');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const move = (index + 1) * 20;
        shape.style.transform = `translate(${mouseX * move}px, ${mouseY * move}px)`;
    });
});

// ==================== FORM SUBMISSION ==================== 
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Validate form
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showNotification('Please fill out all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== ACTIVE NAV LINK ==================== 
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ==================== ADD ACTIVE STYLE ==================== 
const style = document.createElement('style');
style.innerHTML = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== LAZY LOADING IMAGES ==================== 
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== PREFERS REDUCED MOTION ==================== 
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.body.style.animation = 'none';
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== SCROLL VELOCITY ANIMATION ==================== 
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollVelocity = Math.abs(scrollTop - lastScrollTop);
    
    // Add subtle parallax to background
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrollTop * 0.3}px)`;
    });
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== RESIZE HANDLER ==================== 
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
    }, 250);
});

// ==================== PRINT STYLES ==================== 
window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Debounce function for scroll events
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        setTimeout(() => func.apply(this, args), delay);
    };
}

// ==================== ACCESSIBILITY ENHANCEMENTS ==================== 
// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.innerHTML = `
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

console.log('Portfolio loaded successfully! ✨');
