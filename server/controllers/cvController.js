import CV from '../models/CV.js';
import { uploadFileToCloudinary, deleteFileFromCloudinary } from './uploadController.js';

// Get current active CV
export const getActiveCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ is_active: true }).sort({ updated_at: -1 });
    if (!cv) {
      return res.json({ success: true, data: null, message: 'No active CV uploaded yet' });
    }
    return res.json({ success: true, data: cv });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Upload or Replace CV
export const uploadOrReplaceCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'PDF file is required' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ success: false, message: 'Only PDF files are allowed for CV' });
    }

    // 1. Upload new CV PDF to Cloudinary raw folder
    const uploadResult = await uploadFileToCloudinary(req.file.buffer, 'portfolio/cv', 'raw');

    // 2. Find existing active CV and purge from Cloudinary to avoid orphan files
    const existingCV = await CV.findOne({ is_active: true });
    if (existingCV && existingCV.pdf_public_id) {
      await deleteFileFromCloudinary(existingCV.pdf_public_id, 'raw');
      await CV.findByIdAndDelete(existingCV._id);
    }

    // 3. Save new CV document to MongoDB
    const newCV = await CV.create({
      title: req.body.title || 'Muhammad Zeeshan - Resume',
      pdf_url: uploadResult.secure_url,
      pdf_public_id: uploadResult.public_id,
      file_name: req.file.originalname || 'cv.pdf',
      file_size: req.file.size,
      is_active: true
    });

    return res.status(201).json({
      success: true,
      message: 'CV uploaded successfully',
      data: newCV
    });
  } catch (error) {
    console.error('CV Upload Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete active CV
export const deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ is_active: true });

    if (!cv) {
      return res.status(404).json({ success: false, message: 'No active CV found to delete' });
    }

    // Purge file from Cloudinary
    if (cv.pdf_public_id) {
      await deleteFileFromCloudinary(cv.pdf_public_id, 'raw');
    }

    await CV.findByIdAndDelete(cv._id);

    return res.json({ success: true, message: 'CV deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
