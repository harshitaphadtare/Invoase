import mongoose from 'mongoose';

const bankDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    accountHolderName: {
        type: String,
        required: [true, 'Account holder name is required'],
        trim: true
    },
    accountNumber: {
        type: String,
        required: [true, 'Account number is required'],
        trim: true,
        minlength: [8, 'Account number must be at least 8 characters long'],
        maxlength: [20, 'Account number cannot exceed 20 characters']
    },
    ifscCode: {
        type: String,
        required: [true, 'IFSC code is required'],
        trim: true,
        match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please enter a valid IFSC code']
    },
    bankName: {
        type: String,
        required: [true, 'Bank name is required'],
        trim: true
    },
    branchName: {
        type: String,
        required: [true, 'Branch name is required'],
        trim: true
    }
}, {
    timestamps: true
});

// Create compound index for userId
bankDetailsSchema.index({ userId: 1 });

const BankDetails = mongoose.models.BankDetails || mongoose.model('BankDetails', bankDetailsSchema);

export default BankDetails; 