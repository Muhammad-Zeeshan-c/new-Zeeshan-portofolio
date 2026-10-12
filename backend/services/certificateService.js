import Certificate from '../models/Certificate.js';
import { deleteFileFromCloudinary } from './cloudinaryService.js';

/**
 * Certificate Service
 * Handles business logic and DB interactions for certificates
 */
export const getAllCertificates = async () => {
  return await Certificate.find().sort({ created_at: -1 });
};

export const countCertificates = async () => {
  return await Certificate.countDocuments();
};

export const createNewCertificate = async (certificateData) => {
  return await Certificate.create(certificateData);
};

export const updateExistingCertificate = async (id, updateData) => {
  const existing = await Certificate.findById(id);
  if (!existing) {
    return null;
  }

  // Purge old files if replaced with new ones
  if (updateData.image_public_id && existing.image_public_id && updateData.image_public_id !== existing.image_public_id) {
    try {
      await deleteFileFromCloudinary(existing.image_public_id, 'image');
    } catch (err) {
      console.warn(`Failed to cleanup old cert image ${existing.image_public_id}:`, err);
    }
  }
  if (updateData.pdf_public_id && existing.pdf_public_id && updateData.pdf_public_id !== existing.pdf_public_id) {
    try {
      await deleteFileFromCloudinary(existing.pdf_public_id, 'raw');
    } catch (err) {
      console.warn(`Failed to cleanup old cert pdf ${existing.pdf_public_id}:`, err);
    }
  }

  return await Certificate.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const removeCertificate = async (id) => {
  const cert = await Certificate.findById(id);
  if (!cert) {
    return null;
  }

  // Purge associated Cloudinary files
  if (cert.image_public_id) {
    try {
      await deleteFileFromCloudinary(cert.image_public_id, 'image');
    } catch (err) {
      console.warn(`Failed to cleanup cert image ${cert.image_public_id}:`, err);
    }
  }
  if (cert.pdf_public_id) {
    try {
      await deleteFileFromCloudinary(cert.pdf_public_id, 'raw');
    } catch (err) {
      console.warn(`Failed to cleanup cert pdf ${cert.pdf_public_id}:`, err);
    }
  }

  await Certificate.findByIdAndDelete(id);
  return cert;
};
