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

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized! Token not found" })

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token!" })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Admin access only" })
    next();
}

export const isUser = (req, res, next) => {
    if (req.user.role !== 'user') return res.status(403).json({ message: "User access only" })
    next();
}


