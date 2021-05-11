import express from 'express';

// Controllers
import { getSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.get('/:user', getSchedule);

export default router;
