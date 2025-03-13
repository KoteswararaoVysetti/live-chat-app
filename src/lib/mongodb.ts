import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Cached connection for MongoDB.
 */

let cached: {
  conn?: Mongoose | null;
  promise?: Promise<Mongoose> | null;
  // @ts-expect-error: expecting the mongoose is available in global this
} = global.mongoose;

if (!cached) {
  // @ts-expect-error: saving the connection details in global this
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
