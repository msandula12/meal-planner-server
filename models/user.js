import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  favorites: [
    {
      ref: 'Meal',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  password: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
