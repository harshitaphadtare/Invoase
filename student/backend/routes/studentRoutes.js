import express from 'express';
import {
    registerStudent,
    loginStudent,
    getStudentProfile,
    updateStudentProfile,
    changePassword
} from '../controllers/StudentController.js';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const studentRouter = express.Router();

// Public routes
studentRouter.post('/register', registerStudent);
studentRouter.post('/login', loginStudent);

// Protected routes
studentRouter.get('/profile', auth, getStudentProfile);
studentRouter.patch('/profile', auth, updateStudentProfile);
studentRouter.put('/change-password', auth, changePassword);

export default studentRouter; 