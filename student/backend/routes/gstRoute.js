import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/multer.js';
import { 
    createGstDocument,
    getGstDocumentById,
    getStudentGstDocuments,
    deleteGstDocument,
    updateGstDocument
} from '../controllers/gstController.js';
import { authStudent } from '../middleware/AuthStudent.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// GST document routes
router.post('/create', authStudent, upload.single('document'), createGstDocument);
router.get('/:documentId', authStudent, getGstDocumentById);
router.get('/student/:studentId', authStudent, getStudentGstDocuments);
router.delete('/:documentId', authStudent, deleteGstDocument);
router.patch('/:documentId', authStudent, upload.single('document'), updateGstDocument);

export default router;
