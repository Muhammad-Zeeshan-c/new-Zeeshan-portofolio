import cloudinary from '../config/cloudinary.js';

/**
 * Cloudinary Service
 * Encapsulates external Cloudinary SDK interactions (upload stream & delete/destroy)
 */
export const uploadFileToCloudinary = (fileBuffer, folder = 'portfolio', resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteFileFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`🗑️ Cloudinary file deleted: ${publicId}`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to delete Cloudinary file: ${publicId}`, error);
    throw error;
  }
};
