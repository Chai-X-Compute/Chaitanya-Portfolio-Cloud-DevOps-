const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Rate limiting
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    }
});

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('ERROR: Email credentials not found in environment variables');
    process.exit(1);
}

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('ERROR: Nodemailer transporter configuration failed:', error);
    } else {
        console.log('Nodemailer transporter is ready');
    }
});

// Contact form endpoint
app.post('/send', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Input validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        // Sanitize inputs
        const sanitizedName = validator.escape(name.trim());
        const sanitizedEmail = validator.escape(email.trim());
        const sanitizedSubject = validator.escape(subject.trim());
        const sanitizedMessage = validator.escape(message.trim());

        // Email options
        const mailOptions = {
            from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: sanitizedEmail,
            subject: `Portfolio Contact: ${sanitizedSubject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${sanitizedName}</p>
                        <p><strong>Email:</strong> ${sanitizedEmail}</p>
                        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 15px; border: 1px solid #dee2e6; border-radius: 5px;">
                        <h3 style="color: #495057; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap; color: #212529;">${sanitizedMessage}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d;">
                        <p style="margin: 0;">This message was sent from your portfolio website contact form.</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px;">Timestamp: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.json({
            success: true,
            message: 'Message sent successfully! \ud83d\ude80'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Root endpoint - serve portfolio website
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Portfolio Backend API',
        version: '1.0.0',
        endpoints: {
            'POST /send': 'Send contact form email',
            'GET /health': 'Health check'
        }
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});
