import Staff from '../models/Staff.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new staff member
export const registerStaff = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, department, role, designation } = req.body;

        // Check if staff already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Staff member already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new staff member
        const staff = new Staff({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            department,
            role,
            designation
        });

        await staff.save();

        // Create JWT token
        const token = jwt.sign(
            { id: staff._id, role: staff.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: 'Staff member registered successfully',
            token,
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                designation: staff.designation
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login staff member
export const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find staff member
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: staff._id, role: staff.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                designation: staff.designation
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get staff profile
export const getStaffProfile = async (req, res) => {
    try {
        const staff = await Staff.findById(req.user.id).select('-password');
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update staff profile
export const updateStaffProfile = async (req, res) => {
    try {
        const { name, phoneNumber, department, designation } = req.body;
        
        const staff = await Staff.findById(req.user.id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Update fields
        staff.name = name || staff.name;
        staff.phoneNumber = phoneNumber || staff.phoneNumber;
        staff.department = department || staff.department;
        staff.designation = designation || staff.designation;

        await staff.save();

        res.json({
            message: 'Profile updated successfully',
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                designation: staff.designation
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

        const staff = await Staff.findById(req.user.id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, staff.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        staff.password = hashedPassword;
        await staff.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
