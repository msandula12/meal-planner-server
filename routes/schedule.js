import express from 'express';

// Controllers
import { getSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.get('/', getSchedule);

export default router;
