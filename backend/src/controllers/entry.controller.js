import { entryModel } from '../models/entry.model.js';
import { userModel } from '../models/user.model.js';

const userTotalBalance = (entryAmount, type, totalBalance) => {
    if (type === 'payment') return totalBalance -= entryAmount;
    else return totalBalance += entryAmount;
}

export const addEntry = async (req, res) => {
    const { user, customer } = req;
    const { type, amount, note, paymentMethod } = req.body;

    if (!type || !amount) return res.status(400).json({ message: "Type and amount are required!" })
    if (!['credit', 'payment'].includes(type)) return res.status(400).json({ message: "Invalid entry type" })
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: "Invalid amount" })

    if (type === 'payment' && !['cash', 'online'].includes(paymentMethod)) {
        return res.status(400).json({ message: "Valid payment method (cash/online) required" })
    }

    if (type === 'payment' && amount > customer.totalBalance) {
        return res.status(400).json({ message: `Payment amount exceeds outstanding balance (₹${customer.totalBalance})` })
    }

    try {
        const isAdmin = req.user.role === 'admin';
        const willBeVerified = isAdmin;

        const newBalance = willBeVerified
            ? userTotalBalance(amount, type, customer.totalBalance)
            : customer.totalBalance;

        const entry = await entryModel.create({
            customerId: customer._id,
            currentBalance: newBalance,
            customerName: customer.name,
            type,
            amount,
            paymentMethod: type === 'payment' ? paymentMethod : undefined,
            note,
            addedBy: isAdmin ? 'owner' : 'customer',
            status: willBeVerified ? 'verified' : 'pending',
            verifiedAt: willBeVerified ? new Date() : null,
            verifiedBy: willBeVerified ? req.user.id : null
        })

        if (willBeVerified) {
            customer.totalBalance = newBalance;
            await customer.save();
        }

        res.status(201).json({ message: "Entry added!", data: entry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const getAllEntries = async (req, res) => {
    const { today } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const filter = {}
    let todayTotal = 0;
    if (today === 'true') {
        let startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)
        let endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)
        filter.createdAt = { $gte: startOfDay, $lte: endOfDay }
        todayTotal = await getTotals({ startOfDay, endOfDay })
    }

    try {
        const entries = await entryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)

        const totalEntries = await entryModel.countDocuments(filter)

        res.status(200).json({ message: "Entries fetched successfully!", data: entries, todayTotal: todayTotal.total, pagination: { page, totalEntries, limit, totalPages: Math.ceil(totalEntries / limit) } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const getRejectedEntries = async (req, res) => {
    try {
        const entries = await entryModel.find({ status: 'rejected' })
        res.status(200).json({ message: "All rejected entries", data: entries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getVerifiedEntries = async (req, res) => {
    try {
        const entries = await entryModel.find({ status: 'verified' })
        res.status(200).json({ message: "All verified entries", data: entries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getPendingEntries = async (req, res) => {
    try {
        const entries = await entryModel.find({ status: 'pending' })
        res.status(200).json({ message: "All pending entries", data: entries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getSingleCustEntries = async (req, res) => {
    const customerId = req.user.role === 'admin' ? req.params.customerId : req.user.id;

    try {
        const customer = await userModel.findById(customerId)
        if (!customer) return res.status(404).json({ message: "Customer not found" })

        const entries = await entryModel.find({ customerId }).sort({createdAt : -1})

        res.status(200).json({ message: "Entries fetched successfully!", data: entries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const verifyEntry = async (req, res) => {
    const { entry, customer } = req;

    try {
        const newBalance = userTotalBalance(entry.amount, entry.type, customer.totalBalance)

        entry.status = 'verified'
        entry.verifiedAt = new Date()
        entry.verifiedBy = req.user.id
        entry.currentBalance = newBalance;
        await entry.save()

        customer.totalBalance = newBalance;
        await customer.save()

        res.status(200).json({ message: "Entry verified", data: entry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const rejectEntry = async (req, res) => {
    const { rejectionReason } = req.body
    const { entry } = req;

    if (!rejectionReason) return res.status(400).json({ message: "Rejection reasong is required" })

    try {
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

export const getDashboardTotals = async (req, res) => {
    try {
        const totalCredit = await getTotals({ type: 'credit', status: 'verified' });
        const totalPayments = await getTotals({ type: 'payment', status: 'verified' });
        const outstanding = totalCredit.total - totalPayments.total;

        const pendingCount = await entryModel.countDocuments({ status: 'pending' });
        const totalEntries = await entryModel.countDocuments({ status: 'verified' })

        res.status(200).json({
            message: "Stats fetched",
            data: { outstanding, pendingCount, totalEntries }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getTotals = async ({ startOfDay, endOfDay, type, status }) => {
    if (!type) type = 'credit';
    if (!status) status = 'verified';

    try {
        const match = { type, status }

        if (startOfDay && endOfDay) {
            match.createdAt = { $gte: startOfDay, $lte: endOfDay }
        }

        const result = await entryModel.aggregate([
            { $match: match },
            { $group: { _id: null, totalCredit: { $sum: '$amount' } } }
        ]);

        const total = result[0]?.totalCredit || 0;

        return { success: true, total }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}