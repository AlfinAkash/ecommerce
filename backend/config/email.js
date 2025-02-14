const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Signup Verification",
        text: `Your OTP is: ${otp}`, // Fallback text for email clients that don't support HTML
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shopify App</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #ffffff; line-height: 1.6; background-color: #000000; padding: 20px; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; overflow: hidden;">

                <!-- Header Section -->
                <div style="text-align: center; padding: 20px; background: #000000; border-radius: 8px 8px 0 0;">
                    <h2 style="color: #ffffff; margin: 0;">Shopify App</h2>
                </div>

                <!-- Body Section -->
                <div style="padding: 20px;">
                    <p style="margin: 0 0 15px;">Dear User,</p>
                    <p style="margin: 0 0 15px;">
                        To verify your email for our Shopify App, please use the OTP below:
                    </p>
                   <p style="text-align: center; font-size: 24px; font-weight: bold; color: #ffffff; padding: 12px; border-radius: 6px; display: inline-block;">
    <span style="color: #0073e6;">${otp}</span>
</p>

                    <p style="margin: 0 0 15px;">If you did not request this, please ignore this email.</p>
                    <p style="font-weight: bold;">Best regards,</p>
                    <p style="font-weight: bold;">Akash A</p>
                </div>

                <!-- Footer Section -->
                <div style="background: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333;">
                    <p style="font-size: 12px; color: #cccccc; margin: 10px 0 0;">Follow me on:</p>
                    <p style="margin: 0;">
                        <a href="https://www.instagram.com/a.alfinakash" style="color: #0073e6; text-decoration: none; font-weight: bold;">Instagram</a> |
                        <a href="https://www.twitter.com/AlfinAkash" style="color: #0073e6; text-decoration: none; font-weight: bold;">Twitter</a> |
                        <a href="https://www.linkedin.com/in/AlfinAkash" style="color: #0073e6; text-decoration: none; font-weight: bold;">LinkedIn</a> |
                        <a href="https://github.com/AlfinAkash" style="color: #0073e6; text-decoration: none; font-weight: bold;">GitHub</a> |
                        <a href="https://alfinakash.vercel.app/" style="color: #0073e6; text-decoration: none; font-weight: bold;">Website</a>
                    </p>
                    <p style="font-size: 12px; color: #cccccc; margin: 10px 0 0;">© 2024 Shopify App. All Rights Reserved.</p>
                </div>

            </div>
        </body>
        </html>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
