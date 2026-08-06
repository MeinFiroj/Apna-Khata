import { entryModel } from '../models/entry.model.js';
import { userModel } from '../models/user.model.js';

export const addEntry = async (req, res) => {
    const user = req.user;
    const { type, amount, note } = req.body;

    if (!type || !amount) return res.status(400).json({ message: "Type and amount are required!" })
    if (!['credit', 'payment'].includes(type)) return res.status(400).json({ message: "Invalid entry type" })
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: "Invalid amount" })

    try {
        const isAdmin = req.user.role === 'admin';

        const entry = await entryModel.create({
            customerId: req.customer._id,
            type,
            amount,
            note,
            addedBy: isAdmin ? 'owner' : 'customer',
            status: isAdmin ? 'verified' : 'pending',
            verifiedAt: isAdmin ? new Date() : null,
            verifiedBy: isAdmin ? req.user.id : null
        })

        res.status(201).json({ message: "One Entry added!", data: entry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const getAllEntries = async (req, res) => {
    try {
        const allEntries = await entryModel.find()

        res.status(200).json({ message: "Entries fetched successfully!", data: allEntries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const getPendingEntries = async (req, res) => {
    try {
        const pendingEntries = await entryModel.find({ status: 'pending' })
        res.status(200).json({ message: "Entries fetched successfully", data: pendingEntries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getSingleCustEntries = async (req, res) => {
    const { customerId } = req.params;

    try {
        const customer = await userModel.findById(customerId)
        if (!customer) return res.status(404).json({ message: "Customer not found" })

        const entries = await entryModel.find({ customerId })

        res.status(200).json({ message: "Entries fetched successfully!", data: entries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const verifyEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await entryModel.findById(id)
        if (!entry) return res.status(404).json({ message: "Entry not found" })
        if (entry.status !== 'pending') return res.status(400).json({ message: `Entry already ${entry.status}, cannot be changed` })

        entry.status = 'verified'
        entry.verifiedAt = new Date()
        entry.verifiedBy = req.user.id
        await entry.save()

        res.status(200).json({ message: "Entry verified", data: entry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const rejectEntry = async (req, res) => {
    const { id } = req.params;
    const { rejectionReason } = req.body

    if (!rejectionReason) return res.status(400).json({ message: "Rejection reasong is required" })

    try {
        const entry = await entryModel.findById(id)
        if (!entry) return res.status(404).json({ message: "Entry not found" })
        if (entry.status !== 'pending') return res.status(400).json({ message: `Entry already ${entry.status}, cannot be changed` })

        entry.status = 'rejected'
        entry.rejectionReason = rejectionReason;
        entry.verifiedAt = new Date()
        entry.verifiedBy = req.user.id
        await entry.save()

        res.status(200).json({ message: "Entry rejected", data: entry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}