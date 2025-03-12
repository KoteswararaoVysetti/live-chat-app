import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  username: {
    type: String,
    required: [true, 'Please provide username'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
