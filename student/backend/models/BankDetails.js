import mongoose from 'mongoose';

const bankDetailsSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student ID is required']
    },
    accountHolderName: {
        type: String,
        required: [true, 'Account holder name is required'],
        trim: true,
        match: [/^[a-zA-Z\s]{2,50}$/, 'Please enter a valid account holder name']
    },
    accountNumber: {
        type: String,
        required: [true, 'Account number is required'],
        trim: true,
        minlength: [8, 'Account number must be at least 8 characters long'],
        maxlength: [20, 'Account number cannot exceed 20 characters'],
        match: [/^[0-9]+$/, 'Account number must contain only digits']
    },
    ifscCode: {
        type: String,
        required: [true, 'IFSC code is required'],
        trim: true,
        match: [/^[A-Z]{4}[A-Z0-9]{7}$/, 'Please enter a valid IFSC code']
    },
    bankName: {
        type: String,
        required: [true, 'Bank name is required'],
        trim: true,
        match: [/^[a-zA-Z\s]{2,50}$/, 'Please enter a valid bank name']
    },
    
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create compound indexes for frequently queried fields
bankDetailsSchema.index({ studentId: 1, isActive: 1 });
bankDetailsSchema.index({ accountNumber: 1, ifscCode: 1 });
bankDetailsSchema.index({ bankName: 1, branchName: 1 });

// Pre-save middleware to validate bank details
bankDetailsSchema.pre('save', function(next) {
    // Convert IFSC code to uppercase
    this.ifscCode = this.ifscCode.toUpperCase();
    
    // Validate account holder name matches student name
    if (this.accountHolderName) {
        this.accountHolderName = this.accountHolderName.trim().toUpperCase();
    }
    
    next();
});

const BankDetails = mongoose.models.BankDetails || mongoose.model('BankDetails', bankDetailsSchema);

export default BankDetails; 