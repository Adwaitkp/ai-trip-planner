import express from 'express';
import { getShared } from '../controllers/share.controller.js';

const router = express.Router();

router.get('/:shareId', getShared);

export default router;