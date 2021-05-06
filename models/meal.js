import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
  dates: [Date],
  type: {
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true,
    type: String,
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
