import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._-]+@somaiya\.edu$/, 'Please enter a valid Somaiya email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    councilName: {
        type: String,
        required: [true, 'Council name is required'],
        trim: true
    },
    councilCode: {
        type: String,
        required: [true, 'Council code is required'],
        trim: true
    },
    tenure: {
        type: String,
        enum: ['1st year', '2nd year', '3rd year', '4th year'],
        required: [true, 'Tenure is required']
    },
    bankDetails: {
        accountHolderName: {
            type: String,
            required: [true, 'Account holder name is required'],
            trim: true
        },
        bankName: {
            type: String,
            required: [true, 'Bank name is required'],
            trim: true
        },
        accountNumber: {
            type: String,
            required: [true, 'Account number is required'],
            trim: true
        },
        ifscCode: {
            type: String,
            required: [true, 'IFSC code is required'],
            trim: true
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student; 