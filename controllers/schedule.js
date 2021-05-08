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
    const schedule = await Meal.find({
      dates: {
        $gte: '2021-05-03',
        $lte: '2021-05-16',
      },
      user,
    });
    return res.status(200).json({ result: schedule });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
