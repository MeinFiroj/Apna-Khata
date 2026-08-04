import validator from 'validator';
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendLoginAlertEmail } from '../services/email.service.js';


export const userEmailCheck = async (req, res) => {
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
}

export const userRegCtrl = async (req, res) => {
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
}

export const userLogCtrl = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: "email and password required!" })
    if (typeof email !== 'string' || !validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email!' })

    try {
        const userExistance = await userModel.findOne({ email })
        if (!userExistance) return res.status(400).json({ message: "User doesn't exist!" })

        if (!userExistance.isActive) return res.status(403).json({ message: "Account deactivated. Please contact the shop owner." })

        const checkPass = await bcrypt.compare(password, userExistance.password);
        if (!checkPass) return res.status(401).json({ message: "Incorrect password" })

        const token = jwt.sign({ id: userExistance._id, role: userExistance.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        await sendLoginAlertEmail(email, userExistance.name)

        res.status(200).json({ message: "User logged in successfully!", data: { name: userExistance.name, email: userExistance.email, number: userExistance.number, id: userExistance._id } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const userMeCtrl = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized, Token not found" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findOne({ _id: decoded.id }).select('-password')
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: "User Data fetched Successfully!", data: user })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Invalid or expired token" })
    }
}