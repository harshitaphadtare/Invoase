import mongoose from "mongoose";

const reimbDocumentSchema = new mongoose.Schema({
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
    eventDetails: {
        eventName: {
            type: String,
            required: [true, 'Event name is required'],
            trim: true
        },
        eventDate: {
            type: Date,
            required: [true, 'Event date is required']
        },
        eventDescription: {
            type: String,
            required: [true, 'Event description is required'],
            trim: true
        },
        councilName: {
            type: String,
            required: [true, 'Council name is required'],
            trim: true
        }
    },
    reimbursementItems: [
        {
          billId: {
            type: String,
            required: true,
            unique: true,
            default: () => `BILL-${uuidv4()}`
          },
          bill: {
            description: {
              type: String,
              required: true,
              trim: true
            },
            date: {
              type: Date,
              required: true
            },
            amount: {
              type: Number,
              required: true,
              min: [0, 'Amount cannot be negative']
            },
            fileUrl: {
              type: String,
              required: true,
              validate: {
                validator: v => /^https?:\/\/.+\..+/.test(v),
                message: 'Invalid file URL'
              }
            }
          }
        }
      ],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be negative']
    },
    bankDetails: {
        accountHolderName: {
            type: String,
            required: true,
            trim: true
        },
        accountNumber: {
            type: String,
            required: true,
            match: [/^\d{9,18}$/, 'Invalid account number'],
            trim: true
        },
        ifscCode: {
            type: String,
            required: true,
            match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'],
            trim: true,
            uppercase: true
        },
        bankName: {
            type: String,
            required: true,
            trim: true
        }
    },
    staffType: {
        type: String,
        enum: ['faculty','vice principal','principal','accountant'],
        default: 'faculty'
    },
    staffStatus: {
        type: String,
        enum: ['pending','under_review', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionRemarks: {
        type: String,
        trim: true,
        default:''
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

// Pre-save hook to calculate totalAmount from reimbursementItems
reimbDocumentSchema.pre('save', function (next) {
    if (Array.isArray(this.reimbursementItems)) {
      this.totalAmount = this.reimbursementItems.reduce((sum, item) => {
        return sum + (item.bill.amount || 0);
      }, 0);
    }
  
    this.updatedAt = Date.now();
  
    next();
  });

const ReimbDocuments = mongoose.model('ReimbDocuments', reimbDocumentSchema);

export default ReimbDocuments;
