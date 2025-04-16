import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
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
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['accountant', 'principal', 'vice_principal', 'faculty'],
        required: [true, 'Role is required'],
        default: 'accountant'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema);

export default Staff; 