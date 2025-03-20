import mongoose from 'mongoose';
import Metadata from './_metadata';

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
});

userSchema.add(Metadata);

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;
