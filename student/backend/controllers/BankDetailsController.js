import BankDetails from '../models/BankDetails.js';

export const saveBankDetails = async (req, res) => {
    try {
        const { 
            bankName, 
            accountNumber, 
            ifscCode, 
            accountHolderName,
            studentId 
        } = req.body;

        // Check if all required fields are present
        if (!bankName || !accountNumber || !ifscCode || !accountHolderName || !studentId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const bankDetails = new BankDetails({
            studentId,
            bankName,
            accountNumber,
            ifscCode,
            accountHolderName,
            isActive: true
        });

        await bankDetails.save();

        res.status(201).json({
            success: true,
            message: 'Bank details saved successfully',
            data: bankDetails
        });
    } catch (error) {
        // Handle specific validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: messages
            });
        }

        // Handle other errors
        console.error('Error saving bank details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save bank details',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
