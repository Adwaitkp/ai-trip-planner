import express from 'express';
import { uploadDocument } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/', protect, uploadMiddleware, uploadDocument);

export default router;