console.log('Certifications script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing certifications');
    // Certification data with file paths and descriptions
    const certifications = [
        {
            id: 'docker-certified-associate',
            title: 'Docker Certified Associate Exam Prep',
            issuer: 'LearnKartS via Coursera',
            date: '2024',
            description: 'Validated understanding of containerization concepts, Docker architecture, image management, container orchestration basics, and best practices for building and deploying containerized applications.',
            file: 'certifications/Docker Certified Associate/Docker Certified Associate (DCA) Specialization Certificate - LearnKartS - Coursera.pdf',
            certificateUrl: 'https://coursera.org/share/e9ed0492f002c3c4e27fe12814893652',
            thumbnail: 'images/certifications/Docker Certified Associate/Screenshot 2026-01-28 015353.png',
            previewImage: true,
            images: [
                { src: 'images/certifications/Docker Certified Associate/Screenshot 2026-01-28 015353.png', alt: 'Docker Certified Associate Certificate' }
            ]
        },
        {
            id: 'linux-cloud-devops',
            title: 'Linux for Cloud & DevOps Engineers',
            issuer: 'Packt via Coursera',
            date: '2023',
            description: 'Developed practical skills in Linux system administration, shell scripting, process management, networking, and security fundamentals essential for cloud and DevOps environments.',
            file: 'certifications/Linux for Cloud & DevOps Engineers/Coursera _ Certificate _ Linux for Cloud and DevOps Engineers.pdf',
            certificateUrl: 'https://coursera.org/share/40498e0d121f1209a0d6068e9b71397e',
            thumbnail: 'images/certifications/Linux for Cloud and DevOps Engineers/Screenshot 2026-01-28 015307.png',
            previewImage: true,
            images: [
                { src: 'images/certifications/Linux for Cloud and DevOps Engineers/Screenshot 2026-01-28 015307.png', alt: 'Linux for Cloud & DevOps Certificate' }
            ]
        },
        {
            id: 'aws-foundations',
            title: 'AWS Academy Cloud Foundations',
            issuer: 'AWS Academy/AWS Training & Certification',
            date: '2023',
            description: 'Gained foundational knowledge of AWS cloud architecture, core services, pricing models, security, and support, with an emphasis on cloud computing best practices.',
            file: 'certifications/AWS Academy Cloud Foundations/Exam Prep - AWS Certified Cloud Practitioner Foundations/Coursera_Certificate_Exam Prep-AWS Certified Cloud Practitioner Foundations.pdf',
            certificateUrl: 'https://coursera.org/share/54f75794d4f42fa8491e5d206a0344de',
            thumbnail: 'images/certifications/AWS Academy Cloud Foundations/Exam Prep - AWS Certified Cloud Practitioner Foundations/Screenshot 2026-01-28 015627.png',
            previewImage: true,
            images: [
                { src: 'images/certifications/AWS Academy Cloud Foundations/Exam Prep - AWS Certified Cloud Practitioner Foundations/Screenshot 2026-01-28 015627.png', alt: 'AWS Cloud Practitioner Certificate' },
                { src: 'images/certifications/AWS Academy Cloud Foundations/AWS Academy Graduate - Cloud Foundations - Training Badge/Screenshot 2026-01-28 015207.png', alt: 'AWS Academy Graduate Badge' }
            ]
        },
        {
            id: 'azure-devops',
            title: 'Azure DevOps & Continuous Delivery with Git',
            issuer: 'Packt via Coursera',
            date: '2023',
            description: 'Learned CI/CD principles, Git-based version control, build and release pipelines, and automated deployment workflows using Azure DevOps tools.',
            file: 'certifications/Azure DevOps & Continuous Delivery with Git/Coursera - Azure DevOps and Continuous Delivery with Git.pdf',
            certificateUrl: 'https://coursera.org/share/4a4bd9e858edc6ef5586477155233f45',
            thumbnail: 'images/certifications/Azure DevOps and Continuous Delivery with Git/Screenshot 2026-01-28 015246.png',
            previewImage: true,
            images: [
                { src: 'images/certifications/Azure DevOps and Continuous Delivery with Git/Screenshot 2026-01-28 015246.png', alt: 'Azure DevOps Certificate' }
            ]
        },
        {
            id: 'gcp-fundamentals',
            title: 'Google Cloud Fundamentals - Core Infrastructure',
            issuer: 'Google Cloud via Coursera',
            date: '2023',
            description: 'Acquired an understanding of Google Cloud\'s core infrastructure, including compute, storage, networking, identity, and resource management in cloud environments.',
            file: 'certifications/Google Cloud Fundamentals - Core Infrastructure/Coursera_Google Cloud Fundamentals - Core Infrastructure.pdf',
            certificateUrl: 'https://coursera.org/share/11cbee14ef4c5b2e19f6509d1cdabbf1',
            thumbnail: 'images/certifications/Google Cloud Fundamentals - Core Infrastructure/Screenshot 2026-01-28 015330.png',
            previewImage: true,
            images: [
                { src: 'images/certifications/Google Cloud Fundamentals - Core Infrastructure/Screenshot 2026-01-28 015330.png', alt: 'Google Cloud Fundamentals Certificate' }
            ]
        }
    ];

    // Create modal HTML
    function createCertificationModal() {
        const modal = document.createElement('div');
        modal.className = 'certification-modal';
        modal.id = 'certificationModal';
        modal.innerHTML = `
            <div class="certification-modal-content">
                <button class="close-cert-modal" aria-label="Close">&times;</button>
                <div class="certification-modal-body">
                    <div class="certification-gallery">
                        <div class="main-certificate">
                            <img id="mainCertImage" src="" alt="Certificate" class="main-cert-img">
                        </div>
                        <div class="thumbnail-gallery" id="certificationGallery">
                            <!-- Thumbnails will be added here dynamically -->
                        </div>
                    </div>
                    <div class="certification-details">
                        <h2 id="certificationTitle"></h2>
                        <div class="cert-meta">
                            <p id="certificationIssuer"></p>
                            <p id="certificationDate"></p>
                        </div>
                        <div class="cert-description">
                            <h4>About this certification:</h4>
                            <p id="certificationDescription"></p>
                        </div>
                        <div class="cert-actions">
                            <a id="certificationDownload" href="#" class="cert-action-btn" download>
                                <i class="fas fa-download"></i> Download PDF
                            </a>
                            <a id="certificationView" href="#" class="cert-action-btn view-cert-btn" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i> Verify on Coursera
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lightbox" id="certLightbox">
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <div class="lightbox-navigation">
                        <button class="nav-btn prev-btn" aria-label="Previous image">&larr;</button>
                        <img id="lightboxImage" src="" alt="Certificate" class="lightbox-img">
                        <button class="nav-btn next-btn" aria-label="Next image">&rarr;</button>
                    </div>
                    <p id="lightboxCaption" class="lightbox-caption"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Initialize modal
    function initCertificationModal() {
        createCertificationModal();
        
        const modal = document.getElementById('certificationModal');
        const closeBtn = modal.querySelector('.close-cert-modal');
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCertModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeCertModal();
            }
        });
        
        // Close button
        closeBtn.addEventListener('click', closeCertModal);
    }
    
    // Initialize certification gallery
    function initCertificationGallery(cert) {
        const gallery = document.getElementById('certificationGallery');
        const mainImage = document.getElementById('mainCertImage');
        
        // Clear existing gallery items
        gallery.innerHTML = '';
        
        // Set the first image as the main image
        if (cert.images.length > 0) {
            mainImage.src = cert.images[0].src;
            mainImage.alt = cert.images[0].alt;
        }
        
        // Add thumbnails to gallery
        cert.images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-item' + (index === 0 ? ' active' : '');
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.loading = 'lazy';
            
            // Add click event to change main image
            thumbnail.addEventListener('click', (e) => {
                e.stopPropagation();
                // Update active state
                document.querySelectorAll('.thumbnail-item').forEach(item => item.classList.remove('active'));
                thumbnail.classList.add('active');
                // Update main image
                mainImage.src = img.src;
                mainImage.alt = img.alt;
            });
            
            thumbnail.appendChild(imgElement);
            gallery.appendChild(thumbnail);
        });
        
        // Add click event to main image to open lightbox
        mainImage.addEventListener('click', () => {
            if (cert.images.length > 0) {
                openLightbox(cert.images, 0);
            }
        });
    }
    
    // Lightbox functionality
    function openLightbox(images, startIndex = 0) {
        const lightbox = document.getElementById('certLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        let currentIndex = startIndex;
        
        // Show first image
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Navigation functions
        function showImage(index) {
            if (index >= 0 && index < images.length) {
                currentIndex = index;
                lightboxImg.src = images[currentIndex].src;
                lightboxCaption.textContent = images[currentIndex].alt;
            }
        }
        
        // Event listeners for navigation
        document.querySelector('.prev-btn').onclick = (e) => {
            e.stopPropagation();
            showImage((currentIndex - 1 + images.length) % images.length);
        };
        
        document.querySelector('.next-btn').onclick = (e) => {
            e.stopPropagation();
            showImage((currentIndex + 1) % images.length);
        };
        
        // Close lightbox
        document.querySelector('.close-lightbox').onclick = (e) => {
            e.stopPropagation();
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        };
        
        // Close on click outside image
        lightbox.onclick = (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
        
        // Keyboard navigation
        document.onkeydown = function(e) {
            if (lightbox.style.display === 'flex') {
                e = e || window.event;
                if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = '';
                } else if (e.key === 'ArrowLeft') {
                    showImage((currentIndex - 1 + images.length) % images.length);
                } else if (e.key === 'ArrowRight') {
                    showImage((currentIndex + 1) % images.length);
                }
            }
        };
    }
    
    // Open certification modal
    function openCertModal(certId) {
        const cert = certifications.find(c => c.id === certId);
        if (!cert) return;
        
        const modal = document.getElementById('certificationModal');
        
        // Set certification details
        document.getElementById('certificationTitle').textContent = cert.title;
        document.getElementById('certificationIssuer').textContent = `Issued by: ${cert.issuer}`;
        document.getElementById('certificationDate').textContent = `Date: ${cert.date}`;
        document.getElementById('certificationDescription').textContent = cert.description;
        
        // Initialize gallery
        initCertificationGallery(cert);
        
        // Set PDF download link
        const downloadLink = document.getElementById('certificationDownload');
        downloadLink.href = cert.file;
        downloadLink.setAttribute('download', `${cert.title.replace(/\s+/g, '_')}.pdf`);
        
        // Set View Certificate link
        const viewLink = document.getElementById('certificationView');
        viewLink.href = cert.certificateUrl;
        
        // Show modal
        document.body.style.overflow = 'hidden';
        modal.classList.add('active');
    }
    
    // Close modal
    function closeCertModal() {
        const modal = document.getElementById('certificationModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal content to prevent state persistence
        setTimeout(() => {
            // Clear the main image
            const mainImage = document.getElementById('mainCertImage');
            if (mainImage) {
                mainImage.src = '';
                mainImage.alt = '';
            }
            
            // Clear the gallery
            const gallery = document.getElementById('certificationGallery');
            if (gallery) {
                gallery.innerHTML = '';
            }
            
            // Reset any active states
            document.querySelectorAll('.thumbnail-item').forEach(item => {
                item.classList.remove('active');
            });
        }, 300); // Wait for the fade-out animation to complete
    }
    
    // Initialize certification cards
    function initCertificationCards() {
        const container = document.querySelector('.certifications-list');
        console.log('Initializing certification cards, container:', container);
        if (!container) {
            console.error('Could not find .certifications-list container');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Add certification cards
        certifications.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'certification-item';
            card.setAttribute('data-cert', cert.id);
            
            console.log('Creating certification card for:', cert.title, 'with thumbnail:', cert.thumbnail);
            
            card.innerHTML = `
                <div class="certification-image">
                    <img src="${cert.thumbnail}" alt="${cert.title}" class="cert-thumbnail" 
                         onerror="this.onerror=null; this.src='images/certifications/default-cert.png'; console.log('Image failed to load:', '${cert.thumbnail}');">
                </div>
                <div class="certification-preview">
                    <h3>${cert.title}</h3>
                    <p class="issuer">${cert.issuer}</p>
                    <span class="view-cert">View Certificate <i class="fas fa-external-link-alt"></i></span>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                console.log('Clicked on certification:', cert.title);
                e.stopPropagation();
                openCertModal(cert.id);
            });
            container.appendChild(card);
        });
    }
    
    // Initialize everything when DOM is loaded
    console.log('Initializing certification modal and cards');
    
    // Create and append the modal to the DOM
    createCertificationModal();
    
    // Initialize the modal functionality
    const modal = document.getElementById('certificationModal');
    const closeBtn = modal.querySelector('.close-cert-modal');
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCertModal();
        }
    });
    
    // Close button
    closeBtn.addEventListener('click', closeCertModal);
    
    // Handle page visibility changes (when returning from external links)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // If modal was open when user left the page, close it
            if (modal.classList.contains('active')) {
                closeCertModal();
            }
        }
    });
    
    // Handle potential page freeze when returning from external links
    window.addEventListener('pageshow', function(event) {
        // If page is loaded from bfcache (back/forward cache)
        if (event.persisted) {
            closeCertModal();
        }
    });
    
    // Initialize certification cards
    initCertificationCards();
    
    console.log('Certifications initialization complete');
});
