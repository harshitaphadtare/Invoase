import { v2 as cloudinary } from 'cloudinary';
import connectCloudinary from '../config/cloudinary.js';

// Initialize Cloudinary configuration
connectCloudinary();

const uploadToCloudinary = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error('No file or file buffer provided');
    }

    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString('base64');
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'documents',
      allowed_formats: ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'],
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary: ' + error.message);
  }
};

export { uploadToCloudinary };
