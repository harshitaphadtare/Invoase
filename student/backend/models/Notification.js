import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    type: {
        type: String,
        enum: {
            values: ['document_status', 'system', 'other'],
            message: '{VALUE} is not a valid notification type'
        },
        default: 'document_status'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2592000 // Automatically delete after 30 days
    }
}, {
    timestamps: true
});

// Create indexes for frequently queried fields
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // TTL index

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification; 