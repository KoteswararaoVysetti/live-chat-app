import mongoose from 'mongoose';
import Metadata from './_metadata';
import { EConnectionStatus } from '@/types/enums/connection-status';

const connectionSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please provide user1'],
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please provide user2'],
  },
  status: {
    type: EConnectionStatus,
    required: [true, 'Please provide a password'],
  },
});

connectionSchema.add(Metadata);

const ConnectionModel =
  mongoose.models.connection || mongoose.model('connection', connectionSchema);

export default ConnectionModel;
