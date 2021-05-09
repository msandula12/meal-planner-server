import dayjs from 'dayjs';

import Meal from '../models/meal.js';

export const createMeal = async (req, res) => {
  const { dates, name, type } = req.body;
  const { user } = req.params;
  try {
    const newMeal = await Meal.create({
      dates,
      name,
      type,
      user,
    });
    return res.status(200).json({ result: newMeal });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getSchedule = async (req, res) => {
  const { user } = req.params;
  try {
    const startOfThisWeek = dayjs().startOf('week').add(1, 'days');
    const endOfNextWeek = startOfThisWeek
      .add(1, 'week')
      .endOf('week')
      .add(1, 'days');
    const schedule = await Meal.find({
      dates: {
        $gte: startOfThisWeek.format('YYYY-MM-DD'),
        $lte: endOfNextWeek.format('YYYY-MM-DD'),
      },
      user,
    });
    return res.status(200).json({ result: schedule });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
