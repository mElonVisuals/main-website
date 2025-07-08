require('dotenv').config(); // For environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // For handling CORS

const app = express();
const port = process.env.PORT || 3000; // Use port 3000 or specified

// Middleware
app.use(cors({
    origin: 'http://localhost:8080' // IMPORTANT: Replace with your actual frontend domain in production
                                    // e.g., 'https://melonvisuals.me'
}));
app.use(express.json()); // To parse JSON request bodies

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    // Nodemailer transporter setup (using SMTP - e.g., Gmail, Outlook, your host's SMTP)
    // You MUST configure your email service details. Using environment variables is best.
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com' or 'smtp.sendgrid.net'
        port: process.env.SMTP_PORT, // e.g., 587 (TLS) or 465 (SSL)
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports (like 587)
        auth: {
            user: process.env.SMTP_USER, // Your email address for sending
            pass: process.env.SMTP_PASS  // Your email password or app-specific password
        },
        tls: {
            rejectUnauthorized: false // Use with caution, for self-signed certs etc.
        }
    });

    const mailOptions = {
        from: process.env.FROM_EMAIL || '"MelonVisuals Website" <no-reply@melonvisuals.me>', // Sender address
        to: process.env.TO_EMAIL || 'your-email@example.com', // List of recipients
        replyTo: email, // Set reply-to to the sender's email
        subject: `MelonVisuals.me Contact: ${subject || 'General Inquiry'}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
        html: `
            <p>You have received a new message from your website contact form.</p>
            <h3>Contact Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Subject:</strong> ${subject || 'N/A'}</li>
            </ul>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send your message. Please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access backend via http://localhost:${port}`);
});