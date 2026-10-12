import Gallery from '../models/Gallery.js';
import { deleteFileFromCloudinary } from './cloudinaryService.js';

/**
 * Gallery Service
 * Handles gallery items and associated Cloudinary assets
 */
export const getAllGalleryItems = async () => {
  return await Gallery.find().sort({ date: -1 });
};

export const createNewGalleryItem = async (itemData) => {
  return await Gallery.create(itemData);
};

export const updateExistingGalleryItem = async (id, updateData) => {
  return await Gallery.findByIdAndUpdate(id, updateData, { new: true });
};

export const removeGalleryItem = async (id) => {
  const item = await Gallery.findById(id);
  if (!item) {
    return null;
  }

  if (item.public_ids && item.public_ids.length > 0) {
    for (const pid of item.public_ids) {
      try {
        await deleteFileFromCloudinary(pid, item.type === 'video' ? 'video' : 'image');
      } catch (err) {
        console.warn(`Failed to cleanup gallery asset ${pid}:`, err);
      }
    }
  }

  await Gallery.findByIdAndDelete(id);
  return item;
};
