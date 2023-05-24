import { Router } from 'express';
import { showLogin, login } from '../controllers/loginController.js';
import { showRegister, register, showForgotPassword, forgotPassword } from '../controllers/loginController.js';
import checkUser from '../middleware/checkUser.js';
const router = Router();

router.get('/login', checkUser, (req, res) => {
  showLogin(req, res);
});
router.post('/login', checkUser, async (req, res) => {
  if(req.isUser){
    res.redirect('/')
  } else {
    login(req, res)
  }
})

router.get('/register', checkUser, async (req, res) => {
  showRegister(req, res)
})
router.post('/register', checkUser, async (req, res) => {
  if(req.isUser){
    res.redirect('/')
  } else {
    register(req, res)
  }
})

router.get('/forgot-password', checkUser, async (req, res) => {
  if(req.isUser){
    res.redirect('/');
  } else {
    showForgotPassword(req, res)
  }
})
router.post('/forgot-password', checkUser, async (req, res) => {
  if(req.isUser){
    res.redirect('/');
  } else {
    forgotPassword(req, res)
  }
})
router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

export default router;
