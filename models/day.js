import mongoose from 'mongoose';

const daySchema = mongoose.Schema({
  date: {
    default: new Date(),
    required: true,
    type: Date,
  },
  meals: {
    type: Map,
    of: new mongoose.Schema({
      breakfast: String,
      lunch: String,
      dinner: String,
    }),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Day = mongoose.model('Day', daySchema);

export default Day;
