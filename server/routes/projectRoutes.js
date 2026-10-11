import express from 'express';
import {
  getProjects,
  getProjectCount,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/count', getProjectCount);
router.post('/', protectAdmin, createProject);
router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
