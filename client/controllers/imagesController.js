import constructImagesPage from "../util/pages/constructImagesPage.js";

export function showImages(req, res) {
    try {
        const page = constructImagesPage(req.isUser);
        res.send(page)
    } catch (err) {
        console.error(err);
        res.status(505).send('Internal Client Error');
    }
}