import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Array of valid council codes
const VALID_COUNCIL_CODES = ['SVU123', 'SVU567', 'SVU789'];

// Custom error class for student-related errors
class StudentError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = 'StudentError';
    }
}

// Register a new student
export const registerStudent = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, councilName, councilCode, tenure, bankDetails } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phoneNumber || !councilName || !councilCode || !tenure) {
            throw new StudentError('All fields are required', 400, 'MISSING_FIELDS');
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@somaiya\.edu$/;
        if (!emailRegex.test(email)) {
            throw new StudentError('Please enter a valid Somaiya email address', 400, 'INVALID_EMAIL');
        }

        // Validate password strength
        if (password.length < 6) {
            throw new StudentError('Password must be at least 6 characters long', 400, 'WEAK_PASSWORD');
        }

        // Validate council code
        if (!VALID_COUNCIL_CODES.includes(councilCode)) {
            throw new StudentError('Invalid council code', 400, 'INVALID_COUNCIL_CODE');
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            throw new StudentError('Student already exists with this email', 409, 'EMAIL_EXISTS');
        }

        // Hash password with higher salt rounds for better security
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new student
        const student = new Student({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            councilName,
            councilCode,
            tenure,
            bankDetails
        });

        await student.save();

        // Create JWT token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                councilName: student.councilName,
                tenure: student.tenure,
                isVerified: student.isVerified
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error instanceof StudentError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errorCode: error.errorCode
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error during registration',
                errorCode: 'INTERNAL_SERVER_ERROR',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

// Login student
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            throw new StudentError('Email and password are required', 400, 'MISSING_CREDENTIALS');
        }

        // Find student
        const student = await Student.findOne({ email });
        if (!student) {
            throw new StudentError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        }

        // Check password with bcrypt
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            throw new StudentError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        }

        // Create JWT token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                councilName: student.councilName,
                tenure: student.tenure,
                isVerified: student.isVerified
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        if (error instanceof StudentError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errorCode: error.errorCode
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error during login',
                errorCode: 'INTERNAL_SERVER_ERROR',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

// Get student profile
export const getStudentProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            throw new StudentError('Authentication required', 401, 'UNAUTHORIZED');
        }

        const student = await Student.findById(req.user.id).select('-password');
        if (!student) {
            throw new StudentError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        res.json({
            success: true,
            student
        });
    } catch (error) {
        console.error('Get profile error:', error);
        if (error instanceof StudentError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errorCode: error.errorCode
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching profile',
                errorCode: 'INTERNAL_SERVER_ERROR',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            throw new StudentError('Authentication required', 401, 'UNAUTHORIZED');
        }

        // Check if email update is attempted
        if (req.body.email) {
            throw new StudentError(
                'Email cannot be updated. Please contact administrator for email changes.',
                400,
                'EMAIL_UPDATE_NOT_ALLOWED'
            );
        }

        const student = await Student.findById(req.user.id);
        if (!student) {
            throw new StudentError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }

        // Only update fields that are actually sent in the request
        const updatableFields = ['name', 'phoneNumber', 'councilName', 'tenure', 'bankDetails'];
        
        for (const [key, value] of Object.entries(req.body)) {
            if (updatableFields.includes(key) && value !== undefined) {
                student[key] = value;
            }
        }

        await student.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                councilName: student.councilName,
                tenure: student.tenure,
                bankDetails: student.bankDetails,
                isVerified: student.isVerified
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        if (error instanceof StudentError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errorCode: error.errorCode
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error while updating profile',
                errorCode: 'INTERNAL_SERVER_ERROR',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            throw new StudentError('Authentication required', 401, 'UNAUTHORIZED');
        }

        const { currentPassword, newPassword } = req.body;

        // Check if both passwords are provided
        if (!currentPassword || !newPassword) {
            throw new StudentError(
                'Both current password and new password are required',
                400,
                'MISSING_PASSWORDS'
            );
        }

        // Validate new password
        if (newPassword.length < 6) {
            throw new StudentError(
                'New password must be at least 6 characters long',
                400,
                'WEAK_PASSWORD'
            );
        }

        // Check if new password is same as current password
        if (currentPassword === newPassword) {
            throw new StudentError(
                'New password must be different from current password',
                400,
                'SAME_PASSWORD'
            );
        }

        const student = await Student.findById(req.user.id);
        if (!student) {
            throw new StudentError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }

        // Check current password with bcrypt
        const isMatch = await bcrypt.compare(currentPassword, student.password);
        if (!isMatch) {
            throw new StudentError(
                'Current password is incorrect',
                400,
                'INVALID_CURRENT_PASSWORD'
            );
        }

        // Hash new password with higher salt rounds for better security
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        student.password = hashedPassword;
        await student.save();

        res.json({ 
            success: true,
            message: 'Password changed successfully',
            status: 'SUCCESS'
        });
    } catch (error) {
        console.error('Change password error:', error);
        if (error instanceof StudentError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errorCode: error.errorCode
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error while changing password',
                errorCode: 'INTERNAL_SERVER_ERROR',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

