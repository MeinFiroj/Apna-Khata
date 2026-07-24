import { adminModel } from '../models/admin.model.js';

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