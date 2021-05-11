import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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
