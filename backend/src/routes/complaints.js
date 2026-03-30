import { Router } from 'express';
import multer from 'multer';
import { sha256 } from '../services/hash.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const statuses = ['submitted', 'under_review', 'escalated', 'resolved'];

const complaints = [
  {
    id: 'PS-2001',
    title: 'Unsafe route near metro',
    description: 'Report for quick demonstration',
    category: 'Safety',
    status: 'submitted',
    severity: 'medium',
    anonymous: false,
    latitude: 28.7041,
    longitude: 77.1025,
    createdAt: '2026-03-30T07:19:00Z',
    evidence: [],
    timeline: ['submitted']
  }
];

const createComplaint = (payload) => {
  const complaint = {
    id: `PS-${Date.now()}`,
    title: payload.title,
    description: payload.description,
    category: payload.category || 'General',
    status: 'submitted',
    anonymous: !!payload.anonymous,
    location: payload.location || 'Auto detected',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    evidence: [],
    timeline: ['submitted'],
    severity: payload.severity || 'medium',
    latitude: parseFloat(payload.latitude ?? payload.lat ?? 28.7041),
    longitude: parseFloat(payload.longitude ?? payload.lng ?? 77.1025)
  };
  complaints.push(complaint);
  return complaint;
};

const findComplaint = (id) => complaints.find((item) => item.id === id);

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: 'title and description required' });
  }

  const complaint = createComplaint(req.body);
  return res.status(201).json(complaint);
});

router.get('/', (_req, res) => {
  res.json(complaints);
});

router.patch('/:id', (req, res) => {
  const complaint = findComplaint(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: 'Complaint not found' });
  }

  if (req.body.status && statuses.includes(req.body.status)) {
    complaint.status = req.body.status;
    complaint.timeline.push(req.body.status);
    complaint.updatedAt = new Date().toISOString();
  }

  if (req.body.description) {
    complaint.description = req.body.description;
    complaint.updatedAt = new Date().toISOString();
  }

  return res.json(complaint);
});

router.post('/:id/files', upload.single('file'), (req, res) => {
  const complaint = findComplaint(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: 'Complaint not found' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'file is required' });
  }

  const hash = sha256(req.file.buffer);
  const evidence = {
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    hash,
    uploadedAt: new Date().toISOString()
  };
  complaint.evidence.push(evidence);
  return res.status(201).json(evidence);
});

export default router;
