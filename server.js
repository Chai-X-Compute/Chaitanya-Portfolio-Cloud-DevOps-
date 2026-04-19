const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Environment check
const requiredEnv = ['EMAIL_USER', 'EMAIL_PASS'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`ERROR: ${key} is not defined in .env file`);
    process.exit(1);
  }
});

// Validate email format
if (!process.env.EMAIL_USER.includes('@gmail.com')) {
  console.warn('WARNING: EMAIL_USER should be a Gmail address for SMTP to work');
}

// Validate app password format (should be 16 characters, 4 groups of 4)
if (process.env.EMAIL_PASS && !/^[a-z]{4} [a-z]{4} [a-z]{4} [a-z]{4}$/.test(process.env.EMAIL_PASS)) {
  console.warn('WARNING: EMAIL_PASS does not look like a Gmail App Password (should be 16 chars in 4 groups)');
}

// Create nodemailer transporter (use SMTP config to avoid some Gmail oauth issues)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Changed to 587 for TLS
  secure: false, // false for TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // For development only
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('Nodemailer verify failed:', error);
  } else {
    console.log('Nodemailer transporter is ready');
  }
});

// Validate email format (using validator package)
function isValidEmail(email) {
  return validator.isEmail(email);
}

// POST /send endpoint
app.post('/send', contactLimiter, async (req, res) => {
  console.log('Received contact form submission:', {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    messageLength: req.body.message?.length
  });

  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: missing fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Sanitize and validate inputs
    const sanitizedName = validator.escape(name.trim());
    const sanitizedSubject = validator.escape(subject.trim());
    const sanitizedMessage = validator.escape(message.trim());

    if (!validator.isEmail(email)) {
      console.log('Validation failed: invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!validator.isLength(sanitizedName, { min: 1, max: 100 })) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 1 and 100 characters'
      });
    }

    if (!validator.isLength(sanitizedSubject, { min: 1, max: 200 })) {
      return res.status(400).json({
        success: false,
        message: 'Subject must be between 1 and 200 characters'
      });
    }

    if (!validator.isLength(sanitizedMessage, { min: 10, max: 2000 })) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 2000 characters'
      });
    }

    console.log('Sending email via Gmail SMTP...');

    // Email options
    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`, // Display name with authenticated email
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // Allow replies to go to the user's email
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.json({
      success: true,
      message: 'Message sent successfully! 🚀'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    console.error('Error command:', error.command);

    const response = {
      success: false,
      message: 'Failed to send message. Please try again later.'
    };

    // Provide detailed error in development
    if (process.env.NODE_ENV !== 'production') {
      response.error = error.message;
      response.code = error.code;
      response.stack = error.stack;
    }

    res.status(500).json(response);
  }
});

// Test email endpoint (for debugging)
app.post('/test-email', async (req, res) => {
  try {
    // Test connection without sending
    await transporter.verify();
    res.json({
      success: true,
      message: 'Email configuration is valid',
      user: process.env.EMAIL_USER ? 'configured' : 'missing'
    });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Email configuration test failed',
      error: error.message,
      code: error.code
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});