import Users from "../models/users.model.js";
import catchAsync from "../Utils/catchAsync.js";
import AppError from "../Utils/AppError.js"
import { sendEmail } from "../Utils/email.js";

export const signUp = catchAsync(async (req, res, next) => {
    const {fullname, email, password} = req.body;
    const newUser = await Users.create({fullname, email, password});

    const code = newUser.createEmailVerificationToken();
    await newUser.save({validateBeforeSave: false});

    const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
        <style>
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            }

            body {
            background-color: #f4f7fb;
            padding: 20px;
            color: #1f2937;
            }

            .wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            }

            .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            padding: 40px 30px;
            text-align: center;
            color: white;
            }

            .project-name {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            opacity: 0.9;
            margin-bottom: 12px;
            }

            .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            }

            .header p {
            font-size: 15px;
            opacity: 0.95;
            }

            .content {
            padding: 40px 30px;
            text-align: center;
            }

            .content h2 {
            font-size: 24px;
            margin-bottom: 16px;
            color: #111827;
            }

            .content p {
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
            margin-bottom: 30px;
            }

            .button {
            display: inline-block;
            padding: 14px 32px;
            background: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            transition: 0.3s ease;
            }

            .button:hover {
            background: #1d4ed8;
            }

            .footer {
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            }

            .small-text {
            margin-top: 20px;
            font-size: 13px;
            color: #9ca3af;
            line-height: 1.6;
            }

            @media (max-width: 600px) {
            .header {
                padding: 30px 20px;
            }

            .content {
                padding: 30px 20px;
            }

            .header h1 {
                font-size: 24px;
            }

            .content h2 {
                font-size: 20px;
            }

            .content p {
                font-size: 15px;
            }

            .button {
                width: 100%;
                padding: 14px;
            }

            .footer {
                padding: 24px 20px;
            }
            }
        </style>
        </head>
        <body>
        <div class="wrapper">
            <div class="header">
            <div class="project-name">Group 56 Phones Store</div>
            <h1>Email Verification</h1>
            <p>Verify your email address to complete registration</p>
            </div>

            <div class="content">
            <h2>Hello ${fullname} 👋</h2>
            <p>
                Thank you for signing up for <strong>Group 56 Phones Store</strong>!
                Please confirm your email address by clicking the button below.
                This helps us keep your account secure and fully activated.
            </p>

            <a href="${url}" class="button">
                Verify Email
            </a>

            <p class="small-text">
                If you did not create this account, you can safely ignore this email.
            </p>
            </div>

            <div class="footer">
            <p>
                This verification link may expire after some time for security reasons.
            </p>
            <p style="margin-top: 10px;">
                © Group 56 Phones Store — All rights reserved.
            </p>
            </div>
        </div>
        </body>
        </html>
    `;

    try {
        await sendEmail({
            to: newUser.email,
            subject: "Welcome to our phones store - verify your email",
            html
        });

        res.status(201).json({message: "User created successfully"})
    } catch(err) {
        console.log(err)
    }
});

export const verify = catchAsync(async (req, res, next) => {
    const {code} = req.params;

    const user = await Users.findOne({verificationCode: code});

    if (!user) {
        return next(new AppError("Invalid or expired verification code", 400))
    };``

    user.verificationCode = undefined;
    user.isVerified = true;

    await user.save({validateBeforeSave: false});

    res.status(200).json("Email verified successfully!")
})