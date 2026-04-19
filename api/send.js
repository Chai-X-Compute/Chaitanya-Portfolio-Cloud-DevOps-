const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
require('dotenv').config();

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Validation middleware
const validateEmail = (email) => {
  return validator.isEmail(email);
};

const sanitizeInput = (input) => {
  return validator.escape(input.trim());
};

// Contact form endpoint
module.exports = async (req, res) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed.'
      });
    }

    const { name, email, subject, message } = req.body;

    console.log('Request received:', { name, email, subject, message: message?.substring(0, 50) + '...' });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    console.log('Environment check:', {
      emailUser: process.env.EMAIL_USER ? 'SET' : 'NOT SET',
      emailPass: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
      emailUserLength: process.env.EMAIL_USER?.length || 0,
      emailPassLength: process.env.EMAIL_PASS?.length || 0
    });

    // Create transporter with more detailed config
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true, // Enable debug logging
      logger: true // Enable logging
    });

    // Email options
    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px;">
            <h2 style="color: white; text-align: center; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-bottom: 15px;">Contact Information</h3>
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
              <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${sanitizedSubject}</p>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="color: #333; margin-top: 0;">Message:</h4>
                <p style="color: #666; line-height: 1.6; margin: 0;">${sanitizedMessage}</p>
              </div>
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This message was sent from your portfolio website
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    };

    // Send email with detailed error handling
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    res.json({ 
      success: true, 
      message: 'Message sent successfully! 🚀' 
    });

  } catch (error) {
    console.error('Detailed error sending email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response
    });
    
    res.status(500).json({ 
      success: false, 
      message: `Failed to send message: ${error.message}` 
    });
  }
};
