import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    type: { type: String, enum: ['credit', 'payment'], required: true },
    amount: { type: Number, required: true },
    note: { type: String },
    addedBy: { type: String, enum: ['owner', 'customer'], required: true },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    rejectionReason: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true })

export const entryModel = mongoose.model('Entries', entrySchema);