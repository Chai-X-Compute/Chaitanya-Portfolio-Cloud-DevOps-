// Animations for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    initAOS();
    
    // Initialize typing animation for hero roles
    initTypingAnimation();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize scroll-based animations
    initScrollAnimations();
});

// Initialize AOS (Animate On Scroll)
function initAOS() {
    // Add 'data-aos' attributes to elements for animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.setAttribute('data-aos', 'fade-up');
        section.setAttribute('data-aos-duration', '800');
        section.setAttribute('data-aos-delay', index * 100);
        section.setAttribute('data-aos-once', 'true');
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '600');
        card.setAttribute('data-aos-delay', 100 + (index * 100));
        card.setAttribute('data-aos-once', 'true');
    });
    
    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.setAttribute('data-aos', 'fade-up');
        category.setAttribute('data-aos-duration', '600');
        category.setAttribute('data-aos-delay', 100 + (index * 100));
        category.setAttribute('data-aos-once', 'true');
    });
    
    // Initialize AOS with custom settings
    AOS.init({
        once: true,
        disable: window.innerWidth < 768
    });
}

// Typing animation for hero roles
function initTypingAnimation() {
    const roles = [
        'Frontend Developer',
        'Web Developer',
        'Cloud Computing Student',
        'DevOps Learner'
    ];
    
    const roleElement = document.querySelector('.hero-roles span:first-child');
    if (!roleElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // ms per character
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete character
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Type character
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(type, 1000);
}

// Hover effects for interactive elements
function initHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.removeProperty('--x');
            this.style.removeProperty('--y');
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.removeProperty('--mouse-x');
            this.style.removeProperty('--mouse-y');
        });
    });
}

// Parallax effects for depth
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Scroll-based animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport
            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', debounce(checkIfInView));
    
    // Debounce function for scroll events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// Custom cursor effect (optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let isHovering = false;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
    
    // Animate follower
    function animate() {
        // Ease the follower to the cursor position
        followerX += (mouseX - followerX - 8) * 0.2;
        followerY += (mouseY - followerY - 8) * 0.2;
        
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(${isHovering ? 1.5 : 1})`;
        
        requestAnimationFrame(animate);
    }
    
    // Handle hover states
    const hoverElements = document.querySelectorAll('a, button, .project-card, .nav-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            cursorFollower.classList.remove('hover');
        });
    });
}

// Premium Skills Animation System
function initSkillBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Initialize all skill bars with premium styling
    const allSkillBars = document.querySelectorAll('.skill-level');
    const allSkillLabels = document.querySelectorAll('.skill-label');
    
    // Set initial state - bars at 0%, labels hidden
    allSkillBars.forEach((bar) => {
        const level = bar.getAttribute('data-level');
        
        // Force initial state
        bar.style.width = '0%';
        bar.style.transition = 'none';
        bar.style.position = 'absolute';
        bar.style.left = '0';
        bar.style.top = '0';
        bar.style.height = '100%';
        bar.style.display = 'block';
        bar.style.visibility = 'visible';
        bar.style.opacity = '1';
        bar.style.zIndex = '1';
        bar.style.background = 'linear-gradient(90deg, #38bdf8, #0ea5e9, #0284c7)';
        bar.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.6)';
        bar.style.borderRadius = '50px';
    });
    
    // Hide labels initially
    allSkillLabels.forEach((label) => {
        label.style.opacity = '0';
        label.style.transform = 'translateY(10px)';
        label.style.transition = 'all 0.5s ease-out';
    });
    
    // Create intersection observer for premium animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target;
                const skillBars = category.querySelectorAll('.skill-level');
                const skillLabels = category.querySelectorAll('.skill-label');
                const categoryIndex = Array.from(skillCategories).indexOf(category);
                
                // Animate each skill bar with premium staggered timing
                skillBars.forEach((skillBar, barIndex) => {
                    const level = parseInt(skillBar.getAttribute('data-level'));
                    const label = skillLabels[barIndex];
                    
                    // Premium timing: category delay + individual skill delay
                    const delay = 300 + (categoryIndex * 400) + (barIndex * 150);
                    
                    setTimeout(() => {
                        animatePremiumSkillBar(skillBar, level, label);
                    }, delay);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% visible for earlier start
        rootMargin: '0px 0px -100px 0px' // Start slightly earlier
    });
    
    // Start observing all skill categories
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Premium skill bar animation with label reveal
function animatePremiumSkillBar(element, targetLevel, labelElement) {
    let currentLevel = 0;
    const duration = 2000; // 2 seconds for smooth animation
    const steps = 60; // 60 steps for smooth 60fps animation
    const increment = targetLevel / steps;
    const interval = duration / steps;
    
    // Set smooth transition
    element.style.transition = `width ${interval}ms ease-out`;
    element.style.background = 'linear-gradient(90deg, #38bdf8, #0ea5e9, #0284c7)';
    element.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.8)';
    
    // Animate the bar
    const animation = setInterval(() => {
        currentLevel += increment;
        
        if (currentLevel >= targetLevel) {
            currentLevel = targetLevel;
            clearInterval(animation);
            
            // Final polish - slight overshoot and settle
            element.style.width = (targetLevel + 2) + '%';
            element.style.boxShadow = '0 0 30px rgba(56, 189, 248, 1)';
            
            setTimeout(() => {
                element.style.width = targetLevel + '%';
                element.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.6)';
                
                // Reveal label with animation
                if (labelElement) {
                    labelElement.style.opacity = '1';
                    labelElement.style.transform = 'translateY(0)';
                    
                    // Add pulse effect to label
                    setTimeout(() => {
                        labelElement.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            labelElement.style.transform = 'scale(1)';
                        }, 200);
                    }, 300);
                }
            }, 200);
        } else {
            element.style.width = currentLevel + '%';
            
            // Progressive glow effect
            const glowIntensity = (currentLevel / targetLevel) * 0.8;
            element.style.boxShadow = `0 0 ${15 + glowIntensity * 15}px rgba(56, 189, 248, ${0.4 + glowIntensity * 0.4})`;
        }
    }, interval);
}

// Initialize skill bars when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
});

// Only initialize custom cursor on desktop
if (window.innerWidth > 1024) {
    initCustomCursor();
}
