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
    
    // Start animation
    animate();
}

// Initialize skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Create intersection observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const level = skillLevel.getAttribute('data-level');
                
                // Animate skill bar
                setTimeout(() => {
                    skillLevel.style.transition = 'width 1.5s ease-out';
                    skillLevel.style.width = level + '%';
                }, 200);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Start observing all skill bars
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill bars when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
});

// Only initialize custom cursor on desktop
if (window.innerWidth > 1024) {
    initCustomCursor();
}
