import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/multer.js';
import { createDocument,updateDonation, getDocumentById, getStudentDocuments, deleteDocument } from '../controllers/documentController.js';
import { authStudent } from '../middleware/AuthStudent.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Document routes
router.post('/create', authStudent, upload.single('document'), createDocument);
router.get('/:documentId', authStudent, getDocumentById);
router.get('/student/:studentId', authStudent, getStudentDocuments);
router.delete('/:documentId', authStudent, deleteDocument);
router.patch('/:documentId', authStudent, upload.single('document'), updateDonation);

export default router;
