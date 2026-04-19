// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Show/hide back to top button
        toggleBackToTop();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    // Back to top button
    function toggleBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Initialize skill bars
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = level + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Initialize animations
    function initAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Modal functions
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Add animation classes
            setTimeout(() => {
                modal.classList.add('show');
                modal.querySelector('.modal-content').classList.add('show');
            }, 10);
        }
    }

    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.querySelector('.modal-content').classList.remove('show');
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Modal close handlers
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            hideModal(modal.id);
        });
    });

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.modal.show');
            if (visibleModal) {
                hideModal(visibleModal.id);
            }
        }
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnSpinner = document.getElementById('btn-spinner');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Client-side validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Trim all inputs
            Object.keys(data).forEach(key => {
                data[key] = data[key].trim();
            });

            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                document.getElementById('error-message').textContent = 'Please fill in all required fields.';
                showModal('error-modal');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                document.getElementById('error-message').textContent = 'Please provide a valid email address.';
                showModal('error-modal');
                return;
            }

            // Message length validation
            if (data.message.length < 10) {
                document.getElementById('error-message').textContent = 'Message must be at least 10 characters long.';
                showModal('error-modal');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.style.display = 'none';
            btnSpinner.style.display = 'inline-block';
            formStatus.style.display = 'none';

            try {
                // Use absolute URL for local testing (Live Server or file://), otherwise relative URL
                const isLocal = window.location.hostname === '127.0.0.1' || 
                                window.location.hostname === 'localhost' || 
                                window.location.protocol === 'file:';
                
                // Assuming backend runs on port 3001 locally as per your .env
                const endpoint = isLocal ? 'http://localhost:3001/send' : '/api/send';

                // Send to backend
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    // Success - show success modal
                    this.reset();
                    showModal('success-modal');
                } else {
                    // Error - show error modal with backend message
                    document.getElementById('error-message').textContent = result.message || 'Failed to send message. Please try again later.';
                    showModal('error-modal');
                }
            } catch (error) {
                // Network error
                console.error('Form submission error:', error);
                document.getElementById('error-message').textContent = 'Network error. Please check your connection and try again.';
                showModal('error-modal');
            } finally {
                // Reset loading state
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                btnIcon.style.display = 'inline-block';
                btnSpinner.style.display = 'none';
            }
        });
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize components
    initSkillBars();
    initAnimations();
    
    // Trigger initial scroll to handle page load with hash in URL
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// Debounce function for scroll/resize events
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
