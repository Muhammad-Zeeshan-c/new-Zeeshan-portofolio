import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Gallery title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  media_url: {
    type: String,
    default: ''
  },
  media_urls: {
    type: [String],
    default: []
  },
  public_ids: {
    type: [String],
    default: []
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
