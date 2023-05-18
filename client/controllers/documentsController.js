import constructDocumentsPage from "../util/pages/constructDocumentsPage.js";

export async function showDocuments(req, res) {
    try {
        const userId = req.session.userId;
        const page = await constructDocumentsPage(req.isUser, userId);
        res.send(page)
    } catch (err) {
        res.status(505).send('Internal Client Error');
    }
}