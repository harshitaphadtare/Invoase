import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/multer.js';
import {
  createReimbDocument,
  getReimbDocumentById,
  getStudentReimbDocuments,
  deleteReimbDocument,
  updateReimbDocument
} from '../controllers/reimbController.js';
import { authStudent } from '../middleware/AuthStudent.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Reimbursement document routes
router.post('/create', authStudent, upload.array('bills'), createReimbDocument);
router.get('/:documentId', authStudent, getReimbDocumentById);
router.get('/student/:studentId', authStudent, getStudentReimbDocuments);
router.delete('/:documentId', authStudent, deleteReimbDocument);
router.patch('/:documentId', authStudent, upload.array('bills'), updateReimbDocument);

export default router;
