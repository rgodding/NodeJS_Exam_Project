export default function requireUser(req, res, next) {
  if (req.session.userId === undefined) {
    const previousUrl = req.headers.referer || '/';
    res.redirect(previousUrl);
  } else {
    req.userId = req.session.userId;
    req.isUser = true;
    next();
  }
}
