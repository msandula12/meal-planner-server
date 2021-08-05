import chron from 'node-cron';
import dayjs from 'dayjs';

import Day from '../models/day.js';

export const deleteExpiredDays = async (_req, res) => {
  const EXPIRY = 30;
  try {
    const result = await Day.deleteMany({
      day: {
        $lte: dayjs().subtract(EXPIRY, 'day'),
      },
    });
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getSchedule = async (req, res) => {
  const { user } = req.params;
  try {
    const startOfThisWeek = dayjs()
      .subtract(1, 'day')
      .startOf('week')
      .add(1, 'days');
    const endOfNextWeek = startOfThisWeek
      .add(1, 'week')
      .endOf('week')
      .add(1, 'days');
    const schedule = await Day.find({
      day: {
        $gte: startOfThisWeek,
        $lte: endOfNextWeek,
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
    const dayExists = await Day.findOne({ day: day.day, user });
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
      const newDay = new Day({
        ...day,
        day: dayjs(day.day).toISOString(),
        user,
      });
      await newDay.save();
      return res.status(200).json({ day: newDay });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Daily scheduled task at 3 a.m. to delete expired days
chron.schedule('0 3 * * *', () => {
  console.log('Delete expired days.');
  deleteExpiredDays();
});
