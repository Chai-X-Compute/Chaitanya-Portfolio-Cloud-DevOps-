# Chaitanya Gote - Professional Portfolio

A modern, responsive portfolio website with Node.js backend and contact form functionality.

## [Live Demo](https://your-render-url.onrender.com)

---

## Features

- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes
- **Contact Form**: Functional email sending via Nodemailer
- **Project Gallery**: Interactive project modals
- **Professional Resume**: Complete skills and experience section
- **Modern Animations**: Smooth scroll effects and transitions

---

## Tech Stack

### Frontend
- **HTML5** & **CSS3** with modern features
- **JavaScript ES6+** with modern practices
- **Font Awesome** for icons
- **Google Fonts** for typography

### Backend
- **Node.js** + **Express.js**
- **Nodemailer** for email functionality
- **Express Rate Limit** for API protection
- **Validator** for input sanitization

### Deployment
- **Render** for hosting
- **Environment Variables** for security

---

## Project Structure

```
project-root/
|
|--- public/                    # Frontend assets
|    |
|    |-- index.html            # Main HTML file
|    |-- css/                  # Stylesheets
|    |-- js/                   # JavaScript files
|    |-- images/               # Project images
|    |-- certifications/       # Certificate images
|    |-- resume/               # Resume files
|
|--- routes/                    # Backend routes
|    |-- contact.js            # Contact form handler
|
|--- server.js                  # Main server file
|--- package.json               # Dependencies and scripts
|--- .env.example              # Environment variables template
|--- .gitignore                 # Git ignore file
|--- README.md                  # This file
```

---

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account with App Password

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chai-X-Compute/Chaitanya-Portfolio-Cloud-DevOps-.git
   cd Chaitanya-Portfolio-Cloud-DevOps-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=3001
   ```

4. **Get Gmail App Password**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Enable 2-Step Verification
   - Go to App Passwords
   - Generate new app password
   - Use this password in `EMAIL_PASS`

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:3001
   ```

---

## Render Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Deploy on Render

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Create New Web Service**
   - Click "New" > "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Deployment**
   ```
   Name: chaitanya-portfolio
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   In Render Dashboard > Service > Environment:
   ```
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=your-gmail-app-password
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your site will be live at `your-service-name.onrender.com`

---

## API Endpoints

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here (min 10 characters)"
}
```

### Health Check
```
GET /api/health
```

### API Info
```
GET /api
```

---

## Contact Form Features

- **Input Validation**: Email format, required fields, message length
- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Sanitization**: XSS protection
- **Error Handling**: Detailed error messages
- **Email Templates**: Professional HTML emails
- **Loading States**: Visual feedback during submission

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Your Gmail address | Yes |
| `EMAIL_PASS` | Gmail App Password | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run tests (placeholder) |

---

## Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Sanitizes all user inputs
- **Environment Variables**: Sensitive data not in code
- **CORS**: Configured for secure cross-origin requests
- **Error Handling**: No sensitive information leaked

---

## Performance

- **Static File Serving**: Optimized CSS, JS, and images
- **Compression**: Built-in Express compression
- **Caching**: Proper cache headers for static assets
- **Minification**: Ready for production optimization

---

## Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Check Gmail App Password
   - Verify environment variables
   - Check console logs for errors

2. **Deployment Fails**
   - Ensure all dependencies in package.json
   - Check environment variables in Render
   - Verify build and start commands

3. **Images Not Loading**
   - Check file paths in public directory
   - Verify case sensitivity
   - Ensure images are in correct folders

### Debug Mode

Add to your `.env`:
```env
DEBUG=*
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Connect With Me

- **Portfolio**: [Live Site](https://your-render-url.onrender.com)
- **GitHub**: [@Chai-X-Compute](https://github.com/Chai-X-Compute)
- **LinkedIn**: [chaitanya-gote](https://linkedin.com/in/chaitanya-gote)

---

## Acknowledgments

- Thanks to all open-source contributors
- Built with modern web technologies
- Deployed on Render for best performance
