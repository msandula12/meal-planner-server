// import Meal from '../models/meal.js';

export const getSchedule = async (_, res) => {
  try {
    // const schedule = await Meal.find();
    return res.status(200).json({ test: 'test' });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
