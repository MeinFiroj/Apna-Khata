import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: String,
    totalBalance: { type: Number, default: 0 },
    role: { type: String, default: 'user' },
    isActive : {type : Boolean, default : true}
}, { timestamps: true })

export const userModel = mongoose.model('Users', userSchema);