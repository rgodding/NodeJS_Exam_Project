import { Router } from 'express';
const router = Router();

router.get('/session-data', (req, res) => {
  console.log('getting session data');
  const sessionData = req.session;
  res.json(sessionData);
});

export default router;
