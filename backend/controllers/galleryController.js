import {
  getAllGalleryItems,
  createNewGalleryItem,
  updateExistingGalleryItem,
  removeGalleryItem
} from '../services/galleryService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getGallery = async (req, res, next) => {
  try {
    const items = await getAllGalleryItems();
    return sendSuccess(res, 200, items, null, { count: items.length });
  } catch (error) {
    return next(error);
  }
};

export const createGalleryItem = async (req, res, next) => {
  try {
    const item = await createNewGalleryItem(req.body);
    return sendSuccess(res, 201, item);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await updateExistingGalleryItem(id, req.body);
    if (!item) {
      return sendError(res, 404, 'Gallery item not found');
    }
    return sendSuccess(res, 200, item);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await removeGalleryItem(id);
    if (!item) {
      return sendError(res, 404, 'Gallery item not found');
    }
    return sendSuccess(res, 200, null, 'Gallery item deleted successfully');
  } catch (error) {
    return next(error);
  }
};
