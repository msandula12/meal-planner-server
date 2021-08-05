import express from 'express';

// Controllers
import {
  deleteExpiredDays,
  getSchedule,
  updateDay,
} from '../controllers/schedule.js';

const router = express.Router();

router.get('/expired', deleteExpiredDays);
router.get('/:user', getSchedule);
router.post('/:user', updateDay);

export default router;
