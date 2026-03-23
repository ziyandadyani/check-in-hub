import express from 'express';
import { getVenues } from '../controllers/venueController';

const router = express.Router();

router.get('/venues', getVenues);

export default router;

