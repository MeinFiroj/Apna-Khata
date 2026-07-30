import { config } from 'dotenv'
config()
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

export const sendLoginAlertEmail = async (toEmail, userName) => {
    const loginTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f7; padding: 32px 0;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
            
            <div style="background-color: #4f46e5; padding: 20px 24px;">
                <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Apna Khata</h1>
            </div>
 
            <div style="padding: 28px 24px;">
                <h2 style="font-size: 18px; color: #111827; margin: 0 0 12px;">New Login Detected</h2>
                <p style="font-size: 14px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
                    Hi ${userName},
                </p>
                <p style="font-size: 14px; color: #374151; line-height: 1.6; margin: 0 0 20px;">
                    Your Apna Khata account was just logged into on:
                </p>
 
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
                    <span style="font-size: 14px; color: #111827; font-weight: 600;">${loginTime}</span>
                </div>
 
                <p style="font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0;">
                    If this wasn't you, please contact the shop owner immediately to secure your account.
                </p>
            </div>
 
            <div style="background-color: #f9fafb; padding: 14px 24px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                    This is an automated message from Apna Khata. Please do not reply to this email.
                </p>
            </div>
 
        </div>
    </div>
    `

    await transporter.sendMail({
        from: `Apna Khata <${process.env.GMAIL_USER}>`,
        to: toEmail,
        subject: 'New Login to Your Apna Khata Account',
        text: `Hi ${userName}, your account was just logged into on ${loginTime}.`,
        html
    });
};