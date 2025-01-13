const nodemailer = require('nodemailer');

// Export a function that handles the request and response
module.exports = async (req, res) => {
    if (req.method === 'POST') {
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
                from: process.env.GMAIL_USER,
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
    } else {
        // Handle unsupported methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
