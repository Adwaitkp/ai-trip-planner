import { sendError } from '../utils/ApiResponse.js';
import { AppError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  if (err.name === 'CastError') {
    err.message = 'Resource not found';
    err.statusCode = 404;
  }

  if (err.code === 11000) {
    err.message = 'Duplicate field value entered';
    err.statusCode = 400;
  }

  return sendError(res, err.message, err.statusCode);
};