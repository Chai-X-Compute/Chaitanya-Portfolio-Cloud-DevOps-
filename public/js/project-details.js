document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projects = {
        project1: {
            title: 'KrushiMitra',
            subtitle: 'Agricultural Resource Platform',
            description: 'Comprehensive cloud-based platform connecting farmers with resources, marketplace, and community features for agricultural communities.',
            features: [
                'Firebase Authentication with Google Sign-in integration',
                'E-commerce Marketplace with Razorpay payment processing',
                'Advanced Search & Filters for agricultural resources',
                'Analytics Dashboard for user activity and metrics',
                'Community Forum with posts, likes, and nested comments',
                'Complete User Management with profile and address system',
                'Security features with CSRF protection and secure sessions',
                'Email system for OTP verification and notifications',
                'Fully Mobile Responsive design',
                'Agricultural resource listing and management'
            ],
            technologies: ['Flask', 'Tailwind CSS', 'AWS RDS', 'Firebase Auth', 'Razorpay'],
            github: 'https://github.com/Chai-X-Compute/KrushiMitra_v1',
            demo: '#',
            images: [
                { src: 'images/project1/System Homepage - Dashboard.png', alt: 'System Homepage - Dashboard' },
                { src: 'images/project1/Community Forum Interface.png', alt: 'Community Forum Interface' },
                { src: 'images/project1/E-commerce Product Catalog.png', alt: 'E-commerce Product Catalog' },
                { src: 'images/project1/Equipment Listing Interface.png', alt: 'Equipment Listing Interface' },
                { src: 'images/project1/Equipment Uploading Interface.png', alt: 'Equipment Uploading Interface' },
                { src: 'images/project1/Language Translation Feature.png', alt: 'Language Translation Feature' }
            ]
        },
        project2: {
            title: 'Cloud-Based',
            subtitle: 'File Storage System',
            description: 'Developed a local server–based cloud storage system using Flask and MySQL that provides secure file upload, storage, and retrieval with user authentication, file management, and database-backed access control.',
            features: [
                'Secure user authentication and authorization',
                'Secure file upload and storage',
                'File management (view, download)',
                'Responsive design',
                'Flash notifications'
            ],
            technologies: ['Flask', 'SQLAlchemy', 'Flask-Login', 'Bootstrap', 'SQLite/MySQL'],
            github: '#',
            demo: '#',
            images: [
                { src: 'images/project2/Screenshot 2026-01-26 024111.png', alt: 'Login Page' },
                { src: 'images/project2/Screenshot 2026-01-26 024049.png', alt: 'Register Page' },
                { src: 'images/project2/Screenshot 2026-01-26 024155.png', alt: 'Dashboard' }
            ]
        },
        project3: {
            title: 'QuickWeather',
            subtitle: 'Web App',
            description: 'A simple and responsive web application that displays current weather data based on the user location or a city they enter. Built using HTML, CSS, and JavaScript with the OpenWeatherMap API.',
            features: [
                'Current weather conditions with detailed metrics',
                '5-day forecast with hourly breakdowns',
                'Location-based weather',
                'Dark/light mode toggle',
                'Responsive design for all devices',
                'Search functionality for any location'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'OpenWeather API'],
            github: 'https://github.com/Chai-X-Compute/QuickWeather_Web_App',
            demo: 'https://chai-x-compute.github.io/QuickWeather_Web_App/',
            images: [
                { src: 'images/project3/Screenshot 2026-01-26 024852.png', alt: 'Current Weather in Dark Mode' },
                { src: 'images/project3/Screenshot 2026-01-26 024913.png', alt: 'Current Weather in Light Mode' }
            ]
        },
        project4: {
            title: 'Event Management',
            subtitle: 'Web Application',
            description: 'Built a responsive event management web app with event creation, attendee registration, and an admin dashboard supporting 4+ event categories and participant tracking. Implemented live search and filter across all events, dark mode toggle, and mobile-first responsive design for accessibility across all screen sizes.',
            features: [
                'Event creation and management with 4+ event categories',
                'Attendee registration and tracking system',
                'Admin dashboard for event oversight',
                'Live search and filter functionality',
                'Dark mode toggle support',
                'Mobile-first responsive design',
                'Participant tracking and analytics'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            github: 'https://github.com/Chai-X-Compute/event-management-system',
            demo: '#',
            images: [
                { src: 'images/project4/Event Management Dashboard.png', alt: 'Admin Dashboard' },
                { src: 'images/project4/Event Admin Dashboard.png', alt: 'Admin Dashboard' },
                { src: 'images/project4/Event creation.png', alt: 'Event Creation' },
                { src: 'images/project4/Event Listing.png', alt: 'Event Listing' }
            ]
        }
    };

    // Create modal HTML
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.id = 'projectModal';
        modal.innerHTML = `
            <div class="project-modal-content">
                <div class="modal-header">
                    <div class="project-titles">
                        <h2 id="modalProjectTitle"></h2>
                        <h3 id="modalProjectSubtitle"></h3>
                    </div>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="project-gallery">
                        <h4>Project Screenshots</h4>
                        <div class="image-grid" id="projectGallery"></div>
                    </div>
                    
                    <div class="project-overview">
                        <p id="projectDescription"></p>
                    </div>
                    
                    <div class="project-details-grid">
                        <div class="project-section">
                            <h4>Key Features</h4>
                            <ul class="features-list" id="projectFeatures"></ul>
                        </div>
                        
                        <div class="project-section">
                            <h4>Technologies</h4>
                            <div class="tech-tags" id="techStack"></div>
                           
                            <div class="project-links" id="projectLinks">
                                <h4>Links</h4>
                                <div class="links-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Initialize modal
    function initModal() {
        createModal();
        
        const modal = document.getElementById('projectModal');
        const closeBtn = modal.querySelector('.close-modal');
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Close button
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Open modal with project data
    function openModal(projectId) {
        const project = projects[projectId];
        if (!project) return;
        
        const modal = document.getElementById('projectModal');
        
        // Set project title and subtitle
        document.getElementById('modalProjectTitle').textContent = project.title;
        if (project.subtitle) {
            document.getElementById('modalProjectSubtitle').textContent = project.subtitle;
        }
        
        // Set project description
        document.getElementById('projectDescription').textContent = project.description;
        
        // Set features as a simple list
        const featuresContainer = document.getElementById('projectFeatures');
        featuresContainer.innerHTML = project.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
        
        // Set technologies as tags
        const techStackContainer = document.getElementById('techStack');
        techStackContainer.innerHTML = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join(' ');
        
        // Set project links in a cleaner format
        const linksContainer = document.querySelector('.project-links .links-container');
        let linksHtml = '';
        
        if (project.github) {
            const repoName = project.github.split('/').slice(-2).join('/');
            linksHtml += `
                <div class="link-item">
                    <i class="fab fa-github"></i>
                    <a href="${project.github}" target="_blank">${repoName}</a>
                </div>`;
        }
        
        if (project.demo) {
            const demoUrl = project.demo.replace(/^https?:\/\//, '').split('/')[0];
            linksHtml += `
                <div class="link-item">
                    <i class="fas fa-external-link-alt"></i>
                    <a href="${project.demo}" target="_blank">${demoUrl}</a>
                </div>`;
        }
        
        linksContainer.innerHTML = linksHtml || '<p>No links available</p>';
        
        // Set project gallery with thumbnails
        const galleryContainer = document.getElementById('projectGallery');
        galleryContainer.innerHTML = project.images
            .map((img, index) => `
                <div class="gallery-item" data-gallery="${projectId}" data-index="${index}">
                    <img src="${img.src}" alt="${img.alt}" loading="lazy">
                    <div class="gallery-caption">${img.alt}</div>
                </div>
            `).join('');
        
        // Show modal with animation
        document.body.style.overflow = 'hidden';
        modal.classList.add('active');
        
        // Initialize gallery for this modal
        initModalGallery(project);
    }
    
    // Close modal
    function closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Initialize gallery inside modal
    function initModalGallery(project) {
        const galleryItems = document.querySelectorAll(`#projectGallery .gallery-item`);
        
        // Remove click behavior - images should not open separate viewer
        galleryItems.forEach(item => {
            item.style.cursor = 'default';
            // No click event listener - images stay within modal
        });
    }
    
    // Initialize project cards
    function initProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            const projectId = card.dataset.project;
            if (projectId) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function(e) {
                    // Don't trigger if clicking on links or buttons
                    if (e.target.tagName === 'A' || e.target.closest('a, button')) {
                        return;
                    }
                    openModal(projectId);
                });
                
                // Add hover effect
                card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-5px)';
                    card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            }
        });
    }
    
    // Initialize everything when DOM is loaded
    initModal();
    initProjectCards();
});
