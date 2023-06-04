import { Router } from 'express';
const router = Router();

router.get('/session-data', (req, res) => {
  const sessionData = req.session;
  res.json(sessionData);
});

export default router;
