import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sender name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Sender email is required'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    default: 'Portfolio Inquiry'
  },
  message: {
    type: String,
    required: [true, 'Message body is required']
  },
  is_read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
