export default function requireUser(req, res, next){
    if(req.session.userId === undefined){
        res.redirect('/')
    } else {
        req.isUser = true;
        next();
    }
}