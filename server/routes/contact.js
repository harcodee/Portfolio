const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape(),
];

// Create transporter (lazy — only when email is needed)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// POST /api/contact
router.post('/', contactValidation, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, message } = req.body;

  // In development, skip actual email send
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 [DEV] Contact form submission:', { name, email, message });
    return res.json({
      success: true,
      message: 'Message received! (Dev mode — email not sent)',
    });
  }

  try {
    const transporter = createTransporter();

    // Email to your inbox
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #1A1A2E; margin-bottom: 4px;">New Contact Message</h2>
          <p style="color: #6B7280; margin-top: 0; font-size: 14px;">From your portfolio contact form</p>
          <hr style="border: none; border-top: 1px solid #E5F0FA; margin: 20px 0;" />
          <p><strong style="color: #1A1A2E;">Name:</strong> <span style="color: #374151;">${name}</span></p>
          <p><strong style="color: #1A1A2E;">Email:</strong> <span style="color: #374151;">${email}</span></p>
          <p><strong style="color: #1A1A2E;">Message:</strong></p>
          <div style="background: #F0F9F7; padding: 16px; border-radius: 8px; border-left: 3px solid #1ABC9C;">
            <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">Sent from portfolio contact form</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Harine T" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out — I'll be in touch!",
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #1A1A2E;">Hi ${name} 👋</h2>
          <p style="color: #374151; line-height: 1.7;">Thanks for reaching out! I've received your message and will get back to you within 24–48 hours.</p>
          <p style="color: #374151; line-height: 1.7;">In the meantime, feel free to check out my work on <a href="https://github.com/yourusername" style="color: #1ABC9C;">GitHub</a>.</p>
          <hr style="border: none; border-top: 1px solid #E5F0FA; margin: 20px 0;" />
          <p style="color: #9CA3AF; font-size: 13px;">Your Name · Full-Stack Developer</p>
        </div>
      `,
    });

    res.json({ success: true, message: "Message sent! I'll be in touch soon." });
  } catch (err) {
    console.error('Nodemailer error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    });
  }
});

module.exports = router;
