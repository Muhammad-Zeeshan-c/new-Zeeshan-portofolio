import express from 'express';
import {
  getCertificates,
  getCertificateCount,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCertificates);
router.get('/count', getCertificateCount);
router.post('/', protectAdmin, createCertificate);
router.put('/:id', protectAdmin, updateCertificate);
router.delete('/:id', protectAdmin, deleteCertificate);

export default router;
