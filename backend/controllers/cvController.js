import {
  findActiveCV,
  saveOrReplaceCV,
  removeActiveCV
} from '../services/cvService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// Get current active CV
export const getActiveCV = async (req, res, next) => {
  try {
    const cv = await findActiveCV();
    if (!cv) {
      return sendSuccess(res, 200, null, 'No active CV uploaded yet');
    }
    return sendSuccess(res, 200, cv);
  } catch (error) {
    return next(error);
  }
};

// Upload or Replace CV
export const uploadOrReplaceCV = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'PDF file is required');
    }

    if (req.file.mimetype !== 'application/pdf') {
      return sendError(res, 400, 'Only PDF files are allowed for CV');
    }

    const newCV = await saveOrReplaceCV(req.file, req.body.title);

    return sendSuccess(res, 201, newCV, 'CV uploaded successfully');
  } catch (error) {
    console.error('CV Upload Error:', error);
    return next(error);
  }
};

// Delete active CV
export const deleteCV = async (req, res, next) => {
  try {
    const cv = await removeActiveCV();

    if (!cv) {
      return sendError(res, 404, 'No active CV found to delete');
    }

    return sendSuccess(res, 200, null, 'CV deleted successfully');
  } catch (error) {
    return next(error);
  }
};
