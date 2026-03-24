import express from 'express';
import { getClockIns } from '../controllers/adminController';

const router = express.Router();

// GET /api/admin/clock-ins
router.get('/clock-ins', getClockIns);

export default router;