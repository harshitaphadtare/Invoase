import Bill from '../models/Bill.js';
import Document from '../models/Document.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';
import mongoose from 'mongoose';

// Upload a new bill
export const uploadBill = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { documentId, vendorName, billDate, amount, billNumber } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type. Only JPG, PNG and PDF are allowed' });
        }

        // Upload file to Cloudinary
        const fileUrl = await uploadToCloudinary(file);

        // Create new bill document
        const bill = new Bill({
            documentId,
            vendorName,
            billDate,
            amount: parseFloat(amount),
            billNumber,
            fileUrl,
            fileType: file.mimetype,
            fileName: file.originalname
        });

        await bill.save({ session });

        // Update document with bill reference and total amount
        const document = await Document.findById(documentId);
        if (!document) {
            throw new Error('Document not found');
        }

        document.reimbursementDetails.bills.push(bill._id);
        document.reimbursementDetails.totalAmount += parseFloat(amount);
        await document.save({ session });

        await session.commitTransaction();

        res.status(201).json({
            message: 'Bill uploaded successfully',
            bill
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error uploading bill:', error);
        res.status(500).json({ message: 'Failed to upload bill', error: error.message });
    } finally {
        session.endSession();
    }
};

// Get all bills for a document
export const getBillsByDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const bills = await Bill.find({ documentId }).sort({ createdAt: -1 });
        res.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ message: 'Failed to fetch bills', error: error.message });
    }
};

// Delete a bill
export const deleteBill = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { billId } = req.params;
        const bill = await Bill.findById(billId);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        // Delete file from Cloudinary
        await deleteFromCloudinary(bill.fileUrl);

        // Update document total amount
        const document = await Document.findById(bill.documentId);
        if (document) {
            document.reimbursementDetails.bills = document.reimbursementDetails.bills.filter(
                id => id.toString() !== billId
            );
            document.reimbursementDetails.totalAmount -= bill.amount;
            await document.save({ session });
        }

        // Delete bill from database
        await Bill.findByIdAndDelete(billId, { session });

        await session.commitTransaction();

        res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error deleting bill:', error);
        res.status(500).json({ message: 'Failed to delete bill', error: error.message });
    } finally {
        session.endSession();
    }
};

// Update bill status
export const updateBillStatus = async (req, res) => {
    try {
        const { billId } = req.params;
        const { status } = req.body;

        const bill = await Bill.findByIdAndUpdate(
            billId,
            { status },
            { new: true }
        );

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.json(bill);
    } catch (error) {
        console.error('Error updating bill status:', error);
        res.status(500).json({ message: 'Failed to update bill status', error: error.message });
    }
}; 