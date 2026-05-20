const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  // If transporter already configured, return it
  if (transporter) return transporter;

  // Check if email credentials are available
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env');
    return null;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  return transporter;
}

module.exports = getTransporter();