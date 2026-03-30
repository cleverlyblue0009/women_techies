import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import complaintRoutes from './routes/complaints.js';
import aiRoutes from './routes/ai.js';
import contactRoutes from './routes/contacts.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/complaints', complaintRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Personal safety backend running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
