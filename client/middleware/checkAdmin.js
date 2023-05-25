import dotenv from 'dotenv/config';

export default function checkAdmin(req, res, next) {
  if (req.session.userId === process.env.ADMIN_ID) {
    next();
  } else {
    res.redirect('/');
  }
}
