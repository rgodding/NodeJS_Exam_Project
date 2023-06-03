export default function requireNoneUser(req, res, next) {
  if (req.session.userId === undefined) {
    next();
  } else {
    const previousUrl = req.headers.referer || '/';
    res.redirect(previousUrl);
  }
}
