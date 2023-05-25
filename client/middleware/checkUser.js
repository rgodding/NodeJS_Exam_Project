export default function checkUser(req, res, next) {
  if (req.session.userId === undefined) {
    req.isUser = false;
  } else {
    req.isUser = true;
  }
  next();
}
