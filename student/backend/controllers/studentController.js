import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new student
export const registerStudent = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, councilName, councilCode, tenure, bankDetails } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
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
            message: 'Student registered successfully',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                councilName: student.councilName,
                tenure: student.tenure
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login student
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find student
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                councilName: student.councilName,
                tenure: student.tenure
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get student profile
export const getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
    try {
        const { name, phoneNumber, councilName, councilCode, tenure, bankDetails } = req.body;
        
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update fields
        student.name = name || student.name;
        student.phoneNumber = phoneNumber || student.phoneNumber;
        student.councilName = councilName || student.councilName;
        student.councilCode = councilCode || student.councilCode;
        student.tenure = tenure || student.tenure;
        student.bankDetails = bankDetails || student.bankDetails;

        await student.save();

        res.json({
            message: 'Profile updated successfully',
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                councilName: student.councilName,
                tenure: student.tenure
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        student.password = hashedPassword;
        await student.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

