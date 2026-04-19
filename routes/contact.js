const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');

const router = express.Router();

// POST /api/contact - Send email
router.post('/', async (req, res) => {
    console.log('=== CONTACT REQUEST ===');
    console.log('Request body:', req.body);
    
    try {
        // Check if body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            console.error('Request body is empty');
            return res.status(400).json({
                success: false,
                message: 'Request body is empty.'
            });
        }

        const { name, email, subject, message } = req.body;
        console.log('Extracted data:', { name, email, subject, message: message ? message.substring(0, 50) + '...' : 'EMPTY' });

        // Validate required fields
        if (!name || !email || !subject || !message) {
            console.error('Missing fields validation failed');
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            console.error('Email validation failed:', email);
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        // Validate message length
        if (message.length < 10) {
            console.error('Message too short:', message.length);
            return res.status(400).json({
                success: false,
                message: 'Message must be at least 10 characters long.'
            });
        }

        // Check environment variables
        console.log('Environment check:');
        console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
        
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials not configured!');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error. Email credentials missing.'
            });
        }

        // Sanitize inputs
        const sanitizedName = validator.escape(name.trim());
        const sanitizedEmail = validator.escape(email.trim());
        const sanitizedSubject = validator.escape(subject.trim());
        const sanitizedMessage = validator.escape(message.trim());

        // Create simple transporter
        console.log('Creating email transporter...');
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify transporter
        try {
            await transporter.verify();
            console.log('Email configuration verified successfully');
        } catch (verifyError) {
            console.error('Email verification failed:', verifyError.message);
            return res.status(500).json({
                success: false,
                message: 'Email configuration verification failed.'
            });
        }

        // Email options
        const mailOptions = {
            from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: sanitizedEmail,
            subject: `Portfolio Contact: ${sanitizedSubject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contact Message</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
                        .field { margin-bottom: 20px; }
                        .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
                        .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb; }
                        .message { min-height: 100px; }
                        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Portfolio Contact Message</h1>
                        <p>New message from your portfolio website</p>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">From:</div>
                            <div class="value">${sanitizedName} &lt;${sanitizedEmail}&gt;</div>
                        </div>
                        <div class="field">
                            <div class="label">Subject:</div>
                            <div class="value">${sanitizedSubject}</div>
                        </div>
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value message">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="field">
                            <div class="label">Sent:</div>
                            <div class="value">${new Date().toLocaleString()}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>This message was sent from your portfolio website contact form.</p>
                    </div>
                </body>
                </html>
            `
        };

        // Send email
        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('=== CONTACT FORM ERROR ===');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        
        let errorMessage = 'Failed to send message. Please try again later.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Check Gmail app password.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Connection failed. Check internet connection.';
        }

        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

module.exports = router;
