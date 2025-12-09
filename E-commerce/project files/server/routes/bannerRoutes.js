import express from 'express';
import BannerModel from '../models/Banner.js'; // adjust path/name to your banner model

const router = express.Router();

// Public route to get banners
router.get('/', async (req, res) => {
  try {
    const banners = await BannerModel.find();
    return res.json(banners);
  } catch (err) {
    console.error('banners error', err);
    return res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

export default router;
