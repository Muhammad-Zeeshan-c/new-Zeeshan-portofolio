import CV from '../models/CV.js';
import { uploadFileToCloudinary, deleteFileFromCloudinary } from './cloudinaryService.js';

/**
 * CV Service
 * Manages active CV upload, single-instance enforcement, and Cloudinary PDF purging
 */
export const findActiveCV = async () => {
  return await CV.findOne({ is_active: true }).sort({ updated_at: -1 });
};

export const saveOrReplaceCV = async (file, title) => {
  // 1. Upload new CV PDF to Cloudinary raw folder
  const uploadResult = await uploadFileToCloudinary(file.buffer, 'portfolio/cv', 'raw');

  // 2. Find existing active CV and purge from Cloudinary to avoid orphan files
  const existingCV = await CV.findOne({ is_active: true });
  if (existingCV && existingCV.pdf_public_id) {
    try {
      await deleteFileFromCloudinary(existingCV.pdf_public_id, 'raw');
    } catch (err) {
      console.warn(`Failed to cleanup previous CV ${existingCV.pdf_public_id}:`, err);
    }
    await CV.findByIdAndDelete(existingCV._id);
  }

  // 3. Save new CV document to MongoDB
  const newCV = await CV.create({
    title: title || 'Muhammad Zeeshan - Resume',
    pdf_url: uploadResult.secure_url,
    pdf_public_id: uploadResult.public_id,
    file_name: file.originalname || 'cv.pdf',
    file_size: file.size,
    is_active: true
  });

  return newCV;
};

export const removeActiveCV = async () => {
  const cv = await CV.findOne({ is_active: true });
  if (!cv) {
    return null;
  }

  // Purge file from Cloudinary
  if (cv.pdf_public_id) {
    try {
      await deleteFileFromCloudinary(cv.pdf_public_id, 'raw');
    } catch (err) {
      console.warn(`Failed to cleanup CV file ${cv.pdf_public_id}:`, err);
    }
  }

  await CV.findByIdAndDelete(cv._id);
  return cv;
};
