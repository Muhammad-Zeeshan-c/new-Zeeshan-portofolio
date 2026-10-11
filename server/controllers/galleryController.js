import Gallery from '../models/Gallery.js';
import { deleteFileFromCloudinary } from './uploadController.js';

export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ date: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });

    if (item.public_ids && item.public_ids.length > 0) {
      for (const pid of item.public_ids) {
        await deleteFileFromCloudinary(pid, item.type === 'video' ? 'video' : 'image');
      }
    }

    await Gallery.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
