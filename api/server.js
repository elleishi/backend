const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // For parsing JSON requests

// Create a POST route to send emails
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vehiqrspot@gmail.com',
                pass: 'mlhaoacxxokjkruy', 
            },
        });

        const mailOptions = {
            from: 'vehiqrspot@gmail.com',
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});