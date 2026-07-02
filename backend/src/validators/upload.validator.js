import { body } from 'express-validator';

export const generateValidator = [
  body('uploadId').isMongoId().withMessage('Valid Upload ID is required')
];