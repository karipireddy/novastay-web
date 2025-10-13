// Smooth scrolling for navigation links
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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you soon.');
    this.reset();
});

// Gallery item hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02) rotateZ(1deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateZ(0deg)';
    });
});

// Pricing card hover effects with mutual exclusivity for strong borders
document.querySelectorAll('.pricing-card').forEach(card => {
    let hoverTimeout;
    let isHovered = false;
    
    card.addEventListener('mouseenter', function() {
        isHovered = true;
        clearTimeout(hoverTimeout);
        
        hoverTimeout = setTimeout(() => {
            if (isHovered) {
                // Remove strong border from all other cards first
                document.querySelectorAll('.pricing-card').forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.style.border = '3px solid transparent';
                        // Reset other cards to default state
                        const otherTitle = otherCard.querySelector('h3');
                        if (otherTitle) {
                            otherTitle.style.color = '#333';
                        }
                    }
                });
                
                // Add elevation and scale effects with strong border for current card
                if (this.classList.contains('featured')) {
                    this.style.transform = 'scale(1.08) translateY(-15px)';
                    this.style.boxShadow = '0 30px 80px rgba(184, 134, 11, 0.25), 0 0 0 2px rgba(184, 134, 11, 0.4)';
                    this.style.border = '3px solid var(--primary-gold)';
                } else {
                    this.style.transform = 'scale(1.03) translateY(-12px)';
                    this.style.boxShadow = '0 25px 60px rgba(184, 134, 11, 0.2), 0 0 0 1px rgba(184, 134, 11, 0.3)';
                    this.style.border = '3px solid var(--primary-gold)';
                }
                
                // Add pulsing effect to the button
                const button = this.querySelector('.btn-primary');
                if (button) {
                    button.style.animation = 'pulse 2s infinite';
                }
                
                // Add glow effect to price
                const price = this.querySelector('.pricing-price');
                if (price) {
                    price.style.textShadow = '0 0 20px rgba(184, 134, 11, 0.5)';
                    price.style.transition = 'text-shadow 0.3s ease';
                }
                
                // Add glow effect to the card title
                const title = this.querySelector('h3');
                if (title) {
                    title.style.color = 'var(--primary-gold)';
                    title.style.transition = 'color 0.3s ease';
                }
            }
        }, 250); // 250ms delay
    });
    
    card.addEventListener('mouseleave', function() {
        isHovered = false;
        clearTimeout(hoverTimeout);
        
        // Remove effects immediately from current card
        const button = this.querySelector('.btn-primary');
        const price = this.querySelector('.pricing-price');
        const title = this.querySelector('h3');
        
        if (button) {
            button.style.animation = 'none';
        }
        
        if (price) {
            price.style.textShadow = 'none';
        }
        
        if (title) {
            title.style.color = '#333';
        }
        
        // Reset current card transforms
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
        } else {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
        }
        
        // Restore default border states for all cards
        document.querySelectorAll('.pricing-card').forEach(allCards => {
            if (allCards.classList.contains('featured')) {
                allCards.style.border = '3px solid var(--primary-gold)';
            } else {
                allCards.style.border = '3px solid transparent';
            }
        });
    });
});

// Auto-update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();