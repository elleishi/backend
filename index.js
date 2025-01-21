const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed, test 1 - BACK TO FIRST' });
  }

  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vehiqrspot@gmail.com',
      pass: 'mlhaoacxxokjkruy',
    },
  });

  try {
    await transporter.sendMail({
      from: 'vehiqrspot@gmail.com',
      to,
      subject,
      text,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
}
