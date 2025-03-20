import { Schema } from 'mongoose';

const Metadata: Schema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

Metadata.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

export default Metadata;
