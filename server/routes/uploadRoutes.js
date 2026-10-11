import express from 'express';
import { handleFileUpload, handleFileDelete } from '../controllers/uploadController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectAdmin, upload.single('file'), handleFileUpload);
router.delete('/', protectAdmin, handleFileDelete);

export default router;
