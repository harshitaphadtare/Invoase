import express from 'express';
import {
    registerStaff,
    loginStaff,
    getStaffProfile,
    updateStaffProfile,
    changePassword
} from '../controllers/staffController.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerStaff);
router.post('/login', loginStaff);

// Protected routes
router.get('/profile', auth, getStaffProfile);
router.put('/profile', auth, updateStaffProfile);
router.put('/change-password', auth, changePassword);

// Role-specific routes
router.get('/all', auth, checkRole(['principal', 'vice_principal']), async (req, res) => {
    // Add logic to get all staff members
});

export default router;