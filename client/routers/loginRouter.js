import { Router } from 'express';
import { showLogin, login } from '../controllers/loginController.js';
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

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

export default router;
