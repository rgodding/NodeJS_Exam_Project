export default function checkUser(req, res, next) {
  if (req.session.userId === undefined) {
    req.isUser = false;
  } else {
    req.userId = req.session.userId;
    req.isUser = true;
  }
  next();
}
