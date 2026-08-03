import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js';
import { entryModel } from '../models/entry.model.js';
import { userModel } from '../models/user.model.js';



const entryRouter = express.Router()

// Entries management
// - post /entries/:customerId
// - get /entries
// - get /entries/:cu
// - get /entries/pending
// - PATCH /entries/:id/verify
// - PATCH /entries/:id/reject
// - GET /dashboard

entryRouter.post('/:customerId', verifyToken, isAdmin, async (req, res) => {
    const {customerId} = req.params;
    const { type, amount, note } = req.body;

    if (!type || !amount || !customerId) return res.status(400).json({ message: "All fields are required!" })
    if (!['credit', 'payment'].includes(type)) return res.status(400).json({ message: "Invalid entry type" })
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: "Invalid amount" })

    try {
        const customer = await userModel.findById(customerId)
        if (!customer) return res.status(404).json({ message: "Customer not found" })
        const entry = await entryModel.create({
            customerId,
            type,
            amount,
            addedBy: 'owner',
            status: "verified",
            note,
            verifiedAt: new Date(),
            verifiedBy: req.user.id
        })

        res.status(201).json({ message: "One Entry added!", data: entry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
})

entryRouter.get('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const allEntries = await entryModel.find()

        res.status(200).json({ message: "Entries fetched successfully!", allEntries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
})

entryRouter.get('/:customerId', verifyToken, isAdmin, async (req, res) => {
    const { customerId } = req.params;
    if (!customerId) return res.status(400).json({ message: "Customer id not found" })
    try {
        const customer = await userModel.findById(customerId)
        if (!customer) return res.status(404).json({ message: "Customer not found" })

        const entries = await entryModel.find({ customerId })

        res.status(200).json({ message: "Entries fetched successfully!", entries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
})



export default entryRouter;