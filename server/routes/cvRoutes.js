import express from 'express';
import {
  getActiveCV,
  uploadOrReplaceCV,
  deleteCV
} from '../controllers/cvController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getActiveCV);
router.post('/upload', protectAdmin, upload.single('cv'), uploadOrReplaceCV);
router.delete('/', protectAdmin, deleteCV);

export default router;
