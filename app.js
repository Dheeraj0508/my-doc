// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initTypewriter();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
    initMobileMenu();
    initSkillBars();
    initCounters();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        }
    }
    
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateNavbarBackground();
    });
    
    // Initial call
    updateActiveNav();
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Typewriter effect
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const phrases = [
        'Data Analyst',
        'Business Intelligence Expert',
        'Python Developer',
        'SQL Specialist',
        'Power BI Professional'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeEffect, 1000);
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
                
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.timeline-content, .education-card, .project-card, .cert-card, .stat-card, .skill-category'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Animated counters
function initCounters() {
    // This will be triggered by the intersection observer
}

function animateCounter(element) {
    if (element.classList.contains('animated')) return;
    
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 10) {
            element.textContent = Math.ceil(current) + '+';
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 40);
    
    element.classList.add('animated');
}

// Skill bars animation
function initSkillBars() {
    // This will be triggered by the intersection observer
}

function animateSkillBars(skillCategory) {
    if (skillCategory.classList.contains('animated')) return;
    
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
    
    skillCategory.classList.add('animated');
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Download resume functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.hero-buttons .btn--primary');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a temporary notification since we don't have an actual resume file
            showNotification('Resume download feature would be implemented with actual resume file.', 'info');
        });
    }
});

// Project demo and code buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectButtons = document.querySelectorAll('.project-links .btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isDemo = this.textContent.trim().includes('Demo');
            const isCode = this.textContent.trim().includes('Code');
            
            if (isDemo) {
                showNotification('Demo link would redirect to live project demo.', 'info');
            } else if (isCode) {
                showNotification('Code link would redirect to GitHub repository.', 'info');
            }
        });
    });
});

// Enhanced scroll behavior for better performance
let ticking = false;

function updateOnScroll() {
    // Update scroll-dependent elements here
    if (!ticking) {
        requestAnimationFrame(() => {
            // Scroll-dependent updates
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Preload important assets
function preloadAssets() {
    // Preload any critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
}

// Initialize preloading
preloadAssets();

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Start animations after page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    }, 300);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Focus management for better accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
}

// Initialize focus management
manageFocus();

// Performance optimization: Lazy load images if any were added
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// Error handling for any runtime errors
window.addEventListener('error', function(e) {
    console.error('Runtime error caught:', e.error);
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle hover effects to cards
    const cards = document.querySelectorAll('.card, .project-card, .cert-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click handlers for contact items
    const contactItems = document.querySelectorAll('.hero-contact .contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        const text = item.textContent.trim();
        
        if (!link && (text.includes('@') || text.includes('+'))) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                if (text.includes('@')) {
                    window.location.href = `mailto:${text.split(' ').pop()}`;
                } else if (text.includes('+') || text.match(/\d/)) {
                    window.location.href = `tel:${text.replace(/\D/g, '')}`;
                }
            });
        }
    });
});

console.log('🚀 Dheeraj Patil\'s Portfolio loaded successfully!');