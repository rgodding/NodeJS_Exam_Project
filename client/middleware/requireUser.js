export default function requireUser(req, res, next) {
  if (req.session.userId === undefined) {
    res.redirect('/');
  } else {
    console.log('CHECKING USERID : ' + JSON.stringify(req.session.userId));
    req.userId = req.session.userId;
    req.isUser = true;
    next();
  }
}
