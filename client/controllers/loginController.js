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
        console.log('email : ' + email);
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
    }
}