import constructFrontpagePage from '../util/pages/constructFrontpagePage.js';
import fs from "fs"
export function showFrontpage(req, res) {
  try {
    const page = constructFrontpagePage(req.isUser, req.userId);
    const image = fs.readFileSync('./uploads/0mk07wzuahny.jpg');
    const imageBase64 = image.toString('base64');
    const htmlWithImage = page.replace('<img src="placeholder">', `<img src="data:image/jpeg;base64,${imageBase64}">`);
    res.send(htmlWithImage);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}
