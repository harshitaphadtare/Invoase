import { cloudinary } from '../config/cloudinary.js';

const uploadFile = async (filePath, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      public_id: publicId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default uploadFile;
