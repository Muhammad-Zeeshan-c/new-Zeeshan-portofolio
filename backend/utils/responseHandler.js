/**
 * Standard API Response Helpers
 */
export const sendSuccess = (res, statusCode = 200, data = null, message = null, meta = {}) => {
  const payload = { success: true };
  if (message) payload.message = message;
  if (data !== null) payload.data = data;
  Object.assign(payload, meta);
  return res.status(statusCode).json(payload);
};

export const sendError = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
  const payload = {
    success: false,
    message
  };
  if (process.env.NODE_ENV === 'development' && error) {
    payload.stack = error.stack;
  }
  return res.status(statusCode).json(payload);
};
