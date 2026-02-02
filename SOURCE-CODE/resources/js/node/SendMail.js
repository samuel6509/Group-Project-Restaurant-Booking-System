import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables from the .env file
dotenv.config();

// Log the environment variables to check if they are loaded correctly
console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_PORT:", process.env.MAIL_PORT);

// Retrieve command line arguments
const email = process.argv[2].replace(/^['"]|['"]$/g, '').trim();
const name = process.argv[3];
const referenceCode = process.argv[4];
const reservationDate = process.argv[5];
const reservationTime = process.argv[6];

// Log email details for debugging purposes (optional)
console.log(`Sending reservation confirmation to: ${email}`);
console.log(`Reservation Details: ${reservationDate} at ${reservationTime}`);
console.log(`Reference Code: ${referenceCode}`);

// Create a transporter using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // Use the host from .env
    port: process.env.MAIL_PORT, // Use the port from .env
    secure: false, // Use false for STARTTLS, which is typical with port 587
    auth: {
        user: process.env.MAIL_USERNAME,  // Use MAIL_USERNAME from .env
        pass: process.env.MAIL_PASSWORD   // Use MAIL_PASSWORD from .env
    }
});

// Set up email data
const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,  // Use the from address from .env
    to: email,
    subject: 'Reservation Confirmation',
    text: `
        Hello ${name},

        Your reservation has been successfully made.

        Reservation Details:
        Date: ${reservationDate}
        Time: ${reservationTime}
        Reference Code: ${referenceCode}

        Thank you for booking with us!

        Best regards,
        La Dolce Vita
    `
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        // Log the error object in full for more detailed error information
        console.error('Error sending email:', error);

        // Optionally, log the entire error object (this might give more insight into what went wrong)
        if (error.response) {
            console.error('Error Response:', error.response);
        }

        // You can also check if the error has a code for more specific handling
        if (error.code) {
            console.error('Error Code:', error.code);
        }
    } else {
        console.log('Email sent: ' + info.response);
    }
});
