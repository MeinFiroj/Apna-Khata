import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    currentBalance: { type: Number, ref: "Users", required: true },
    customerName: { type: String, ref: "Users", required: true },
    type: { type: String, enum: ['credit', 'payment'], required: true },
    paymentMethod: { type: String, enum: ['cash', 'online'] },
    amount: { type: Number, required: true },
    note: { type: String },
    addedBy: { type: String, enum: ['owner', 'customer'], required: true },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    rejectionReason: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true })

export const entryModel = mongoose.model('Entries', entrySchema);