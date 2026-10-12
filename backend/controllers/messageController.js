import {
  getAllMessages,
  createNewMessage,
  toggleMessageStatus,
  removeMessage
} from '../services/messageService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getMessages = async (req, res, next) => {
  try {
    const messages = await getAllMessages();
    return sendSuccess(res, 200, messages, null, { count: messages.length });
  } catch (error) {
    return next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return sendError(res, 400, 'Name, email, and message are required fields');
    }

    const newMessage = await createNewMessage({ name, email, subject, message });
    return sendSuccess(res, 201, newMessage);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const toggleMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await toggleMessageStatus(id);

    if (!message) {
      return sendError(res, 404, 'Message not found');
    }

    return sendSuccess(res, 200, message);
  } catch (error) {
    return next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await removeMessage(id);

    if (!deleted) {
      return sendError(res, 404, 'Message not found');
    }

    return sendSuccess(res, 200, null, 'Message deleted successfully');
  } catch (error) {
    return next(error);
  }
};
