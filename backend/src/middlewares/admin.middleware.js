import { adminModel } from '../models/admin.model.js';
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Invalid email or password" })

    try {
        const adminExist = await adminModel.findOne({ email })
        req.existingAdmin = adminExist;
        next()
    } catch (error) {
        res.status(500).json({ message: "Server error!" })
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized! Token not found" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'admin') return res.status(401).json({ message: "Unauthorized! This action can't be proceed" })
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token!" })
    }
}




