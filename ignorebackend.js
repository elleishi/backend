require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const emailjs = require('@emailjs/nodejs'); // Import EmailJS NodeJS SDK

const app = express();

// Middleware
app.use(cors());            // Allow cross-origin requests
app.use(express.json());    // Parse incoming JSON requests

// Endpoint to send email
app.post('/send-email', async (req, res) => {
    const { serviceId, templateId, publicKey, params } = req.body;

    try {
        // Send email using EmailJS API
        const response = await emailjs.send(serviceId, templateId, params, { publicKey });

        // Send successful response with the email result
        res.status(200).json({ success: true, response });
    } catch (error) {
        // Send error response if something went wrong
        res.status(500).json({ success: false, error });
    }
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
