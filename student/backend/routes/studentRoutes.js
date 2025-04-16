import express from 'express';
import {
    registerStudent,
    loginStudent,
    getStudentProfile,
    updateStudentProfile,
    changePassword
} from '../controllers/StudentController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected routes
router.get('/profile', auth, getStudentProfile);
router.put('/profile', auth, updateStudentProfile);
router.put('/change-password', auth, changePassword);

export default router; 