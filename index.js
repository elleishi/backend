const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed. on test' });
  }

  const { to, subject, text, isRegistration, userEmail, userName, password, link } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vehiqrspot@gmail.com',
      pass: 'mlhaoacxxokjkruy', 
    },
  });

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
    res.status(500).json({ message: 'Error sending email', error });
  }
}

const sendRegistrationEmail = async (userEmail, userName, password, link, subject, text, transporter) => {
  try {
    await transporter.sendMail({
      from: 'vehiqrspot@gmail.com',
      to: userEmail,
      subject: subject, // Use subject from frontend
      text: text, // Use dynamic content from frontend
    });
    console.log('Registration email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending registration email:', error);
    return false;
  }
};
