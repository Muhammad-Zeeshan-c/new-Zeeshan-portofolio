import {
  getAllCertificates,
  countCertificates,
  createNewCertificate,
  updateExistingCertificate,
  removeCertificate
} from '../services/certificateService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getCertificates = async (req, res, next) => {
  try {
    const certificates = await getAllCertificates();
    return sendSuccess(res, 200, certificates, null, { count: certificates.length });
  } catch (error) {
    return next(error);
  }
};

export const getCertificateCount = async (req, res, next) => {
  try {
    const count = await countCertificates();
    return sendSuccess(res, 200, null, null, { count });
  } catch (error) {
    return next(error);
  }
};

export const createCertificate = async (req, res, next) => {
  try {
    const certificate = await createNewCertificate(req.body);
    return sendSuccess(res, 201, certificate);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateExistingCertificate(id, req.body);

    if (!updated) {
      return sendError(res, 404, 'Certificate not found');
    }

    return sendSuccess(res, 200, updated);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return sendError(res, 400, error.message);
    }
    return next(error);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cert = await removeCertificate(id);

    if (!cert) {
      return sendError(res, 404, 'Certificate not found');
    }

    return sendSuccess(res, 200, null, 'Certificate deleted successfully');
  } catch (error) {
    return next(error);
  }
};
