import ReimbDocuments from '../models/ReimbDocuments.js';
import { uploadToCloudinary } from '../services/cloudinaryUpload.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new reimbursement document
export const createReimbDocument = async (req, res) => {
    try {
        const { studentId, eventDetails, bankDetails, reimbursementItems, rejectionRemarks } = req.body;

        // Parse JSON fields if sent as strings
        const event = typeof eventDetails === 'string' ? JSON.parse(eventDetails) : eventDetails;
        const bank = typeof bankDetails === 'string' ? JSON.parse(bankDetails) : bankDetails;
        const items = typeof reimbursementItems === 'string' ? JSON.parse(reimbursementItems) : reimbursementItems;

        // Handle multiple file uploads (bills[])
        const files = req.files?.bills || req.files || [];
        const billsFiles = Array.isArray(files) ? files : [files];

        if (billsFiles.length !== items.length) {
            return res.status(400).json({ success: false, message: 'Number of bills and files do not match' });
        }

        // Upload each bill file and build reimbursementItems array
        const reimbursementItemsWithFiles = await Promise.all(
            items.map(async (item, idx) => {
                const fileUrl = await uploadToCloudinary(billsFiles[idx]);
                return {
                    billId: `BILL-${uuidv4()}`,
                    bill: {
                        description: item.description,
                        date: item.date,
                        amount: item.amount,
                        fileUrl
                    }
                };
            })
        );

        // Generate document ID
        const count = await ReimbDocuments.countDocuments();
        const documentId = `REIMB-${String(count + 1).padStart(4, '0')}`;

        // Calculate total amount
        const totalAmount = reimbursementItemsWithFiles.reduce((sum, item) => sum + Number(item.bill.amount), 0);

        // Create document
        const reimbDoc = new ReimbDocuments({
            documentId,
            studentId,
            eventDetails: event,
            reimbursementItems: reimbursementItemsWithFiles,
            totalAmount,
            bankDetails: bank,
            staffType: 'faculty',
            staffStatus: 'pending',
            rejectionRemarks: rejectionRemarks || ''
        });

        await reimbDoc.save();

        res.status(201).json({
            success: true,
            message: 'Reimbursement document created successfully',
            data: reimbDoc
        });
    } catch (error) {
        console.error('Error creating reimbursement document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create reimbursement document',
            error: error.message
        });
    }
};

// Get reimbursement document by ID
export const getReimbDocumentById = async (req, res) => {
    try {
        const { documentId } = req.params;
        const doc = await ReimbDocuments.findOne({ documentId }).populate('studentId', 'name email');
        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch document', error: error.message });
    }
};

// Get all reimbursement documents for a student
export const getStudentReimbDocuments = async (req, res) => {
    try {
        const { studentId } = req.params;
        const docs = await ReimbDocuments.find({ studentId }).sort({ createdAt: -1 });
        res.json({ success: true, data: docs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch documents', error: error.message });
    }
};

// Delete reimbursement document by documentId
export const deleteReimbDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const deleted = await ReimbDocuments.findOneAndDelete({ documentId });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.json({ success: true, message: 'Document deleted successfully', data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete document', error: error.message });
    }
};

// Update reimbursement document
export const updateReimbDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { eventDetails, bankDetails, reimbursementItems, rejectionRemarks } = req.body;
        let updateFields = {};

        if (eventDetails) {
            updateFields['eventDetails'] = typeof eventDetails === 'string' ? JSON.parse(eventDetails) : eventDetails;
        }
        if (bankDetails) {
            updateFields['bankDetails'] = typeof bankDetails === 'string' ? JSON.parse(bankDetails) : bankDetails;
        }
        if (reimbursementItems) {
            const items = typeof reimbursementItems === 'string' ? JSON.parse(reimbursementItems) : reimbursementItems;
            const files = req.files?.bills || [];
            if (files.length !== items.length) {
                return res.status(400).json({ success: false, message: 'Number of bills and files do not match' });
            }
            updateFields['reimbursementItems'] = await Promise.all(
                items.map(async (item, idx) => {
                    const fileUrl = await uploadToCloudinary(files[idx]);
                    return {
                        billId: item.billId || `BILL-${uuidv4()}`,
                        bill: {
                            description: item.description,
                            date: item.date,
                            amount: item.amount,
                            fileUrl
                        }
                    };
                })
            );
            updateFields['totalAmount'] = updateFields['reimbursementItems'].reduce((sum, item) => sum + Number(item.bill.amount), 0);
        }
        if (typeof rejectionRemarks === 'string') {
            updateFields['rejectionRemarks'] = rejectionRemarks;
        }

        // Optionally, reset status to pending on edit
        updateFields['staffStatus'] = 'pending';

        const updated = await ReimbDocuments.findOneAndUpdate(
            { documentId },
            { $set: updateFields, updatedAt: Date.now() },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        res.json({ success: true, message: 'Document updated', data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update document', error: error.message });
    }
};
