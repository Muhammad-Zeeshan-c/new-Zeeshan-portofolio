import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary
} from '../services/cloudinaryService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// Re-export service methods for backward-compatibility if imported elsewhere
export { uploadFileToCloudinary, deleteFileFromCloudinary };

// Express Route Handler for uploading single file
export const handleFileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'No file uploaded');
    }

    const isPdf = req.file.mimetype === 'application/pdf';
    const folder = req.body.folder || (isPdf ? 'portfolio/pdfs' : 'portfolio/images');
    const resourceType = isPdf ? 'raw' : 'auto';

    const result = await uploadFileToCloudinary(req.file.buffer, folder, resourceType);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    });
  } catch (error) {
    console.error('Upload Controller Error:', error);
    return next(error);
  }
};

// Express Route Handler for purging a file
export const handleFileDelete = async (req, res, next) => {
  try {
    const { public_id, resource_type } = req.body;
    if (!public_id) {
      return sendError(res, 400, 'public_id is required');
    }

    await deleteFileFromCloudinary(public_id, resource_type || 'image');

    return sendSuccess(res, 200, null, 'File deleted from Cloudinary');
  } catch (error) {
    return next(error);
  }
};
