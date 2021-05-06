import mongoose from 'mongoose';

const daySchema = mongoose.Schema({
  date: {
    default: new Date(),
    required: true,
    type: Date,
  },
  meals: [
    {
      ref: 'Meal',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Day = mongoose.model('Day', daySchema);

export default Day;
