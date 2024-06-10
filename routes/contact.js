const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Input validation function
const validateInput = (name, email, message) => {
  if (!name || !email || !message) {
    return false;
  }
  // Simple email regex for basic validation, adjust as needed
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

router.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  if (!validateInput(name, email, message)) {
    return res.status(400).json({ status: 'fail', error: 'Invalid input data' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: 'softtechdynamics@gmail.com',
    subject: `Contact Us Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ status: 'fail', error: 'Internal Server Error' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ status: 'success', info: info.response });
  });
});

module.exports = router;