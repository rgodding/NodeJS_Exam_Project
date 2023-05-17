export default function checkUser(req, res, next){
    if(req.isUser){
        return
    }
    req.isUser = true;
    next();
}