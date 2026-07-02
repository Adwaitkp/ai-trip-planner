import express from 'express';
import { generate, getAll, getById, remove, toggleShare } from '../controllers/itinerary.controller.js';
import { generateValidator } from '../validators/itinerary.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/generate', protect, generateValidator, validate, generate);
router.get('/', protect, getAll);
router.get('/:id', protect, getById);
router.delete('/:id', protect, remove);
router.patch('/:id/share', protect, toggleShare);

export default router;