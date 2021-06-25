import express from 'express';

// Controllers
import { getSchedule, updateDay } from '../controllers/schedule.js';

const router = express.Router();

router.get('/:user', getSchedule);
router.post('/:user', updateDay);

export default router;
