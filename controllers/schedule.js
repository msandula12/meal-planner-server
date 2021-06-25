import dayjs from 'dayjs';

import Day from '../models/day.js';

export const getSchedule = async (req, res) => {
  const { user } = req.params;
  try {
    const startOfThisWeek = dayjs().startOf('week').add(1, 'days');
    const endOfNextWeek = startOfThisWeek
      .add(1, 'week')
      .endOf('week')
      .add(1, 'days');
    const schedule = await Day.find({
      day: {
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

export const updateDay = async (req, res) => {
  const { day } = req.body;
  const { user } = req.params;
  try {
    const dayExists = await Day.findOne({ day: day.day });
    if (dayExists) {
      const updatedDay = await Day.findOneAndUpdate(
        {
          day: day.day,
          user,
        },
        day,
        {
          new: true,
        }
      );
      return res.status(200).json({ day: updatedDay });
    } else {
      const newDay = new Day({ ...day, user });
      await newDay.save();
      return res.status(200).json({ day: newDay });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
