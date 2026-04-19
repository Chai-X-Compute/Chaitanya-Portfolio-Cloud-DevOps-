# Chaitanya Gote - Professional Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and professional experience as a Cloud & DevOps Engineer and Full-Stack Web Developer.

## [Live Demo](https://chai-x-compute.github.io/) | [Portfolio Link](https://chai-x-compute.github.io/)

---

## About This Project

This portfolio website is a comprehensive demonstration of my technical expertise in web development, cloud technologies, and DevOps practices. Built with a focus on performance, accessibility, and user experience, it serves as both a professional showcase and a technical proof-of-concept.

### Key Features

- **Responsive Design**: Mobile-first approach with seamless cross-device compatibility
- **Modern UI/UX**: Clean, professional interface with smooth animations and transitions
- **Interactive Project Gallery**: Dynamic modal system with image galleries for project showcases
- **Contact Form**: Fully functional contact system with email integration via Nodemailer
- **Dark/Light Theme**: Theme toggle for enhanced user preference
- **Performance Optimized**: Lazy loading, optimized assets, and efficient code structure
- **SEO Friendly**: Semantic HTML5 structure with proper meta tags
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

---

## Tech Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript (ES6+)**: Interactive features and dynamic content management
- **Font Awesome**: Professional icons and UI elements

### Backend & Infrastructure
- **Node.js**: Runtime environment for server-side functionality
- **Express.js**: Web framework for API and contact form handling
- **Nodemailer**: Email service integration for contact form submissions
- **Gmail SMTP**: Secure email delivery with OAuth2 authentication

### Development Tools
- **Git**: Version control and collaboration
- **GitHub Pages**: Static site hosting
- **VS Code**: Development environment with integrated tooling
- **Chrome DevTools**: Performance optimization and debugging

---

## Project Structure

```
portfolio-website/
|
|-- css/
|   |-- style.css              # Main stylesheet
|   |-- animations.css         # Animation definitions
|   |-- theme.css              # Dark/light theme styles
|   |-- modal.css              # Modal and popup styles
|   |-- gallery.css            # Image gallery styles
|   |-- contact.css            # Contact form styling
|   |-- certifications.css     # Certifications section styles
|
|-- js/
|   |-- main.js                # Core functionality and navigation
|   |-- animations.js          # Scroll animations and effects
|   |-- theme.js               # Theme toggle functionality
|   |-- project-details.js     # Project modal management
|   |-- certifications-modal.js # Certifications modal system
|   |-- gallery.js             # Image gallery and lightbox
|
|-- images/
|   |-- project1/              # KrushiMitra project screenshots
|   |-- project2/              # File Storage project screenshots
|   |-- project3/              # QuickWeather project screenshots
|   |-- project4/              # Event Management project screenshots
|   |-- profile/               # Profile and avatar images
|   |-- certifications/        # Certificate images
|
|-- resume/
|   |-- Chaitanya_Gote_Resume.pdf # Professional resume document
|
|-- index.html                 # Main HTML file
|-- server.js                  # Express server for contact form
|-- package.json               # Node.js dependencies
|-- .env                       # Environment variables (gitignored)
`-- README.md                  # This file
```

---

## Featured Projects

### 1. KrushiMitra - Agricultural Resource Platform
A comprehensive cloud-based platform connecting farmers with resources, marketplace features, and community engagement. Built with Python Flask, AWS services, and modern web technologies.

**Tech Stack**: Python Flask | MySQL + SQLAlchemy | AWS RDS | AWS S3 | Firebase Auth | Razorpay API | Tailwind CSS | Vanilla JS

### 2. Cloud-Based Secure File Storage System
Full-stack cloud-backed file management application with role-based access control, AWS S3 integration, and comprehensive authentication system.

**Tech Stack**: Python Flask | SQLAlchemy ORM | Flask-Login | MySQL/SQLite | AWS S3 | Bootstrap | Linux (Ubuntu)

### 3. QuickWeather Web App
Responsive weather dashboard with real-time data, 5-day forecasts, and dark/light mode functionality.

**Tech Stack**: HTML5 | CSS3 | JavaScript | OpenWeather API

### 4. Event Management System
Comprehensive event management platform with creation tools, attendee tracking, and admin dashboard.

**Tech Stack**: HTML5 | CSS3 | JavaScript

---

## Getting Started

### Prerequisites
- Node.js (v14.0 or higher)
- npm or yarn package manager
- Gmail account with app password for email functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chai-X-Compute/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   touch .env
   ```
   
   Add the following to your `.env` file:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   # For development with auto-reload
   npm run dev
   
   # Or for production
   npm start
   ```

5. **Open in browser**
   - Frontend: Open `index.html` directly in your browser
   - Backend API: `http://localhost:3000`

### Gmail Setup for Contact Form

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
3. Use the app password in your `.env` file

---

## API Endpoints

### Contact Form
- **POST** `/send`
  - Handles contact form submissions
  - Validates input data
  - Sends email via Nodemailer
  - Rate limited to prevent abuse

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in your work..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! \ud83d\ude80"
}
```

---

## Performance & Optimization

### Implemented Optimizations
- **Lazy Loading**: Images load as needed for faster initial page load
- **Minified Assets**: CSS and JavaScript optimized for production
- **Semantic HTML**: Improved SEO and accessibility
- **Responsive Images**: Optimized for different screen sizes
- **Caching Strategy**: Browser caching for static assets
- **CDN Ready**: Structured for easy CDN deployment

### Performance Metrics
- **Lighthouse Score**: 90+ across all categories
- **Page Load Time**: <2 seconds on 3G networks
- **First Contentful Paint**: <1.5 seconds
- **Accessibility**: WCAG 2.1 AA compliant

---

## Security Features

- **CSRF Protection**: Cross-site request forgery prevention
- **Input Validation**: Server-side and client-side validation
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: HTTP security headers implementation
- **Environment Variables**: Sensitive data protection
- **XSS Prevention**: Cross-site scripting mitigation

---

## Deployment

### Static Site Deployment (GitHub Pages)
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Select source as `main` branch
4. Site deployed automatically

### Full Stack Deployment
1. **Frontend**: Deploy static files to any static hosting service
2. **Backend**: Deploy Node.js server to cloud platform (AWS, Heroku, etc.)
3. **Environment**: Configure production environment variables
4. **Domain**: Configure custom domain and SSL certificate

---

## Contributing

This is a personal portfolio project. While I'm not accepting external contributions, I'm open to:
- Feedback and suggestions
- Bug reports and issue reporting
- Networking and collaboration opportunities

Feel free to reach out through the contact form or LinkedIn!

---

## Connect With Me

- **Portfolio**: [Chai-X-Compute.github.io](https://chai-x-compute.github.io/)
- **GitHub**: [@Chai-X-Compute](https://github.com/Chai-X-Compute)
- **LinkedIn**: [chaitanya-gote](https://www.linkedin.com/in/chaitanya-gote)
- **Email**: chaitanyagote5006@gmail.com

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Font Awesome**: For professional icons and UI elements
- **Google Fonts**: For typography and web fonts
- **OpenWeatherMap**: For weather API in QuickWeather project
- **Firebase**: For authentication services in KrushiMitra
- **AWS**: For cloud infrastructure and hosting

---

*Built with passion and dedication by Chaitanya Gote*  
*Cloud & DevOps Engineer | Full-Stack Web Developer*
