import constructAdminPage from "../util/pages/constructAdminPage.js";

export function showAdmin(req, res) {
    try {
        const page = constructAdminPage(req.isUser);
        res.send(page)
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
    }
}