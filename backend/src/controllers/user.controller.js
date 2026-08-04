import { userModel } from '../models/user.model.js';
import { entryModel } from '../models/entry.model.js';

export const createUser = async (req, res) => {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) return res.status(400).json({ message: "All feilds are required!" })
    if (typeof email !== 'string' || !validator.isEmail(email) || !validator.isStrongPassword(password, { minLength: 6 })) return res.status(400).json({ message: 'Invalid email or password!' })

    try {
        const userExistance = await userModel.findOne({ email })
        if (userExistance) return res.status(409).json({ message: "User already exist!" })

        const passHash = await bcrypt.hash(password, 10);;
        const user = await userModel.create({ name, email, password: passHash, number })

        res.status(201).json({ message: "User registered successfully!", data: { name: user.name, email: user.email, number: user.number, id: user._id } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const deActivateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByIdAndUpdate(id, { isActive: false }, { new: true })

        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "Account deactivated!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong, try again later." })
    }
}

export const reActivateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByIdAndUpdate(id, { isActive: true }, { new: true })

        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "Account activated!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong, try again later." })
    }
}

export const getLedger = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.custId).select('-password')
        if (!user) return res.status(404).json({ message: "User not found" })

        const entries = await entryModel.find({ customerId: req.params.custId })

        res.status(200).json({ message: "Customer ledger fetched successfully", data: { user, entries } })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const searchUser = async (req, res) => {
    const { property } = req.query;

    if (!property) return res.status(400).json({ message: "Search query is required" })

    try {
        const customers = await userModel.find({
            $or: [
                { name: { $regex: property, $options: 'i' } },
                { email: { $regex: property, $options: 'i' } },
                { number: { $regex: property, $options: 'i' } },
            ]
        }).select('-password')

        res.status(200).json({ message: "Customers fetched successfully", data: customers })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}