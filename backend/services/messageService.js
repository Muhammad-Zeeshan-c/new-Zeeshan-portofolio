import Message from '../models/Message.js';

/**
 * Message Service
 * Handles visitor contact messages and read status
 */
export const getAllMessages = async () => {
  return await Message.find().sort({ created_at: -1 });
};

export const createNewMessage = async ({ name, email, subject, message }) => {
  return await Message.create({
    name,
    email,
    subject: subject || 'Portfolio Inquiry',
    message
  });
};

export const toggleMessageStatus = async (id) => {
  const message = await Message.findById(id);
  if (!message) {
    return null;
  }
  message.is_read = !message.is_read;
  await message.save();
  return message;
};

export const removeMessage = async (id) => {
  return await Message.findByIdAndDelete(id);
};
