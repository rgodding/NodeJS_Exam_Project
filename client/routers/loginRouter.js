import { Router } from 'express';
import { showLogin, login } from '../controllers/loginController.js';
import { showRegister, register, showForgotPassword, forgotPassword } from '../controllers/loginController.js';
import requireNoneUser from '../middleware/requireNoneUser.js';
const router = Router();

router.get('/login', requireNoneUser, (req, res) => {
  showLogin(req, res);
});

router.post('/login', requireNoneUser, async (req, res) => {
  if (req.isUser) {
    res.redirect('/');
  } else {
    login(req, res);
  }
});

router.get('/register', requireNoneUser, async (req, res) => {
  showRegister(req, res);
});
router.post('/register', requireNoneUser, async (req, res) => {
  register(req, res);
});

router.get('/forgot-password', requireNoneUser, async (req, res) => {
  showForgotPassword(req, res);
});
router.post('/forgot-password', requireNoneUser, async (req, res) => {
  forgotPassword(req, res);
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

export default router;
