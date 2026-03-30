import { Router } from 'express';

const router = Router();

const contacts = [
  {
    id: 'CT-1001',
    name: 'Guardian One',
    phone: '+91-9000000001',
    relation: 'Friend',
    addedAt: new Date().toISOString()
  }
];

router.post('/', (req, res) => {
  const { name, phone, relation } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ message: 'name and phone are required' });
  }

  const contact = {
    id: `CT-${Date.now()}`,
    name,
    phone,
    relation: relation || 'Contact',
    addedAt: new Date().toISOString()
  };

  contacts.push(contact);
  return res.status(201).json(contact);
});

router.get('/', (_req, res) => {
  res.json(contacts);
});

export default router;
