import express from 'express';
import {
    registerStaff,
    loginStaff,
    getStaffProfile,
    updateStaffProfile,
    changePassword,
    getAllStaff,
    updateStaffVerification
} from '../controllers/staffController.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerStaff);
router.post('/login', loginStaff);

// Protected routes
router.get('/profile', auth, getStaffProfile);
router.patch('/profile', auth, updateStaffProfile);
router.put('/change-password', auth, changePassword);

// Admin-only routes
router.get('/all', auth, checkRole(['admin']), getAllStaff);
router.put('/verify', auth, checkRole(['admin']), updateStaffVerification);

export default router;