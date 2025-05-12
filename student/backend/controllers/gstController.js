import GstDocuments from '../models/GstDocuments.js';
import { uploadToCloudinary } from '../services/cloudinaryUpload.js';

// Create a new GST document
export const createGstDocument = async (req, res) => {
    try {
        const { studentId, gstDetails, rejectionRemarks } = req.body;
        let eventName, companyName, contactNumber, panCard, gstNumber, billingAddress, bankName, amount;

        if (typeof gstDetails === 'string') {
            // Parse if sent as JSON string
            const parsed = JSON.parse(gstDetails);
            eventName = parsed.eventName;
            companyName = parsed.companyName;
            contactNumber = parsed.contactNumber;
            panCard = parsed.panCard;
            gstNumber = parsed.gstNumber;
            billingAddress = parsed.billingAddress;
            bankName = parsed.bankName;
            amount = parsed.amount;
        } else {
            // If sent as object
            eventName = gstDetails.eventName;
            companyName = gstDetails.companyName;
            contactNumber = gstDetails.contactNumber;
            panCard = gstDetails.panCard;
            gstNumber = gstDetails.gstNumber;
            billingAddress = gstDetails.billingAddress;
            bankName = gstDetails.bankName;
            amount = gstDetails.amount;
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Generate document ID (GST-XXXX format)
        const count = await GstDocuments.countDocuments();
        const documentId = `GST-${String(count + 1).padStart(4, '0')}`;

        // Upload file to Cloudinary
        const documentUrl = await uploadToCloudinary(file);

        // Create new GST document
        const gstDocument = new GstDocuments({
            documentId,
            studentId,
            gstDetails: {
                eventName,
                companyName,
                contactNumber,
                panCard: panCard.toUpperCase(),
                gstNumber: gstNumber.toUpperCase(),
                billingAddress,
                bankName,
                amount: parseFloat(amount)
            },
            documentUrl,
            staffType: 'accountant',
            staffStatus: 'pending',
            rejectionRemarks: rejectionRemarks || ''
        });

        await gstDocument.save();

        res.status(201).json({
            success: true,
            message: 'GST document created successfully',
            data: gstDocument
        });
    } catch (error) {
        console.error('Error creating GST document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create GST document',
            error: error.message
        });
    }
};

// Get GST document by ID
export const getGstDocumentById = async (req, res) => {
    try {
        const { documentId } = req.params;
        const gstDocument = await GstDocuments.findOne({ documentId })
            .populate('studentId', 'name email');

        if (!gstDocument) {
            return res.status(404).json({
                success: false,
                message: 'GST document not found'
            });
        }

        res.json({
            success: true,
            data: gstDocument
        });
    } catch (error) {
        console.error('Error fetching GST document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch GST document',
            error: error.message
        });
    }
};

// Get all GST documents for a student
export const getStudentGstDocuments = async (req, res) => {
    try {
        const { studentId } = req.params;
        const gstDocuments = await GstDocuments.find({ studentId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: gstDocuments
        });
    } catch (error) {
        console.error('Error fetching student GST documents:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student GST documents',
            error: error.message
        });
    }
};

// Delete GST document by documentId
export const deleteGstDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const gstDocument = await GstDocuments.findOne({ documentId });

        if (!gstDocument) {
            return res.status(404).json({
                success: false,
                message: 'GST document not found'
            });
        }

        // Check if document can be deleted
        if (gstDocument.staffStatus !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete document that has been processed'
            });
        }

        const deleted = await GstDocuments.findOneAndDelete({ documentId });
        
        res.json({
            success: true,
            message: 'GST document deleted successfully',
            data: deleted
        });
    } catch (error) {
        console.error('Error deleting GST document:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete GST document',
            error: error.message
        });
    }
};

// Update GST document
export const updateGstDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { gstDetails, rejectionRemarks } = req.body;
        let updateFields = {};

        if (gstDetails) {
            const details = typeof gstDetails === 'string' ? JSON.parse(gstDetails) : gstDetails;
            updateFields['gstDetails'] = {
                ...details,
                panCard: details.panCard?.toUpperCase(),
                gstNumber: details.gstNumber?.toUpperCase(),
                amount: parseFloat(details.amount)
            };
        }

        if (req.file) {
            // If a new file is uploaded, upload to cloudinary and update documentUrl
            updateFields['documentUrl'] = await uploadToCloudinary(req.file);
        }

        // Reset status to pending on edit
        updateFields['staffStatus'] = 'pending';

        if (typeof rejectionRemarks === 'string') {
            updateFields['rejectionRemarks'] = rejectionRemarks;
        }

        const updated = await GstDocuments.findOneAndUpdate(
            { documentId },
            { $set: updateFields, updatedAt: Date.now() },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ 
                success: false, 
                message: 'GST document not found' 
            });
        }

        res.json({ 
            success: true, 
            message: 'GST document updated successfully', 
            data: updated 
        });
    } catch (error) {
        console.error('Error updating GST document:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update GST document', 
            error: error.message 
        });
    }
};
