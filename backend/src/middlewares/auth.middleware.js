import { adminModel } from '../models/admin.model.js';
import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js';
import { entryModel } from '../models/entry.model.js';

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

export const checkActive = async (req, res, next) => {
    const customerId = req.user.role === 'admin' ? req.params.customerId : req.user.id;
    if (!customerId) return res.status(400).json({ message: "Customer ID required" })

    try {
        const customer = await userModel.findById(customerId)

        if (!customer) return res.status(404).json({ message: "Customer not found" })

        if (!customer.isActive) return res.status(403).json({ message: "This account is deactivated. Action not allowed" })

        req.customer = customer;
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const checkActiveForEntry = async (req, res, next) => {
    const { id } = req.params;

    try {
        const entry = await entryModel.findById(id)
        if (!entry) return res.status(404).json({ message: "Entry not found" })

        const customer = await userModel.findById(entry.customerId);
        if (!customer) return res.status(404).json({ message: "Customer not found" })
        if (!customer.isActive) return res.status(403).json({ message: "This account is deactivated. Action not allowed" })

        if (entry.status !== 'pending') return res.status(400).json({ message: `Entry already ${entry.status}, cannot be changed` })

        req.entry = entry;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}