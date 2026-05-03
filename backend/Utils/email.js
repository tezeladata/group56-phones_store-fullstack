import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendEmail = async (options) => {
    try {
        await transporter.sendMail({
            from: '"Group 56 phones store" <no-reply>',
            to: options.to,
            subject: options.subject,
            html: options.html
        })
    } catch(err) {
        console.error("Error:", err)
    }
}