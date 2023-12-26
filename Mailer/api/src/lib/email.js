const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
  console.log('Sending email to:', to);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    auth: {
      user: 'ashwinkaranthamalai@gmail.com',
      pass: process.env.MAILER_KEY,
    },
    debug: true,
  });
  const info = await transporter.sendMail({
    from: '"Ashwin" ashwinkaranthamalai@gmail.com',
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
  });

  return info;
}
module.exports = { sendEmail };
