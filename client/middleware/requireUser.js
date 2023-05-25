export default function requireUser(req, res, next) {
  if (req.session.userId === undefined) {
    res.redirect('/');
  } else {
    req.userId = req.session.userId;
    req.isUser = true;
    next();
  }
}
