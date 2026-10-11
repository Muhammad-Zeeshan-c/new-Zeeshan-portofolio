import express from 'express';
import {
  getMessages,
  createMessage,
  toggleMessageRead,
  deleteMessage
} from '../controllers/messageController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectAdmin, getMessages);
router.post('/', createMessage);
router.put('/:id/read', protectAdmin, toggleMessageRead);
router.delete('/:id', protectAdmin, deleteMessage);

export default router;
