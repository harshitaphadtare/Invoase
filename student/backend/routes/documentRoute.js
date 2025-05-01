import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/multer.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            public_id: req.body.publicId || `${Date.now()}-${req.file.originalname}`,
            folder: 'documents' // Organize uploads in a 'documents' folder
        });

        // Delete the file from local storage after upload
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            size: result.bytes
        });
    } catch (error) {
        // Clean up the file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Upload failed',
            message: error.message
        });
    }
});

// Add a route to delete uploaded files
router.delete('/delete/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        const result = await cloudinary.uploader.destroy(publicId);
        
        if (result.result === 'ok') {
            res.json({ success: true, message: 'File deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'File not found' });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            error: 'Delete failed',
            message: error.message
        });
    }
});

export default router;
