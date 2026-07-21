import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: String, unique: true },
    totalBalance: { type: Number, default: 0 },
    role: { type: String, default: 'user' }
}, { timestamps: true })

export const userModel = mongoose.model('Users', userSchema);