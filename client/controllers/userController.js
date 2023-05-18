import constructUserPage from "../util/pages/constructUserPage.js";

export function showUser(req, res) {
    try {
        const userId = req.session.userId;
        const page = constructUserPage(req.isUser, userId);
        res.send(page)
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
    }
}