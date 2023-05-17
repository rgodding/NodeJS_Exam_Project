export default function checkUser(req, res, next){
    if(req.session.userId === undefined){
        req.isUSer = false;
    } else {
        req.isUser = true;
    }
    next();
}