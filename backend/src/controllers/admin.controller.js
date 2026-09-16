import { userModel } from '../models/user.model.js';
import { entryModel } from '../models/entry.model.js';
import validator from 'validator'
import bcrypt from 'bcryptjs';
import { uploadFile } from '../services/fileUpload.service.js';

export const createUser = async (req, res) => {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) return res.status(400).json({ message: "All feilds are required!" })
    if (typeof email !== 'string' || !validator.isEmail(email) || !validator.isStrongPassword(password, { minLength: 6 })) return res.status(400).json({ message: 'Invalid email or password!' })
    if (!req.file) return res.status(400).json({ message: 'Profile image is required' })

    try {
        const userExistance = await userModel.findOne({ email })
        if (userExistance) return res.status(409).json({ message: "User already exist!" })
        const numberExist = await userModel.findOne({ number })
        if (numberExist) return res.status(409).json({ message: "Phone number is already in use!" })

        const imgRes = await uploadFile(req.file.buffer, req.file.originalname)

        const passHash = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: passHash, number, image: imgRes.url })
        const userObj = user.toObject()
        delete userObj.password;

        res.status(201).json({ message: "User registered successfully!", data: userObj })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        if (!users) return res.status(400).json({ message: "Customers not found" })

        res.status(200).json({ message: "Customers fetched", data: users })
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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        let user;
        if (page === 1) {
            user = await userModel.findById(req.params.custId).select('-password')
            if (!user) return res.status(404).json({ message: "User not found" })
        }

        const entries = await entryModel.find({ customerId: req.params.custId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const entriesCount = await entryModel.countDocuments({customerId : req.params.custId})
        const pageCount = Math.ceil(entriesCount/limit)

        res.status(200).json({ message: "Customer ledger fetched successfully", data: { user, entries }, pagination : {entriesCount, pageCount} })

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

export const overdueCustomers = async (req, res) => {
    try {
        const thiryDayAgo = new Date()
        thiryDayAgo.setDate(thiryDayAgo.getDate() - 30);

        const customersWithBalance = await userModel.find({ totalBalance: { $gt: 0 } })

        const overdueCustomers = []

        for (const customer of customersWithBalance) {
            const lastPayment = await entryModel.findOne({ customerId: customer._id, type: 'payment', status: 'verified' }).sort({ createdAt: -1 });

            let referenceDate;
            if (lastPayment) referenceDate = lastPayment.createdAt;
            else {
                const firstCredit = await entryModel.findOne({ customerId: customer._id, type: "credit", status: 'verified' }).sort({ createdAt: 1 });
                referenceDate = firstCredit?.createdAt || customer.createdAt
            }

            const isOverdue = referenceDate < thiryDayAgo

            if (isOverdue) {
                overdueCustomers.push({
                    _id: customer._id,
                    name: customer.name,
                    balance: customer.totalBalance,
                    number: customer.number,
                    lastPaymentDate: lastPayment?.createdAt || null,
                    startDate: referenceDate || null
                });
            }
        }

        res.status(200).json({ message: "Overdue customers fetched", data: overdueCustomers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}