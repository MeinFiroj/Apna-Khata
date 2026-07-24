import bcrypt from 'bcryptjs'
import validator from 'validator'
import { adminModel } from '../models/admin.model.js';
import jwt from 'jsonwebtoken'


export const adminRegCtrl = async (req, res) => {
    const { email, password } = req.body;
    const { existingAdmin } = req;

    if (!validator.isStrongPassword(password, { minLength: 6 }) || !validator.isEmail(email)) return res.status(400).json({ message: "Invalid email or password" })

    if (existingAdmin) return res.status(422).json({ message: "This email already exist" })

    try {
        const passHash = await bcrypt.hash(password, 10);
        const admin = await adminModel.create({ email, password: passHash })

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ message: "Admin registered successfully", data: { email: admin.email, id: admin._id } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error!" })
    }
}

export const adminLoginCtrl = async (req, res) => {
    const { email, password } = req.body;
    const { existingAdmin } = req;

    if (!existingAdmin) return res.status(400).json({ message: "User doesn't exist!" })

    try {
        const checkPass = await bcrypt.compare(password, existingAdmin.password)

        if (!checkPass) return res.status(409).json({ message: "Incorrect password!" })

        const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ message: "Admin registered successfully", data: { email: existingAdmin.email, id: existingAdmin._id } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error!" })
    }
}