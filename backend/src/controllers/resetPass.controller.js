import crypto from 'crypto';
import validator from 'validator'
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import { sendResetPasswordEmail } from '../services/email.service.js';
import { adminModel } from '../models/admin.model.js';

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const Model = req.role === 'admin'? adminModel : userModel;

    if (!email || !validator.isEmail(email)) return res.status(400).json({ message: "Valid email required" })

    try {
        const account = await Model.findOne({ email })
        if (!account) return res.status(200).json({ message: "If this email exists, a reset link has been sent" })

        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        account.resetPasswordToken = hashedToken;
        account.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
        await account.save();

        const resetLink = `${process.env.FRONTEND_URL}/${req.role}/reset-password/${rawToken}`;
        await sendResetPasswordEmail(account.email, account.name || 'Admin', resetLink); // similar to your login alert email

        res.status(200).json({ message: "If this email exists, a reset link has been sent" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const Model = req.role === 'admin'? adminModel : userModel;

    if (!validator.isStrongPassword(password, { minLength: 6 })) return res.status(400).json({ message: "Invalid password" })

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const account = await Model.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!account) return res.status(400).json({ message: "Invalid or expired reset link" })

        account.password = await bcrypt.hash(password, 10);
        account.resetPasswordToken = undefined;
        account.resetPasswordExpires = undefined;
        await account.save();

        res.status(200).json({ message: "Password reset successful. Please log in." })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}