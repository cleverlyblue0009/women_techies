import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/safety-score', async (req, res) => {
  const { lat, lng, time } = req.body;
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/predict-safety`, {
      lat,
      lng,
      time
    });
    return res.json(response.data);
  } catch (error) {
    return res.status(502).json({ message: 'AI service unavailable', detail: error.message });
  }
});

export default router;
