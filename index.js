const nodemailer = require('nodemailer');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vehiqrspot@gmail.com',
    pass: 'mlhaoacxxokjkruy',
  },
});

const sendRegistrationEmail = async (userEmail, userName, password, link, subject, text, transporter) => {
  try {
    await transporter.sendMail({
      from: 'vehiqrspot@gmail.com',
      to: userEmail,
      subject: subject,
      text: text,
    });
    console.log('Registration email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending registration email:', error);
    return false;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed. testingggg 1' });
  }

  cors(corsOptions)(req, res, async () => {
    const { to, subject, text, isRegistration, userEmail, userName, password, link } = req.body;

    try {
      if (isRegistration) {
        await sendRegistrationEmail(userEmail, userName, password, link, subject, text, transporter);
      } else {
        await transporter.sendMail({
          from: 'vehiqrspot@gmail.com',
          to,
          subject,
          text,
        });
      }

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  });
}
