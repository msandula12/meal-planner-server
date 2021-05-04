import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
  startDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  owner: String,
  type: String,
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
