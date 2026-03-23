import express from 'express';
import { clockIn } from '../controllers/clockInController';

const router = express.Router();

router.post('/clock-in', clockIn);

console.log('clockIn type:', typeof clockIn);

export default router;