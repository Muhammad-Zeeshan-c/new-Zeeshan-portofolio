import { authenticateAdmin } from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, 400, 'Username and password are required');
    }

    const authResult = await authenticateAdmin(username, password);

    if (!authResult) {
      return sendError(res, 401, 'Invalid username or password');
    }

    return sendSuccess(res, 200, {
      token: authResult.token,
      admin: authResult.admin
    });
  } catch (error) {
    console.error('Login Error:', error);
    return next(error);
  }
};
