import mongoose from 'mongoose';

const daySchema = mongoose.Schema({
  day: {
    default: new Date(),
    required: true,
    type: Date,
  },
  meals: {
    type: Map,
    of: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Day = mongoose.model('Day', daySchema);

export default Day;
