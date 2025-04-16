import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    referenceNumber: {
        type: String,
        required: [true, 'Reference number is required'],
        unique: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    type: {
        type: String,
        enum: {
            values: ['reimbursement', 'gst', 'donation'],
            message: '{VALUE} is not a valid document type'
        },
        required: [true, 'Document type is required']
    },
    status: {
        type: String,
        enum: {
            values: ['submitted', 'under_review', 'processed', 'rejected'],
            message: '{VALUE} is not a valid status'
        },
        default: 'submitted'
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    submissionTime: {
        type: Date,
        default: Date.now
    },
    documentUrl: {
        type: String,
        required: [true, 'Document URL is required']
    },
    timeline: [{
        status: {
            type: String,
            enum: {
                values: ['submitted', 'under_review', 'processed', 'rejected'],
                message: '{VALUE} is not a valid status'
            },
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        comment: {
            type: String,
            trim: true
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    currentReviewer: {
        type: String,
        enum: {
            values: ['accountant', 'vp', 'principal'],
            message: '{VALUE} is not a valid reviewer'
        },
        default: 'accountant'
    }
}, {
    timestamps: true
});

// Create indexes for frequently queried fields
documentSchema.index({ userId: 1, type: 1 });
documentSchema.index({ referenceNumber: 1 }, { unique: true });
documentSchema.index({ status: 1 });

// Method to generate reference number
documentSchema.statics.generateReferenceNumber = async function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get count of documents for today
    const count = await this.countDocuments({
        createdAt: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999))
        }
    });
    
    // Generate sequence number
    const sequence = String(count + 1).padStart(4, '0');
    
    // Format: REF-YYYYMMDD-SEQUENCE
    return `REF-${year}${month}${day}-${sequence}`;
};

const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document; 