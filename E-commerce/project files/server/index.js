import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// add these imports — adjust filenames/paths to match your routes folder
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/banners', bannerRoutes);

// DB Connection
// connectDB(); // <-- remove this line if you're connecting below

async function start() {
  // attempt DB connection but don't exit if it fails
  try {
    await connectDB();
    console.log('DB ready');
  } catch (err) {
    console.error('DB connection failed, but continuing with server startup:', err.message);
    // server will start without DB; you can retry or show UI error
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
