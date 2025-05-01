import Document from '../models/Document.js';
import { uploadToCloudinary } from '../services/cloudinaryUpload.js';

// Create a new document
export const createDocument = async (req, res) => {
    try {
        const { studentId, donationDetails } = req.body;
        let eventName, companyName, contactNumber, panCard, bankName, amount;

        if (typeof donationDetails === 'string') {
            // Parse if sent as JSON string
            const parsed = JSON.parse(donationDetails);
            eventName = parsed.eventName;
            companyName = parsed.companyName;
            contactNumber = parsed.contactNumber;
            panCard = parsed.panCard;
            bankName = parsed.bankName;
            amount = parsed.amount;
        } else {
            // If sent as object (e.g. in tests)
            eventName = donationDetails.eventName;
            companyName = donationDetails.companyName;
            contactNumber = donationDetails.contactNumber;
            panCard = donationDetails.panCard;
            bankName = donationDetails.bankName;
            amount = donationDetails.amount;
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Generate document ID (DON-XXXX format)
        const count = await Document.countDocuments();
        const documentId = `DON-${String(count + 1).padStart(4, '0')}`;

        // Upload file to Cloudinary
        const documentUrl = await uploadToCloudinary(file);

        // Create new document
        const document = new Document({
            documentId,
            studentId,
            donationDetails: {
                eventName,
                companyName,
                contactNumber,
                panCard: panCard.toUpperCase(),
                bankName,
                amount: parseFloat(amount)
            },
            documentUrl,
            staffType: 'accountant',
            staffStatus: 'pending'
        });

        await document.save();

        res.status(201).json({
            success: true,
            message: 'Document created successfully',
            data: document
        });
    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create document',
            error: error.message
        });
    }
};

// Get document by ID
export const getDocumentById = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findOne({ documentId })
            .populate('studentId', 'name email');

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        res.json({
            success: true,
            data: document
        });
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch document',
            error: error.message
        });
    }
};

// Get all documents for a student
export const getStudentDocuments = async (req, res) => {
    try {
        const { studentId } = req.params;
        const documents = await Document.find({ studentId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: documents
        });
    } catch (error) {
        console.error('Error fetching student documents:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student documents',
            error: error.message
        });
    }
};

// Delete document by documentId
export const deleteDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const deleted = await Document.findOneAndDelete({ documentId });
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }
        res.json({
            success: true,
            message: 'Document deleted successfully',
            data: deleted
        });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete document',
            error: error.message
        });
    }
};

export const updateDonation = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { donationDetails } = req.body;
        let updateFields = {};

        if (donationDetails) {
            const details = typeof donationDetails === 'string' ? JSON.parse(donationDetails) : donationDetails;
            updateFields['donationDetails'] = {
                ...details,
                panCard: details.panCard?.toUpperCase(),
                amount: parseFloat(details.amount)
            };
        }

        if (req.file) {
            // If a new file is uploaded, upload to cloudinary and update documentUrl
            updateFields['documentUrl'] = await uploadToCloudinary(req.file);
        }

        // Optionally, reset status to pending on edit
        updateFields['staffStatus'] = 'pending';

        const updated = await Document.findOneAndUpdate(
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