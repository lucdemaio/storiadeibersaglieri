// Smooth scroll behavior for navigation links
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(220, 20, 60, 0.3)';
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.2)';
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and content sections
document.querySelectorAll('.card, .battaglia-card, .fanfare-card, .raduno-card, .eredita-column, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    updateCounter();
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            
            const number = entry.target.querySelector('.stat-number');
            if (number) {
                const text = number.textContent;
                const numericValue = parseInt(text.replace(/\D/g, ''));
                const hasPlus = text.includes('+');
                const hasInfinity = text.includes('∞');
                
                if (!hasInfinity && !isNaN(numericValue)) {
                    const originalText = number.textContent;
                    if (hasPlus) {
                        animateCounter(number, numericValue);
                    }
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
const heroParticles = document.querySelector('.hero-particles');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Timeline stagger animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animation = `${item.classList.contains('timeline-item-left') ? 'slideInLeft' : 'slideInRight'} 0.6s ease-out ${index * 0.1}s both`;
});

// Add hover effects to interactive elements
const interactiveElements = document.querySelectorAll('.card, .battaglia-card, .fanfare-card, .raduno-card, .eredita-column, .stat-box');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.replace('translateY(0)', '').trim();
    });
});

// Mobile menu toggle (if needed)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--accent-color)';
    });
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    
    // Optional: You can use this for a progress bar
    console.log(`Scroll Progress: ${scrolled.toFixed(2)}%`);
}

window.addEventListener('scroll', updateScrollProgress);

// Dynamic year update in footer
const currentYear = new Date().getFullYear();
const footerYears = document.querySelectorAll('.footer-bottom p');
footerYears.forEach(p => {
    if (p.textContent.includes('©')) {
        p.textContent = `© ${currentYear} - Storia e Tradizione dei Bersaglieri Italiani. Tutti i diritti riservati.`;
    }
});

// Active nav link indicator based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        link.style.borderBottom = '';
    });
    
    if (current) {
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.style.color = 'var(--accent-color)';
        }
    }
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInDown 1.2s ease-out';
    }
    
    // Trigger initial observer checks
    const elementsToObserve = document.querySelectorAll('.card, .battaglia-card, .fanfare-card, .raduno-card, .eredita-column');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
});

// Add some random particle animation for visual interest
function createFloatingParticles() {
    const container = document.querySelector('.hero-section');
    if (!container) return;
    
    // Optional: Add floating particle effects
    // This can be enhanced with actual particle generation
    console.log('Page ready with particle effects support');
}

createFloatingParticles();

// Touch support for mobile
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Trigger animations on swipe if needed
    if (Math.abs(diff) > 50) {
        touchStartY = touchEndY;
    }
});

// Preload images and optimize performance
window.addEventListener('load', () => {
    console.log('All resources loaded. Site is fully interactive.');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    const sections = ['storia', 'battaglie', 'fanfare', 'raduni', 'eredita', 'filatelica'];
    
    if (e.key === 'ArrowDown') {
        const currentScroll = window.scrollY;
        const nextSection = sections.find(id => {
            const element = document.querySelector(`#${id}`);
            return element && element.offsetTop > currentScroll + 100;
        });
        if (nextSection) {
            document.querySelector(`#${nextSection}`).scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp') {
        const currentScroll = window.scrollY;
        const prevSections = sections.filter(id => {
            const element = document.querySelector(`#${id}`);
            return element && element.offsetTop < currentScroll;
        });
        if (prevSections.length > 0) {
            document.querySelector(`#${prevSections[prevSections.length - 1]}`).scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Log analytics (optional)
console.log('🎖️ Bersaglieri Historia Site - Loaded Successfully');
console.log('🇮🇹 Velocitas, Ferrum, Gloria - Velocità, Ferro, Gloria');
