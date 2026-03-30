import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/risk', async (req, res) => {
  const { latitude, longitude, time_of_day } = req.body;
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/predict-risk`, {
      latitude,
      longitude,
      time_of_day
    });
    return res.json(response.data);
  } catch (error) {
    return res.status(502).json({ message: 'AI service unavailable', detail: error.message });
  }
});

export default router;
