import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student ID is required']
    },
    donationDetails: {
        eventName: {
            type: String,
            required: [true, 'Event name is required'],
            trim: true
        },
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true
        },
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'],
            match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number']
        },
        panCard: {
            type: String,
            required: [true, 'PAN card number is required'],
            match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number'],
            trim: true,
            uppercase: true
        },
        bankName: {
            type: String,
            required: [true, 'Bank name is required'],
            trim: true
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount cannot be negative']
        }
    },
    documentUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+\..+/.test(v);
            },
            message: 'Please provide a valid document URL'
        }
    },
    staffType: {
        type: String,
        enum: ['accountant'],
        default: 'accountant'
    },
    staffStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionRemarks: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp
documentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Document = mongoose.model('Document', documentSchema);

export default Document; 