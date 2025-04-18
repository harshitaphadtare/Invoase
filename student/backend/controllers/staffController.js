import Staff from '../models/Staff.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new staff member
export const registerStaff = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, department, role } = req.body;

        // Input validation
        if (!name || !email || !password || !phoneNumber || !department || !role) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required',
                missingFields: {
                    name: !name,
                    email: !email,
                    password: !password,
                    phoneNumber: !phoneNumber,
                    department: !department,
                    role: !role
                }
            });
        }

        // Email format validation
        const emailRegex = /^[a-zA-Z0-9._-]+@somaiya\.edu$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: 'Please enter a valid Somaiya email address'
            });
        }

        // Password strength validation
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ 
                success: false,
                message: 'Please enter a valid 10-digit phone number'
            });
        }

        // Role validation
        const validRoles = ['accountant', 'faculty'];  // Removed principal and vice_principal
        const normalizedRole = role.toLowerCase();
        if (!validRoles.includes(normalizedRole)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid role. Must be one of: accountant, faculty'
            });
        }

        // Check if staff already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(409).json({ 
                success: false,
                message: 'Staff member already exists with this email'
            });
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
            role: normalizedRole
        });

        await staff.save();

        // Create JWT token
        const token = jwt.sign(
            { id: staff._id, role: staff.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            message: 'Staff member registered successfully',
            token,
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                department: staff.department,
                isVerified: staff.isVerified
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error during registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Login staff member
export const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find staff member
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: staff._id, role: staff.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                department: staff.department,
                isVerified: staff.isVerified
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get staff profile
export const getStaffProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized access'
            });
        }

        const staff = await Staff.findById(req.user.id).select('-password');
        if (!staff) {
            return res.status(404).json({ 
                success: false,
                message: 'Staff member not found'
            });
        }
        res.json({
            success: true,
            staff
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error while fetching profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update staff profile
export const updateStaffProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized access'
            });
        }

        const { name, phoneNumber, department, email } = req.body;
        
        // Prevent email updates
        if (email) {
            return res.status(400).json({ 
                success: false,
                message: 'Email cannot be updated. Please contact administrator for email changes.'
            });
        }

        const staff = await Staff.findById(req.user.id);
        if (!staff) {
            return res.status(404).json({ 
                success: false,
                message: 'Staff member not found'
            });
        }

        // Input validation
        if (name && name.length < 2) {
            return res.status(400).json({ 
                success: false,
                message: 'Name must be at least 2 characters long'
            });
        }

        if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid phone number format'
            });
        }

        // Update only the fields that are provided in the request
        if (name) staff.name = name;
        if (phoneNumber) staff.phoneNumber = phoneNumber;
        if (department) staff.department = department;

        await staff.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                department: staff.department,
                isVerified: staff.isVerified
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error while updating profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized access'
            });
        }

        const { currentPassword, newPassword } = req.body;

        // Input validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                success: false,
                message: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        const staff = await Staff.findById(req.user.id);
        if (!staff) {
            return res.status(404).json({ 
                success: false,
                message: 'Staff member not found'
            });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, staff.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        staff.password = hashedPassword;
        await staff.save();

        res.json({ 
            success: true,
            message: 'Password changed successfully' 
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error while changing password',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all staff members (admin only)
export const getAllStaff = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized access'
            });
        }

        const staff = await Staff.findById(req.user.id);
        if (!staff) {
            return res.status(404).json({ 
                success: false,
                message: 'Staff member not found'
            });
        }

        // Check if user has permission
        if (staff.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Only admin can view all staff members'
            });
        }

        const allStaff = await Staff.find().select('-password');
        res.json({
            success: true,
            count: allStaff.length,
            staff: allStaff
        });
    } catch (error) {
        console.error('Get all staff error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error while fetching staff members',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update staff verification status (admin only)
export const updateStaffVerification = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized access'
            });
        }

        const { staffId, isVerified } = req.body;

        // Input validation
        if (!staffId || typeof isVerified !== 'boolean') {
            return res.status(400).json({ 
                success: false,
                message: 'Staff ID and verification status are required'
            });
        }

        const adminStaff = await Staff.findById(req.user.id);
        if (!adminStaff) {
            return res.status(404).json({ 
                success: false,
                message: 'Admin not found'
            });
        }

        // Check if user has permission
        if (adminStaff.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Only admin can update verification status'
            });
        }

        const staff = await Staff.findById(staffId);
        if (!staff) {
            return res.status(404).json({ 
                success: false,
                message: 'Staff member not found'
            });
        }

        staff.isVerified = isVerified;
        await staff.save();

        res.json({
            success: true,
            message: 'Staff verification status updated successfully',
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                isVerified: staff.isVerified
            }
        });
    } catch (error) {
        console.error('Update verification error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error while updating verification status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
