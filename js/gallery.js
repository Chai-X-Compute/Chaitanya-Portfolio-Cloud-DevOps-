document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    let currentGallery = [];
    let currentIndex = 0;
    let isLightboxOpen = false;
    
    // Set up gallery interactions
    function setupGalleryInteractions() {
        // Handle grid item clicks
        document.querySelectorAll('.grid-item').forEach(item => {
            item.addEventListener('click', function() {
                const galleryId = this.dataset.gallery;
                const gallery = this.closest('.project-image');
                const allImages = Array.from(gallery.querySelectorAll(`[data-gallery="${galleryId}"] img`));
                const img = this.querySelector('img');
                const imgIndex = allImages.findIndex(i => i.src === img.src);
                
                openLightbox(galleryId, imgIndex);
            });
        });
        
        // Handle thumbnail clicks
        document.querySelectorAll('.thumbnail-gallery img').forEach(thumb => {
            thumb.addEventListener('click', function(e) {
                e.stopPropagation();
                const galleryId = this.closest('.thumbnail-gallery').dataset.gallery;
                const galleryImages = Array.from(document.querySelectorAll(`.thumbnail-gallery[data-gallery="${galleryId}"] img`));
                const imgIndex = galleryImages.indexOf(this);
                
                // Update active state
                galleryImages.forEach(img => img.classList.remove('active'));
                this.classList.add('active');
                
                // Update grid items
                const gridImages = document.querySelectorAll(`.grid-item[data-gallery="${galleryId}"] img`);
                if (gridImages[imgIndex]) {
                    gridImages[imgIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
                
                // Open lightbox if not already open
                if (!isLightboxOpen) {
                    openLightbox(galleryId, imgIndex);
                }
            });
        });
        
        // Handle view all buttons
        document.querySelectorAll('.view-all-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const galleryId = this.closest('.project-image').querySelector('[data-gallery]').dataset.gallery;
                openLightbox(galleryId, 0);
            });
        });
    }

    // Function to open lightbox
    function openLightbox(galleryId, index = 0) {
        const gallery = document.querySelector(`.thumbnail-gallery[data-gallery="${galleryId}"]`);
        if (!gallery) return;
        
        currentGallery = Array.from(gallery.querySelectorAll('img'));
        currentIndex = Math.max(0, Math.min(index, currentGallery.length - 1));
        isLightboxOpen = true;
        
        // Update lightbox content
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update counter
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        }
        
        // Update active states
        updateActiveStates(galleryId);
        
        // Scroll active thumbnail into view
        const activeThumb = gallery.querySelector(`img:nth-child(${currentIndex + 1})`);
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Update active states for gallery items
    function updateActiveStates(galleryId) {
        // Update thumbnails
        document.querySelectorAll(`.thumbnail-gallery[data-gallery="${galleryId}"] img`).forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });
        
        // Update grid items if any
        const gridItems = document.querySelectorAll(`.grid-item[data-gallery="${galleryId}"]`);
        gridItems.forEach((item, i) => {
            item.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Function to update lightbox image
    function updateLightboxImage() {
        if (currentIndex < 0 || currentIndex >= currentGallery.length) return;
        
        const img = currentGallery[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        // Update counter
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        }
        
        // Update active states
        const galleryId = img.closest('[data-gallery]')?.dataset.gallery;
        if (galleryId) {
            updateActiveStates(galleryId);
        }
    }

    // Initialize galleries
    setupGalleryInteractions();
    
    // Set up grid item clicks to open lightbox
    document.querySelectorAll('.image-grid').forEach(grid => {
        grid.addEventListener('click', function(e) {
            if (e.target.closest('.grid-item')) return; // Handled by setupGalleryInteractions
            
            const galleryId = this.querySelector('[data-gallery]')?.dataset.gallery;
            if (galleryId) {
                openLightbox(galleryId, 0);
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        isLightboxOpen = false;
        
        // Reset lightbox state after transition
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.alt = '';
            currentGallery = [];
            currentIndex = 0;
        }, 300);
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    function showNextImage() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxImage();
        
        // Update active thumbnail in the gallery
        const galleryId = currentGallery[0].closest('[data-gallery]')?.dataset.gallery;
        if (galleryId) {
            const activeThumb = document.querySelector(`.thumbnail-gallery[data-gallery="${galleryId}"] img:nth-child(${currentIndex + 1})`);
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }

    function showPrevImage() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
        
        // Update active thumbnail in the gallery
        const galleryId = currentGallery[0].closest('[data-gallery]')?.dataset.gallery;
        if (galleryId) {
            const activeThumb = document.querySelector(`.thumbnail-gallery[data-gallery="${galleryId}"] img:nth-child(${currentIndex + 1})`);
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNextImage();
    });

    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrevImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, false);

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const touchDuration = Date.now() - touchStartTime;
        
        // Only handle swipe if it was quick enough
        if (touchDuration < 300) {
            handleSwipe();
        }
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to trigger swipe
        const swipeDistance = Math.abs(touchEndX - touchStartX);
        
        // Only trigger if the swipe was significant enough
        if (swipeDistance > swipeThreshold) {
            if (touchEndX < touchStartX) {
                // Swipe left - next image
                showNextImage();
            } else if (touchEndX > touchStartX) {
                // Swipe right - previous image
                showPrevImage();
            }
        }
    }
});
