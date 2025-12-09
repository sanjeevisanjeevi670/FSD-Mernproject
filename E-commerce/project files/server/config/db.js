import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set in environment');
  }

  try {
    await mongoose.connect(uri, {
      // options recommended for modern mongoose versions
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error in DB connection:', err.message || err);
    throw err; // allow caller to decide whether to exit or keep server running
  }
};

export default connectDB;
