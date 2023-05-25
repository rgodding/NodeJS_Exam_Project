import imageManager from '../repository/imageManager.js';
import constructImagesPage from '../util/pages/constructImagesPage.js';

export async function showImages(req, res) {
  try {
    const page = await constructImagesPage(req.isUser, req.session.userId);
    res.send(page);
  } catch (err) {
    console.error(err);
    res.status(505).send('Internal Client Error');
  }
}

export function createImage(req, res) {
  try {
    const userId = req.session.userId;
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const fileName = req.file.filename;
    imageManager.postObject(type, name, description, fileName, userId);
    res.redirect('/images');
  } catch (err) {
    res.status(505).send('Internal Client Error');
  }
}
