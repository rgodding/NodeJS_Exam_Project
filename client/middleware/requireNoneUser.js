export default function requireNoneUser(req, res, next) {
  if (req.session.userId === undefined) {
    next();
  } else {
    res.redirect('/');
  }
}
