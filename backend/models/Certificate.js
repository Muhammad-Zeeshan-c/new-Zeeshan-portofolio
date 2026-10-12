import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Issuer name is required']
  },
  issue_date: {
    type: String,
    default: ''
  },
  credential_url: {
    type: String,
    default: '#'
  },
  image_url: {
    type: String,
    default: ''
  },
  image_public_id: {
    type: String,
    default: ''
  },
  pdf_url: {
    type: String,
    default: ''
  },
  pdf_public_id: {
    type: String,
    default: ''
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
