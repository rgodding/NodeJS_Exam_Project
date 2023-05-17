export default function checkUser(req, res, next){
    req.isUser = true;
    next();
}