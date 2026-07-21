import bcrypt from 'bcryptjs'
import validator from 'validator'
import { adminModel } from '../models/admin.model.js';

export const adminRegController = async (req, res) => {
    const { email, password } = req.body;
    const { existingAdmin } = req;

    if (!validator.isStrongPassword(password, { minLength: 6 }) || !validator.isEmail(email)) return res.status(400).json({ message: "Invalid password" })

    if (existingAdmin) return res.status(422).json({ message: "This email already exist" })

    try {
        const passHash = await bcrypt.hash(password, 10);
        const admin = await adminModel.create({ email, password: passHash })

        res.status(201).json({ message: "Admin registered successfully", data: { email: admin.email, id: admin._id } })
    } catch (error) {
        res.status(500).json({ message: "Server error!" })
    }
}