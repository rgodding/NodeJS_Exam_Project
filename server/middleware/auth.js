export const authenticate = (req, res, next) => {
    if(req.userId){
        next();
    } else {
        res.status(401).send({ error: 'Unauthorized' });
    }
}