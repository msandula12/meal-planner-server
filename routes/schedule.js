import express from 'express';

// Controllers
import { createMeal, getSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.get('/:user', getSchedule);
router.post('/meal/:user', createMeal);

export default router;
