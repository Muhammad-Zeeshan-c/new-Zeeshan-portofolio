import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  tags: {
    type: [String],
    default: []
  },
  demo_url: {
    type: String,
    default: '#'
  },
  github_url: {
    type: String,
    default: '#'
  },
  image_url: {
    type: String,
    required: [true, 'Image URL is required']
  },
  image_public_id: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 1
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
