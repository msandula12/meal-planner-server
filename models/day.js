import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
  breakfast: String,
  lunch: String,
  dinner: String,
});

const daySchema = mongoose.Schema({
  day: {
    default: new Date(),
    required: true,
    type: Date,
  },
  meals: {
    type: mealSchema,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Day = mongoose.model('Day', daySchema);

export default Day;
