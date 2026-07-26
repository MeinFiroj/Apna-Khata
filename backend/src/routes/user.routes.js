import express from 'express'
import validator from 'validator';
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.post('/check-email', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required!" });

    if (typeof email !== 'string' || !validator.isEmail(email)) return res.status(400).json({ message: "Invalid email!" })

    try {
        const userExistance = await userModel.findOne({ email });
        if (userExistance) return res.status(409).json({ message: "User already exist!" })

        res.status(200).json({ message: "Email verified successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

userRouter.post('/register', async (req, res) => {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) return res.status(400).json({ message: "All feilds are required!" })
    if (typeof email !== 'string' || !validator.isEmail(email) || !validator.isStrongPassword(password, { minLength: 6 })) return res.status(400).json({ message: 'Invalid email or password!' })

    try {
        const userExistance = await userModel.findOne({ email })
        if (userExistance) return res.status(409).json({ message: "User already exist!" })

        const passHash = await bcrypt.hash(password, 10);;
        const user = await userModel.create({ name, email, password: passHash, number })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ message: "User registered successfully!", data: { name: user.name, email: user.email, number: user.number, id: user._id } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
})





export default userRouter;