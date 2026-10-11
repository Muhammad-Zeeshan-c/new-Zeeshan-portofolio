import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Muhammad Zeeshan - Resume'
  },
  pdf_url: {
    type: String,
    required: [true, 'PDF URL is required']
  },
  pdf_public_id: {
    type: String,
    required: [true, 'Cloudinary public_id is required']
  },
  file_name: {
    type: String,
    default: 'cv.pdf'
  },
  file_size: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const CV = mongoose.model('CV', cvSchema);
export default CV;
