import Certificate from '../models/Certificate.js';
import { deleteFileFromCloudinary } from './uploadController.js';

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ created_at: -1 });
    return res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificateCount = async (req, res) => {
  try {
    const count = await Certificate.countDocuments();
    return res.json({ success: true, count });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    return res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Certificate.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    // Purge old files if replaced
    if (req.body.image_public_id && existing.image_public_id && req.body.image_public_id !== existing.image_public_id) {
      await deleteFileFromCloudinary(existing.image_public_id, 'image');
    }
    if (req.body.pdf_public_id && existing.pdf_public_id && req.body.pdf_public_id !== existing.pdf_public_id) {
      await deleteFileFromCloudinary(existing.pdf_public_id, 'raw');
    }

    const updated = await Certificate.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const cert = await Certificate.findById(id);

    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    // Purge associated Cloudinary files
    if (cert.image_public_id) {
      await deleteFileFromCloudinary(cert.image_public_id, 'image');
    }
    if (cert.pdf_public_id) {
      await deleteFileFromCloudinary(cert.pdf_public_id, 'raw');
    }

    await Certificate.findByIdAndDelete(id);

    return res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
