import cloudinary from '../config/cloudinary.js';

// Stream upload helper to Cloudinary
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

// Delete file from Cloudinary helper
export const deleteFileFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`🗑️ Cloudinary file deleted: ${publicId}`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to delete Cloudinary file: ${publicId}`, error);
  }
};

// Express Route Handler for uploading single file
export const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const isPdf = req.file.mimetype === 'application/pdf';
    const folder = req.body.folder || (isPdf ? 'portfolio/pdfs' : 'portfolio/images');
    const resourceType = isPdf ? 'raw' : 'auto';

    const result = await uploadFileToCloudinary(req.file.buffer, folder, resourceType);

    return res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    });
  } catch (error) {
    console.error('Upload Controller Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Express Route Handler for purging a file
export const handleFileDelete = async (req, res) => {
  try {
    const { public_id, resource_type } = req.body;
    if (!public_id) {
      return res.status(400).json({ success: false, message: 'public_id is required' });
    }

    await deleteFileFromCloudinary(public_id, resource_type || 'image');

    return res.json({ success: true, message: 'File deleted from Cloudinary' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
