// Theme Management for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Apply theme on page load
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun icon';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-moon icon';
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-sun icon' : 'fas fa-moon icon';
            }
            
            // Dispatch a custom event for any components that need to update
            document.dispatchEvent(new CustomEvent('themeChange', {
                detail: { theme: newTheme }
            }));
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-sun icon';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-moon icon';
            }
        }
    });
    
    // Add theme class to body for better CSS targeting
    document.body.classList.add('theme-loaded');
    
    // Smooth transitions after page load
    setTimeout(() => {
        document.body.classList.add('transitions-enabled');
    }, 100);
});

// Utility function to get current theme
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

// Utility function to check if dark mode is active
function isDarkMode() {
    return getCurrentTheme() === 'dark';
}

// Utility function to toggle theme programmatically
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = !themeToggle.checked;
        themeToggle.dispatchEvent(new Event('change'));
    } else {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: newTheme }
        }));
    }
}

// Listen for theme changes across the application
document.addEventListener('themeChange', (e) => {
    // Update any components that need to respond to theme changes
    updateThemeDependentElements(e.detail.theme);
});

// Update elements that depend on the current theme
function updateThemeDependentElements(theme) {
    // Example: Update theme-specific images or icons
    const themeImages = document.querySelectorAll('[data-theme-image]');
    themeImages.forEach(img => {
        const darkSrc = img.getAttribute('data-dark-src');
        const lightSrc = img.getAttribute('data-light-src');
        
        if (theme === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (theme === 'light' && lightSrc) {
            img.src = lightSrc;
        }
    });
    
    // Update theme-specific colors
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#020617');
        root.style.setProperty('--surface-color', '#0f172a');
        root.style.setProperty('--text-primary', '#f8fafc');
        root.style.setProperty('--text-secondary', '#cbd5e1');
    } else {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--surface-color', '#f1f5f9');
        root.style.setProperty('--text-primary', '#0f172a');
        root.style.setProperty('--text-secondary', '#475569');
    }
}

// Add theme toggle button to the page
function addThemeToggle() {
    const header = document.querySelector('header');
    if (!header || document.getElementById('theme-toggle-container')) return;
    
    const toggleContainer = document.createElement('div');
    toggleContainer.id = 'theme-toggle-container';
    toggleContainer.className = 'theme-toggle-container';
    
    toggleContainer.innerHTML = `
        <input type="checkbox" id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
        <label for="theme-toggle" class="theme-toggle-label">
            <svg class="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </label>
    `;
    
    header.appendChild(toggleContainer);
    
    // Initialize the toggle state
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = isDarkMode();
    }
}

// Call this function to add the theme toggle button
// addThemeToggle(); // Uncomment this line if you want to add a theme toggle button

// Export functions for use in other modules
window.ThemeManager = {
    getCurrentTheme,
    isDarkMode,
    toggleTheme,
    addThemeToggle
};
