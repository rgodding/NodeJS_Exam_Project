import loginManager from "../repository/loginManager.js";
import constructLoginPage from "../util/pages/constructLoginPage.js";

export function showLogin(req, res) {
    try {
        const page = constructLoginPage(req.isUser);
        res.send(page)
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
    }
}
export async function login(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userId = await loginManager.login(email, password)
        if(userId){
            req.session.userId = userId;
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
    }
}