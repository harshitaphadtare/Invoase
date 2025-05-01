import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
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
        min: [0, 'Amount cannot be negative'],
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: 'Amount must be greater than 0'
        }
    },
    documents: [{
        url: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+\..+/.test(v);
                },
                message: 'Please provide a valid document URL'
            }
        },
        type: {
            type: String,
            required: true,
            enum: ['invoice', 'receipt', 'other']
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student ID is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    currentStage: {
        type: String,
        enum: ['accountant'],
        default: 'accountant'
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'approved'],
        default: 'pending'
    },
    statusHistory: [{
        status: {
            type: String,
            enum: ['pending', 'rejected', 'approved'],
            required: true
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
            required: true
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        comments: {
            type: String,
            trim: true
        }
    }]
});

// Pre-save middleware to generate document ID
donationSchema.pre('save', async function(next) {
    if (this.isNew) {
        const count = await mongoose.model('Donation').countDocuments();
        this.documentId = `DON-${String(count + 1).padStart(4, '0')}`;
    }
    next();
});

// Method to update status
donationSchema.methods.updateStatus = async function(newStatus, staffId, comments = '') {
    this.status = newStatus;
    this.statusHistory.push({
        status: newStatus,
        updatedBy: staffId,
        comments: comments
    });
    return this.save();
};

const Donation = mongoose.model('Donation', donationSchema);

export default Donation; 